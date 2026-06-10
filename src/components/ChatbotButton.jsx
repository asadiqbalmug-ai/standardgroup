import React, { useState } from 'react'

export default function ChatbotButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-[#A58B62] flex items-center justify-center shadow-lg shadow-[#A58B62]/40 hover:scale-110 transition-all duration-300"
        aria-label="Chatbot"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[200] w-80 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
          <div className="bg-[#A58B62] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Standard Bot</p>
                <p className="text-white/70 text-[11px]">We reply within minutes</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#A58B62]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#A58B62] text-xs font-bold">S</span>
              </div>
              <div className="bg-[#F9F6F0] rounded-2xl rounded-tl-none px-4 py-3 text-[13px] text-[#444] leading-relaxed">
                Hi there! Welcome to Standard Group. How can we help you today?
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Request a Quote', href: 'https://wa.me/971504654613' },
                { label: 'View Products', href: '/#categories' },
                { label: 'Call Us Now', href: 'tel:+971555599508' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="block w-full text-center px-4 py-2.5 rounded-xl border border-[#A58B62]/20 text-[#A58B62] text-sm font-medium hover:bg-[#A58B62] hover:text-white transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="px-5 py-3 border-t border-black/5 text-center">
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="text-[#A58B62] text-xs font-medium hover:underline">
              Or chat with us on WhatsApp →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
