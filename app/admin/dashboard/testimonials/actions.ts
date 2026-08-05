"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addTestimonial(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const author_name = formData.get("author_name") as string;
  const company_name = formData.get("company_name") as string;
  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string, 10);

  const { error } = await supabase
    .from("testimonials")
    .insert([{ author_name, company_name, content, rating }]);

  if (error) {
    console.error("Error adding testimonial:", error);
    throw new Error("Failed to add testimonial");
  }

  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    throw new Error("Failed to delete testimonial");
  }

  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/");
}

export async function toggleTestimonial(id: number, currentStatus: boolean) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("testimonials")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) {
    console.error("Error toggling testimonial:", error);
    throw new Error("Failed to toggle testimonial");
  }

  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/");
}
