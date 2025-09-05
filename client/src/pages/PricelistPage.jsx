import React from "react";
import PricelistNavigation from "../components/pricelist/PricelistNavigation";
import PricelistSideMenu from "../components/pricelist/PricelistSideMenu";
import PricelistContent from "../components/pricelist/PricelistContent";
import styles from "../styles/pricelistPage.module.css";

const PricelistPage = () => {

  return (
    <div className={styles.pricelistPage}>
      <PricelistNavigation />
      <div className={styles.pricelistBody}>
        <PricelistSideMenu />
        <PricelistContent />
      </div>
    </div>
  );
};

export default PricelistPage;
