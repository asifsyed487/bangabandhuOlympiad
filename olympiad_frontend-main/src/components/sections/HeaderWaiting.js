import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";

import Image from "../elements/Image";

import { withNamespaces } from "react-i18next";
import ButtonGroup from "../elements/ButtonGroup";
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
  header,
  sub,
  img,
  resultimg,
  playagain,
  name,
  api_data,
  noquen,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  const history = useHistory();
  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const HandleSingleplayer = () => {
    history.push({
      pathname: "/singleplayer",
      state: { name, api_data },
    });
  };
  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h2
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              {header}
              <span className="text-color-primary">{sub}</span>
            </h2>
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-02"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            {img && (
              <Image
                className="has-shadow"
                src={img}
                alt="Hero"
                width={800}
                height={600}
              />
            )}
          </div>
          {playagain === "yes" ? (
            <div className="reveal-from-bottom" data-reveal-delay="600">
              <h2
                className="mt-0 mb-16 reveal-from-bottom"
                data-reveal-delay="200"
              >
                {t("playagain")}
              </h2>
              <ButtonGroup>
                <Button
                  tag="a"
                  color="primary"
                  onClick={HandleSingleplayer}
                  wideMobile
                >
                  {t("yes")}
                </Button>
                <Button
                  tag="a"
                  color="dark"
                  wideMobile
                  onClick={() => history.push("/subjects")}
                >
                  {t("no")}
                </Button>
              </ButtonGroup>
            </div>
          ) : (
            <div></div>
          )}
          {noquen && (
            <div className="reveal-from-bottom" data-reveal-delay="600">
              <ButtonGroup>
                <Button
                  tag="a"
                  color="dark"
                  wideMobile
                  onClick={() => history.push("/subjects")}
                >
                  {t("goback")}
                </Button>
              </ButtonGroup>
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
