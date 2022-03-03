import React from "react";
import Header from "../components/layout/HeaderAdmin";
import Footer from "../components/layout/Footer";

const LayoutAdmin = ({ children }) => (
  <>
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content">{children}</main>
    <Footer />
  </>
);

export default LayoutAdmin;
