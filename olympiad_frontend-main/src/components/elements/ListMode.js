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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40ch",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const ListMode = ({
  username,
  t,
  total,
  played,
  buttontitle,
  name,
  item,
  date,
  pathname,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const data = {
    name,
    myscore: username,
    my_stats: item.my_stats,
    opponetName: item.opponetName,
    oppnonet_stats: item.oppnonet_stats,
    opponetscore: item.opponetscore,
    result: item.result,
  };

  const handleMore = () => {
    history.push({
      pathname: pathname,
      state: { data: data, totalquen: 10 },
    });
  };

  return (
    <Grid container justify="center" className={classes.inline}>
      <List className={classes.root}>
        <ListItem
          alignItems="center"
          style={{ backgroundColor: "black", borderRadius: "10px" }}
        >
          <ListItemText
            style={{
              color: "white",
              textTransform: "capitalize",
              paddingRight: "10px",
            }}
            primary={username}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ color: "grey" }}
                >
                  {total}
                </Typography>
                <Typography variant="body2" style={{ color: "grey" }}>
                  {date}
                </Typography>
                {played && (
                  <Typography variant="body2" style={{ color: "grey" }}>
                    {t("gamesplayed")} {played}
                  </Typography>
                )}
              </React.Fragment>
            }
          />
          <Button color="dark" onClick={handleMore}>
            {buttontitle}
          </Button>
        </ListItem>

        <Divider variant="inset" component="li" />
      </List>
    </Grid>
  );
};
export default withNamespaces()(ListMode);
