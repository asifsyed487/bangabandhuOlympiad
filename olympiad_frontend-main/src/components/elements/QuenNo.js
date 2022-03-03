import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";
import { withNamespaces } from "react-i18next";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#6163FF",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "20px",
  },
});

const QuetionNo = ({ value, max, t }) => {
  const classes = useStyles();
  const percentage = Math.round((value * 100) / max);

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" gutterBottom align="center">
        {t("quennotext")} {value}/{max}
      </Typography>

      <BorderLinearProgress
        variant="determinate"
        value={percentage}
        style={{ height: "20px" }}
      />
    </div>
  );
};
export default withNamespaces()(QuetionNo);
