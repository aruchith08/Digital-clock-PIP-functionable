import { useRef, useState, useEffect } from 'react';

interface PiPOptions {
  width: number;
  height: number;
}

export const usePiP = ({ width, height }: PiPOptions) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPiPActive, setIsPiPActive] = useState(false);

  // Initialize hidden video element
  useEffect(() => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.style.position = 'absolute';
    video.style.top = '-9999px';
    video.style.left = '-9999px';
    video.width = width;
    video.height = height;
    document.body.appendChild(video);
    videoRef.current = video;

    const onLeavePiP = () => {
      setIsPiPActive(false);
    };

    video.addEventListener('leavepictureinpicture', onLeavePiP);

    return () => {
      video.removeEventListener('leavepictureinpicture', onLeavePiP);
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    };
  }, [width, height]);

  const togglePiP = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      setIsPiPActive(false);
    } else {
      try {
        if (!video.srcObject) {
          const stream = canvas.captureStream(30); // 30 FPS
          video.srcObject = stream;
        }
        await video.play();
        await video.requestPictureInPicture();
        setIsPiPActive(true);
      } catch (err) {
        console.error("Failed to enter PiP mode:", err);
        alert("PiP mode failed to start. It might not be supported in this browser context.");
      }
    }
  };

  return { canvasRef, isPiPActive, togglePiP };
};