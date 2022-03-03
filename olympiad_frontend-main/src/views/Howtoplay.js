import React from "react";
import { withNamespaces } from "react-i18next";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { APP_URL } from "../utils/Api";

const Howtoplay = (props) => {
  return (
    <div>
      <HeaderWaiting
        className="illustration-section-01"
        sub={props.t("gamesub")}
      />
    </div>
  );
};

export default withNamespaces()(Howtoplay);
