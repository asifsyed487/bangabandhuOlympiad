import React, { useState, useEffect } from "react";
import Decoder from "jwt-decode";
import Select from "react-select";
import io from "socket.io-client";
import HeroSecondary from "../components/sections/HeroSecondary";
import { APP_URL, getClassMateSearch_Api, SOCKET__URL } from "../utils/Api";
import { useHistory } from "react-router-dom";
import { withNamespaces } from "react-i18next";

import ButtonGroup from "../components/elements/ButtonGroup";
import CustomButton from "../components/elements/Button";
import List from "../components/elements/ListOnline";
import { FormControl, Grid, Typography } from "@material-ui/core";

import "../assets/css/challenge.css";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import Button from "../components/elements/Button";
import { useSelector } from "react-redux";

const Challenge = (props) => {
  const history = useHistory();

  let api_data = props.location.state;
  const token = localStorage.getItem("usertoken_hash");
  const decoded_data = Decoder(token);
  const myclass = decoded_data.myclass;
  const name = decoded_data.username;

  const gameID = Math.floor(Math.random() * 10000000);
  const [classsmates, setClassmates] = useState([]);
  const [classsmatesSearch, setSearchClassmates] = useState([]);
  const [selected, setSelected] = useState("");
  const [multiplayer, setMultiplayer] = useState(false);
  const [mode, setmode] = useState(true);
  let [socket, setsocket] = useState(null);

  const onlineUsersState = useSelector(
    (state) => state.UserReducer.onlineUsers
  );

  useEffect(() => {
    socket = io.connect(SOCKET__URL);
    setsocket(socket);
  }, []);

  useEffect(() => {
    if (onlineUsersState) {
      const serial = onlineUsersState.filter((i) => {
        if (i.myclass === myclass && i.username !== name) {
          return i;
        } else {
          return false;
        }
      });
      setClassmates(serial);
    }
  }, [onlineUsersState]);

  useEffect(() => {
    getClassMateSearch_Api(decoded_data.myclass).then((res) => {
      let newData;
      if (res) {
        newData = res.filter((item) => {
          if (item.value !== name) {
            return item;
          }
          return false;
        });

        setSearchClassmates(newData);
      }
    });

    // getClassMate_Api(decoded_data.myclass).then((res) => {t
    //   let newData2;
    //   if (res) {
    //     newData2 = res.filter((item, i) => {
    //       if (item.username !== name) {
    //         return item;
    //       }
    //       return false;
    //     });

    //     setClassmates(newData2.slice(0, 30));
    //   }
    // });
  }, [api_data]);

  const handleInvite = async (item) => {
    let challenge_data = {
      username: item.username,
      gameID: gameID,
      challenger: name,
      deviceToken: item.deviceToken,
    };
    socket.emit("send_invite", challenge_data);
    // Decline_Challenge_API(decline_data);
    // Send_Challenge_API(challenge_data);
    history.push({
      pathname: "/game",
      state: {
        req_api_data: api_data,
        gameID: gameID,
        challenger: item.username,
      },
    });
  };

  const HandleMultiplayer = () => {
    setMultiplayer(true);
    setmode(false);
  };

  const HandleSingleplayer = () => {
    history.push({
      pathname: "/singleplayer",
      state: { name, api_data },
    });
  };
  const gamelink = `${APP_URL}/join/${gameID}`;

  return (
    <div>
      {api_data === undefined ? (
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
          <HeroSecondary
            className="illustration-section-02"
            show={false}
            img="https://cdn.dribbble.com/users/1731254/screenshots/9444138/media/f50f71009b856bff1faf93422d83771b.png"
          />

          {mode && (
            <ButtonGroup className="centerdiv reveal-from-bottom">
              <CustomButton
                tag="a"
                color="primary"
                wideMobile
                onClick={HandleSingleplayer}
              >
                {props.t("single")}
              </CustomButton>
              <CustomButton color="dark" wideMobile onClick={HandleMultiplayer}>
                {props.t("multiplay")}
              </CustomButton>
            </ButtonGroup>
          )}

          {multiplayer && (
            <>
              <div class="input-block">
                <FormControl className="input" style={{ maxWidth: "350px" }}>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder={props.t("searchfriend")}
                    isSearchable={true}
                    name="schoolname"
                    options={classsmatesSearch}
                    onChange={(e) =>
                      setSelected({
                        username: e.value,
                        deviceToken: e.deviceToken,
                      })
                    }
                  />
                </FormControl>
                {selected !== "" && (
                  <Grid container justify="center">
                    <CustomButton
                      color="primary"
                      wideMobile
                      onClick={() => handleInvite(selected)}
                    >
                      {props.t("challenge")}
                    </CustomButton>
                  </Grid>
                )}
              </div>
              <Typography
                style={{ textAlign: "center", color: "#6163FF" }}
                variant="h5"
                gutterBottom
              >
                {props.t("onlineUsers")}
              </Typography>
              {classsmates.map((item, i) => (
                <List
                  item={item}
                  key={i}
                  onClick={() => handleInvite(item)}
                  buttontitle={props.t("challenge")}
                  gamelink={gamelink}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default withNamespaces()(Challenge);
