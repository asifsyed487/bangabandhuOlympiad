import {
  Box,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link, useHistory } from "react-router-dom";
import {
  Get_Schools_Api,
  Get_Leaderboard_Api,
  borad_Dashboard,
  Get_Questions_Api,
  total_school_Register,
  testApi,
  get_Total_Subjects,
} from "../utils/Api";
import Button from "../components/elements/Button";
import ListLeader from "../components/elements/ListLeader";
import { Select as MSelect, FormControl, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";

const BoardDashboard = ({ t }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [valueleader, setValueleader] = useState(0);
  const mounted = useRef(false);
  const history = useHistory();
  const [schools, setSchools] = useState();
  const [dashboard, setdashboard] = useState("");
  const [totalRegister, settotalResgiter] = useState("");
  const [selectedCLass, setSelectedCLass] = useState("5");
  const [leaderboard, setLeaderboard] = useState("");
  const [totalSubjects, setTotalSubjects] = useState(null);
  const [skip, setSkip] = useState(0);

  const [quens, setQuens] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeLEader = (event, newValue) => {
    setValueleader(newValue);
  };
  const state = useSelector((state) => state.UserReducer.adminLOggedIn);

  useEffect(() => {
    if (state === false) {
      history.push("/");
    }

    mounted.current = true;
    Get_Schools_Api()
      .then((res) => setSchools(res))
      .catch((err) => err);
    borad_Dashboard()
      .then((res) => {
        setdashboard(res);
      })
      .catch((err) => err);
    total_school_Register()
      .then((resData) => settotalResgiter(resData))
      .catch((err) => err);
    get_Total_Subjects()
      .then((resData) => setTotalSubjects(resData))
      .catch((err) => err);
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    mounted.current = true;
    const data = {
      myclass: selectedCLass,
      skip: 0,
      limit: 500,
    };
    Get_Leaderboard_Api(data)
      .then((res) => setLeaderboard(res))
      .catch((err) => err);

    return () => {
      mounted.current = false;
    };
  }, [selectedCLass]);

  useEffect(() => {
    Get_Questions_Api(skip).then((res) => setQuens(res));
  }, [skip]);

  return (
    <div className={classes.root}>
      {dashboard !== "" && (
        <Grid container justify="center">
          <Paper square className={classes.dark}>
            <Typography variant="h6" gutterBottom>
              {t("registered")} : {dashboard.Student}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t("registeredschool")} : {dashboard.School}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t("points")} : {dashboard.totalPoints}
            </Typography>
            {/* <Typography variant="h6" gutterBottom>
              {t("gamesplayed")} : {dashboard.totalGame}
            </Typography> */}
          </Paper>
        </Grid>
      )}
      <Grid container justify="center" spacing={3} className={classes.stat}>
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
                label={t("schools")}
                {...a11yProps(0)}
              />
              <Tab
                className={classes.white}
                textColor="secondary"
                label={t("leaderboard")}
                {...a11yProps(1)}
              />

              <Tab
                className={classes.white}
                textColor="secondary"
                label={t("quens")}
                {...a11yProps(2)}
              />
              <Tab
                className={classes.white}
                textColor="secondary"
                label={t("registerschool")}
                {...a11yProps(3)}
              />
              <Tab
                className={classes.white}
                textColor="secondary"
                label={t("totalsubjects")}
                {...a11yProps(4)}
              />
            </Tabs>
          </Paper>
        </Grid>

        <TabPanel value={value} index={0}>
          {schools &&
            schools.map((i) => (
              <Link to={{ pathname: "/dashboardschool", state: i }}>
                <Typography variant="h6" gutterBottom>
                  {i}
                </Typography>
                <Button>See Details</Button>
              </Link>
            ))}
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container justify="center">
            <Paper square className={classes.dark}>
              <Tabs
                value={valueleader}
                indicatorColor="primary"
                textColor="secondary"
                onChange={handleChangeLEader}
              >
                <Tab
                  className={classes.white}
                  label={t("single")}
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.white}
                  textColor="secondary"
                  label={t("multiplay")}
                  {...a11yProps(1)}
                />
              </Tabs>

              <FormControl
                className="input"
                style={{
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "20px",
                }}
              >
                <MSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCLass}
                  onChange={(e) => setSelectedCLass(e.target.value)}
                  name="class"
                >
                  {options.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </MSelect>
              </FormControl>

              {leaderboard && (
                <TabPanel value={valueleader} index={0}>
                  {leaderboard.points.map((item, i) => (
                    <ListLeader
                      i={i}
                      username={item.name}
                      total={`${item.score}   ${t("points")}`}
                      played={item.played}
                      schoolname={item.schoolname}
                    />
                  ))}
                </TabPanel>
              )}
              {leaderboard && (
                <TabPanel value={valueleader} index={1}>
                  {leaderboard.totalwin.map((item, i) => (
                    <ListLeader
                      i={i}
                      username={item.name}
                      schoolname={item.schoolname}
                      total={`${item.totalwin}   ${t("wins")}`}
                      totaldraw={`${item.totaldraw}   ${t("draw")}`}
                      totallost={`${item.totallost}   ${t("lose")}`}
                    />
                  ))}
                </TabPanel>
              )}
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="p">Question</TableCell>
                  <TableCell component="p" align="right">
                    Class
                  </TableCell>
                  <TableCell component="p" align="right">
                    Subject
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quens &&
                  quens.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="p" scope="row">
                        {row.question}
                      </TableCell>
                      <TableCell component="p" align="right">
                        {row.Class}
                      </TableCell>
                      <TableCell component="p" align="right">
                        {row.Subject}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid style={{ backgroundColor: "white" }}>
            <Pagination
              count={100}
              color="secondary"
              onChange={(i, page) => {
                setSkip(page * 10);
              }}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {totalRegister &&
            totalRegister.map((school) => {
              return (
                <Grid>
                  <Typography variant="h6" gutterBottom>
                    {school.schoolname}
                  </Typography>
                  <Typography variant="body1">
                    {t("totalregister")} {school.students}
                  </Typography>
                </Grid>
              );
            })}
        </TabPanel>
        {/* <TabPanel value={value} index={4}>
          {totalSubjects &&
            totalSubjects.map((subject) => {
              return (
                <Grid>
                  <Typography variant="h6" gutterBottom>
                    {subject._id.Subject}
                  </Typography>
                  <Typography variant="body1">
                    {t("gamesplayed")} {subject.count}
                  </Typography>
                </Grid>
              );
            })}
        </TabPanel> */}
      </Grid>
    </div>
  );
};
export default withNamespaces()(BoardDashboard);
const useStyles = makeStyles(() => ({
  root: {
    marginTop: "150px",
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
  table: {
    minWidth: 650,
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
