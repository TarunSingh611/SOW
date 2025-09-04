import "../styles/termsPage.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const TermsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="terms-container">
      <div className="background-container">
        <img
          src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
          alt=""
          id="background-image"
        />
      </div>
      <nav className="navigation-out">
        <header className="navigation-header">
          <section className="navigation-section">
            <div className="logoa">
              <a href="/">
                <img
                  alt=""
                  className="navigation-logo"
                  src="https://storage.123fakturera.se/public/icons/diamond.png"
                />
              </a>
            </div>
            <div className="open-menu-dds">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="navigation-svg"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
              </svg>
            </div>
            <div className="navigation-menu-bar">
              <div className="menu-drop-down">
                <div className="menu-drop-down-container">
                  <a className="menu-drop-down-item" href="#">
                    <span className="collectionSpan">
                      <p className="menu-item-name">{t("terms.nav.home")}</p>
                    </span>
                  </a>
                  <a className="menu-drop-down-item" href="#">
                    <span className="collectionSpan">
                      <p className="menu-item-name">{t("terms.nav.order")}</p>
                    </span>
                  </a>
                  <a className="menu-drop-down-item" href="#">
                    <span className="collectionSpan">
                      <p className="menu-item-name">
                        {t("terms.nav.contactUs")}
                      </p>
                    </span>
                  </a>
                </div>
              </div>
              <div className="pc-menu">
                <a className="pc-menu-items" href="#">
                  <span className="collectionSpan">
                    <p className="collectionitem">{t("terms.nav.home")}</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#">
                  <span className="collectionSpan">
                    <p className="collectionitem">{t("terms.nav.order")}</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#">
                  <span className="collectionSpan">
                    <p className="collectionitem">
                      {t("terms.nav.ourCustomers")}
                    </p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#">
                  <span className="collectionSpan">
                    <p className="collectionitem">{t("terms.nav.aboutUs")}</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#">
                  <span className="collectionSpan">
                    <p className="collectionitem">{t("terms.nav.contactUs")}</p>
                  </span>
                </a>
                <a className="pc-menu-items language-pc-menu-items" href="#">
                  <div className="">
                    <div className="language-title-box">
                      {" "}
                      <p className="language-name">
                        English
                      </p>
                      <img
                        src="https://storage.123fakturere.no/public/flags/GB.png"
                        className="flag-icon drop-down-image"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                </a>
              </div>
              <div className="lang-drop">
                <div className="lang-drop-container">
                  <div className="dropdownList">
                    <div className="language-Svenska drop-down-element">
                      <div className="drop-down-lang-name">Svenska</div>
                      <div className="drop-down-image-div">
                        <img
                          src="https://storage.123fakturere.no/public/flags/SE.png"
                          className="drop-down-image"
                          alt="Svenska"
                        />
                      </div>
                    </div>
                    <div className="language-English drop-down-element">
                      <div className="drop-down-lang-name">English</div>
                      <div className="drop-down-image-div">
                        <img
                          src="https://storage.123fakturere.no/public/flags/GB.png"
                          className="drop-down-image"
                          alt="English"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lang-dropk">
              <div>
                <div className="dropdownContainer">
                  <div className="language-box">
                    {" "}
                    <p className="flag-name collectionitem">English</p>
                    <img
                      src="https://storage.123fakturere.no/public/flags/GB.png"
                      className="icon-flag-nav"
                      alt="English"
                    />{" "}
                  </div>
                </div>
                <div className="dropdownList">
                  <div className="language-Svenska drop-down-element">
                    <div className="drop-down-lang-name">Svenska</div>
                    <div className="drop-down-image-div">
                      <img
                        src="https://storage.123fakturere.no/public/flags/SE.png"
                        className="drop-down-image"
                        alt="Svenska"
                      />
                    </div>
                  </div>
                  <div className="language-English drop-down-element">
                    <div className="drop-down-lang-name">English</div>
                    <div className="drop-down-image-div">
                      <img
                        src="https://storage.123fakturere.no/public/flags/GB.png"
                        className="drop-down-image"
                        alt="English"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
      </nav>
      <div className="content">
        <section className="terms-section">
          <div className="terms-top-text">
            <h1 className="terms-heading">{t("terms.title")}</h1>
            <button className="go-back-button" onClick={handleClose}>
              {t("terms.closeButton")}
            </button>
          </div>
          <div className="back-terms">
            <p className="">
              <b>{t("terms.content.text1")}</b> {t("terms.content.text2")}
            </p>
            <p className="">{t("terms.content.text3")}</p>
            <p className="">{t("terms.content.text4")}</p>
            <p className="mt-6">{t("terms.content.text5")}</p>
            <p className="mb-6">{t("terms.content.text6")}</p>
            <p className="">{t("terms.content.text7")}</p>
            <p className="">{t("terms.content.text8")}</p>
            <p className="">{t("terms.content.text9")}</p>
            <p className="">{t("terms.content.text10")}</p>
            <p className="">{t("terms.content.text11")}</p>
            <p className="">{t("terms.content.text12")}</p>
            <p className="">{t("terms.content.text13")}</p>
            <p className="">{t("terms.content.text14")}</p>
            <p className="">{t("terms.content.text15")}</p>
            <p className="">{t("terms.content.text16")}</p>
            <p className="">{t("terms.content.text17")}</p>
            <p className="">{t("terms.content.text18")}</p>
            <p className="">{t("terms.content.text19")}</p>
            <p className="">{t("terms.content.text20")}</p>
            <p className="">{t("terms.content.text21")}</p>
            <p className="">
              {t("terms.content.text22")}{" "}
              <a className="link-span">{t("terms.content.text23")}</a>
              {t("terms.content.text24")}
            </p>
            <p className="">{t("terms.content.text25")}</p>
            <p className="">{t("terms.content.text26")}</p>
            <p className="">{t("terms.content.text27")}</p>
            <p className="">{t("terms.content.text28")}</p>
          </div>
          <div className="terms-top-text">
            <button
              className="go-back-button lower-back-button"
              onClick={handleClose}
            >
              Close and Go Back
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
