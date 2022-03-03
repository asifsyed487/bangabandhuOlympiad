import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Image from "../../elements/Image";
import { APP_URL } from "../../../utils/Api";

const LogoHeader = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} className={classes}>
      <Link to="/">
        <Image
          src={`${APP_URL}/header.png`}
          alt="Open"
          width={150}
          height={150}
        />
      </Link>
    </div>
  );
};

export default LogoHeader;
