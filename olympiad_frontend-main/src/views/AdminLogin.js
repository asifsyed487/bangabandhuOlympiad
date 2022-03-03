import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import MyInput from "../components/elements/MyInput";
import Button from "../components/elements/Button";
import { useHistory } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import Loading from "../components/elements/Loading";
import { Grid } from "@material-ui/core";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { Admin_Login_api } from "../utils/Api";
import { useDispatch } from "react-redux";
import { AdminLoginAction } from "../redux/actions/AdminLoggedIn";
const AdminLogin = ({ t, gameId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [userdata, setuserdata] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("usertoken_hash_bank");
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  const handleLogin = (e) => {
    setLoading(true);
    if (userdata) {
      Admin_Login_api(userdata).then((res) => {
        if (res === "loggedIN") {
          dispatch(AdminLoginAction(true));
          history.push("/dashboard");
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
            name="username"
            placeholder={t("username")}
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
            {toggle && (
              <div>
                <h6 className="errorlogin">{error}</h6>
              </div>
            )}
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

export default withNamespaces()(AdminLogin);
