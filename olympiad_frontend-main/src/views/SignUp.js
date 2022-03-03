import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "../components/elements/Button";
import Loading from "../components/elements/Loading";
import MyInput from "../components/elements/MyInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";
import FormControl from "@material-ui/core/FormControl";
import { Select as MSelect } from "@material-ui/core";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import {
  Get_SchoolsName_Api,
  Login_api,
  Register_Api,
  getDistrcits_Api,
} from "../utils/Api";

import { LoginAction } from "../redux/actions/LogInAction";
import { useDispatch } from "react-redux";

const SignUp = ({ t }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [userdata, setuserdata] = useState({
    fullname: "",
    username: "",
    schoolname: "",
    phonenumber: "",
    password: "",
    confirm: "",
    class: "",
    day: "",
    month: "",
    year: "",
    category: null,
  });
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [schools, setSchools] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setuserdata({
        ...userdata,
        [e.target.name]: e.target.value.split(" ").join(""),
      });
    } else {
      setuserdata({
        ...userdata,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRegister = () => {
    setLoading(true);
    if (userdata.category !== 7) {
      if (
        userdata.class &&
        userdata.day &&
        userdata.month &&
        userdata.year &&
        userdata.fullname &&
        userdata.password &&
        userdata.phonenumber &&
        userdata.schoolname &&
        userdata.username &&
        userdata.confirm !== ""
      ) {
        if (userdata.password !== userdata.confirm) {
          setToggle(true);
          setError("password doesnt match");
          setLoading(false);
        } else {
          setToggle(false);
          Register_Api(userdata).then((res) => {
            if (res === "Username already exists") {
              setToggle(true);
              setError(t("usernameexist"));
              setLoading(false);
            } else {
              setToggle(true);

              setError(t("registerdone"));
              setLoading(true);
              const login_data = {
                username: userdata.username,
                password: userdata.password,
              };
              setTimeout(() => {
                Login_api(login_data).then((res) => {
                  if (res) {
                    dispatch(LoginAction(true));
                    history.push("/subjects");
                  }
                });
              }, 1000);
            }
          });
        }
      } else {
        setToggle(!toggle);
        setError(t("allinfo"));
      }
    } else {
      Register_Api(userdata).then((res) => {
        if (res === "Username already exists") {
          setToggle(true);
          setError(t("usernameexist"));
          setLoading(false);
        } else {
          setToggle(true);

          setError(t("registerdone"));
          setLoading(true);
          const login_data = {
            username: userdata.username,
            password: userdata.password,
          };
          setTimeout(() => {
            Login_api(login_data).then((res) => {
              if (res) {
                dispatch(LoginAction(true));
                history.push("/subjects");
              }
            });
          }, 1000);
        }
      });
    }
  };
  let Years = [];
  const years = () => {
    let i;
    for (i = 0; i < 2021; i++) {
      if (i > 1990) {
        Years.push(i);
      }
    }
  };
  years();

  let Days = [];
  const days = () => {
    let i;
    for (i = 1; i <= 31; i++) {
      Days.push(i);
    }
  };
  days();

  useEffect(() => {
    getDistrcits_Api(userdata.madrasha).then((res) => setDivision(res));
  }, [userdata.madrasha]);

  useEffect(() => {
    if (district) {
      Get_SchoolsName_Api(district.value, userdata.madrasha).then((res) =>
        setSchools(res)
      );
    }
  }, [district, userdata.madrasha]);

  return (
    <div style={{ marginTop: "50px" }}>
      <HeaderWaiting
        className="illustration-section-01"
        header={t("welcome")}
        sub={` ${t("title")} ${t("registerinfo")}`}
      />

      {loading && <Loading />}
      <Grid container justify="center">
        <Grid item md={3} className="logincontainer">
          {toggle && (
            <div>
              <h6 className="errorlogin">{error}</h6>
            </div>
          )}
          <img
            className="imglogin"
            src="https://cdn.dribbble.com/users/402790/screenshots/4286343/artboard_2x.png"
            alt="img"
          />
          <MyInput
            name="fullname"
            placeholder={t("fullname")}
            value={userdata.fullname}
            onChange={handleChange}
            type="text"
          />

          <MyInput
            autocapitalize="none"
            name="username"
            placeholder={t("username")}
            value={userdata.username}
            onChange={handleChange}
            type="text"
            auto
          />
          <p style={{ fontSize: 12, textAlign: "center" }}>
            {t("loginhelper")}
          </p>
          <div class="input-block">
            <FormControl className="input">
              <InputLabel id="demo-simple-select-label">
                {t("curriculum")}
              </InputLabel>
              <MSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userdata.category}
                onChange={handleChange}
                name="category"
              >
                {typesOfEducation.map((item) => (
                  <MenuItem value={item.id}>{t(item.name)}</MenuItem>
                ))}
              </MSelect>
            </FormControl>
          </div>
          {userdata.category !== 7 && (
            <div class="input-block">
              {division !== "" && (
                <FormControl className="input">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder={t("selectdistrict")}
                    isSearchable={true}
                    options={division}
                    onChange={(e) => setDistrict(e)}
                  />
                </FormControl>
              )}
            </div>
          )}
          {userdata.category !== 7 && district.value === "OTHER" ? (
            <MyInput
              onChange={handleChange}
              name="schoolname"
              placeholder={t("schoolname")}
              value={userdata.schoolname}
              type="text"
            />
          ) : (
            <div class="input-block">
              {schools !== "" && (
                <FormControl className="input">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder={t("schoolname")}
                    isSearchable={true}
                    name="schoolname"
                    options={schools}
                    onChange={(e) =>
                      setuserdata({ ...userdata, schoolname: e.value })
                    }
                  />
                </FormControl>
              )}
            </div>
          )}

          {userdata.category !== 7 && (
            <div class="input-block">
              <FormControl className="input">
                <InputLabel id="demo-simple-select-label">
                  {t("class")}
                </InputLabel>
                <MSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userdata.class}
                  onChange={handleChange}
                  name="class"
                >
                  {options.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </MSelect>
              </FormControl>
            </div>
          )}

          <div class="input-block">
            <h6 style={{ color: "grey" }}>{t("dob")}</h6>
            <FormControl className="input">
              <InputLabel id="demo-simple-select-label">{t("day")}</InputLabel>
              <MSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userdata.day}
                onChange={handleChange}
                name="day"
              >
                {Days &&
                  Days.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
              </MSelect>
            </FormControl>
          </div>
          <div class="input-block">
            <FormControl className="input">
              <InputLabel id="demo-simple-select-label">
                {t("month")}
              </InputLabel>
              <MSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userdata.month}
                onChange={handleChange}
                name="month"
              >
                {months &&
                  months.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
              </MSelect>
            </FormControl>
          </div>
          <div class="input-block">
            <FormControl className="input">
              <InputLabel id="demo-simple-select-label">{t("year")}</InputLabel>
              <MSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userdata.year}
                onChange={handleChange}
                name="year"
              >
                {Years &&
                  Years.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
              </MSelect>
            </FormControl>
          </div>

          <MyInput
            name="phonenumber"
            placeholder={`${t("phone")}`}
            value={userdata.phonenumber}
            onChange={handleChange}
            type="number"
          />

          <MyInput
            name="password"
            placeholder={t("password")}
            value={userdata.password}
            onChange={handleChange}
            type="password"
          />
          <p style={{ fontSize: 12, textAlign: "center" }}>{t("passhelper")}</p>
          <MyInput
            name="confirm"
            placeholder={t("confirm")}
            value={userdata.confirm}
            onChange={handleChange}
            type="password"
          />

          <div className="buttonlogin">
            <Button
              tag="button"
              style={{ minWidth: "140px" }}
              color="primary"
              onClick={handleRegister}
            >
              {t("register")}
            </Button>
            <div style={{ marginTop: "10px" }}>
              <Button
                tag="button"
                onClick={() => history.push("/login")}
                color="primary"
                style={{ minWidth: "140px" }}
              >
                {t("loginmain")}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withNamespaces()(SignUp);
const options = [
  { value: "5", label: "Five" },
  { value: "6", label: "Six" },
  { value: "7", label: "Seven" },
  { value: "8", label: "Eight" },
  { value: "9", label: "Nine" },
  { value: "10", label: "Ten" },
  { value: "11", label: "Eleven" },
  { value: "12", label: "Tweleve" },
];

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const typesOfEducation = [
  {
    id: 1,
    name: "genraleducation",
  },
  {
    id: 2,
    name: "generalenglishcurriculum",
  },
  {
    id: 3,
    name: "englishmedium",
  },
  {
    id: 4,
    name: "madrashaducation",
  },
  {
    id: 6,
    name: "citycorporation",
  },
  {
    id: 7,
    name: "bcs",
  },
  {
    id: 8,
    name: "karigori",
  },
];
