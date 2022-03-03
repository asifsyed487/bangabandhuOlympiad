import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";
import Decoder from "jwt-decode";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Get_Leaderboard_Api } from "../utils/Api";
import ListLeader from "../components/elements/ListLeader";
import Loading from "../components/elements/Loading";

const LeaderBoard = ({ t }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [data, setData] = useState("");

  const token = localStorage.getItem("usertoken_hash");
  const decoded_data = Decoder(token);
  const myclass = decoded_data.myclass;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const api_data = {
      myclass: myclass,
      skip: 0,
      limit: 50,
    };
    Get_Leaderboard_Api(api_data).then((res) => setData(res));
  }, []);

  return (
    <div style={{ marginTop: "120px" }}>
      <div className={classes.root} />

      {data === "" ? (
        <div>
          <Grid className={classes.root}>
            <Loading />
          </Grid>
        </div>
      ) : (
        <div>
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
                  label={t("single")}
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.white}
                  label={t("multiplay")}
                  {...a11yProps(1)}
                />
                {/*   <Tab
                  className={classes.white}
                  label={t("bylose")}
                  {...a11yProps(2)}
                />
                <Tab
                  className={classes.white}
                  label={t("bydraw")}
                  {...a11yProps(3)}
                /> */}
              </Tabs>
            </Paper>
          </Grid>

          {data && (
            <TabPanel value={value} index={0}>
              {data.points.map((item, i) => (
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
          {data && (
            <TabPanel value={value} index={1}>
              {data.totalwin.map((item, i) => (
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
        </div>
      )}
    </div>
  );
};

export default withNamespaces()(LeaderBoard);

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
const useStyles = makeStyles(() => ({
  root: {
    marginTop: "100px",
  },

  stat: {
    marginTop: "50px",
  },

  white: {
    color: "white",
  },
  dark: {
    backgroundColor: "black",
  },
}));
