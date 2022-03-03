import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router-dom";
import ListComp from "../components/elements/ListComp";
import Loading from "../components/elements/Loading";
import { school_Dashboard } from "../utils/Api";

const DashboardSchool = (props) => {
  const history = useHistory();
  const infoSchool = props.location.state;
  const [data, setData] = useState("");

  useEffect(() => {
    school_Dashboard(infoSchool).then((res) => {
      setData(res);
    });
  }, [infoSchool]);

  const seeProfile = (id) => {
    history.push({
      pathname: `/dashboardprofile`,
      state: id,
    });
  };

  return (
    <Grid container justify="center" style={{ marginTop: "100px" }}>
      {data !== "" ? (
        <Grid item justify="center">
          {infoSchool && (
            <Typography variant="h5" gutterBottom align="center">
              {infoSchool}
            </Typography>
          )}
          {infoSchool && (
            <Typography variant="h6" gutterBottom align="center"></Typography>
          )}

          {data && (
            <Typography variant="h6" gutterBottom align="center">
              {props.t("registered")}
              {data.totalStudents}
            </Typography>
          )}
          {data.data.length > 0 &&
            data.data.map((item, i) => (
              <ListComp
                item={item}
                key={i}
                onClick={() => seeProfile(item.username)}
                buttontitle={props.t("seeprofile")}
              />
            ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};
export default withNamespaces()(DashboardSchool);
