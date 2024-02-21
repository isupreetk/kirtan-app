import "./KirtanList.scss";
import { Row } from "react-bootstrap";
import PlayIcon from "../../assets/images/play-icon.png";
import PauseIcon from "../../assets/images/pause-icon.png";
import DownloadIcon from "../../assets/images/download-icon.png";
import {Kirtans} from "../../models/KirtansInterface";

interface KirtanListProps {
    searchTerm : string;
    displayKirtans : Kirtans[];
    isLoading : boolean;
    error : null;
    albumFilter : string[];
    setAlbumFilter : (albumFilter : string[]) => void;
    artistFilter : string[];
    setArtistFilter : (artistFilter : string[]) => void;
    allAlbums : readonly ({ label: string; value: string; })[];
    allArtists : readonly ({ label: string; value: string; })[];
    handleAlbumFilter : (event: readonly { label: string; value: string; }[]) => void;
    handleArtistFilter : (event: readonly { label: string; value: string; }[]) => void;
    selectedKirtan : Kirtans | never[];
    setSelectedKirtan : (kirtan : Kirtans | never[]) => void;
    play : boolean;
    setPlay : (play : boolean) => void;
    togglePlay : (selectedKirtan : Kirtans) => void;
}


const KirtanList : React.FC<KirtanListProps> = ({
  searchTerm,
  displayKirtans,
  isLoading,
  error,
  albumFilter,
  setAlbumFilter,
  artistFilter,
  setArtistFilter,
  allAlbums,
  allArtists,
  handleAlbumFilter,
  handleArtistFilter,
  selectedKirtan,
  setSelectedKirtan,
  play,
  setPlay,
  togglePlay,
}) => {
  if (isLoading) {
    return <h2>...Loading</h2>;
  }

  const handleKirtanClick = (kirtan : Kirtans) : void => {
    if (selectedKirtan === kirtan) {
      let player = document.getElementById("audio") as HTMLAudioElement;
      play === true ? player.pause() : player.play();
    } else {
      setSelectedKirtan(kirtan);
    }
  };

  const downloadFile = (url : string, filename : string) : void => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  }

  return (
    <section className="kirtan-list__container">
      {displayKirtans.map((kirtan : Kirtans) => {
        if (!kirtan.hTitle) kirtan.hTitle = kirtan.Title;
        if (!kirtan.hSevadar) kirtan.hSevadar = kirtan.Sevadar;
        if (!kirtan.hAlbum) kirtan.hAlbum = kirtan.Album;
        return (
          <Row key={kirtan.aid}>
            <div className="kirtan-list-item">
              <div className="kirtan-list-item__wrapper">
                <div className="kirtan-list-item__container1">
                  <div className="kirtan-list-item__avatar">
                    {kirtan.Sevadar.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div
                  className="kirtan-list-item__container2"
                  onClick={() => handleKirtanClick(kirtan)}
                >
                  <p
                    className="kirtan-list-item__title"
                    dangerouslySetInnerHTML={{
                      __html: kirtan.hTitle,
                    }}
                  />
                  <p className="kirtan-list-item__details">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kirtan.hSevadar,
                      }}
                    />
                    <span>, </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: kirtan.hAlbum,
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="kirtan-list-item__container3">
                {play !== true || selectedKirtan !== kirtan ? (
                  <p onClick={() => handleKirtanClick(kirtan)}>
                    <img
                      src={PlayIcon}
                      alt="play button"
                      className="button button__play"
                    />
                  </p>
                ) : (
                  <p onClick={() => handleKirtanClick(kirtan)}>
                    <img
                      src={PauseIcon}
                      alt="pause button"
                      className="button button__pause"
                    />
                  </p>
                )}
                <a
                  href={kirtan.cdnpath}
                  download={kirtan.filename}
                  type="application/octet-stream"
                //   disposition="attachment"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-downloadurl={`application/octet-stream:${kirtan.filename}:blob:${kirtan.cdnpath}`}
                  onClick={() => downloadFile(kirtan.cdnpath, kirtan.filename)}
                >
                  <img
                    src={DownloadIcon}
                    alt="download button"
                    className="button button__download"
                  />
                </a>
              </div>
            </div>
          </Row>
        );
      })}
    </section>
  );
}

export default KirtanList;
