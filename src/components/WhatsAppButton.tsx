const PHONE = "8801837692110";
const MESSAGE = "Hi DevdigitaX! I'd like to discuss a project.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-8 right-8 z-50 flex items-center gap-4"
    >
      <div className="relative hidden sm:block">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-background/80 backdrop-blur-xl border border-border/50 text-foreground shadow-2xl translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          How can we help?
        </span>
      </div>

      <div className="relative group/btn">
        {/* Outer Glow Ring */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-[#25D366] via-white to-[#128C7E] rounded-full opacity-20 group-hover/btn:opacity-100 blur-sm group-hover/btn:blur transition duration-1000 group-hover/btn:duration-200 animate-spin-slow" />

        {/* The Button */}
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_20px_50px_rgba(37,211,102,0.3)] transition-all duration-500 group-hover/btn:scale-110 group-hover/btn:-translate-y-1 group-active:scale-95"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          }}
        >
          {/* Internal Pulse */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover/btn:animate-ping-slow" />

          <svg viewBox="0 0 32 32" className="relative h-8 w-8 fill-current drop-shadow-lg" aria-hidden="true">
            <path d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.47-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16.02 5.33C9.94 5.33 5 10.27 5 16.34c0 1.94.51 3.83 1.47 5.49L5 27.33l5.66-1.48a10.99 10.99 0 0 0 5.36 1.37h.01c6.07 0 11.01-4.94 11.01-11.01 0-2.94-1.15-5.71-3.23-7.79a10.94 10.94 0 0 0-7.79-3.09zm0 20.21h-.01a9.13 9.13 0 0 1-4.66-1.28l-.33-.2-3.36.88.9-3.27-.22-.34a9.18 9.18 0 0 1-1.41-4.9c0-5.07 4.13-9.2 9.2-9.2 2.46 0 4.77.96 6.5 2.7a9.13 9.13 0 0 1 2.69 6.51c0 5.07-4.13 9.2-9.3 9.2z" />
          </svg>

          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg border-2 border-white ring-1 ring-red-500 animate-bounce">
            1
          </span>
        </div>
      </div>
    </a>
  );
}
