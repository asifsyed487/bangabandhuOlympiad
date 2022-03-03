import React from "react";
import classNames from "classnames";
import { withNamespaces } from "react-i18next";

import Image from "../elements/Image";
import { SectionProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import { useHistory } from "react-router-dom";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  t,
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  username,
  total,
  show,
  img,
  gameID,
  ...props
}) => {
  const history = useHistory();
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const handleJoinfriend = () => {
    history.push({
      pathname: "/join",
      state: { name: username, GAMEID: gameID },
    });
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          {show && (
            <div className="hero-content">
              <h1
                className="mt-0 mb-16 reveal-from-bottom"
                data-reveal-delay="200"
              >
                {t("welcomeclass")}
                <span className="text-color-primary">
                  {" "}
                  {username.toUpperCase()}
                </span>
              </h1>
              <div className="container-xs"></div>
            </div>
          )}
          {img && (
            <div
              className="hero-figure reveal-from-bottom illustration-element-01"
              data-reveal-value="20px"
              data-reveal-delay="800"
            >
              <Image
                className="has-shadow"
                src={img}
                alt="Hero"
                width={896}
                height={400}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default withNamespaces()(Hero);
