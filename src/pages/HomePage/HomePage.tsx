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

  return (
    <SearchBar />
  )
}

export default HomePage
