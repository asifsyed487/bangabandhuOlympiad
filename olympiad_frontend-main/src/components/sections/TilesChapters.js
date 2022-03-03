import React from "react";
import classNames from "classnames";
import { withNamespaces } from "react-i18next";
import { SectionTilesProps } from "../../utils/SectionProps";
import Image from "../elements/Image";
import { useHistory } from "react-router-dom";
import { APP_URL, APP_URL_MADRASHA } from "../../utils/Api";
import Decoder from "jwt-decode";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const SectionTiles = ({
  t,
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  tilesdata,
  imgsrc,
  to,
  myclass,
  api_data,
  userdata,
  ...props
}) => {
  const token = localStorage.usertoken_hash;
  const decodedata = Decoder(token);
  const history = useHistory();
  const outerClasses = classNames(
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-tiles-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );
  const handleClick = (item) => {
    history.push({
      pathname: "/challenge",
      state: {
        Class: api_data.myclass,
        Subject: api_data.subject,
        Chapter: item,
        userdata: api_data.userdata,
      },
    });
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className={tilesClasses}>
            {tilesdata &&
              tilesdata.map((item) => {
                return (
                  <div className="tiles-item">
                    <div
                      className="tiles-item-inner"
                      onClick={() => handleClick(item)}
                    >
                      <div>
                        {/* src={
                              `${APP_URL}/${decodedata.category}/${myclass}/${item}.jpg`
                                ? `${APP_URL}/${decodedata.category}/${myclass}/${item}.jpg`
                                : imgsrc
                            } */}
                        <div>
                          <Image
                            style={{ cursor: "pointer" }}
                            src={imgsrc}
                            alt="Features tile icon 01"
                            width={300}
                            height={300}
                          />
                        </div>
                      </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8">{item}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

SectionTiles.propTypes = propTypes;
SectionTiles.defaultProps = defaultProps;

export default withNamespaces()(SectionTiles);
