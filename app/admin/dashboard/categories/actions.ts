"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addCategory(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('category_images')
      .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error("Error uploading category image:", uploadError);
      throw new Error("Failed to upload category image");
    }

    const { data: { publicUrl } } = supabase.storage
      .from('category_images')
      .getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { error } = await supabase
    .from("categories")
    .insert([{ name, image_url: imageUrl }]);

  if (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category");
  }

  revalidatePath("/admin/dashboard/categories");
  revalidatePath("/admin/dashboard/products");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: rowData } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .single();

  if (rowData?.image_url) {
    const fileName = rowData.image_url.substring(rowData.image_url.lastIndexOf('/') + 1);
    if (fileName) {
      await supabase.storage.from('category_images').remove([fileName]);
    }
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }

  revalidatePath("/admin/dashboard/categories");
  revalidatePath("/admin/dashboard/products");
  revalidatePath("/");
}

export async function toggleTopCategory(id: string, currentState: boolean) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("categories")
    .update({ is_top_category: !currentState })
    .eq("id", id);

  if (error) {
    console.error("Error toggling top category:", error);
    throw new Error("Failed to toggle top category status");
  }

  revalidatePath("/admin/dashboard/categories");
  revalidatePath("/");
}
