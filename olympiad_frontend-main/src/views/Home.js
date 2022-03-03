import React, { useState } from "react";
import { useSelector } from "react-redux";
// import sections
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";

import { useHistory } from "react-router-dom";
import Modal from "../components/elements/Modal";

const Home = () => {
  const history = useHistory();

  useSelector((state) =>
    state.UserReducer.LoggedIn === true ? history.push("/subjects") : ""
  );
  const [modalActive, setModalactive] = useState(true);
  const closeModal = (e) => {
    e.preventDefault();
    setModalactive(false);
  };

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <Modal show={modalActive} handleClose={closeModal} app={true}></Modal>
      <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      />
    </>
  );
};

export default Home;
