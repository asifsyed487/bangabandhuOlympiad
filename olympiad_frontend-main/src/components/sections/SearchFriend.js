import React from "react";

import Input from "../elements/Input";
import { withNamespaces } from "react-i18next";
import { Grid } from "@material-ui/core";

const SearchFriend = ({ t, value, onChange, type, placeholder }) => {
  return (
    <Grid container justify="center" style={{ marginTop: "20px" }}>
      <Input
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Grid>
  );
};

export default withNamespaces()(SearchFriend);
