import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import { withNamespaces } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "38ch",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  grey: {
    color: "grey",
  },
}));

const AlignItemsList = ({
  username,
  t,
  total,
  played,
  i,
  schoolname,
  totaldraw,
  totallost,
}) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.inline}>
      <List className={classes.root}>
        <ListItem
          alignItems="center"
          style={{ backgroundColor: "black", borderRadius: "10px" }}
        >
          <Typography variant="h3" style={{ marginRight: "20px" }}>
            {i + 1}
          </Typography>

          <ListItemText
            style={{
              color: "white",
              textTransform: "capitalize",
              paddingRight: "10px",
            }}
            primary={username}
            secondary={
              <React.Fragment>
                <Typography variant="body2" className={classes.grey}>
                  {total}
                </Typography>
                <Typography variant="body2" className={classes.grey}>
                  {totaldraw}
                </Typography>
                <Typography variant="body2" className={classes.grey}>
                  {totallost}
                </Typography>
                {schoolname && (
                  <Typography variant="subtitle2" className={classes.grey}>
                    {schoolname}
                  </Typography>
                )}
                {played && (
                  <Typography variant="body2" className={classes.grey}>
                    {t("gamesplayed")} {played}
                  </Typography>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Grid>
  );
};
export default withNamespaces()(AlignItemsList);
