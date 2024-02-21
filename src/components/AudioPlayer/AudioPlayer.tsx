import { Kirtans } from "../../models/KirtansInterface";
import "./AudioPlayer.scss";

interface AudioPlayerProps {
   selectedKirtan: Kirtans | never[];
   play: boolean;
   setPlay : (play : boolean) => void
}

const AudioPlayer : React.FC<AudioPlayerProps> = ({ selectedKirtan, play, setPlay }) => {
  
  let selectedKirtanData = selectedKirtan as Kirtans;

  const handleAudioPlay = () => {
    setPlay(true);
  };

  const handleAudioPause = () => {
    setPlay(false);
 };

  return (
    <div className="audioplayer">
      <figure className="figure">
        <figcaption>Listening to: {selectedKirtanData.Title}</figcaption>
        <audio
          id="audio"
          controls
          autoPlay
          src={selectedKirtanData.cdnpath}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
        >
          <a href={selectedKirtanData.cdnpath}> Download audio </a>
        </audio>
      </figure>
    </div>
  );
}

export default AudioPlayer;
