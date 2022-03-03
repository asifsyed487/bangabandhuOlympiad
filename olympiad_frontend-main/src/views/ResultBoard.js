import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";

const ResultMultiplayer = (props) => {
  const {
    result,
    my_stats,
    oppnonet_stats,
    name,
    opponetName,
    opponetscore,
    myscore,
  } = props.location.state.data;

  let [mywin, setMywin] = useState(0);
  let [oppnonetwin, setOppnonetwin] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Typography variant="h2" gutterBottom align="center">
        {name}{" "}
        {result === "You have lost the game!"
          ? props.t("lostgame")
          : result === "You have won the game!"
          ? props.t("wongame")
          : result === "The game is draw!"
          ? props.t("drawgame")
          : ""}
      </Typography>
      <Grid spacing={2} container justify="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom align="center">
            {props.t("givencorrect")} {mywin}
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            {props.t("givenfalse")} {10 - mywin}
          </Typography>

          {/* {my_stats &&
            my_stats.map((item) => (
              <>
                <Typography variant="h6" gutterBottom align="center">
                  {item.question}
                </Typography>
                <Typography variant="body2" gutterBottom align="center">
                  {props.t("correctans")}: {item.correctanswer}
                </Typography>
                <Typography variant="body2" gutterBottom align="center">
                  {props.t("myans")}{" "}
                  <Typography
                    variant="span"
                    gutterBottom
                    align="center"
                    style={{
                      color:
                        item.correctanswer === item.myanswer
                          ? "#4caf50"
                          : "#f44336",
                    }}
                  >
                    {item.myanswer}
                  </Typography>
                </Typography>
              </>
            ))} */}
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
              {props.t("givenfalse")} {10 - oppnonetwin}
            </Typography>

            {oppnonet_stats.map((item) => (
              <>
                <Typography variant="h6" gutterBottom align="center">
                  {item.question}
                </Typography>
                <Typography variant="body2" gutterBottom align="center">
                  Correct ans: {item.correctanswer}
                </Typography>
                <Typography variant="body2" gutterBottom align="center">
                  My Ans:{" "}
                  <Typography
                    variant="span"
                    gutterBottom
                    align="center"
                    style={{
                      color:
                        item.correctanswer === item.myanswer
                          ? "#4caf50"
                          : "#f44336",
                    }}
                  >
                    {item.myanswer}
                  </Typography>
                </Typography>
              </>
            ))}
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
