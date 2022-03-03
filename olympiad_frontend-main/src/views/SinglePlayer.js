import React, { useEffect, useState } from "react";
import Decoder from "jwt-decode";
import { getQuestionsSingle } from "../utils/Api";
import ButtonAns from "../components/elements/ButtonAns";
import Question from "../components/sections/QuestionHero";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { withNamespaces } from "react-i18next";
import Timer from "../components/elements/Timer";
import { Grid, Typography } from "@material-ui/core";

import { Save_SingleStats_api } from "../utils/Api";
import { useHistory } from "react-router-dom";

const SinglePlayer = (props) => {
  const { name, api_data } = props.location.state;
  const token = localStorage.usertoken_hash;
  const decodedata = Decoder(token);
  const history = useHistory();
  const [data, setData] = useState("");
  const [question, setQuestion] = useState("");
  const [randomChoice, setRandomchoice] = useState([]);
  const [quenno, setQuen] = useState(0);
  let [myscore, setMyScore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  let [my_stats, setMyStats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

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
    setTimeout(() => {
      getQuestionsSingle(api_data, name, decodedata.category).then((res) => {
        if (res === "completechapter") {
          history.push("/noquestion");
          setData(res);
        }
        setData(res);
      });
    }, 2000);
  }, []);

  useEffect(() => {
    if (data !== "" && data !== "completechapter") {
      data.forEach(function (item, index) {
        setTimeout(function () {
          setQuestion(item);
          setTimeLeft(9);
          setQuen(() => {
            const val = parseInt(index) + 1;
            return val;
          });
          setActiveIndex(index);
          const choices = [item.opt_1, item.opt_2, item.opt_3];
          const randomIndex = parseInt((Math.random() * 100) % 4);
          choices.splice(randomIndex, 0, item.correct_ans);
          setRandomchoice(choices);
        }, 10000 * index + 1);
      });
    }
  }, [data]);

  useEffect(() => {
    setDisabled(false);
  }, [question]);
  useEffect(() => {
    let stats = my_stats.filter(
      (v, i, a) => a.findIndex((t) => t.question === v.question) === i
    );
    let stats_crop = stats.slice(0, 10);
    if (activeIndex === data.length - 1) {
      let save_data = {
        name,
        my_stats: stats_crop,
        myscore: myscore > stats_crop.length * 9 ? 0 : myscore,
        chapter: api_data.Chapter,
        subject: api_data.Subject,
      };
      Save_SingleStats_api(save_data);
      history.push({
        pathname: "/resultsingle",
        state: {
          data: save_data,
          api_data,
          name,
          playagain: "yes",
          totalquen: data.length,
        },
      });
    }
  }, [my_stats]);

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
      setMyScore((myscore += timeLeft));
    }
    return e === question.correct_ans;
  };

  return (
    <div>
      {question === "" ? (
        <HeaderWaiting
          className="illustration-section-02"
          header={props.t("singlewait")}
          sub={props.t("gamesub")}
          img="https://i.ibb.co/rpSYXGg/Screenshot-29.png"
        />
      ) : (
        <>
          <div style={{ marginTop: "50px" }}>
            {data && (
              <Question
                className="illustration-section-01"
                question={question.question}
                quenno={quenno}
                max={data.length}
              />
            )}
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
                <Grid item xs={2}></Grid>
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
        </>
      )}
    </div>
  );
};

export default withNamespaces()(SinglePlayer);
