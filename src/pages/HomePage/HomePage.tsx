import React from 'react';
import { useState, useEffect, useRef } from "react";
import kirtansData from "../../assets/data/kirtanDataSet.json";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./HomePage.scss";

const HomePage = () => {

    interface Kirtans {
        "aid": number,
        "audcatid": number,
        "artstid": number,
        "Title": string,
        "Album": string,
        "Sevadar": string,
        "Titlefws": string,
        "Duration": string,
        "audiosize": number,
        "audiopath": string,
        "audio_year": number,
        "filename": string,
        "cdnpath": string,
        "imgpath": string,
        "status": number,
        "createdon": string
    }

    let kirtanData : Kirtans[] = kirtansData;
    console.log("kirtanData", kirtanData);

    class Kir {
        title: string
        cdnpath: string


         constructor(title:string="a", cdnpath:string="b") {
            this.title = title;
            this.cdnpath = cdnpath
        }
    }

    kirtansData.slice(0,5).forEach(k=>{
      console.log(new Kir(k.Title,k.cdnpath));
    });    

  return (
    <SearchBar />
  )
}

export default HomePage
