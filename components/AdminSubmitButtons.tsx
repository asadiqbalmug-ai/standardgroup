"use client";

import { useFormStatus } from "react-dom";
import { Trash2, ArrowUp, ArrowDown, CheckCircle, XCircle } from "lucide-react";

export function SubmitBannerButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#1b1b1b] hover:bg-black disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition-colors mt-2 text-sm flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Saving Banner...
        </>
      ) : (
        "Save Banner"
      )}
    </button>
  );
}

export function SubmitProductButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#1b1b1b] hover:bg-black disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition-colors mt-2 text-sm flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Saving Product...
        </>
      ) : (
        "Save Product"
      )}
    </button>
  );
}

export function ReorderButton({ direction }: { direction: 'up' | 'down' }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="text-gray-400 hover:text-[#1b1b1b] disabled:opacity-30 transition-colors p-1" 
      title={`Move ${direction}`}
    >
      {pending ? (
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      ) : direction === 'up' ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      )}
    </button>
  );
}

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="text-[#bf5e42] hover:text-[#b55239] hover:bg-[#bf5e42]/10 disabled:opacity-30 disabled:hover:bg-transparent p-2 rounded-lg transition-colors" 
      title="Delete"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </button>
  );
}

export function ToggleActiveButton({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors disabled:opacity-50 ${isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`} 
      title="Click to toggle status"
    >
      {pending ? (
        <><div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> Updating...</>
      ) : isActive ? (
        <><CheckCircle className="w-3.5 h-3.5" /> Active</>
      ) : (
        <><XCircle className="w-3.5 h-3.5" /> Inactive</>
      )}
    </button>
  );
}

export function SubmitBrandButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#1b1b1b] hover:bg-black disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition-colors mt-2 text-sm flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Saving Brand...
        </>
      ) : (
        "Save Brand"
      )}
    </button>
  );
}

export function SubmitCategoryButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#1b1b1b] hover:bg-black disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition-colors mt-2 text-sm flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Saving Category...
        </>
      ) : (
        "Save Category"
      )}
    </button>
  );
}

export function ToggleTopCategoryButton({ isTopCategory }: { isTopCategory: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-50 ${
        isTopCategory 
          ? "bg-[#bf5e42]/10 text-[#bf5e42] hover:bg-[#bf5e42]/20" 
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {pending ? (
        "Updating..."
      ) : isTopCategory ? (
        <>★ Top Category</>
      ) : (
        <>☆ Standard</>
      )}
    </button>
  );
}

export function SubmitVideoButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#1b1b1b] hover:bg-black disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition-colors mt-2 text-sm flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Uploading Video... (This may take a minute)
        </>
      ) : (
        "Upload Video"
      )}
    </button>
  );
}
