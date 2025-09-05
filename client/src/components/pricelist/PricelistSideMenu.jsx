import styles from "../../styles/pricelistPage.module.css"
import { useLanguage } from "../../contexts/LanguageContext";

const PricelistSideMenu = () => {
    const { t, language, setLanguage, getLanguageName, getFlagUrl } = useLanguage();
    const menuItems = [
        { 
            id: 'invoices', 
            text: t("pricelist.nav.invoices"), 
            icon: '📄', 
            active: true 
        },
        { 
            id: 'customers', 
            text: t("pricelist.nav.customers"), 
            icon: '👤', 
            active: true 
        },
        { 
            id: 'myBusiness', 
            text: t("pricelist.nav.myBusiness"), 
            icon: '⚙️', 
            active: true 
        },
        { 
            id: 'invoiceJournal', 
            text: t("pricelist.nav.invoiceJournal"), 
            icon: '📋', 
            active: true 
        },
        { 
            id: 'priceList', 
            text: t("pricelist.nav.priceList"), 
            icon: '🏷️', 
            active: true, 
            selected: true 
        },
        { 
            id: 'multipleInvoicing', 
            text: t("pricelist.nav.multipleInvocing"), 
            icon: '📄', 
            active: true 
        },
        { 
            id: 'unpaidInvoices', 
            text: t("pricelist.nav.unpaidInvoices"), 
            icon: '❌', 
            active: true 
        },
        { 
            id: 'offer', 
            text: t("pricelist.nav.offer"), 
            icon: '🏷️', 
            active: true 
        },
        { 
            id: 'inventoryControl', 
            text: t("pricelist.nav.inventoryControl"), 
            icon: '🏢', 
            active: false 
        },
        { 
            id: 'memberInvoicing', 
            text: t("pricelist.nav.memberInvoicing"), 
            icon: '👥', 
            active: false 
        },
        { 
            id: 'importExport', 
            text: `${t("pricelist.nav.import")}/${t("pricelist.nav.export")}`, 
            icon: '☁️', 
            active: true 
        },
        { 
            id: 'logOut', 
            text: t("pricelist.nav.logOut"), 
            icon: '↗️', 
            active: true 
        }
    ];

    return (
        <div className={styles.sideMenu}>
            <div className={styles.menuTitle}>
                {t("navigation.menu")}
            </div>
            <div className={styles.menuItems}>
                {menuItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`${styles.menuItem} ${!item.active ? styles.inactive : ''} ${item.selected ? styles.selected : ''}`}
                    >
                        {item.selected && <div className={styles.selectedIndicator}></div>}
                        <span className={styles.menuIcon}>{item.icon}</span>
                        <span className={styles.menuText}>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricelistSideMenu;