import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { withNamespaces } from "react-i18next";
import { useState } from "react";
import { SendMail_Api } from "../../utils/Api";
import { Grid } from "@material-ui/core";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Cta = ({
  t,
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  const outerClasses = classNames(
    "cta section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split"
  );
  const [email, setEmail] = useState({
    subject: "",
    text: "",
  });
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };
  const sendMail = () => {
    setShow(true);
    SendMail_Api(email);
  };
  return (
    <section {...props} className={outerClasses}>
      {show && (
        <h6 style={{ textAlign: "center" }}>Your mail has been sent!</h6>
      )}
      <div className="container">
        <div className={innerClasses}>
          <div className="cta-slogan">
            <h3 className="m-0">{t("inqiry")}</h3>
          </div>
          <div className="cta-action">
            <Input
              style={{ marginBottom: "10px" }}
              id="newsletter"
              type="email"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              placeholder="Subject"
              name="subject"
              onChange={handleChange}
            />
            <Input
              id="newsletter"
              type="email"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              placeholder="Your message"
              name="text"
              onChange={handleChange}
            />

            <svg
              style={{ margin: "50px" }}
              onClick={sendMail}
              width="50"
              height="50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default withNamespaces()(Cta);
