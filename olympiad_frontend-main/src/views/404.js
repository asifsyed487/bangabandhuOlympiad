import { Grid } from "@material-ui/core";
import React from "react";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "../components/elements/Button";
import HeaderWaiting from "../components/sections/HeaderWaiting";
const Error404 = ({ t }) => {
  const history = useHistory();

  return (
    <div>
      <HeaderWaiting
        header
        sub={t("404header")}
        img="https://cdn.dribbble.com/users/6099628/screenshots/14468614/media/5942f01b1839b2333692960ff04f65b1.png"
      />
      <Grid container justify="center">
        <Button color="dark" onClick={() => history.goBack()}>
          {t("goback")}
        </Button>
      </Grid>
    </div>
  );
};

export default withNamespaces()(Error404);
