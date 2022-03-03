import React from "react";
import classNames from "classnames";
import { withNamespaces } from "react-i18next";

import { SectionProps } from "../../utils/SectionProps";
import QuetionNo from "../elements/QuenNo";
import Image from "../elements/Image";

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
  question,
  quenno,
  img,
  max,
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

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <QuetionNo value={quenno} max={max} />
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h2 className="mt-0 mb-16">{question}</h2>
          </div>
          <div className="hero-figure illustration-element-01">
            {img && (
              <Image
                className="has-shadow"
                src={img}
                alt="Hero"
                width={600}
                height={400}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default withNamespaces()(Hero);
