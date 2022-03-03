import React, { useState } from "react";
import "../assets/css/login.css";
import MyInput from "../components/elements/MyInput";
import Button from "../components/elements/Button";
import { useHistory } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import Loading from "../components/elements/Loading";
import { Grid } from "@material-ui/core";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { school_Admin_Login } from "../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { AdminLoginAction } from "../redux/actions/AdminLoggedIn";
const SchoolLogin = ({ t }) => {
  const [error, setError] = useState("");
  const history = useHistory();
  const [userdata, setuserdata] = useState({
    EIIN: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    setLoading(true);
    if (userdata) {
      school_Admin_Login(userdata).then((res) => {
        if (res === "User does not exist") {
          setError(t("errorusername"));
        } else if (res === "password doesn't match") {
          setError(t("errorpass"));
        } else if (res.status === 200) {
          dispatch(AdminLoginAction(true));

          history.push({
            pathname: "/Schooldashboardadmin",
            state: res.data,
          });
        }
      });
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <HeaderWaiting
        className="illustration-section-01"
        header={t("welcome")}
        sub={` ${t("title")} ${t("logininfo")}`}
      />
      {loading && <Loading />}
      <Grid container justify="center">
        <Grid item md={3} className="logincontainer">
          <img
            className="imglogin"
            src="https://cdn.dribbble.com/users/402790/screenshots/4286345/artboard_copy_2x.png"
            alt="img"
          />

          <MyInput
            name="EIIN"
            placeholder={t("eiinschool")}
            value={userdata.username}
            onChange={handleChange}
            type="text"
          />
          <MyInput
            name="password"
            placeholder={t("password")}
            value={userdata.password}
            onChange={handleChange}
            type="password"
          />
          <div className="buttonlogin">
            <Button
              tag="button"
              onClick={handleLogin}
              color="primary"
              style={{ minWidth: "140px" }}
            >
              {t("loginmain")}
            </Button>
            <div style={{ marginTop: "10px" }}></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withNamespaces()(SchoolLogin);
