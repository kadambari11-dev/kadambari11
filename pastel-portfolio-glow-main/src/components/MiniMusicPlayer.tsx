import React, { useEffect, useRef, useState } from "react";
import { Music, X, Minimize2 } from "lucide-react";

type Props = {
  children?: React.ReactNode;
};

const MiniMusicPlayer: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  // indicates a local playing state — toggled on first iframe click or by controls
  const [isPlaying, setIsPlaying] = useState(false);
  // overlay captures the first click on the iframe (since clicks inside iframe don't bubble)
  const [overlayActive, setOverlayActive] = useState(true);
  const playerRef = useRef<HTMLDivElement | null>(null);

  // close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // click outside to close (when expanded)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (playerRef.current && !playerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  if (hidden) {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      {/* Floating player */}
      <div
        ref={playerRef}
        aria-hidden={false}
        className={`fixed right-6 bottom-6 z-[60] flex items-end pointer-events-auto select-none sm:right-8 sm:bottom-8`}
      >
        {/* expanded card */}
        <div
          className={`relative w-[320px] max-w-[92vw] rounded-2xl bg-card/80 backdrop-blur-md border border-border/40 p-3 shadow-[var(--shadow-card)] transition-transform duration-200 ease-out transform origin-bottom-right ${
            open ? "translate-y-0 scale-100" : "translate-y-6 scale-95 opacity-0 pointer-events-none"
          } sm:w-[360px]`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/60 flex items-center justify-center shrink-0 relative">
              {/* Lightweight album placeholder icon */}
              <Music className="w-6 h-6 text-primary/90" />
              {isPlaying && (
                <span
                  aria-hidden
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-400 ring-2 ring-white/50 animate-pulse"
                  title="Playing"
                />
              )}
            </div>

            

            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                aria-label="Minimize player"
                title="Minimize"
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-muted/30 transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-foreground" />
              </button>

              <button
                aria-label="Close player"
                title="Close"
                onClick={() => setHidden(true)}
                className="p-1 rounded-md hover:bg-muted/30 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          <div className="mt-3 rounded-lg overflow-hidden border border-border/30 relative">
            {/* responsive spotify embed */}
            <iframe
              src={"https://open.spotify.com/embed/track/3iBgrkexCzVuPy4O9vx7Mf?utm_source=generator"}
              title="Spotify Player"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen={true}
              loading="lazy"
              className="w-full h-[86px] sm:h-[110px] bg-transparent"
              style={{ borderRadius: 12 }}
            />
            {/* overlay to capture the first click inside the iframe and mark playing */}
            {overlayActive && (
              <button
                aria-label="Start playback in Spotify embed"
                title="Start playback"
                onClick={() => {
                  // mark playing locally and then let iframe be interactive
                  setIsPlaying(true);
                  setOverlayActive(false);
                }}
                className="absolute inset-0 z-[20] bg-transparent border-0 cursor-pointer"
              />
            )}
          </div>

          <div className="mt-2 text-xs text-muted-foreground text-right flex items-center justify-end gap-2">
            <div className="text-xs text-muted-foreground">Tip: click the album area to open Spotify controls</div>
            <div className="flex items-center gap-2">
              <button
                aria-pressed={isPlaying}
                aria-label={isPlaying ? "Pause playback" : "Mark as playing"}
                title={isPlaying ? "Pause" : "Play"}
                onClick={() => setIsPlaying((p) => !p)}
                className="p-1 rounded-md hover:bg-muted/20 transition-colors"
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3.9v16.2L19 12 5 3.9z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* minimized button */}
        <div className={`ml-3 ${open ? "opacity-0 pointer-events-none" : "opacity-100 relative"}`}>
          <button
            aria-label="Open Spotify player"
            title="Open Spotify player"
            onClick={() => setOpen(true)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/95 to-accent/70 text-white shadow-[var(--shadow-glow)] hover:scale-105 transition-transform duration-150 focus:outline-none ring-0"
          >
            {/* Spotify logo (white) */}
            <svg
              className="w-8 h-8 object-contain text-white"
              viewBox="0 0 168 168"
              xmlns="http://www.w3.org/2000/svg"
              
            >
              <path fill="currentColor" d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.1 121.6c-1.8 2.9-5.7 3.9-8.6 2.1-23.5-14.3-53-17.4-87.8-8-3.2.9-6.7-1-.7-3.1 36.7-14.8 68-11.4 94.5 9C123.4 121.1 126.4 123.4 122.1 126.6zm9.9-19.9c-2.2 3.6-6.8 4.8-10.3 2.6-27-16.5-68.2-21.3-100.5-9.8-3.6 1.2-7.1-.8-3-3.4 36.8-20.2 84.6-15.5 116.8 11.7 2.5 2.1 3.8 4.9 0 6.3zM130 48.2c-33.2-21.5-88.9-23.6-120.2-10.9-4 .2-3.4-1.9-.7-3.7C31.6 21 81.3 19.1 118 34.8c3.6 2 4.7 4.9 12 4.6 2.6 0 6-.1 0 8.8z" />
            </svg>
            {/* pulsing ring when playing */}
            {isPlaying && (
              <span aria-hidden className="absolute -inset-1 z-10 rounded-full bg-transparent">
                <span className="absolute inset-0 rounded-full animate-ping" style={{ boxShadow: "0 0 18px rgba(29,185,84,0.6)" }} />
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniMusicPlayer;
