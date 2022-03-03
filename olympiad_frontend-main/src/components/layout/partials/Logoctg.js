import React from "react";
import classNames from "classnames";
import Image from "../../elements/Image";

import { withNamespaces } from "react-i18next";
import { Grid } from "@material-ui/core";

const LogoOrganize = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} className={classes}>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={3}>
          <Image src={props.image1} alt="Open" width={150} height={150} />
        </Grid>
        <Grid item xs={3}>
          <Image src={props.image2} alt="Open" width={150} height={150} />
        </Grid>
      </Grid>

      {props.t("ctgboard")}
    </div>
  );
};

export default withNamespaces()(LogoOrganize);
