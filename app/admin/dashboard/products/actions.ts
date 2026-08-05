"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addProduct(formData: FormData) {
  const supabase = await createClient();

  // Protect the route
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const sku = formData.get("sku") as string;
  const description = formData.get("description") as string;
  const brand = formData.get("brand") as string;
  const stock_quantity = parseInt((formData.get("stock_quantity") as string) || "0", 10);
  const is_featured = formData.get("is_featured") === "true";

  const imageFile = formData.get("image") as File;
  const additionalImageFiles = formData.getAll("additional_images") as File[];

  if (!imageFile || imageFile.size === 0) {
    throw new Error("No main image file provided");
  }

  // Upload main image
  const fileExt = imageFile.name.split('.').pop();
  const primaryFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('product_images')
    .upload(primaryFileName, imageFile, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    console.error("Error uploading product image:", uploadError);
    throw new Error("Failed to upload primary product image");
  }

  const { data: { publicUrl: primaryUrl } } = supabase.storage
    .from('product_images')
    .getPublicUrl(primaryFileName);

  // Upload additional images
  const additionalUrls: string[] = [];
  for (const file of additionalImageFiles) {
    if (file && file.size > 0) {
      const ext = file.name.split('.').pop();
      const auxFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { error: auxUploadError } = await supabase.storage
        .from('product_images')
        .upload(auxFileName, file, { cacheControl: '3600', upsert: false });
      
      if (!auxUploadError) {
        const { data: { publicUrl } } = supabase.storage.from('product_images').getPublicUrl(auxFileName);
        additionalUrls.push(publicUrl);
      }
    }
  }

  const { error } = await supabase
    .from("products")
    .insert([{ 
      name, 
      price, 
      category, 
      sku, 
      description, 
      brand, 
      stock_quantity, 
      is_featured,
      image_url: primaryUrl, 
      additional_images: additionalUrls 
    }]);

  if (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }

  revalidatePath("/admin/dashboard/products");
  // Also revalidate public pages if we had them hooked up to DB
  revalidatePath("/categories");
}

export async function deleteProduct(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 1. Fetch image URL before deleting
  const { data: rowData } = await supabase
    .from("products")
    .select("image_url, additional_images")
    .eq("id", id)
    .single();

  if (rowData) {
    const fileNamesToDelete: string[] = [];
    
    if (rowData.image_url) {
      const fileName = rowData.image_url.substring(rowData.image_url.lastIndexOf('/') + 1);
      if (fileName) fileNamesToDelete.push(fileName);
    }
    
    if (rowData.additional_images && Array.isArray(rowData.additional_images)) {
      rowData.additional_images.forEach((url: string) => {
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        if (fileName) fileNamesToDelete.push(fileName);
      });
    }

    if (fileNamesToDelete.length > 0) {
      const { data, error: storageError } = await supabase.storage
        .from('product_images')
        .remove(fileNamesToDelete);
      
      if (storageError) {
        console.error("Error removing files from storage:", storageError);
        throw new Error("Failed to delete files from storage.");
      }
      if (!data || data.length === 0) {
        console.error("Files not found or permission denied. files:", fileNamesToDelete);
        throw new Error("Failed to delete files from storage. Permission denied or files not found.");
      }
    }
  }

  // 2. Delete database row
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }

  revalidatePath("/admin/dashboard/products");
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = parseInt(formData.get("id") as string, 10);
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const sku = formData.get("sku") as string;
  const description = formData.get("description") as string;
  const brand = formData.get("brand") as string;
  const is_featured = formData.get("is_featured") === "true";

  const imageFile = formData.get("image") as File | null;
  const additionalImageFiles = formData.getAll("additional_images") as File[];

  const updateData: any = {
    name, price, category, sku, description, brand, is_featured
  };

  // If a new main image was provided, upload it and update image_url
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const primaryFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('product_images')
      .upload(primaryFileName, imageFile, { cacheControl: '3600', upsert: false });
      
    if (!uploadError) {
      const { data: { publicUrl: primaryUrl } } = supabase.storage
        .from('product_images')
        .getPublicUrl(primaryFileName);
      updateData.image_url = primaryUrl;
    }
  }

  // Handle additional images if provided
  const validAdditional = additionalImageFiles.filter(f => f.size > 0);
  if (validAdditional.length > 0) {
    const additionalUrls: string[] = [];
    for (const file of validAdditional) {
      const ext = file.name.split('.').pop();
      const auxFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { error: auxUploadError } = await supabase.storage
        .from('product_images')
        .upload(auxFileName, file, { cacheControl: '3600', upsert: false });
        
      if (!auxUploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('product_images')
          .getPublicUrl(auxFileName);
        additionalUrls.push(publicUrl);
      }
    }
    // Note: This replaces existing additional images. If you want to append, you'd need to fetch existing first.
    updateData.additional_images = additionalUrls;
  }

  const { error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }

  revalidatePath("/admin/dashboard/products");
  revalidatePath("/categories");
}
