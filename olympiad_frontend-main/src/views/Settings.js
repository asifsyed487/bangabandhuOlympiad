import React, { useState } from "react";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

import HeaderWaiting from "../components/sections/HeaderWaiting";
import i18n from "../i18n";

const Settings = ({ t }) => {
  const [language, setLanguage] = useState("বাংলা");
  const [state, setState] = useState({
    checkedB: true,
  });

  const changeLanguage = (event) => {
    if (language === "English") {
      i18n.changeLanguage("bd");
      setLanguage("বাংলা");
      setState({ ...state, [event.target.name]: event.target.checked });
    } else {
      i18n.changeLanguage("en");
      setLanguage("English");

      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };
  return (
    <div>
      <HeaderWaiting sub={t("changelng")} />
      <Grid container justify="center">
        <FormControlLabel
          control={
            <IOSSwitch
              checked={state.checkedB}
              onChange={changeLanguage}
              name="checkedB"
            />
          }
          label={language}
        />
      </Grid>
    </div>
  );
};

export default withNamespaces()(Settings);

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
