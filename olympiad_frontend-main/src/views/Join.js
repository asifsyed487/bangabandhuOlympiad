import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import HeaderWaiting from "../components/sections/HeaderWaiting";
import { withNamespaces } from "react-i18next";

import Modal from "../components/elements/Modal";
import { URL } from "../utils/Api";

const Game = (props) => {
  const history = useHistory();
  const { name, GAMEID } = props.location.state;

  useEffect(() => {
    if (GAMEID) {
      history.push({
        pathname: "/joingame",
        state: {
          gameID: GAMEID,
          name,
        },
      });
    }
  }, []);
  const { data } = useQuery(GET_GAMEID, {
    variables: { username: `${name}` },
  });

  const [sendGameid] = useLazyQuery(SEND_GAMEID);
  const [declineChallenge] = useLazyQuery(DECLINE_CHALLENGE);
  const [gameID, setGameid] = useState();

  const [videoModalActive, setVideomodalactive] = useState(false);

  const handleJoin = async () => {
    await sendGameid({
      variables: {
        username: `${name}`,
        gameID: "null",
        challenger: "null",
      },
    });
    history.push({
      pathname: "/joingame",
      state: {
        gameID,
        name,
      },
    });
  };

  const handleDecline = async () => {
    await sendGameid({
      variables: {
        username: `${name}`,
        gameID: "null",
        challenger: "null",
      },
    });

    await declineChallenge({
      variables: {
        username: `${data.getGameId.challenger}`,
        declined: true,
      },
    });
    setVideomodalactive(false);
    history.goBack();
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  useEffect(() => {
    if (data) {
      if (data.getGameId.gameID !== "null" && data.getGameId.gameID !== null) {
        setGameid(data.getGameId.gameID);
        setVideomodalactive(true);
      }
    }
  }, [data]);

  const classes = useStyles();

  return (
    <>
      <HeaderWaiting
        className="illustration-section-02"
        header={props.t("joinheader")}
        sub={props.t("gamesub")}
        img={`${URL}/wait.png`}
      />
      {data && (
        <>
          <Modal show={videoModalActive} handleClose={closeModal}>
            <Typography align="center">
              {data.getGameId.challenger} {props.t("inviteinfo")}
            </Typography>
            <div className={classes.root}>
              <Button variant="contained" color="primary" onClick={handleJoin}>
                {props.t("join")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDecline}
              >
                {props.t("decline")}
              </Button>
            </div>
          </Modal>
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
