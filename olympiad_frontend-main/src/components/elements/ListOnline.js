import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "./Button";
import { withNamespaces } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "46ch",
  },

  color: {
    color: "white",
  },
  grey: {
    color: "grey",
  },
}));

const AlignItemsList = ({ item, onClick, buttontitle, t }) => {
  const classes = useStyles();
  const singlegamelength =
    item.singlegamedata === undefined || item.singlegamedata.length === 0
      ? 0
      : item.singlegamedata.length;

  const multigamelength =
    item.gamedata === undefined || item.gamedata.length === 0
      ? 0
      : item.gamedata.length;
  return (
    <Grid container justify="center">
      <List className={classes.root}>
        <ListItem alignItems="center">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "5px",
              backgroundColor: "#7CFC00",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          />
          <ListItemText
            className={classes.color}
            primary={item.username}
            secondary={
              <React.Fragment>
                <Typography variant="body2" className={classes.grey}>
                  {item.schoolname}
                </Typography>
                {item.gamedata && (
                  <Typography variant="body2" className={classes.grey}>
                    {t("gamesplayed")} {singlegamelength + multigamelength}
                  </Typography>
                )}
              </React.Fragment>
            }
          />
          {buttontitle && (
            <Button onClick={onClick} variant="contained" color="primary">
              {buttontitle}
            </Button>
          )}
        </ListItem>

        <Divider variant="inset" component="li" />
      </List>
    </Grid>
  );
};
export default withNamespaces()(AlignItemsList);
