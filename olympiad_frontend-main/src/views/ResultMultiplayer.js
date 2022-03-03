import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { withNamespaces } from "react-i18next";
import HeaderResultMulti from "../components/sections/HeaderResultMulti";

const ResultMultiplayer = (props) => {
  const {
    result,
    my_stats,
    oppnonet_stats,
    name,
    opponetName,
    opponetscore,
    myscore,
    req_api_data,
  } = props.location.state.data;
  const { totalquen } = props.location.state;
  let [mywin, setMywin] = useState(0);
  let [oppnonetwin, setOppnonetwin] = useState(0);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    my_stats.map((item) => {
      if (item.correctanswer === item.myanswer) {
        setMywin((mywin += 1));
      }
    });
    if (oppnonet_stats) {
      oppnonet_stats.map((item) => {
        if (item.correctanswer === item.myanswer) {
          setOppnonetwin((oppnonetwin += 1));
        }
      });
    }
    return () => (mounted.current = false);
  }, []);

  return (
    <div>
      <HeaderResultMulti
        className="illustration-section-01"
        name={name}
        opponetName={opponetName}
        req_api_data={req_api_data}
        sub={
          myscore < opponetscore
            ? props.t("lostgame")
            : myscore > opponetscore
            ? props.t("wongame")
            : props.t("drawgame")
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
        {opponetName && (
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" gutterBottom align="center">
              {opponetName}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              {props.t("givencorrect")} {oppnonetwin}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              {props.t("givenfalse")} {totalquen - oppnonetwin}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              align="center"
              style={{ color: "#6163FF" }}
            >
              {props.t("totalscore")} {opponetscore}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withNamespaces()(ResultMultiplayer);
