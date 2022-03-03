import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import ButtonAns from "../components/elements/ButtonAns";
import Question from "../components/sections/QuestionHero";

import { withNamespaces } from "react-i18next";

import { Save_stats_api, APP_URL, SOCKET__URL } from "../utils/Api";
import Timer from "../components/elements/Timer";
import HeaderWaiting from "../components/sections/HeaderWaiting";

let socket;

const Game = (props) => {
  const history = useHistory();
  const { name, gameID } = props.location.state;

  const [randomChoice, setrandomChoice] = useState([]);
  let [myscore, setMyScore] = useState(0);
  let [opponetscore, setOpponentscore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [question, setQuestion] = useState("");
  const [quenno, setQuen] = useState(0);
  const [opponetName, setOpponent_name] = useState("");
  const [result, setResult] = useState("");
  let [my_stats, setMyStats] = useState([]);
  let [oppnonet_stats, setOpponentStats] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [req_api_data, setReqapidata] = useState("");
  const [saveloading, setsaveloading] = useState(false);
  const [dataLength, setdataLength] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    socket = io.connect(SOCKET__URL);
    socket.emit("join_room", gameID, name);
    localStorage.removeItem("itemId");
  }, []);

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
    setDisabled(false);
    socket.emit("comparedata", name, gameID, my_stats);
  }, [question]);

  useEffect(() => {
    socket.on("question", async (question, index, quenlen) => {
      setQuestion(question);
      setTimeLeft(9);
      setdataLength(quenlen - 1);
      if (question === "completechapter") {
        history.push("/noquestion");
      }
      setReqapidata({
        Subject: question.Subject,
        Class: question.Class,
        Chapter: question.Chapter,
      });
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
      setOpponent_name(player1_name);
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
        <></>
      )}
    </>
  );
};

export default withNamespaces()(Game);
