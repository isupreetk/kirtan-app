import "./AudioPlayer.scss";

const AudioPlayer = () => {

    // { selectedKirtan, play, setPlay }
  
  const handleAudioPlay = () => {
    // setPlay(true);
  };

  const handleAudioPause = () => {
    // setPlay(false);
 };

  return (
    <div className="audioplayer">
      <figure className="figure">

        {/* <figcaption>Listening to: {selectedKirtan.Title}</figcaption>
        <audio
          id="audio"
          controls
          autoPlay
          src={selectedKirtan.cdnpath}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
        >
          <a href={selectedKirtan.cdnpath}> Download audio </a>
        </audio> */}
        <figcaption>Listening to: </figcaption>
        <audio
          id="audio"
          controls
          autoPlay
          src=""
        >
          <a href=""> Download audio </a>
        </audio>
      </figure>
    </div>
  );
}

export default AudioPlayer;
