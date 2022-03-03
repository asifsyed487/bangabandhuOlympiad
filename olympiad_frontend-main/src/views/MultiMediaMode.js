import React, { useEffect, useState } from "react";

import { Get_MediaQuen_Api } from "../utils/Api";
import ButtonAns from "../components/elements/ButtonAns";
import Question from "../components/sections/QuestionHero";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { withNamespaces } from "react-i18next";
import Timer from "../components/elements/Timer";
import { Grid, Typography } from "@material-ui/core";

import { Save_SingleStats_api } from "../utils/Api";
import { useHistory } from "react-router-dom";

const MultiMediaMode = (props) => {
  const name = props.location.state;
  const history = useHistory();
  const [data, setData] = useState("");
  const [question, setQuestion] = useState("");
  const [randomChoice, setRandomchoice] = useState([]);
  const [quenno, setQuen] = useState(0);
  let [myscore, setMyScore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  let [my_stats, setMyStats] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      Get_MediaQuen_Api().then((res) => setData(res));
    }, 2000);
  }, []);

  useEffect(() => {
    if (data !== "") {
      data.forEach(function (item, index) {
        setTimeout(function () {
          setQuestion(item);
          setQuen(() => {
            const val = (parseInt(index) + 1) * 10;

            return val;
          });
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
    if (quenno === 50) {
      setTimeout(() => {
        let save_data = {
          name,
          my_stats,
          myscore,
        };
        Save_SingleStats_api(save_data);
        history.push({
          pathname: "/result",
          state: {
            data: save_data,
          },
        });
      }, 10000);
    }
  }, [my_stats, myscore]);

  const handleAnswer = (e, i) => {
    setTimeout(() => {
      setDisabled(true);
    }, 200);

    setMyStats((oldArray) => [
      ...oldArray,
      {
        question: question.question,
        correctanswer: question.correct_ans,
        myanswer: e,
      },
    ]);

    if (e === question.correct_ans) {
      setMyScore((myscore += 10));
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
          <div>
            <Question
              className="illustration-section-01"
              question={question.question}
              quenno={quenno}
              img={question.img}
              max={5}
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

export default withNamespaces()(MultiMediaMode);
