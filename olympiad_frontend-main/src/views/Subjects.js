import React, { useState, useEffect } from "react";
import Decoder from "jwt-decode";
import { Grid } from "@material-ui/core";
import { withNamespaces } from "react-i18next";

import HeroSecondary from "../components/sections/HeroSecondary";
import { Get_Profile_Api, Subject_Api } from "../utils/Api";
import SectionTiles from "../components/sections/SectionTiles";
import Loading from "../components/elements/Loading";
import Modal from "../components/elements/Modal";

const Classes = (props) => {
  const token = localStorage.usertoken_hash;
  const decodedata = Decoder(token);

  const myclass = decodedata.myclass;
  const username = decodedata.username;

  const [mydata, setmydata] = useState("");
  const [userdata, setUserData] = useState("");
  const [modalActive, setModalactive] = useState(false);

  useEffect(() => {
    Subject_Api(myclass, decodedata.category).then((res) => {
      if (res) {
        let arr1 = [
          "বঙ্গবন্ধু শেখ মুজিবুর রহমান",
          "ভাষা আন্দোলন",
          "বাংলাদেশ মুক্তিযুদ্ধ ও স্বাধীনতা",
          "চট্টগ্রামের কৃষ্টিকালচার",
        ];
        let arr2 = res.data;
        Array.prototype.push.apply(arr1, arr2);
        setmydata(arr1);
      }
    });

    Get_Profile_Api(username).then((res) => setUserData(res));
  }, [myclass, username, userdata.madrasha]);

  const gameID = localStorage.getItem("itemId");

  const closeModal = (e) => {
    e.preventDefault();
    setModalactive(false);
  };

  return (
    <div>
      <HeroSecondary
        className="illustration-section-01"
        username={decodedata.username}
        show={true}
        gameID={gameID}
      />
      <Modal show={modalActive} handleClose={closeModal} app={true}></Modal>
      {mydata === "" || userdata === "" ? (
        <Grid>
          <Loading />
        </Grid>
      ) : (
        <SectionTiles
          tilesdata={mydata}
          to="/chapters"
          myclass={myclass}
          userdata={userdata}
        />
      )}
    </div>
  );
};

export default withNamespaces()(Classes);
