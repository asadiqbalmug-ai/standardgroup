"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function uploadVideo(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const videoFile = formData.get("video") as File;

  if (!videoFile || videoFile.size === 0) {
    throw new Error("No video file provided");
  }

  // Generate a unique file name
  const fileExt = videoFile.name.split('.').pop();
  const fileName = `homepage-${Date.now()}.${fileExt}`;
  
  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('videos')
    .upload(fileName, videoFile, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    console.error("Error uploading video:", uploadError);
    throw new Error("Failed to upload video");
  }

  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);

  // Clear existing video rows (we only want one)
  const { data: existingRows } = await supabase.from('homepage_video').select('id, video_url');
  
  if (existingRows && existingRows.length > 0) {
    // Optionally delete old video files from storage
    for (const row of existingRows) {
      const oldFileName = row.video_url.substring(row.video_url.lastIndexOf('/') + 1);
      if (oldFileName) {
        await supabase.storage.from('videos').remove([oldFileName]);
      }
    }
    // Delete old records
    await supabase.from('homepage_video').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // delete all
  }

  // Insert the new video URL
  const { error } = await supabase
    .from("homepage_video")
    .insert([{ video_url: publicUrl }]);

  if (error) {
    console.error("Error saving video to database:", error);
    throw new Error("Failed to save video to database");
  }

  revalidatePath("/admin/dashboard/video");
  revalidatePath("/");
}

export async function deleteVideo(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: rowData } = await supabase
    .from("homepage_video")
    .select("video_url")
    .eq("id", id)
    .single();

  if (rowData?.video_url) {
    const fileName = rowData.video_url.substring(rowData.video_url.lastIndexOf('/') + 1);
    if (fileName) {
      await supabase.storage.from('videos').remove([fileName]);
    }
  }

  const { error } = await supabase
    .from("homepage_video")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting video:", error);
    throw new Error("Failed to delete video");
  }

  revalidatePath("/admin/dashboard/video");
  revalidatePath("/");
}
