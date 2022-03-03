import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";
import LogoHeader from "./partials/LogoHeader";
import { APP_URL } from "../../utils/Api";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  t,
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.addEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };
  const changeLanguage = () => {
    if (language === "বাংলা") {
      i18n.changeLanguage("bd");
      setLanguage("English");
    } else {
      i18n.changeLanguage("en");
      setLanguage("বাংলা");
    }
  };
  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          style={{ marginTop: "50px" }}
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <LogoHeader />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">{t("menu")}</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li>
                      <a href={`${APP_URL}/manual.pdf`}>{t("howtoplay")}</a>
                    </li>
                    <li>
                      <Link to="#" onClick={changeLanguage}>
                        {language}
                      </Link>
                    </li>
                  </ul>
                  {!hideSignin && (
                    <ul className="list-reset header-nav-right">
                      <li>
                        <Link
                          to="/schooladminlogin"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={closeMenu}
                        >
                          {t("schoollogin")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/adminlogin"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={closeMenu}
                        >
                          {t("boardlogin")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/signup"
                          className="button button-primary button-wide-mobile button-sm"
                          onClick={closeMenu}
                        >
                          {t("boardlogin")}
                        </Link>
                      </li> */}
                    </ul>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withNamespaces()(Header);
