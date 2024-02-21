import "./Filters.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

interface FiltersProps {
  allAlbums : readonly ({ label: string; value: string; })[];
  handleAlbumFilter: (event: readonly { label: string; value: string; }[]) => void;
  allArtists : readonly ({ label: string; value: string; })[];
  handleArtistFilter: (event: readonly { label: string; value: string; }[]) => void;
  urlAlbum : string | null;
  urlArtist : string | null;
}

const Filters : React.FC<FiltersProps> = ({ allAlbums, handleAlbumFilter, allArtists, handleArtistFilter, urlAlbum, urlArtist }) => {
  
    let searchURLAlbum : string[] | undefined = urlAlbum?.split(",");
    let searchURLArtist : string[] | undefined = urlArtist?.split(",");
  return (
    <>
      <section className="filters">
        <div className="filters__input">
          <Select
            placeholder="Select Samagam"
            closeMenuOnSelect={true}
            components={animatedComponents}
            defaultValue={
              urlAlbum
                ? searchURLAlbum?.map((album) => {
                    return { label: album, value: album };
                  })
                : []
            }
            // defaultValue=""
            isMulti
            options={allAlbums}
            onChange={(event) => handleAlbumFilter(event)}
          />
        </div>
        <div className="filters__input">
          <Select
            closeMenuOnSelect={true}
            placeholder="Select Sevadar"
            components={animatedComponents}
            defaultValue={
              urlArtist
                ? searchURLArtist?.map((artist) => {
                    return { label: artist, value: artist };
                  })
                : []
            }
            // defaultValue=""
            isMulti
            options={allArtists}
            onChange={(event) => handleArtistFilter(event)}
            className="filters__input"
          />
        </div>
      </section>
    </>
  );
};

export default Filters;
