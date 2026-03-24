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

const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window;

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  const hasQuiz = quizData.some(q => q.lessonId === lesson.id);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(isMobile);

  const outerRef    = useRef<HTMLDivElement>(null);
  const vimeoRef1   = useRef<HTMLIFrameElement>(null);
  const vimeoRef2   = useRef<HTMLIFrameElement>(null);
  const vimeoRef3   = useRef<HTMLIFrameElement>(null);
  const vimeoRef4   = useRef<HTMLIFrameElement>(null);
  const vimeoRef5   = useRef<HTMLIFrameElement>(null);
  const vimeoRef6   = useRef<HTMLIFrameElement>(null);
  const vimeoRef7   = useRef<HTMLIFrameElement>(null);
  const htmlVideoRef = useRef<HTMLVideoElement>(null);
  const playerRef   = useRef<any>(null);
  const hasEndedRef = useRef(false);

  // ── Fullscreen helpers (mobile only) ───────────────────────────────────
  const enterFs = () => {
    const el = outerRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        playerRef.current?.requestFullscreen?.().catch(() => {});
      });
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else {
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

  // ── Fullscreen change listener (mobile + desktop) ─────────────────────
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
      exitFs();
    };
  }, []);


  // ── Scroll lock + orientation fix (mobile only) ───────────────────────
  useEffect(() => {
    if (!isMobile) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    const onOrientationChange = () => { window.scrollTo(0, 0); };
    window.addEventListener('orientationchange', onOrientationChange);
    window.addEventListener('resize', onOrientationChange);
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('orientationchange', onOrientationChange);
      window.removeEventListener('resize', onOrientationChange);
    };
  }, []);

  // ── Vimeo Player API setup ─────────────────────────────────────────────
  useEffect(() => {
    const refs = [vimeoRef1, vimeoRef2, vimeoRef3, vimeoRef4, vimeoRef5, vimeoRef6, vimeoRef7];
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
          setTimeout(() => {
            if (isMobile) {
              exitFs();
            } else {
              player.exitFullscreen().catch(() => {});
            }
            setVideoEnded(true);
          }, 2000);
        };

        player.on('ended', handleEnd);
        player.on('timeupdate', async (d: any) => {
          if (d.percent >= 0.99 && !hasEndedRef.current) {
            const dur = await player.getDuration();
            const cur = await player.getCurrentTime();
            if (dur - cur < 1) handleEnd();
          }
        });

        // Desktop: use Vimeo's own fullscreen once player is ready
        if (!isMobile) {
          player.ready().then(() => {
            player.requestFullscreen().catch(() => {});
          });
        }
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

  const handleClose = () => {
    if (isMobile) exitFs();
    onClose();
  };

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
    if (isMobile) enterFs();
  };

  // ── Vimeo iframe URLs ──────────────────────────────────────────────────
  // Desktop: no playsinline (matches pre-Friday original)
  // Mobile: playsinline=1 so video plays inline before fullscreen overlay
  const vimeoSrc = (id: string) => isMobile
    ? `https://player.vimeo.com/video/${id}?badge=0&autopause=0&autoplay=1&playsinline=1`
    : `https://player.vimeo.com/video/${id}?badge=0&autopause=0&autoplay=1`;

  const iframeAllow =
    'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';

  // ── Shared video content ───────────────────────────────────────────────
  const renderVimeoDesktop = (ref: React.RefObject<HTMLIFrameElement>, id: string, title: string) => (
    <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
      <iframe
        ref={ref}
        src={vimeoSrc(id)}
        frameBorder="0"
        allowFullScreen
        allow={iframeAllow}
        style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
        title={title}
      />
    </div>
  );

  const renderVimeoMobile = (ref: React.RefObject<HTMLIFrameElement>, id: string, title: string) => (
    <iframe
      ref={ref}
      src={vimeoSrc(id)}
      title={title}
      frameBorder="0"
      allow={iframeAllow}
      style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
    />
  );

  // ══════════════════════════════════════════════════════════════════
  // MOBILE: Full-screen takeover (new Friday behavior)
  // ══════════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <div ref={outerRef} className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center" style={{height: '100dvh'}}>

        {/* X button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 bg-black bg-opacity-70 border-2 border-white border-opacity-60 text-white rounded-full w-12 h-12 flex items-center justify-center"
          aria-label="Schließen"
        >
          <X size={26} />
        </button>

        {/* Video */}
        <div className="w-full relative">
          <div className="aspect-video w-full relative bg-black">

            {lesson.id === 1 ? renderVimeoMobile(vimeoRef1, '1172528318', 'Intro')
            : lesson.id === 2 ? renderVimeoMobile(vimeoRef2, '1172528646', 'Kohlenhydrate')
            : lesson.id === 3 ? renderVimeoMobile(vimeoRef3, '1172530056', 'Fette')
            : lesson.id === 4 ? renderVimeoMobile(vimeoRef4, '1148007412', 'Proteine')
            : lesson.id === 5 ? renderVimeoMobile(vimeoRef5, '1174041123', 'Mikronährstoffe')
            : lesson.id === 6 ? renderVimeoMobile(vimeoRef6, '1174040953', 'Unterwelt')
            : lesson.id === 7 ? renderVimeoMobile(vimeoRef7, '1174139522', 'Outro')
            : (
              <video
                ref={htmlVideoRef}
                controls
                playsInline
                autoPlay
                className="absolute inset-0 w-full h-full"
                preload="auto"
                onEnded={() => { setTimeout(() => { exitFs(); setVideoEnded(true); }, 2000); }}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
              </video>
            )}

            {/* Vollbild-Overlay */}
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

            {/* Replay overlay */}
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

        {/* Film abschließen */}
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

  // ══════════════════════════════════════════════════════════════════
  // DESKTOP: Original pre-Friday modal (with auto-fullscreen)
  // ══════════════════════════════════════════════════════════════════
  return (
    <div ref={outerRef} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-navy-light rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
          <button
            onClick={() => { exitFs(); onClose(); }}
            className="text-gray-400 hover:text-white p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-800 aspect-video relative">
            {lesson.id === 1 ? renderVimeoDesktop(vimeoRef1, '1172528318', 'Intro')
            : lesson.id === 2 ? renderVimeoDesktop(vimeoRef2, '1172528646', 'Kohlenhydrate')
            : lesson.id === 3 ? renderVimeoDesktop(vimeoRef3, '1172530056', 'Fette')
            : lesson.id === 4 ? renderVimeoDesktop(vimeoRef4, '1148007412', 'Proteine')
            : lesson.id === 5 ? renderVimeoDesktop(vimeoRef5, '1174041123', 'Mikronährstoffe')
            : lesson.id === 6 ? renderVimeoDesktop(vimeoRef6, '1174040953', 'Unterwelt')
            : lesson.id === 7 ? renderVimeoDesktop(vimeoRef7, '1174139522', 'Outro')
            : (
              <video
                controls
                className="w-full h-full object-cover"
                preload="auto"
                playsInline
                autoPlay
                ref={htmlVideoRef}
                onEnded={() => { setTimeout(() => setVideoEnded(true), 2000); }}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
            )}

            {/* Replay overlay */}
            {videoEnded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <button
                  onClick={handleReplay}
                  className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-6 py-3 transition-colors shadow-lg"
                >
                  <span className="font-medium">Video wiederholen</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onComplete}
            className="px-8 py-3 text-lg bg-green-custom text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <CheckCircle size={24} />
            {lesson.id === 1 ? 'Intro abschließen' : 'Film abschließen'}
          </button>
        </div>
      </div>
    </div>
  );
}
