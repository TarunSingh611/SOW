import ContentHeader from "./ContentHeader";
import ContentTable from "./ContentTable";
import styles from "../../styles/pricelistPage.module.css";


const PricelistContent = () => {
    return (
        <div className={styles.pricelistContent}>
            <ContentHeader/>
            <ContentTable/>
        </div>
    )
}

export default PricelistContent;