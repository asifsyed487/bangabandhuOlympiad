import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import HeaderWaiting from "../components/sections/HeaderWaiting";

const ResultSingle = (props) => {
  const { result, my_stats, name, myscore } = props.location.state.data;

  const { api_data, playagain, totalquen } = props.location.state;
  let [mywin, setMywin] = useState(0);

  useEffect(() => {
    my_stats.map((item) => {
      if (item.correctanswer === item.myanswer) {
        setMywin((mywin += 1));
      }
    });
  }, []);

  return (
    <div>
      <HeaderWaiting
        className="illustration-section-01"
        playagain={playagain}
        api_data={api_data}
        name={name}
        sub={
          result === "You have lost the game!"
            ? props.t("lostgame")
            : result === "You have won the game!"
            ? props.t("wongame")
            : result === "The game is draw!"
            ? props.t("drawgame")
            : ""
        }
        resultimg={
          result === "You have lost the game!"
            ? "https://cdn.dribbble.com/users/812639/screenshots/9070313/media/2ea7c1ca814727cb527b954f462a24d3.jpg"
            : result === "The game is draw!"
            ? "https://cdn.dribbble.com/users/812639/screenshots/5693999/dribbble_01-09.jpg"
            : "https://cdn.dribbble.com/users/812639/screenshots/6268626/74.jpg"
        }
      />
      <Grid spacing={2} container justify="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" gutterBottom align="center">
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            {props.t("givencorrect")} {mywin}
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            {props.t("givenfalse")} {totalquen - mywin}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            align="center"
            style={{ color: "#6163FF" }}
          >
            {props.t("totalscore")} {myscore}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withNamespaces()(ResultSingle);
