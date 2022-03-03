import React from "react";
import { withNamespaces } from "react-i18next";
import HeaderWaiting from "../components/sections/HeaderWaiting";

const NoQuestion = ({ t }) => {
  return (
    <HeaderWaiting
      className="illustration-section-02"
      header={t("completechapter")}
      noquen="yes"
    />
  );
};
export default withNamespaces()(NoQuestion);
