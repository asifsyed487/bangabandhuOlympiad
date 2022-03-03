import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { withNamespaces } from "react-i18next";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { URL } from "../utils/Api";

const DetailsGame = (props) => {
  const {
    result,
    my_stats,
    oppnonet_stats,
    name,
    opponetName,
    opponetscore,
    myscore,
  } = props.location.state.data;
  const { api_data, skip } = props.location.state;

  return (
    <div>
      <HeaderWaiting
        className="illustration-section-01"
        playagain="yes"
        api_data={api_data}
        name={name}
        skip={skip}
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

          <Grid container justify="center">
            <img
              style={{
                height: "300px",
                width: "300px",
                borderRadius: "50%",
              }}
              src={`${URL}/${name}.jpg`}
            />
          </Grid>
          {my_stats &&
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
            ))}
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

            <Grid container justify="center">
              <img
                style={{
                  height: "300px",
                  width: "300px",
                  borderRadius: "50%",
                }}
                src={`${URL}/${opponetName}.jpg`}
              />
            </Grid>

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
              Total Score: {opponetscore}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withNamespaces()(DetailsGame);
