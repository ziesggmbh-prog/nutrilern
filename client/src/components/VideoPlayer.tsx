import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { quizData } from '@/lib/quizData';

declare global {
  interface Window { Vimeo: { Player: any } }
}

interface VideoPlayerProps {
  lesson: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  const hasQuiz = quizData.some(q => q.lessonId === lesson.id);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Show overlay on touch devices so user tap triggers fullscreen
  const [overlayVisible, setOverlayVisible] = useState(() => 'ontouchstart' in window);

  const outerRef    = useRef<HTMLDivElement>(null);
  const vimeoRef1   = useRef<HTMLIFrameElement>(null);
  const vimeoRef2   = useRef<HTMLIFrameElement>(null);
  const vimeoRef3   = useRef<HTMLIFrameElement>(null);
  const vimeoRef4   = useRef<HTMLIFrameElement>(null);
  const htmlVideoRef = useRef<HTMLVideoElement>(null);
  const playerRef   = useRef<any>(null);   // Vimeo Player instance
  const hasEndedRef = useRef(false);

  // ── Fullscreen helpers ─────────────────────────────────────────────────
  const enterFs = () => {
    const el = outerRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        // Fallback for iOS: use Vimeo Player's own requestFullscreen
        // (internally calls webkitEnterFullscreen on the <video> element)
        playerRef.current?.requestFullscreen?.().catch(() => {});
      });
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else {
      // iOS Safari fallback via Vimeo Player API
      playerRef.current?.requestFullscreen?.().catch(() => {});
    }
  };

  const exitFs = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if ((document as any).webkitFullscreenElement) {
      (document as any).webkitExitFullscreen?.();
    }
  };

  // ── Track fullscreenchange events ──────────────────────────────────────
  useEffect(() => {
    const onChange = () => {
      const inFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(inFs);
      if (inFs) setOverlayVisible(false);
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      exitFs(); // always exit fullscreen when modal unmounts
    };
  }, []);

  // ── Vimeo Player API setup ─────────────────────────────────────────────
  useEffect(() => {
    const refs = [vimeoRef1, vimeoRef2, vimeoRef3, vimeoRef4];
    const iframeRef = refs[lesson.id - 1];
    if (!iframeRef) return;

    const setup = () => {
      if (typeof window.Vimeo === 'undefined') { setTimeout(setup, 100); return; }
      if (!iframeRef.current) return;
      try {
        const player = new window.Vimeo.Player(iframeRef.current);
        playerRef.current = player;

        const handleEnd = () => {
          if (hasEndedRef.current) return;
          hasEndedRef.current = true;
          setVideoEnded(true);
          // Exit native fullscreen → user sees "Film abschließen" button
          exitFs();
        };

        player.on('ended', handleEnd);
        player.on('timeupdate', async (d: any) => {
          if (d.percent >= 0.99 && !hasEndedRef.current) {
            const dur = await player.getDuration();
            const cur = await player.getCurrentTime();
            if (dur - cur < 1) handleEnd();
          }
        });
      } catch (_) {}
    };
    setup();
  }, [lesson.id]);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleOverlayTap = () => {
    setOverlayVisible(false);
    enterFs();
    playerRef.current?.play?.().catch(() => {});
  };

  const handleClose = () => { exitFs(); onClose(); };

  const handleReplay = async () => {
    setVideoEnded(false);
    hasEndedRef.current = false;
    if (lesson.id <= 4 && playerRef.current) {
      try {
        await playerRef.current.setCurrentTime(0);
        await playerRef.current.play();
      } catch (_) {}
    } else if (htmlVideoRef.current) {
      htmlVideoRef.current.currentTime = 0;
      htmlVideoRef.current.play();
    }
    enterFs();
  };

  // ── Vimeo iframe helpers ───────────────────────────────────────────────
  const vimeoSrc = (id: string) =>
    `https://player.vimeo.com/video/${id}?badge=0&autopause=0&autoplay=1&playsinline=1`;
  const iframeAllow =
    'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
  const iframeStyle: React.CSSProperties =
    { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div ref={outerRef} className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">

      {/* X – always on top-right, exits fullscreen + closes modal */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-30 bg-black bg-opacity-70 border-2 border-white border-opacity-60 text-white rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="Schließen"
      >
        <X size={26} />
      </button>

      {/* ── Video ── */}
      <div className="w-full relative">
        <div className="aspect-video w-full relative bg-black">

          {/* Vimeo embeds */}
          {lesson.id === 1 ? (
            <iframe ref={vimeoRef1} src={vimeoSrc('1172528318')} title="Intro"
              frameBorder="0" allow={iframeAllow} style={iframeStyle} />
          ) : lesson.id === 2 ? (
            <iframe ref={vimeoRef2} src={vimeoSrc('1172528646')} title="Kohlenhydrate"
              frameBorder="0" allow={iframeAllow} style={iframeStyle} />
          ) : lesson.id === 3 ? (
            <iframe ref={vimeoRef3} src={vimeoSrc('1172530056')} title="Fette"
              frameBorder="0" allow={iframeAllow} style={iframeStyle} />
          ) : lesson.id === 4 ? (
            <iframe ref={vimeoRef4} src={vimeoSrc('1148007412')} title="Proteine"
              frameBorder="0" allow={iframeAllow} style={iframeStyle} />
          ) : (
            /* HTML5 fallback */
            <video
              ref={htmlVideoRef}
              controls
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full"
              preload="auto"
              onEnded={() => { setVideoEnded(true); exitFs(); }}
            >
              <source src={lesson.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* ── Mobile overlay: "Tippen zum Starten" ─────────────────
               Shown on touch devices. Direct tap = user gesture = fullscreen works. */}
          {overlayVisible && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-40 cursor-pointer"
              onClick={handleOverlayTap}
            >
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-15 border-2 border-white border-opacity-70 flex items-center justify-center mb-4">
                <Play size={44} className="text-white ml-2" fill="white" />
              </div>
              <span className="text-white text-base font-semibold drop-shadow">Vollbild starten</span>
            </div>
          )}

          {/* ── Replay overlay ── */}
          {videoEnded && !overlayVisible && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
              <button
                onClick={handleReplay}
                className="bg-white bg-opacity-20 border border-white border-opacity-40 text-white rounded-lg px-6 py-3 flex items-center gap-2"
              >
                <RotateCcw size={20} />
                <span>Video wiederholen</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Film abschließen ── */}
      <div className="mt-6 px-4">
        <button
          onClick={onComplete}
          className="px-8 py-3 text-lg bg-green-custom text-white rounded-lg flex items-center gap-2"
        >
          <CheckCircle size={24} />
          {lesson.id === 1 ? 'Intro abschließen' : 'Film abschließen'}
        </button>
      </div>
    </div>
  );
}
