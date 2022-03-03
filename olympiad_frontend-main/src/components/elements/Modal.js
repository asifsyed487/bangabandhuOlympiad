import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withNamespaces } from "react-i18next";
import Image from "./Image";
import { APP_URL, URL } from "../../utils/Api";
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

const Modal = ({
  className,
  children,
  handleClose,
  show,
  closeHidden,
  video,
  videoTag,
  advertising,
  t,
  app,
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
            {video ? (
              <div className="responsive-video">
                {videoTag === "iframe" ? (
                  <iframe
                    title="video"
                    src={video}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video v-else controls src={video}></video>
                )}
              </div>
            ) : (
              <>
                {!closeHidden && (
                  <button
                    className="modal-close"
                    aria-label="close"
                    onClick={handleClose}
                  ></button>
                )}
                <div className="modal-content">{children}</div>
              </>
            )}
          </div>
        </div>
      )}
      {advertising && (
        <div {...props} className={classes} onClick={handleClose}>
          <a onClick={handleClose}>
            <h1>X</h1>
          </a>
          <div className="modal-inner" onClick={stopProgagation}>
            <Image
              className="has-shadow"
              src={`${URL}/wait.png`}
              alt="Hero"
              width={896}
              height={504}
            />
            <h3 className="centertext">
              <span className="text-color-primary">{t("gamesub")}</span>
            </h3>
          </div>
        </div>
      )}
      {app && (
        <div {...props} className={classes} onClick={handleClose}>
          <a onClick={handleClose}>
            <h1>X</h1>
          </a>
          <div className="modal-inner" onClick={stopProgagation}>
            <Image
              className="has-shadow"
              src={`${APP_URL}/app.png`}
              alt="Hero"
              width={896}
              height={504}
            />
            <a target="_top" href="market://details?id=com.quizolympiad">
              <h3 className="centertext">
                <span className="text-color-primary">{t("downloadapp")}</span>
              </h3>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default withNamespaces()(Modal);
