import { useState, forwardRef, useEffect, ForwardedRef } from "react";

interface VideoProps {
  className?: string;
  src: string;
}

function VideoRef({ className, src }: VideoProps, ref: ForwardedRef<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    const videoRef: HTMLVideoElement | null = (ref as React.RefObject<HTMLVideoElement>)?.current;

    const handleVolumeChange = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && volume < 1) {
        setVolume((prevVolume) => Math.min(prevVolume + 0.1, 1));
      }

      if (event.key === "ArrowLeft" && volume > 0) {
        setVolume((prevVolume) => Math.max(prevVolume - 0.1, 0));
      }
    };

    if (videoRef) {
      videoRef.volume = volume;

      document.addEventListener("keydown", handleVolumeChange);
    }

    return () => {
      document.removeEventListener("keydown", handleVolumeChange);
    };
  }, [ref, volume]);

  useEffect(() => {
    const videoRef: HTMLVideoElement | null = (ref as React.RefObject<HTMLVideoElement>)?.current;
    console.log(videoRef);

    if (videoRef) {
      videoRef.load();

      const handlePlayPause = () => {
        setIsPlaying(!videoRef.paused);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(videoRef.currentTime);
      };

      videoRef.addEventListener("play", handlePlayPause);
      videoRef.addEventListener("pause", handlePlayPause);
      videoRef.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        videoRef.removeEventListener("play", handlePlayPause);
        videoRef.removeEventListener("pause", handlePlayPause);
        videoRef.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [ref, src]);

  return (
    <div className="flex-center w-80 h-fit bg-gray-bg border-2 mb-8 p-1">
      <div className="flex justify-between items-center text-sm bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end border-b-2 border-gray-bg border-0 w-full px-2">
        <div className="flex justify-start">
          <img className="w-5 h-5 mr-1" src="/assests/mediaPlayer.png" alt="media player" />
          <span className="pt-1">Windows Media Player</span>
        </div>
        <div className="border-b-black border-r-black border-2 w-4 h-4 shadow-md">
          <div className="flex-row-center bg-gray-bg w-3 h-3 text-black text-lg font-bold pb-0.5">X</div>
        </div>
      </div>

      <div className="flex justify-center bg-black w-full animate-slideFadeInVideo">
        <video ref={ref} className={`w-fit max-h-40vh ${className}`}>
          <source src={src} type="video/mp4" data-testid="video-element" />
        </video>
      </div>

      <div className="flex justify-between items-center py-2 bg-gray-bg w-full">
        <div className="flex justify-between items-center">
          <button
            className={`flex-row-center text-black font-extrabold w-6 h-6 pt-1 ${
              isPlaying ? "border-button-pushed" : ""
            }`}
          >
            ▶︎
          </button>
          <button
            className={`flex-row-center text-black font-extrabold w-6 h-6 tracking-extratight p-1 ${
              !isPlaying && currentTime !== 0 ? "border-button-pushed" : ""
            }`}
          >
            ||
          </button>
          <button
            className={`flex-row-center text-black font-extrabold w-6 h-6 ml-1 pt-1 ${
              !isPlaying && currentTime === 0 ? "border-button-pushed" : ""
            }`}
          >
            ■
          </button>
        </div>

        <div className="flex items-center">
          <img className="w-5 h-5" src="/assests/speaker.png" alt="volume" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            className="accent-gray-400 ml-2"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(VideoRef);

export default Video;
