import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withNamespaces } from "react-i18next";

const propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  closeHidden: PropTypes.bool,
  video: PropTypes.string,
  videoTag: PropTypes.oneOf(["iframe", "video"]),
};

const defaultProps = {
  children: null,
  show: false,
  closeHidden: false,
  video: "",
  videoTag: "iframe",
};

const ModalChallenge = ({
  className,
  children,
  handleClose,
  show,
  closeHidden,
  video,
  videoTag,
  advertising,
  t,
  ...props
}) => {
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", stopProgagation);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", stopProgagation);
    };
  });

  useEffect(() => {
    handleBodyClass();
  }, [props.show]);

  const handleBodyClass = () => {
    if (document.querySelectorAll(".modal.is-active").length) {
      document.body.classList.add("modal-is-active");
    } else {
      document.body.classList.remove("modal-is-active");
    }
  };

  const keyPress = (e) => {
    e.keyCode === 27 && handleClose(e);
  };

  const stopProgagation = (e) => {
    e.stopPropagation();
  };

  const classes = classNames(
    "modal",
    show && "is-active",
    video && "modal-video",
    className
  );

  return (
    <>
      {show && (
        <div {...props} className={classes} onClick={handleClose}>
          <div className="modal-inner" onClick={stopProgagation}>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

ModalChallenge.propTypes = propTypes;
ModalChallenge.defaultProps = defaultProps;

export default withNamespaces()(ModalChallenge);
