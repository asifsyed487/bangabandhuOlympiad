import React from "react";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router-dom";

import HeaderWaiting from "../components/sections/HeaderWaiting";
const Maintainance = ({ t }) => {
  return (
    <div>
      <HeaderWaiting
        header={t("maintanace1")}
        sub={t("maintanace2")}
        img="https://cdn.dribbble.com/users/2069174/screenshots/14590729/media/87d236084f06dd92a59f9e6914f26885.jpg?compress=1&resize=800x600"
      />
    </div>
  );
};

export default withNamespaces()(Maintainance);
