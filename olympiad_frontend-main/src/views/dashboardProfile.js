import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import {
  getClassMate_Api,
  Get_Leaderboard_Api,
  Get_Profile_Api,
  URL,
} from "../utils/Api";

import { withNamespaces } from "react-i18next";
import Loading from "../components/elements/Loading";
import ListMode from "../components/elements/ListMode";

const DashboardProfile = (props) => {
  const id = props.location.state;
  const classes = useStyles();

  const [userdata, setUserdata] = useState("");
  const [loading, setLoading] = useState(true);
  const [myscore, setMyscore] = useState();
  const [classsmates, setClassmates] = useState("");
  const [value, setValue] = useState(0);
  let name;

  useEffect(() => {
    setClassmates("");
    Get_Profile_Api(id).then((res) => setUserdata(res));
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (userdata) {
      getClassMate_Api(userdata.myclass).then((res) => {
        let newData;
        name = userdata.username;
        if (res) {
          newData = res.filter((item, i) => {
            if (item.username !== name) {
              return item;
            }
            return false;
          });

          setClassmates(newData);
        }
      });
    }
    Get_Leaderboard_Api(userdata.myclass).then((res) => {
      res.points.filter((x) => {
        if (x.name === userdata.username) {
          setMyscore(x);
        }
      });
    });
  }, [userdata]);

  if (!id) {
    return <Redirect to="/adkh" />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {classsmates !== "" && loading !== true ? (
        <div>
          {userdata && (
            <div className={classes.root}>
              <Grid container justify="center">
                <Grid item xs={12} sm={4}>
                  <h3 className={classes.title}>{userdata.fullname}</h3>
                  <p className={classes.title}>{userdata.schoolname}</p>
                </Grid>
              </Grid>
              <h4 className={classes.title}>{props.t("mybadges")}</h4>
              {myscore && (
                <Grid container justify="center">
                  {myscore.score >= 500 && (
                    <Grid item sm={2}>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <img
                          className={classes.badges}
                          src={`https://www.flaticon.com/svg/static/icons/svg/3068/3068287.svg`}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>{props.t("lvl1")}</p>
                    </Grid>
                  )}
                  {myscore.score >= 1000 && (
                    <Grid item sm={2}>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <img
                          className={classes.badges}
                          src={`https://www.flaticon.com/svg/static/icons/svg/3068/3068296.svg`}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>{props.t("lvl2")}</p>
                    </Grid>
                  )}
                  {myscore.score >= 1500 && (
                    <Grid item sm={2}>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <img
                          className={classes.badges}
                          src={`https://www.flaticon.com/svg/static/icons/svg/3068/3068321.svg`}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>{props.t("lvl3")}</p>
                    </Grid>
                  )}
                  {myscore.score >= 2000 && (
                    <Grid item sm={2}>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <img
                          className={classes.badges}
                          src={`https://www.flaticon.com/svg/static/icons/svg/3068/3068337.svg`}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>{props.t("lvl4")}</p>
                    </Grid>
                  )}
                  {myscore.score >= 2500 && (
                    <Grid item sm={2}>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <img
                          className={classes.badges}
                          src={`https://www.flaticon.com/svg/static/icons/svg/1170/1170611.svg`}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>{props.t("lvl5")}</p>
                    </Grid>
                  )}
                </Grid>
              )}

              <Grid container justify="center">
                <Grid container justify="center">
                  <Paper square className={classes.dark}>
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="secondary"
                      onChange={handleChange}
                    >
                      <Tab
                        className={classes.white}
                        label={props.t("multiplay")}
                        {...a11yProps(0)}
                      />
                      <Tab
                        className={classes.white}
                        textColor="secondary"
                        label={props.t("single")}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Paper>
                </Grid>
                {userdata && (
                  <TabPanel value={value} index={0}>
                    {userdata.gamedata.map((item) => (
                      <ListMode
                        username={`${item.myscore}   ${props.t("points")}`}
                        total={
                          item.result === "You have lost the game!"
                            ? props.t("lostgame")
                            : item.result === "You have won the game!"
                            ? props.t("wongame")
                            : props.t("drawgame")
                        }
                        date={item.time.substring(0, 10)}
                        item={item}
                        name={userdata.username}
                        img={`${URL}/${userdata.imgname}`}
                        buttontitle={props.t("seemore")}
                        pathname="/resultboard"
                      />
                    ))}
                  </TabPanel>
                )}
                {userdata && (
                  <TabPanel value={value} index={1}>
                    {userdata.singlegamedata.map((item) => (
                      <ListMode
                        username={`${item.myscore}   ${props.t("points")}`}
                        date={item.time.substring(0, 10)}
                        item={item}
                        name={userdata.username}
                        img={`${URL}/${userdata.imgname}`}
                        buttontitle={props.t("seemore")}
                        pathname="/resultboard"
                      />
                    ))}
                  </TabPanel>
                )}
              </Grid>
            </div>
          )}
        </div>
      ) : (
        <Grid className={classes.root}>
          <Loading />
        </Grid>
      )}
    </>
  );
};

export default withNamespaces()(DashboardProfile);
const useStyles = makeStyles(() => ({
  root: {
    marginTop: "100px",
  },
  title: {
    textAlign: "center",
  },
  stat: {
    marginTop: "50px",
  },
  avatar: {
    height: "300px",
    width: "300px",
    borderRadius: "50%",
  },
  icon: {
    width: "30px",
  },
  friends: {
    textAlign: "center",
  },
  white: {
    color: "white",
  },
  dark: {
    backgroundColor: "black",
  },
  badges: {
    height: "50px",
    width: "50px",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
