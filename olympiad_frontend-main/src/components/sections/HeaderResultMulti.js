import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import io from "socket.io-client";
import { withNamespaces } from "react-i18next";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import { useHistory } from "react-router-dom";
import { Get_Profile_Api, SOCKET__URL } from "../../utils/Api";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const HeaderResultMulti = ({
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
  name,
  req_api_data,
  opponetName,
  noquen,
  ...props
}) => {
  const outerClasses = classNames(
    "HeaderResultMulti section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  const history = useHistory();
  const innerClasses = classNames(
    "HeaderResultMulti-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );
  const gameID = Math.floor(Math.random() * 10000000);
  const [deviceToken, setdeviceToken] = useState("");
  let [socket, setsocket] = useState(null);

  useEffect(() => {
    Get_Profile_Api(opponetName).then((response) =>
      setdeviceToken(response.deviceToken)
    );
  }, []);

  useEffect(() => {
    socket = io.connect(SOCKET__URL);
    setsocket(socket);
  }, []);

  const HandleMultiplayer = async () => {
    let challenge_data = {
      username: opponetName,
      gameID: gameID,
      challenger: name,
      deviceToken: deviceToken,
    };
    socket.emit("send_invite", challenge_data);

    await history.push({
      pathname: "/game",
      state: {
        req_api_data: req_api_data,
        gameID: gameID,
      },
    });
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="HeaderResultMulti-content">
            <h2
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              {name}
              <span className="text-color-primary">{sub}</span>
            </h2>
          </div>

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
                onClick={HandleMultiplayer}
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

HeaderResultMulti.propTypes = propTypes;
HeaderResultMulti.defaultProps = defaultProps;

export default withNamespaces()(HeaderResultMulti);
