const PHONE = "8801974527507";
const MESSAGE = "Hi DevdigitaX! I'd like to discuss a project.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="hidden sm:inline-flex opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-foreground shadow-lg">
        Chat with us
      </span>
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 10px 40px rgba(37, 211, 102, 0.5)",
        }}
      >
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
          style={{ background: "#25D366" }}
        />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current" aria-hidden="true">
          <path d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.47-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16.02 5.33C9.94 5.33 5 10.27 5 16.34c0 1.94.51 3.83 1.47 5.49L5 27.33l5.66-1.48a10.99 10.99 0 0 0 5.36 1.37h.01c6.07 0 11.01-4.94 11.01-11.01 0-2.94-1.15-5.71-3.23-7.79a10.94 10.94 0 0 0-7.79-3.09zm0 20.21h-.01a9.13 9.13 0 0 1-4.66-1.28l-.33-.2-3.36.88.9-3.27-.22-.34a9.18 9.18 0 0 1-1.41-4.9c0-5.07 4.13-9.2 9.2-9.2 2.46 0 4.77.96 6.5 2.7a9.13 9.13 0 0 1 2.69 6.51c0 5.07-4.13 9.2-9.3 9.2z" />
        </svg>
      </span>
    </a>
  );
}
