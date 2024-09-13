import { BiPause, BiPlay } from "react-icons/bi";
import { GrNext, GrPrevious } from "react-icons/gr";

interface IAudioControls {
  onPlayPauseClick: (value: boolean) => void;
  isPlaying: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const AudioControls = ({
  onPlayPauseClick,
  isPlaying,
  onPrevClick,
  onNextClick,
}: IAudioControls) => (
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <GrPrevious />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <BiPause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <BiPlay />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <GrNext />
    </button>
  </div>
);

export default AudioControls;
