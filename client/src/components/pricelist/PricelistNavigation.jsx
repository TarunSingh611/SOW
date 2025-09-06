import { useLanguage } from "../../contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/pricelistPage.module.css";
import diamondImage from "../../assets/diamond.png";
import seFlag from "../../assets/SE.png";
import gbFlag from "../../assets/GB.png";

const PricelistNavigation = () => {
  const { t, language, setLanguage, getLanguageName, getFlagUrl } = useLanguage();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const hamburgerMenuRef = useRef(null);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const toggleHamburgerMenu = (e) => {
    e.stopPropagation();
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the hamburger icon itself
      if (event.target.closest(".open-menu-dds")) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileDropdownOpen(false);
      }
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        setIsHamburgerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navigation-out ${styles.navigationOut}`}>
      <header className={`navigation-header ${styles.navigationHeader}`}>
        <section className="navigation-section">
          <div className={`logoa ${styles.logoa}`}>
            <div className={`navigation-logo ${styles.navigationLogo}`}>
              <img
                alt=""
                className={styles.avtarImage}
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2020%2F07%2F01%2F12%2F58%2Ficon-5359553_1280.png&f=1&nofb=1&ipt=7c624ebce2beb62265dfdaeec4eb8ea5a6422b26f75a37e54221dff3257da973"
              />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>John Andre</p>
              <p className={styles.userBusiness}>storfjord AS</p>
            </div>
          </div>
          <div className="open-menu-dds" onClick={toggleHamburgerMenu}>
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
          <div className="navigation-menu-bar " ref={hamburgerMenuRef}>
            <div
              className={`menu-drop-down ${
                isHamburgerMenuOpen ? "menu-drop-down-open scrollable-menu-container" : ""
              }`}
            >
              <div className="menu-drop-down-container">
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.invoices")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.customers")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">
                      {t("pricelist.nav.myBusiness")}
                    </p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.invoiceJournal")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.priceList")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.multipleInvocing")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.unpaidInvoices")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.offer")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.inventoryControl")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.memberInvoicing")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.import")}/{t("pricelist.nav.export")}</p>
                  </span>
                </a>
                <a
                  className={`menu-drop-down-item ${styles.menuItem}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="collectionSpan">
                    <p className="menu-item-name">{t("pricelist.nav.logOut")}</p>
                  </span>
                </a>
              </div>
            </div>
            <div className="pc-menu">
              <a
                className={`pc-menu-items language-pc-menu-items`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                <div className="">
                  <div className="language-title-box">
                    {" "}
                    <p className={`language-name ${styles.languageName}`}>{getLanguageName(language)}</p>
                    <img
                      src={getFlagUrl(language)}
                      className={`drop-down-image ${styles.flagIcon}`}
                      alt=""
                    />{" "}
                  </div>
                </div>
              </a>
            </div>
            <div className="lang-drop" ref={dropdownRef}>
              <div className="lang-drop-container">
                {isDropdownOpen && (
                  <div className="dropdownList">
                    <div
                      className="language-Svenska drop-down-element"
                      onClick={() => handleLanguageSelect("sv")}
                    >
                      <div className="drop-down-lang-name">Svenska</div>
                      <div className="drop-down-image-div">
                        <img
                          src={seFlag}
                          className="drop-down-image"
                          alt="Svenska"
                        />
                      </div>
                    </div>
                    <div
                      className="language-English drop-down-element"
                      onClick={() => handleLanguageSelect("en")}
                    >
                      <div className="drop-down-lang-name">English</div>
                      <div className="drop-down-image-div">
                        <img
                          src={gbFlag}
                          className="drop-down-image"
                          alt="English"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lang-dropk" ref={mobileDropdownRef}>
            <div>
              <div className="dropdownContainer" onClick={toggleMobileDropdown}>
                <div className="language-box">
                  {" "}
                  <p className="flag-name collectionitem">
                    {getLanguageName(language)}
                  </p>
                  <img
                    src={getFlagUrl(language)}
                    className="icon-flag-nav"
                    alt={getLanguageName(language)}
                  />{" "}
                </div>
              </div>
              {isMobileDropdownOpen && (
                <div className="dropdownList">
                  <div
                    className="language-Svenska drop-down-element"
                    onClick={() => handleLanguageSelect("sv")}
                  >
                    <div className="drop-down-lang-name">Svenska</div>
                    <div className="drop-down-image-div">
                      <img
                        src={seFlag}
                        className="drop-down-image"
                        alt="Svenska"
                      />
                    </div>
                  </div>
                  <div
                    className="language-English drop-down-element"
                    onClick={() => handleLanguageSelect("en")}
                  >
                    <div className="drop-down-lang-name">English</div>
                    <div className="drop-down-image-div">
                      <img
                        src={gbFlag}
                        className="drop-down-image"
                        alt="English"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </header>
    </nav>
  );
};

export default PricelistNavigation;
