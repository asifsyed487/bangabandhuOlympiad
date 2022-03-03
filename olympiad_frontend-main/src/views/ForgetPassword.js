import React, { useState } from "react";
import "../assets/css/login.css";
import MyInput from "../components/elements/MyInput";
import Button from "../components/elements/Button";
import { useHistory } from "react-router-dom";
import { ForgetPaass_Api, SetPass_Api } from "../utils/Api";
import Loading from "../components/elements/Loading";
import { Grid } from "@material-ui/core";
import HeaderWaiting from "../components/sections/HeaderWaiting";

import { withNamespaces } from "react-i18next";
const ForgetPassword = ({ t }) => {
  const history = useHistory();

  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [userdata, setuserdata] = useState({
    username: "",
    phonenumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [newPassshow, setnewPassshow] = useState(false);
  const handleChange = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecover = (e) => {
    setLoading(true);
    ForgetPaass_Api(userdata).then((res) => {
      if (res) {
        console.log(res);
        if (res === "User does not exist") {
          setError(t("Enter Correct Username and phonenumber"));
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 2500);
          setLoading(false);
        } else if (res === "Set New Password!") {
          setnewPassshow(true);
        }
      }
    });
  };
  const [password, setpassword] = useState({
    username: userdata.username,
    password: "",
    confirm: "",
  });
  const handleChangePass = (e) => {
    setpassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveNewPass = () => {
    if (
      password.password === password.confirm &&
      password.password &&
      password.confirm !== ""
    ) {
      let data_pass = {
        username: userdata.username,
        password: password.password,
      };
      SetPass_Api(data_pass).then((res) => {
        if (res.data === "done") {
          history.push("/login");
        }
      });
    }
  };
  //   console.log(password);
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

          {newPassshow === false ? (
            <>
              <MyInput
                name="username"
                placeholder="Username"
                value={userdata.username}
                onChange={handleChange}
                type="text"
              />
              <MyInput
                name="phonenumber"
                placeholder="Phone Number"
                value={userdata.phonenumber}
                onChange={handleChange}
                type="number"
              />
              {toggle && (
                <div>
                  <h6 className="errorlogin">{error}</h6>
                </div>
              )}
              <div className="buttonlogin">
                <Button
                  tag="button"
                  onClick={handleRecover}
                  color="primary"
                  style={{ minWidth: "140px" }}
                >
                  {t("recover")}
                </Button>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    tag="button"
                    onClick={() => history.push("/login")}
                    color="primary"
                    style={{ minWidth: "140px" }}
                  >
                    {t("login")}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <MyInput
                name="password"
                placeholder={t("newpass")}
                value={password.password}
                onChange={handleChangePass}
                type="password"
              />
              <MyInput
                name="confirm"
                placeholder={t("confirm")}
                value={password.confirm}
                onChange={handleChangePass}
                type="password"
              />

              <div className="buttonlogin">
                <Button
                  tag="button"
                  onClick={handleSaveNewPass}
                  color="primary"
                  style={{ minWidth: "140px" }}
                >
                  {t("recover")}
                </Button>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    tag="button"
                    onClick={() => history.push("/login")}
                    color="primary"
                    style={{ minWidth: "140px" }}
                  >
                    {t("login")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default withNamespaces()(ForgetPassword);
