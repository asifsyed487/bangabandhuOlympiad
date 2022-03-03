import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import Decoder from "jwt-decode";

import ButtonAns from "../components/elements/ButtonAns";
import Question from "../components/sections/QuestionHero";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { withNamespaces } from "react-i18next";
import Timer from "../components/elements/Timer";
import {
  Save_stats_api,
  APP_URL,
  Check_declined_Api,
  Decline_Challenge_API,
  Send_Challenge_API,
  SOCKET__URL,
} from "../utils/Api";

import Modal from "../components/elements/Modal";
import { useDispatch } from "react-redux";
import { setNotificationAction } from "../redux/actions/setNotification";

let socket;

const Game = (props) => {
  const history = useHistory();
  const { req_api_data, gameID, challenger } = props.location.state;
  const dispatch = useDispatch();
  const token = localStorage.getItem("usertoken_hash");
  const decoded_data = Decoder(token);
  const name = decoded_data.username;

  const [randomChoice, setrandomChoice] = useState([]);
  let [myscore, setMyScore] = useState(0);
  let [opponetscore, setOpponentscore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [videoModalActive, setVideomodalactive] = useState(false);
  const [question, setQuestion] = useState("");
  const [quenno, setQuen] = useState(0);
  const [opponetName, setOpponent_name] = useState("");
  const [result, setResult] = useState("");
  const [declined, setDeclined] = useState(false);
  const [noresponse, setNoresponse] = useState(false);
  let [my_stats, setMyStats] = useState([]);
  let [oppnonet_stats, setOpponentStats] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [saveloading, setsaveloading] = useState(false);
  const [dataLength, setdataLength] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     Check_declined_Api(name).then((res) => {
  //       if (res.declined === true) {
  //         setDeclined(res);
  //         setVideomodalactive(true);
  //       }
  //     });
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  useEffect(() => {
    socket = io.connect(SOCKET__URL);
    socket.emit("join_room", gameID, name);
    setTimeout(() => {
      let decline_data = {
        username: name,
        declined: true,
      };
      let challenge_data = {
        username: challenger,
        gameID: "null",
        challenger: "null",
      };
      Decline_Challenge_API(decline_data);
      Send_Challenge_API(challenge_data);
      setNoresponse(true);
      setVideomodalactive(true);
      dispatch(setNotificationAction(0));
    }, 60000);
    socket.emit(`${gameID}`, {
      Class: req_api_data.Class,
      Subject: req_api_data.Subject,
      Chapter: req_api_data.Chapter,
      category: decoded_data.category,
    });
  }, []);

  useEffect(() => {
    setDisabled(false);
    socket.emit("comparedata", name, gameID, my_stats);
  }, [question]);

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  useEffect(() => {
    socket.on("question", async (question, index, quenlen) => {
      setQuestion(question);
      setTimeLeft(9);
      setdataLength(quenlen - 1);
      if (question === "completechapter") {
        history.push("/noquestion");
      }
      const choices = await [question.opt_1, question.opt_2, question.opt_3];
      const randomIndex = await parseInt((Math.random() * 100) % 4);
      await choices.splice(randomIndex, 0, question.correct_ans);
      setrandomChoice(choices);
      setQuen(() => {
        const val = parseInt(index) + 1;
        return val;
      });

      if (index === quenlen - 1) {
        setsaveloading(true);
        socket.emit("finishmesg", true, gameID);
      }
    });

    socket.on("info", (player1_name, player2_name) => {
      setOpponent_name(player2_name);
    });

    socket.on("viewresult", (usr, timeLeft) => {
      if (usr === name) {
        setMyScore((myscore += timeLeft));
      } else {
        setOpponentscore((opponetscore += timeLeft));
      }

      if (myscore > opponetscore) {
        setResult(props.t("wongame"));
      } else if (myscore < opponetscore) {
        setResult(props.t("lostgame"));
      } else if (myscore === opponetscore) {
        setResult(props.t("drawgame"));
      }
    });

    socket.on("compareresult", (username, data) => {
      if (username === name) {
        setMyStats(data);
      } else {
        setOpponentStats(data);
      }
    });

    socket.on("finishConfirm", (finished) => {
      if (finished === true) {
        setGameover(true);
      }
    });
  }, []);

  const handleAnswer = (e, i) => {
    setTimeout(() => {
      setDisabled(true);
    }, 100);

    setMyStats((oldArray) => [
      ...oldArray,
      {
        question: question.question,
        correctanswer: question.correct_ans,
        myanswer: e,
      },
    ]);

    if (e === question.correct_ans) {
      socket.emit("result", name, gameID, timeLeft);
    }
    return e === question.correct_ans;
  };

  const GoBack = () => {
    history.goBack();
    socket.disconnect();
  };

  useEffect(() => {
    if (gameover === true) {
      const data = {
        result,
        my_stats,
        oppnonet_stats,
        name,
        opponetName,
        opponetscore,
        myscore,
        gameID,
        req_api_data,
      };

      Save_stats_api(data).then((res) => res);
      history.push({
        pathname: "/resultmuilti",
        state: {
          data,
          totalquen: dataLength,
        },
      });
    }
  }, [gameover]);

  const classes = useStyles();
  return (
    <>
      {question !== "" ? (
        <div>
          {saveloading === false ? (
            <div>
              <Question
                className="illustration-section-01"
                question={question.question}
                quenno={quenno}
                max={dataLength}
              />
              <Grid container justify="center">
                <Grid container justify="center" alignItems="center">
                  {randomChoice.map((item, i) => (
                    <ButtonAns
                      item={item}
                      onClick={(e) => handleAnswer(e, i)}
                      disabled={disabled}
                    />
                  ))}
                </Grid>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="h6" gutterBottom align="center">
                      {opponetName}
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                      {opponetscore}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container justify="center">
                      <Timer />
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" gutterBottom align="center">
                      {name}
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                      {myscore}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          ) : (
            <HeaderWaiting
              className="illustration-section-02"
              header={"Please Wait Saving Data"}
              img={`${APP_URL}/wait.png`}
            />
          )}
        </div>
      ) : (
        <>
          <HeaderWaiting
            className="illustration-section-02"
            header={props.t("gameheader")}
            sub={props.t("gamesub")}
            img={`${APP_URL}/wait.png`}
          />
          {declined && (
            <>
              <Modal show={videoModalActive} handleClose={closeModal}>
                <Typography align="center">{props.t("declined")}</Typography>
                <div className={classes.root}>
                  <Button variant="contained" color="primary" onClick={GoBack}>
                    {props.t("goback")}
                  </Button>
                </div>
              </Modal>
            </>
          )}
          {noresponse && (
            <>
              <Modal show={videoModalActive} handleClose={closeModal}>
                <Typography align="center">{props.t("noresponse")}</Typography>
                <div className={classes.root}>
                  <Button variant="contained" color="primary" onClick={GoBack}>
                    {props.t("goback")}
                  </Button>
                </div>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
};

export default withNamespaces()(Game);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
