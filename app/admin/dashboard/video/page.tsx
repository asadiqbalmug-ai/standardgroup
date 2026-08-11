import { createClient } from "@/utils/supabase/server";
import { uploadVideo, deleteVideo } from "./actions";
import { Video, Trash2, UploadCloud } from "lucide-react";
import { SubmitVideoButton } from "@/components/AdminSubmitButtons";

export default async function VideoManager() {
  const supabase = await createClient();
  
  const { data: videos } = await supabase
    .from("homepage_video")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const currentVideo = videos && videos.length > 0 ? videos[0] : null;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2 flex items-center gap-3">
        <Video className="w-8 h-8 text-[#bf5e42]" />
        Homepage Video
      </h1>
      <p className="text-gray-500 mb-8">Upload the video that will be featured in the "Why Choose Us" section on the homepage. Max file size: 50MB.</p>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8">
        
        {currentVideo ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#111] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                Currently Live Video
              </h2>
              
              <form action={async () => {
                'use server'
                await deleteVideo(currentVideo.id)
              }}>
                <button type="submit" className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors flex items-center gap-2 text-sm font-bold">
                  <Trash2 className="w-4 h-4" />
                  Delete Video
                </button>
              </form>
            </div>
            
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner border border-gray-200">
              <video 
                src={currentVideo.video_url} 
                controls 
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              Uploading a new video below will automatically replace this one.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 mb-6">
            <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No video is currently uploaded.</p>
            <p className="text-xs text-gray-400 mt-1">The homepage will show the default placeholder image.</p>
          </div>
        )}

        <hr className="my-8 border-gray-100" />

        <h2 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-[#bf5e42]" />
          {currentVideo ? 'Replace Video' : 'Upload Video'}
        </h2>
        
        <form action={uploadVideo} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Select Video File (.mp4)</label>
            <input 
              required 
              type="file" 
              accept="video/mp4,video/x-m4v,video/*" 
              name="video" 
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#bf5e42]/10 file:text-[#bf5e42] hover:file:bg-[#bf5e42]/20 transition-colors" 
            />
            <p className="text-[10px] text-gray-400 mt-2">Make sure the video is compressed for web (under 50MB) for faster loading times.</p>
          </div>
          
          <div className="pt-2">
            <SubmitVideoButton />
          </div>
        </form>
      </div>
    </div>
  );
}
