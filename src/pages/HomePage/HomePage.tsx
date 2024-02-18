import React from 'react';
import { useState, useEffect, useRef } from "react";
import kirtansData from "../../assets/data/kirtanDataSet.json";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import GoogleForm from "../../components/GoogleForm/GoogleForm";
import {Kirtans} from "../../models/KirtansInterface";

import "./HomePage.scss";

const HomePage = () => {

    let kirtanData : Kirtans[] = kirtansData;
    console.log("kirtanData", kirtanData);

    class Kir {
      aid: number;
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

         constructor(aid: number,
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
          createdon: string) {

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
      console.log(new Kir(k.aid, k.audcatid, k.artstid, k.Title, k.Album, k.Sevadar, k.Titlefws, k.Duration, k.audiosize, k.audiopath, k.audio_year, k.filename, k.cdnpath, k.imgpath, k.status, k.createdon));
    });    
    
  return (
    <>
      <SearchBar />
      <Filters />
      <AudioPlayer />
      <GoogleForm />
    </>
  )
}

export default HomePage;
