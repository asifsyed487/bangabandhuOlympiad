import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ListComp from "../components/elements/ListComp";
import Loading from "../components/elements/Loading";
import { school_Dashboard } from "../utils/Api";

const SchoolDashboard = (props) => {
  const history = useHistory();
  const infoSchool = props.location.state.data;
  const [data, setData] = useState("");
  const state = useSelector((state) => state.UserReducer.adminLOggedIn);
  useEffect(() => {
    if (state === false) {
      history.push("/");
    }

    school_Dashboard(infoSchool.INSTITUTE_NAME).then((res) => {
      setData(res);
    });
  }, [infoSchool]);
  let result;
  const seeProfile = (id) => {
    history.push({
      pathname: `/dashboardprofile`,
      state: id,
    });
  };
  if (data) {
    result = [
      ...data.data
        .reduce((mp, o) => {
          if (!mp.has(o.myclass)) mp.set(o.myclass, { ...o, count: 0 });
          mp.get(o.myclass).count++;
          return mp;
        }, new Map())
        .values(),
    ];
  }

  console.log(result);
  return (
    <Grid container justify="center" style={{ marginTop: "200px" }}>
      {data !== "" ? (
        <Grid item justify="center">
          {infoSchool && (
            <Typography variant="h5" gutterBottom align="center">
              {infoSchool.INSTITUTE_NAME}
            </Typography>
          )}
          {infoSchool && (
            <Typography variant="h6" gutterBottom align="center">
              EIIN: {infoSchool.EIIN}
            </Typography>
          )}

          {data && (
            <Typography variant="h6" gutterBottom align="center">
              {props.t("registered")}
              {data.totalStudents}
            </Typography>
          )}
          {result &&
            result.map((result) => (
              <Typography variant="h6" gutterBottom align="center">
                {props.t("registered")} {props.t("class")} {result.myclass} :
                {result.count}
              </Typography>
            ))}
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
export default withNamespaces()(SchoolDashboard);
