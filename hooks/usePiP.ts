import { useRef, useState, useCallback, useEffect } from 'react';

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

  const draw = useCallback((mainText: string, subText: string, progress: number, activeColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0f172a'; // zen-bg
    ctx.fillRect(0, 0, width, height);

    // Progress Ring Background
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Progress Ring Active
    if (progress > 0) {
      const startAngle = -0.5 * Math.PI;
      const endAngle = (2 * Math.PI * progress) - 0.5 * Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Text Main
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 80px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mainText, centerX, centerY - 15);

    // Text Sub
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 30px "Inter"';
    ctx.fillText(subText, centerX, centerY + 40);

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

  return { canvasRef, isPiPActive, togglePiP, draw };
};