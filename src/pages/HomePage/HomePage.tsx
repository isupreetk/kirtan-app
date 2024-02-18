import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
// import toPascalCase from "../../utils.js";
import kirtansData from "../../assets/data/kirtanDataSet.json";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
// import KirtanList from "../../components/KirtanList/KirtanList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
// import PaginationComponent from "../../components/Pagination/Pagination";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import {Kirtans} from "../../models/KirtansInterface";

import "./HomePage.scss";

const HomePage : React.FC = () => {

    let kirtanData : Kirtans[] = kirtansData;
    console.log("kirtanData", kirtanData);

    class Kirtan {
      aid : number;
      audcatid: number;
      artstid: number;
      Title: string;
      Album: string;
      Sevadar: string;
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

         constructor ( aid: number,
          audcatid: number,
          artstid: number,
          Title: string,
          Album: string,
          Sevadar: string,
          Titlefws: string,
          Duration: number,
          audiosize: number,
          audiopath: string,
          audio_year: number,
          filename: string,
          cdnpath: string,
          imgpath: string,
          status: number,
          createdon: string ) 
          {
          this.aid = aid;
          this.audcatid = audcatid;
          this.artstid = artstid;
          this.Title = Title;
          this.Album = Album;
          this.Sevadar = Sevadar;
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
        }
    }

    kirtansData.slice(0,5).forEach(k=>{
      console.log(new Kirtan(k.aid, k.audcatid, k.artstid, k.Title, k.Album, k.Sevadar, k.Titlefws, k.Duration, k.audiosize, k.audiopath, k.audio_year, k.filename, k.cdnpath, k.imgpath, k.status, k.createdon));
    });   

  // let inputRef = useRef();
  let inputRef = useRef<HTMLInputElement | null>(null); 
  let navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let urlAlbum = searchParams.get("urlAlbum");
  let urlArtist = searchParams.get("urlArtist");
  let urlSearchString = searchParams.get("urlSearchString");

  let [searchTerm, setSearchTerm] = useState(
    urlSearchString ? urlSearchString : ""
  );
  let [kirtans] = useState(kirtansData);
  let [displayKirtans, setDisplayKirtans] = useState([]);
  let [totalKirtans, setTotalKirtans] = useState(kirtansData.length);
  let [allAlbums, setAllAlbums] = useState([]);
  let [allArtists, setAllArtists] = useState([]);
  let [albumFilter, setAlbumFilter] = useState(urlAlbum ? urlAlbum : []);
  let [artistFilter, setArtistFilter] = useState(urlArtist ? urlArtist : []);
  let [currentPage, setCurrentPage] = useState(1);
  let [currentKirtans, setCurrentKirtans] = useState([]);
  let [selectedKirtan, setSelectedKirtan] = useState([]);
  let [play, setPlay] = useState(false);
  let [isLoading] = useState(false);
  let [error] = useState(null);
  let entriesPerPage : number = 100;
    
  const resetSearch = () => {
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

  const handleSearch = () => {
    // Ensure inputRef and its value exist before proceeding
    if (inputRef.current) {
      const searchString: string = inputRef.current.value || ""; // Provide a default empty string if value is undefined
      setSearchTerm(searchString);
      setCurrentPage(1);
  
      // Update URL with search parameters
      navigate(`/?urlSearchString=${searchString}&urlAlbum=${albumFilter}&urlArtist=${artistFilter}`);
  
      // Uncomment the line below if you want to add to search history
      // searchHistory.push(searchString);
    }
  };


  return (
    <>
    <Container fluid>
      <Container>
        <Row className="p-4">
          <SearchBar
            ref={inputRef}
            // handleSearch={handleSearch}
            // resetSearch={resetSearch}
            // urlSearchString={urlSearchString}
          />
        </Row>
        <Filters
          // allAlbums={allAlbums}
          // handleAlbumFilter={handleAlbumFilter}
          // allArtists={allArtists}
          // handleArtistFilter={handleArtistFilter}
          // urlAlbum={urlAlbum}
          // urlArtist={urlArtist}
        />
        <Row>
          {/* <KirtanList
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
          /> */}
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
