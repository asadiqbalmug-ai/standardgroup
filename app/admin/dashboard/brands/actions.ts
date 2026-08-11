"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addBrand(formData: FormData) {
  const supabase = await createClient();

  // Protect the route
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const imageFile = formData.get("logo") as File;

  let logoUrl = null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('brand_logos')
      .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error("Error uploading brand logo:", uploadError);
      throw new Error("Failed to upload brand logo");
    }

    const { data: { publicUrl } } = supabase.storage
      .from('brand_logos')
      .getPublicUrl(fileName);

    logoUrl = publicUrl;
  }

  const { error } = await supabase
    .from("brands")
    .insert([{ name, logo_url: logoUrl }]);

  if (error) {
    console.error("Error adding brand:", error);
    throw new Error("Failed to add brand");
  }

  revalidatePath("/admin/dashboard/brands");
  revalidatePath("/admin/dashboard/products"); // revalidate products to update dropdown
  revalidatePath("/"); // revalidate homepage carousel
}

export async function deleteBrand(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 1. Fetch image URL before deleting
  const { data: rowData } = await supabase
    .from("brands")
    .select("logo_url")
    .eq("id", id)
    .single();

  if (rowData?.logo_url) {
    const fileName = rowData.logo_url.substring(rowData.logo_url.lastIndexOf('/') + 1);
    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from('brand_logos')
        .remove([fileName]);
      
      if (storageError) {
        console.error("Error removing file from storage:", storageError);
        // Not throwing to ensure we delete the row even if storage fails
      }
    }
  }

  // 2. Delete database row
  const { error } = await supabase
    .from("brands")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting brand:", error);
    throw new Error("Failed to delete brand");
  }

  revalidatePath("/admin/dashboard/brands");
  revalidatePath("/admin/dashboard/products");
  revalidatePath("/");
}

export async function updateBrand(formData: FormData) {
  const supabase = await createClient();

  // Protect the route
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("logo") as File;

  let logoUrl = undefined;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('brand_logos')
      .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error("Error uploading brand logo:", uploadError);
      throw new Error("Failed to upload brand logo");
    }

    const { data: { publicUrl } } = supabase.storage
      .from('brand_logos')
      .getPublicUrl(fileName);

    logoUrl = publicUrl;
  }

  // Update object
  const updates: any = { name };
  if (logoUrl !== undefined) {
    updates.logo_url = logoUrl;
  }

  const { error } = await supabase
    .from("brands")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating brand:", error);
    throw new Error("Failed to update brand");
  }

  revalidatePath("/admin/dashboard/brands");
  revalidatePath("/admin/dashboard/products");
  revalidatePath("/");
}
