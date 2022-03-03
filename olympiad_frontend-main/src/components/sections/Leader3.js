import {
  Avatar,
  Grid,
  ListItemAvatar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { APP_URL } from "../../utils/Api";
import Image from "../elements/Image";

const Leader3 = ({ data }) => {
  const classes = useStyles();
  return (
    <div>
      {data && (
        <Grid container justify="center">
          {data[1] && (
            <Grid item className={classes.margintop}>
              <ListItemAvatar>
                {data[1].played > 0 && (
                  <Image
                    src="https://www.flaticon.com/svg/static/icons/svg/2583/2583319.svg"
                    width={50}
                  />
                )}
                <Avatar
                  alt="Remy Sharp"
                  src={`${APP_URL}/student3.jpg`}
                  className={classes.large}
                />
              </ListItemAvatar>

              <Typography
                variant="button"
                display="block"
                gutterBottom
                align="left"
              >
                {data[1].name}
              </Typography>
            </Grid>
          )}
          {data[0] && (
            <Grid item>
              <ListItemAvatar>
                {data[0].played > 0 && (
                  <Image
                    src="https://www.flaticon.com/svg/static/icons/svg/744/744984.svg"
                    width={50}
                  />
                )}
                <Avatar
                  className={classes.large}
                  alt="Remy Sharp"
                  src={`${APP_URL}/student1.jpg`}
                />
              </ListItemAvatar>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                align="left"
              >
                {data[0].name}
              </Typography>
            </Grid>
          )}
          {data[2] && (
            <Grid item className={classes.margintop}>
              <ListItemAvatar>
                {data[2].played > 0 && (
                  <Image
                    src="https://www.flaticon.com/svg/static/icons/svg/2583/2583434.svg"
                    width={50}
                  />
                )}
                <Avatar
                  className={classes.large}
                  alt="Remy Sharp"
                  src={`${APP_URL}/student2.jpg`}
                />
              </ListItemAvatar>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                align="left"
              >
                {data[2].name}
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};
export default Leader3;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  margintop: {
    marginTop: "20px",
  },
}));
