import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import toPascalCase from "../../utils";
import kirtansData from "../../assets/data/kirtanDataSet.json";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import KirtanList from "../../components/KirtanList/KirtanList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
// import PaginationComponent from "../../components/Pagination/Pagination";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import {Kirtans} from "../../models/KirtansInterface";

import "./HomePage.scss";

const HomePage : React.FC = () => {

    let kirtanData : Kirtans[] = kirtansData;
    // console.log("kirtanData", kirtanData);

    class Kirtan {
      aid : number;
      audcatid: number;
      artstid: number;
      Title: string;
      hTitle: string;
      Album: string;
      hAlbum: string;
      Sevadar: string;
      hSevadar: string;
      Titlefws: string;
      Duration: number;
      audiosize: number;
      audiopath: string;
      audio_year: number;
      filename: string;
      cdnpath: string;
      imgpath: string;
      status: number;
      createdon: string;
      Score: number;

         constructor ( aid: number,
          audcatid: number,
          artstid: number,
          Title: string,
          hTitle: string,
          Album: string,
          hAlbum: string,
          Sevadar: string,
          hSevadar: string,
          Titlefws: string,
          Duration: number,
          audiosize: number,
          audiopath: string,
          audio_year: number,
          filename: string,
          cdnpath: string,
          imgpath: string,
          status: number,
          createdon: string, 
          Score: number ) 
          {
          this.aid = aid;
          this.audcatid = audcatid;
          this.artstid = artstid;
          this.Title = Title;
          this.hTitle = hTitle;
          this.Album = Album;
          this.hAlbum = hAlbum;
          this.Sevadar = Sevadar;
          this.hSevadar = hSevadar;
          this.Titlefws = Titlefws;
          this.Duration = Duration;
          this.audiosize = audiosize;
          this.audiopath = audiopath;
          this.audio_year = audio_year;
          this.filename = filename;
          this.cdnpath = cdnpath;
          this.imgpath = imgpath;
          this.status = status;
          this.createdon = createdon;
          this.Score = Score;
        }
    }

    // TODO - remove these - this was just for initial testing
    // kirtansData.slice(0,5).forEach(k=>{
    //   console.log(new Kirtan(k.aid, k.audcatid, k.artstid, k.Title, k.Album, k.Sevadar, k.Titlefws, k.Duration, k.audiosize, k.audiopath, k.audio_year, k.filename, k.cdnpath, k.imgpath, k.status, k.createdon));
    // });   

  // let inputRef = useRef();
  let inputRef = useRef<HTMLInputElement | null>(null); 
  let navigate = useNavigate();

  let [searchParams, setSearchParams] : [URLSearchParams, Function] = useSearchParams();
  let urlAlbum : string | null = searchParams.get("urlAlbum");
  let urlArtist : string | null = searchParams.get("urlArtist");
  let urlSearchString : string | null = searchParams.get("urlSearchString");

  let [searchTerm, setSearchTerm] = useState(
    urlSearchString ? urlSearchString : ""
  );
  let [kirtans] = useState<Kirtans[]>(kirtansData);
  let [displayKirtans, setDisplayKirtans] = useState<Kirtans[]>([]);
  let [totalKirtans, setTotalKirtans] = useState<number>(kirtansData.length);
  let [allAlbums, setAllAlbums] = useState<{ label: string; value: string; }[]>([]);
  let [allArtists, setAllArtists] = useState<{ label: string; value: string; }[]>([]);
  let [albumFilter, setAlbumFilter] = useState<string[]>(urlAlbum ? urlAlbum.split(",") : []);
  let [artistFilter, setArtistFilter] = useState<string[]>(urlArtist ? urlArtist.split(",") : []);
  let [currentPage, setCurrentPage] = useState<number>(1);
  let [currentKirtans, setCurrentKirtans] = useState<Kirtans[]>([]);
  let [selectedKirtan, setSelectedKirtan] = useState<Kirtans | never[]>([]);
  let [play, setPlay] = useState<boolean>(false);
  let [isLoading] = useState<boolean>(false);
  let [error] = useState(null);
  let entriesPerPage : number = 100;
    
  const resetSearch = () : void => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchTerm(inputRef.current.value);
      setCurrentPage(1);
      setTotalKirtans(kirtansData.length);
      navigate(
        `/?urlSearchString=${inputRef.current?.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
    );
  };
}

  // const handleSearch = () => {
  //   setSearchTerm(inputRef.current?.value);
  //   setCurrentPage(1); //this is to bring back to page 1 for every new search
  //   navigate(
  //     `/?urlSearchString=${inputRef.current?.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
  //   ); // to populate applied filters in url (make shareable url)
  //   // searchHistory.push(inputRef.current?.value);
  // };

  const handleSearch = () : void => {
    // Ensure inputRef and its value exist before proceeding
    if (inputRef.current) {
      console.log(inputRef.current);
      const searchString: string = inputRef.current.value || ""; // Provide a default empty string if value is undefined
      setSearchTerm(searchString);
      setCurrentPage(1);
  
      // Update URL with search parameters
      navigate(`/?urlSearchString=${searchString}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`);
  
      // Uncomment the line below if you want to add to search history
      // searchHistory.push(searchString);
    }
  };

  // TODO - once pagination component is introduced
  // Get Page
  // const paginate = (event, pageNumber) => {
  //   event.preventDefault();
  //   setCurrentPage(pageNumber);
  // };

  const togglePlay = (selectedKirtan : Kirtans) : void  => {
    let playImageEl : HTMLElement | null = document.getElementById(`play${selectedKirtan.aid}`);
    let pauseImageEl : HTMLElement | null = document.getElementById(`pause${selectedKirtan.aid}`);
    if (playImageEl?.classList.value.includes("button__hidden")) {
      playImageEl?.classList.remove("button__hidden");
      pauseImageEl?.classList.add("button__hidden");
    } else if (pauseImageEl?.classList.value.includes("button__hidden")) {
      pauseImageEl?.classList.remove("button__hidden");
      playImageEl?.classList.add("button__hidden");
    }
  };

  const getPossibleCombinations = (searchTerm : string) : string[][] => {
    let searchArray : string[] = searchTerm.split(" ");
    searchArray = searchArray.filter((s) => s !== "");
    return searchArray.reduce(
        (subsets : string[][], value : string) =>
          subsets.concat(subsets.map((set : string[]) => [value, ...set])),
        [[]]
      )
      .sort((a : string[] ,b : string[]) => {
        return b.length - a.length;
      });
  };

  const calculateKirtanScore = (kirtan : Kirtans, possibleCombinations : string[][]) => {
    kirtan.Score = 0;

    for (let i = 0; i <= possibleCombinations?.length - 1; i++) {
      let array : string[] = possibleCombinations[i];
      let arrayLength : number = array.length;
      let searchExists : boolean = true;
      if (arrayLength === 0) continue;
      array.forEach((element) => {
        if (
          !(
            kirtan.Title.toString()
              .toLowerCase()
              .includes(element.toLowerCase()) ||
            kirtan.Sevadar.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.Album.toLowerCase().includes(element.toLowerCase()) ||
            kirtan.audio_year?.toString().includes(element) ||
            kirtan.Titlefws.toString()
              .toLowerCase()
              .includes(element.toLowerCase())
          )
        ) {
          searchExists = false;
        }
      });

      kirtan.hTitle = kirtan.Title;
      kirtan.hSevadar = kirtan.Sevadar;
      kirtan.hAlbum = kirtan.Album;

      if (searchExists) {
        kirtan.Score = arrayLength;
        array.forEach((word) => {
          kirtan.hTitle = kirtan.hTitle
            .toString()
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
          kirtan.hSevadar = kirtan.hSevadar
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
          kirtan.hAlbum = kirtan.hAlbum
            ?.toLowerCase()
            .replace(word?.toLowerCase(), `<strong>${word}</strong>`);
        });
        kirtan.hTitle = toPascalCase(kirtan.hTitle);
        kirtan.hSevadar = toPascalCase(kirtan.hSevadar);
        kirtan.hAlbum = toPascalCase(kirtan.hAlbum);
        break;
      }
    }
    if (kirtan.Score > 0) {
      return kirtan;
    } else {
      return false;
    }
  };

  const getSearchedKirtans = (kirtans: Kirtans[], possibleCombinations: string[][]) : Kirtans[] => {
    return kirtans.filter((kirtan : Kirtans) => {
      return calculateKirtanScore(kirtan, possibleCombinations);
    });
  };

  const getSortedSearchedKirtans = (searchedKirtans: Kirtans[]) : Kirtans[] => {
    let sortedData : Kirtans[] = searchedKirtans.sort((a: Kirtans, b: Kirtans) => {
      return b.Score - a.Score;
    });
    if (sortedData.length > 0) {
      return sortedData;
    } else {
      return kirtans;
    }
  };

  // TODO - once filter component is started
  const handleAlbumFilter = (event : readonly { label: string; value: string; }[] ) : void => {
    // console.log(event);
    /* to accomodate multi select filter */
    albumFilter = [];
    if (event.length > 0) {
      event.forEach((e : { label: string; value: string; }) => {
        albumFilter.push(e.value);
        setAlbumFilter(albumFilter);
        if (inputRef.current) {
        navigate(
          `/?urlSearchString=${inputRef.current?.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
        ); // to populate applied filters in url (make shareable url)
        }
      });
    } else {
      setAlbumFilter(albumFilter);
      if (inputRef.current) {
      navigate(
        `/?urlSearchString=${inputRef.current?.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
      ); // to populate applied filters in url (make shareable url)
      }
    }
  };

  const getAlbumFilteredKirtans = (sortedSearchedKirtans: Kirtans[], albumFilter: string[]) : Kirtans[] => {
    if (albumFilter.length === 0) {
      return sortedSearchedKirtans;
    } else {
      return sortedSearchedKirtans.filter((item) => {
        return albumFilter.includes(item.Album);
      });
    }
  };

  const handleArtistFilter = (event : readonly { label: string; value: string; }[]) => {
    /* to accomodate multi select filter */
    artistFilter : [] = [];
    if (event.length > 0) {
      event.forEach((e : { label: string; value: string; }) => {
        artistFilter.push(e.value);
        setArtistFilter(artistFilter);
        if (inputRef.current) {
        navigate(
          `/?urlSearchString=${inputRef.current?.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
        ); // to populate applied filters in url (make shareable url)
        }
      });
    } else {
      setArtistFilter(artistFilter);
      if (inputRef.current) {
      navigate(
        `/?urlSearchString=${inputRef.current?.value}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`
      ); // to populate applied filters in url (make shareable url)
      }
    }
  };

  const getArtistFilteredKirtans = (albumFilteredKirtans : Kirtans[], artistFilter : string[]) : Kirtans[] => {
    if (artistFilter.length === 0) {
      return albumFilteredKirtans;
    } else {
      return albumFilteredKirtans.filter((item) => {
        return artistFilter.includes(item.Sevadar);
      });
    }
  };

  const getResultKirtans = (kirtans : Kirtans[], searchTerm : string, albumFilter : string[], artistFilter : string[]) : Kirtans[] => {
    let possibleCombinations : string[][] = getPossibleCombinations(searchTerm);
    let searchedKirtans : Kirtans[] = getSearchedKirtans(kirtans, possibleCombinations);
    let sortedSearchedKirtans : Kirtans[]  = getSortedSearchedKirtans(searchedKirtans);
    let albumFilteredKirtans : Kirtans[] = getAlbumFilteredKirtans(
      sortedSearchedKirtans,
      albumFilter
    );
    let artistFilteredKirtans : Kirtans[] = getArtistFilteredKirtans(
      albumFilteredKirtans,
      artistFilter
    );
    return artistFilteredKirtans;
  }

  useEffect(() => {
    setDisplayKirtans(
      getResultKirtans(kirtans, searchTerm, albumFilter, artistFilter)
    );
    // eslint-disable-next-line
  }, [searchTerm, albumFilter, artistFilter]);

  useEffect(
    () => {
      // Get Current Kirtans
      let indexOfLastKirtan : number = currentPage * entriesPerPage;
      let indexOfFirstKirtan : number = indexOfLastKirtan - entriesPerPage;
      setCurrentKirtans(
        displayKirtans.slice(indexOfFirstKirtan, indexOfLastKirtan)
      );
      setTotalKirtans(displayKirtans.length);
    },
    // eslint-disable-next-line
    [displayKirtans, currentPage]
  );

  useEffect(() => {
    kirtans.forEach((kirtan) => {
      // if (allAlbums.includes(kirtan.Album)) {
        if (allAlbums.some(album => album.label === kirtan.Album)) {
      // } else if (allArtists.includes(kirtan.Sevadar)) {
      } else if (allArtists.some(artist => artist.label === kirtan.Sevadar)) {
      } else {
        allAlbums.push({ label: kirtan.Album, value: kirtan.Album });
        allArtists.push({ label: kirtan.Sevadar, value: kirtan.Sevadar });
      }
    });
    setAllAlbums(allAlbums);
    setAllArtists(allArtists);
    // eslint-disable-next-line
  }, [kirtans]);

  return (
    <>
    <Container fluid>
      <Container>
        <Row className="p-4">
          <SearchBar
            ref={inputRef}
            handleSearch={handleSearch}
            resetSearch={resetSearch}
            urlSearchString={urlSearchString}
          />
        </Row>
        <Filters
          allAlbums={allAlbums}
          handleAlbumFilter={handleAlbumFilter}
          allArtists={allArtists}
          handleArtistFilter={handleArtistFilter}
          urlAlbum={urlAlbum}
          urlArtist={urlArtist}
        />
        <Row>
          <KirtanList
            searchTerm={searchTerm}
            displayKirtans={currentKirtans}
            isLoading={isLoading}
            error={error}
            albumFilter={albumFilter}
            setAlbumFilter={setAlbumFilter}
            artistFilter={artistFilter}
            setArtistFilter={setArtistFilter}
            allAlbums={allAlbums}
            allArtists={allArtists}
            handleAlbumFilter={handleAlbumFilter}
            handleArtistFilter={handleArtistFilter}
            selectedKirtan={selectedKirtan}
            setSelectedKirtan={setSelectedKirtan}
            play={play}
            setPlay={setPlay}
            togglePlay={togglePlay}
          />
        </Row>
        <AudioPlayer
          // selectedKirtan={selectedKirtan}
          // play={play}
          // setPlay={setPlay}
        />
      </Container>
    </Container>
    {/* <PaginationComponent
      entriesPerPage={entriesPerPage}
      totalKirtans={totalKirtans}
      paginate={paginate}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    /> */}
    <Container fluid>
      <Container>
        <Row>
          <GoogleForm />
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </Container>
  </>
  )
}

export default HomePage;
