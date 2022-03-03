import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Button from "./Button";

const ButtonAns = ({ item, onClick, index, disabled }) => {
  const correctColor = "#4caf50";
  const incorrectColor = "#f44336";
  const [col, setCol] = useState("#6163FF");

  useEffect(() => {
    setCol("#6163FF");
  }, [item]);

  return (
    <Grid
      container
      md={6}
      alignItems="center"
      justify="center"
      style={{ marginTop: "20px", paddingBottom: "20px" }}
    >
      <Button
        style={{ minWidth: "200px", backgroundColor: col, color: "white" }}
        disabled={disabled}
        onClick={() => {
          const result = onClick(item, index);

          if (result) setCol(correctColor);
          else setCol(incorrectColor);
        }}
      >
        {item}
      </Button>
    </Grid>
  );
};

export default ButtonAns;
