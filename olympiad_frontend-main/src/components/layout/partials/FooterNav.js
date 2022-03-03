import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav
      {...props}
      className={classes}
      style={{
        textAlign: "center",
        width: "80%",
        margin: "auto",
        marginTop: "2rem",
      }}
    >
      <ul className="list-reset">
        <li>
          <Link to="#" style={{ fontSize: "1rem" }}>
            CONTACT
          </Link>
        </li>
      </ul>
      <div>
        1376/A (3rd floor), CDA Avenue, GEC Circle, Chittagong-4000, Bangladesh.
      </div>
      <div>
        Flat D9( Apartment Side), Navana Zahura Square, 28 Kazi Nazrul Islam
        Avenue,Banglamotor, Dhaka-1205, Bangladesh. support@copotronic.com.
        09611991188
      </div>
    </nav>
  );
};

export default FooterNav;
