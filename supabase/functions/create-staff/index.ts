// Edge Function: create-staff
// Admin-only. Creates a new auth user (staff or admin) using the service role,
// then sets their role + granular permissions on the profile.
//
// Why an edge function: creating auth users requires the service-role key, which
// must never be exposed to the browser. The caller's JWT is verified and checked
// against the profiles table to ensure only an active admin can call this.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return json({ error: "Missing bearer token" }, 401);
  }

  // 1) Identify the caller from their JWT.
  const callerClient = createClient(SUPABASE_URL, ANON, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user: caller },
    error: callerErr,
  } = await callerClient.auth.getUser();
  if (callerErr || !caller) return json({ error: "Invalid session" }, 401);

  // 2) Service-role client for privileged work.
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 3) Verify the caller is an active admin.
  const { data: callerProfile } = await admin
    .from("profiles")
    .select("role, is_active")
    .eq("id", caller.id)
    .single();
  if (!callerProfile || callerProfile.role !== "admin" || !callerProfile.is_active) {
    return json({ error: "Forbidden: admin only" }, 403);
  }

  // 4) Validate input.
  let payload: {
    email?: string;
    password?: string;
    full_name?: string;
    role?: "admin" | "staff";
    permissions?: Record<string, boolean>;
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const email = (payload.email ?? "").trim().toLowerCase();
  const password = payload.password ?? "";
  const role = payload.role === "admin" ? "admin" : "staff";
  const full_name = (payload.full_name ?? "").trim();
  const permissions = role === "admin" ? {} : (payload.permissions ?? {});

  if (!email || !password || password.length < 8) {
    return json({ error: "Email and password (>=8 chars) required" }, 400);
  }

  // 5) Create the auth user (email confirmed so they can log in immediately).
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role },
  });
  if (createErr || !created.user) {
    return json({ error: createErr?.message ?? "Could not create user" }, 400);
  }

  // 6) Upsert the profile (the on-signup trigger may have created a default row).
  const { error: profileErr } = await admin.from("profiles").upsert({
    id: created.user.id,
    email,
    full_name,
    role,
    is_active: true,
    permissions,
    created_by: caller.id,
  });
  if (profileErr) {
    // Roll back the auth user so we don't leave an orphan.
    await admin.auth.admin.deleteUser(created.user.id);
    return json({ error: profileErr.message }, 400);
  }

  return json({ ok: true, id: created.user.id, email, role });
});
