import "./Filters.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const Filters = () => {
  //   let searchURLAlbum = urlAlbum?.split(",");
  //   let searchURLArtist = urlArtist?.split(",");
  //   let [allAlbums, setAllAlbums] = useState([]);
  return (
    <>
      <section className="filters">
        <div className="filters__input">
          <Select
            placeholder="Select Samagam"
            closeMenuOnSelect={true}
            components={animatedComponents}
            // defaultValue={
            //   urlAlbum
            //     ? searchURLAlbum.map((album) => {
            //         return { label: album, value: album };
            //       })
            //     : []
            // }
            defaultValue=""
            isMulti
            // options={allAlbums}
            // onChange={(event) => handleAlbumFilter(event)}
          />
        </div>
        <div className="filters__input">
          <Select
            closeMenuOnSelect={true}
            placeholder="Select Sevadar"
            components={animatedComponents}
            // defaultValue={
            //   urlArtist
            //     ? searchURLArtist.map((artist) => {
            //         return { label: artist, value: artist };
            //       })
            //     : []
            // }
            defaultValue=""
            isMulti
            // options={allArtists}
            // onChange={(event) => handleArtistFilter(event)}
            className="filters__input"
          />
        </div>
      </section>
    </>
  );
};

export default Filters;
