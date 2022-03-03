import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Image from "../../elements/Image";
import { APP_URL } from "../../../utils/Api";
import { withNamespaces } from "react-i18next";

const Logo = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} className={classes}>
      <h1 className="m-0">
        <Link>
          <Image
            src={`${APP_URL}/copotronic.png`}
            alt="Open"
            width={200}
            height={200}
          />
        </Link>
      </h1>
      <div className="footer-copyright" style={{ textAlign: "center" }}>
        {props.t("madeby")}
        <a href="https://elearning.shikkhangon.com"> {props.t("sha")}</a>
        {props.t("rights")}
      </div>
    </div>
  );
};

export default withNamespaces()(Logo);
