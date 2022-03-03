import React, { useState, useEffect } from "react";
import Decoder from "jwt-decode";
import HeroSecondary from "../components/sections/HeroSecondary";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { Chapters_Api } from "../utils/Api";
import TilesChapters from "../components/sections/TilesChapters";
import Button from "../components/elements/Button";
import { useHistory } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Grid } from "@material-ui/core";
import Loading from "../components/elements/Loading";

const Chapters = (props) => {
  const api_data = props.location.state;
  const history = useHistory();
  const token = localStorage.usertoken_hash;
  const decodedata = Decoder(token);
  const myclass = decodedata.myclass;

  const [mydata, setmydata] = useState("");
  useEffect(() => {
    if (api_data) {
      console.log("api_data");
      console.log(api_data);
      Chapters_Api(api_data, decodedata.category).then((res) => {
        if (res) {
          setmydata(res.data);
        }
      });
    }
  }, [api_data]);

  return (
    <div>
      {api_data === "" ? (
        <>
          <HeaderWaiting header={props.t("pleasesub")} />
          <Grid container justify="center">
            <Button
              tag="a"
              color="dark"
              wideMobile
              onClick={() => history.push({ pathname: "/subjects" })}
            >
              {props.t("choosesub")}
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <HeroSecondary className="illustration-section-02" show={false} />
          {mydata === "" ? (
            <Grid>
              <Loading />
            </Grid>
          ) : (
            <TilesChapters
              tilesdata={mydata}
              imgsrc="https://cdn.dribbble.com/users/945601/screenshots/11532563/media/180d3700131397708fd52c63883cdb34.png"
              myclass={myclass}
              to="/challenge"
              api_data={api_data}
            />
          )}
        </>
      )}
    </div>
  );
};

export default withNamespaces()(Chapters);
