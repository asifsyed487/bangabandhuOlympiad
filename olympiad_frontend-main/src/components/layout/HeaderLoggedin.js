import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import io from "socket.io-client";
import { withNamespaces } from "react-i18next";
import Decoder from "jwt-decode";

import { Link, useHistory } from "react-router-dom";
import NotiImg from "../../assets/images/bell.svg";
import { SaveOnlineUsers } from "../../redux/actions/SaveOnlineUsers";
import Image from "../elements/Image";
import { Badge, Grid, Popover, Typography } from "@material-ui/core";
import {
  APP_URL,
  Decline_Challenge_API,
  Get_Challenge_API,
  Send_Challenge_API,
  SOCKET__URL,
} from "../../utils/Api";
import { ChallengeAction } from "../../redux/actions/ChallengeAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "../elements/Button";
import LogoHeader from "./partials/LogoHeader";
import { setNotificationAction } from "../../redux/actions/setNotification";
const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  t,
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const nav = useRef(null);
  const hamburger = useRef(null);
  const token = localStorage.usertoken_hash;
  const userinfo = Decoder(token);
  const [anchorEl, setAnchorEl] = useState(null);
  let [socket, setsocket] = useState(null);
  const [onlineusers, setOnlineusers] = useState(null);

  const state = useSelector((state) => state.challengeReducer.gameInfo);
  const noti = useSelector((state) => state.challengeReducer.noti);

  useEffect(() => {
    const user_data = {
      myclass: userinfo.myclass,
      username: userinfo.username,
      schoolname: userinfo.schoolname,
    };
    socket = io.connect(SOCKET__URL);
    setsocket(socket);
    socket.emit("online_users", user_data);
  }, []);

  useEffect(() => {
    socket.on("user_list", (online_users) => {
      console.log(online_users);
      setOnlineusers(online_users);
      dispatch(SaveOnlineUsers(online_users));
    });
    socket.on("receive_message", (data) => {
      dispatch(setNotificationAction(1));
      dispatch(ChallengeAction(data));
    });
    socket.on("decline_message", (data) => {
      dispatch(setNotificationAction(0));
      dispatch(ChallengeAction(""));
    });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     Get_Challenge_API(userinfo.username).then((res) => {
  //       if (res.gameID !== "null" && res.challenger !== "null") {
  //         dispatch(setNotificationAction(1));
  //         dispatch(ChallengeAction(res));
  //       } else {
  //         dispatch(setNotificationAction(0));
  //       }
  //     });
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.addEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const handledeclineChallenge = async () => {
    let decline_data = {
      username: state.challenger,
      declined: true,
    };
    // let challenge_data = {
    //   username: userinfo.username,
    //   gameID: "null",
    //   challenger: "null",
    // };
    await dispatch(setNotificationAction(0));
    await dispatch(ChallengeAction(""));
    socket.emit("decline_invite", decline_data);
  };

  const hadnleAcceptChallenge = async () => {
    // let challenge_data = {
    //   username: userinfo.username,
    //   gameID: "null",
    //   challenger: "null",
    // };
    await dispatch(setNotificationAction(0));
    await dispatch(ChallengeAction(""));

    await history.push({
      pathname: "/joingame",
      state: { gameID: state.gameID, name: userinfo.username },
    });
  };

  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          style={{ paddingTop: "70px" }}
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <LogoHeader />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">{t("menu")}</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li>
                      <a href={`${APP_URL}/manual.pdf`}>{t("howtoplay")}</a>
                    </li>
                    <li>
                      <Link to="/settings">{t("settings")}</Link>
                    </li>
                    <li>
                      <Link to="/leaderboard">{t("leaderboard")}</Link>
                    </li>
                    <li>
                      <Link to={`/profile/${userinfo.username}`}>
                        {t("profile")}
                      </Link>
                    </li>
                  </ul>
                  {!hideSignin && (
                    <ul className="list-reset header-nav-right">
                      <li onClick={handleClick}>
                        <Badge badgeContent={noti} color="error">
                          <Image src={NotiImg} height={20} width={20} />
                        </Badge>
                        {state && (
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                          >
                            <Grid container>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  align="center"
                                  style={{ color: "black" }}
                                >
                                  {state.challenger} {t("challengefriend")}
                                </Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Button
                                  style={{
                                    backgroundColor: "#00ff00",
                                    margin: "10px",
                                    borderRadius: "10px",
                                  }}
                                  onClick={hadnleAcceptChallenge}
                                >
                                  Accept
                                </Button>
                                <Button
                                  style={{
                                    backgroundColor: "red",
                                    margin: "10px",
                                    borderRadius: "10px",
                                  }}
                                  onClick={handledeclineChallenge}
                                >
                                  Decline
                                </Button>
                              </Grid>
                            </Grid>
                          </Popover>
                        )}
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={logOut}
                        >
                          {t("logout")}
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withNamespaces()(Header);
