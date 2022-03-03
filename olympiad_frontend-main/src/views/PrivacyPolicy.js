import React from "react";
import HeaderWaiting from "../components/sections/HeaderWaiting";
import SectionHeader from "../components/sections/partials/SectionHeader";
import classNames from "classnames";
const PrivacyPolicy = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
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

  const sectionHeader = {
    paragraph:
      "At bangabandhuolympiad, accessible from https://bangabandhuolympiad.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by bangabandhuolympiad and how we use it.If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in bangabandhuolympiad. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Privacy Policy Generator and the Free Privacy Policy Generator.",
  };
  return (
    <div>
      <HeaderWaiting header="Privacy Policy for Copotronic Infosytems Limited" />
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={tilesClasses}>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">Consent</h4>
                    <p className="m-0 text-sm">
                      By using our website, you hereby consent to our Privacy
                      Policy and agree to its terms.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">Information we collect</h4>
                    <p className="m-0 text-sm">
                      The personal information that you are asked to provide,
                      and the reasons why you are asked to provide it, will be
                      made clear to you at the point we ask you to provide your
                      personal information. If you contact us directly, we may
                      receive additional information about you such as your
                      name, email address, phone number, the contents of the
                      message and/or attachments you may send us, and any other
                      information you may choose to provide. When you register
                      for an Account, we may ask for your contact information,
                      including items such as name, company name, address, email
                      address, and telephone number.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">How we use your information</h4>
                    <p className="m-0 text-sm">
                      We use the information we collect in various ways,
                      including to: Provide, operate, and maintain our webste
                      Improve, personalize, and expand our webste Understand and
                      analyze how you use our webste Develop new products,
                      services, features, and functionality Communicate with
                      you, either directly or through one of our partners,
                      including for customer service, to provide you with
                      updates and other information relating to the webste, and
                      for marketing and promotional purposes Send you emails
                      Find and prevent fraud
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">Log Files</h4>
                    <p className="m-0 text-sm">
                      bangabandhuolympiad follows a standard procedure of using
                      log files. These files log visitors when they visit
                      websites. All hosting companies do this and a part of
                      hosting services' analytics. The information collected by
                      log files include internet protocol (IP) addresses,
                      browser type, Internet Service Provider (ISP), date and
                      time stamp, referring/exit pages, and possibly the number
                      of clicks. These are not linked to any information that is
                      personally identifiable. The purpose of the information is
                      for analyzing trends, administering the site, tracking
                      users' movement on the website, and gathering demographic
                      information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      Advertising Partners Privacy Policies
                    </h4>
                    <p className="m-0 text-sm">
                      You may consult this list to find the Privacy Policy for
                      each of the advertising partners of bangabandhuolympiad.
                      Third-party ad servers or ad networks uses technologies
                      like cookies, JavaScript, or Web Beacons that are used in
                      their respective advertisements and links that appear on
                      bangabandhuolympiad, which are sent directly to users'
                      browser. They automatically receive your IP address when
                      this occurs. These technologies are used to measure the
                      effectiveness of their advertising campaigns and/or to
                      personalize the advertising content that you see on
                      websites that you visit. Note that bangabandhuolympiad has
                      no access to or control over these cookies that are used
                      by third-party advertisers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      CCPA Privacy Rights (Do Not Sell My Personal Information)
                    </h4>
                    <p className="m-0 text-sm">
                      Under the CCPA, among other rights, California consumers
                      have the right to: Request that a business that collects a
                      consumer's personal data disclose the categories and
                      specific pieces of personal data that a business has
                      collected about consumers. Request that a business delete
                      any personal data about the consumer that a business has
                      collected. Request that a business that sells a consumer's
                      personal data, not sell the consumer's personal data. If
                      you make a request, we have one month to respond to you.
                      If you would like to exercise any of these rights, please
                      contact us.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">GDPR Data Protection Rights</h4>
                    <p className="m-0 text-sm">
                      We would like to make sure you are fully aware of all of
                      your data protection rights. Every user is entitled to the
                      following: The right to access – You have the right to
                      request copies of your personal data. We may charge you a
                      small fee for this service. The right to rectification –
                      You have the right to request that we correct any
                      information you believe is inaccurate. You also have the
                      right to request that we complete the information you
                      believe is incomplete. The right to erasure – You have the
                      right to request that we erase your personal data, under
                      certain conditions. The right to restrict processing – You
                      have the right to request that we restrict the processing
                      of your personal data, under certain conditions. The right
                      to object to processing – You have the right to object to
                      our processing of your personal data, under certain
                      conditions. The right to data portability – You have the
                      right to request that we transfer the data that we have
                      collected to another organization, or directly to you,
                      under certain conditions. If you make a request, we have
                      one month to respond to you. If you would like to exercise
                      any of these rights, please contact us.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">Children's Information</h4>
                    <p className="m-0 text-sm">
                      Another part of our priority is adding protection for
                      children while using the internet. We encourage parents
                      and guardians to observe, participate in, and/or monitor
                      and guide their online activity. bangabandhuolympiad does
                      not knowingly collect any Personal Identifiable
                      Information from children under the age of 13. If you
                      think that your child provided this kind of information on
                      our website, we strongly encourage you to contact us
                      immediately and we will do our best efforts to promptly
                      remove such information from our records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
