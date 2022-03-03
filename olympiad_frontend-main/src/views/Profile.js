import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
  Select,
  MenuItem,
  Modal,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import {
  getClassMate_Api,
  Get_Leaderboard_Api,
  Get_Profile_Api,
  Update_Class_Api,
} from "../utils/Api";
import Decoder from "jwt-decode";
import { withNamespaces } from "react-i18next";
import ListComp from "../components/elements/ListComp";
import Loading from "../components/elements/Loading";
import ListMode from "../components/elements/ListMode";
import { Alert } from "@material-ui/lab";

const Profile = ({
  t,
  match: {
    params: { id },
  },
}) => {
  const token = localStorage.usertoken_hash;
  const decodedata = Decoder(token);
  const classes = useStyles();
  const history = useHistory();
  const [newClass, serNewClass] = useState(decodedata.myclass);
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myscore, setMyscore] = useState();
  const [classsmates, setClassmates] = useState("");
  const [value, setValue] = useState(0);
  let name;
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowALeert] = useState({
    show: false,
    msg: "",
  });
  const [modalStyle] = React.useState(getModalStyle);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setClassmates("");
    Get_Profile_Api(id).then((res) => setUserdata(res));
  }, [id, loading]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (userdata !== null) {
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
      Get_Leaderboard_Api(userdata.myclass).then((res) => {
        res.points.filter((x) => {
          if (x.name === userdata.username) {
            setMyscore(x);
          }
        });
      });
    }
  }, [userdata]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleUpdateClass = () => {
    if (newClass && userdata) {
      const userDataChange = {
        username: userdata.username,
        myclass: newClass,
      };
      Update_Class_Api(userDataChange).then((res) => {
        if (res === "Done") {
          setShowALeert({ ...showAlert, show: true, msg: "Class Updated" });
          setLoading(true);
          handleClose();
          setTimeout(() => {
            setShowALeert(false);
          }, 5000);
        } else {
          handleClose();
          setShowALeert({
            ...showAlert,
            show: true,
            msg: "Class Update Failed",
          });
          setTimeout(() => {
            setShowALeert(false);
          }, 5000);
        }
      });
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {newClass !== undefined && (
        <FormControl className="input">
          <InputLabel id="demo-simple-select-label">{t("class")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newClass}
            onChange={(e) => serNewClass(e.target.value)}
            name="class"
          >
            {options.map((item) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="8vh"
      >
        <Button onClick={handleUpdateClass} variant="contained" color="primary">
          {t("updateclass")}
        </Button>
      </Box>
    </div>
  );

  if (!id) {
    return <Redirect to="/adkh" />;
  }

  // const seeProfile = (id) => {
  //   history.push({
  //     pathname: `/profile/${id}`,
  //   });
  // };

  return (
    <>
      {classsmates !== "" && loading !== true ? (
        <div>
          {showAlert.show && <Alert severity="success">{showAlert.msg}</Alert>}
          {userdata && (
            <div className={classes.root}>
              <Grid container justify="center">
                <Grid item xs={12} sm={4}>
                  <h3 className={classes.title}>{userdata.fullname}</h3>
                  <p className={classes.title}>{userdata.schoolname}</p>
                  {/* <p className={classes.title}>
                    {t("class")} {userdata.myclass}
                  </p> */}
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
              >
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="primary"
                >
                  {t("updateclass")}
                </Button>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>

              <h4 className={classes.title}>{t("mybadges")}</h4>
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
                      <p style={{ textAlign: "center" }}>{t("lvl1")}</p>
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
                      <p style={{ textAlign: "center" }}>{t("lvl2")}</p>
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
                      <p style={{ textAlign: "center" }}>{t("lvl3")}</p>
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
                      <p style={{ textAlign: "center" }}>{t("lvl4")}</p>
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
                      <p style={{ textAlign: "center" }}>{t("lvl5")}</p>
                    </Grid>
                  )}
                </Grid>
              )}

              <Grid container spacing={3} className={classes.stat}>
                <Grid item xs={12} sm={6} justify="center">
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
                          label={t("multiplay")}
                          {...a11yProps(0)}
                        />
                        <Tab
                          className={classes.white}
                          textColor="secondary"
                          label={t("single")}
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Paper>
                  </Grid>
                  {userdata && (
                    <TabPanel value={value} index={0}>
                      {userdata.gamedata.map((item) => (
                        <ListMode
                          username={`${item.myscore}   ${t("points")}`}
                          total={
                            item.result === "You have lost the game!"
                              ? t("lostgame")
                              : item.result === "You have won the game!"
                              ? t("wongame")
                              : t("drawgame")
                          }
                          date={item.time.substring(0, 10)}
                          item={item}
                          name={userdata.username}
                          buttontitle={t("seemore")}
                          pathname="/resultmuilti"
                        />
                      ))}
                    </TabPanel>
                  )}
                  {userdata && (
                    <TabPanel value={value} index={1}>
                      {userdata.singlegamedata.map((item) => (
                        <ListMode
                          username={`${item.myscore}   ${t("points")}`}
                          date={item.time.substring(0, 10)}
                          item={item}
                          name={userdata.username}
                          buttontitle={t("seemore")}
                          pathname="/resultsingle"
                        />
                      ))}
                    </TabPanel>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} justify="center">
                  <h3 className={classes.friends}>{t("classmatelist")}</h3>
                  {classsmates.map((item, i) => (
                    <ListComp item={item} key={i} />
                  ))}
                </Grid>
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

export default withNamespaces()(Profile);
const useStyles = makeStyles((theme) => ({
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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

const options = [
  { value: "5", label: "Five" },
  { value: "6", label: "Six" },
  { value: "7", label: "Seven" },
  { value: "8", label: "Eight" },
  { value: "9_10", label: "Nine" },
  { value: "9_10", label: "Ten" },
  { value: "11_12", label: "Eleven" },
  { value: "11_12", label: "Tweleve" },
];
