import React, { useState } from "react";
import "../assets/css/login.css";
import MyInput from "../components/elements/MyInput";
import Button from "../components/elements/Button";
import { useHistory } from "react-router-dom";
import { Login_api } from "../utils/Api";
import Loading from "../components/elements/Loading";
import { Grid } from "@material-ui/core";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import { LoginAction } from "../redux/actions/LogInAction";
import { useDispatch } from "react-redux";
import { withNamespaces } from "react-i18next";
const Login = ({ t, gameId }) => {
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

  const handleLogin = (e) => {
    setLoading(true);
    Login_api(userdata).then((res) => {
      if (res) {
        if (res === "password doesn't match") {
          setError(t("errorpass"));
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 2500);
          setLoading(false);
        } else if (res === "User does not exist") {
          setError(t("errorusername"));
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 2500);
          setLoading(false);
        } else {
          dispatch(LoginAction(true));
          history.push("/subjects");
        }
      }
    });
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
            <div style={{ marginTop: "10px" }}>
              <Button
                tag="button"
                onClick={() => history.push("/signup")}
                color="primary"
                style={{ minWidth: "140px" }}
              >
                {t("register")}
              </Button>
            </div>
            <Button
              style={{
                backgroundColor: "transparent",
                color: "black",
              }}
              onClick={() => history.push("/forgetpass")}
            >
              {t("forgetpass")}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withNamespaces()(Login);
