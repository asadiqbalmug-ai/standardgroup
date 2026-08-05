"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addHeroImage(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const is_active = formData.get("is_active") === "true";
  const imageFile = formData.get("image") as File;

  if (!imageFile || imageFile.size === 0) {
    throw new Error("No image file provided");
  }

  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, imageFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error("Failed to upload image");
  }

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase
    .from("hero_images")
    .insert([{ title, image_url: publicUrl, is_active }]);

  if (dbError) {
    console.error("Error adding hero image:", dbError);
    throw new Error("Failed to add hero image");
  }

  revalidatePath("/admin/dashboard/hero");
  revalidatePath("/");
}

export async function deleteHeroImage(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 1. Fetch the image URL before deleting the row
  const { data: rowData, error: fetchError } = await supabase
    .from("hero_images")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError || !rowData) {
    console.error("Error fetching hero image to delete:", fetchError);
    throw new Error("Failed to find hero image");
  }

  // 2. Delete the physical file from Supabase Storage
  const imageUrl = rowData.image_url;
  if (imageUrl) {
    // Extract the filename (everything after the last slash)
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([fileName]);
      
      if (storageError) {
        console.error("Error removing file from storage:", storageError);
        throw new Error("Failed to delete file from storage. Did you run the SQL policy for Deletes?");
      }
    }
  }

  // 3. Delete the database row
  const { error } = await supabase
    .from("hero_images")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting hero image:", error);
    throw new Error("Failed to delete hero image");
  }

  revalidatePath("/admin/dashboard/hero");
  revalidatePath("/");
}

export async function toggleHeroImage(id: number, currentStatus: boolean) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("hero_images")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) {
    console.error("Error toggling hero image:", error);
    throw new Error("Failed to toggle hero image");
  }

  revalidatePath("/admin/dashboard/hero");
  revalidatePath("/");
}

export async function reorderHeroImage(id: number, direction: 'up' | 'down') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Fetch all images ordered by display_order
  const { data: images } = await supabase
    .from("hero_images")
    .select("id, display_order")
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  if (!images) return;

  const currentIndex = images.findIndex(img => img.id === id);
  if (currentIndex === -1) return;

  if (direction === 'up' && currentIndex > 0) {
    const temp = images[currentIndex];
    images[currentIndex] = images[currentIndex - 1];
    images[currentIndex - 1] = temp;
  } else if (direction === 'down' && currentIndex < images.length - 1) {
    const temp = images[currentIndex];
    images[currentIndex] = images[currentIndex + 1];
    images[currentIndex + 1] = temp;
  } else {
    return; // Already at the top/bottom
  }

  // Update all items with their new normalized index
  for (let i = 0; i < images.length; i++) {
    if (images[i].display_order !== i) {
      await supabase
        .from("hero_images")
        .update({ display_order: i })
        .eq("id", images[i].id);
    }
  }

  revalidatePath("/admin/dashboard/hero");
  revalidatePath("/");
}
