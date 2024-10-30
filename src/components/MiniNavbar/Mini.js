import React from "react";
import styles from "./Mini.module.css";
import { FaSearch } from "react-icons/fa";


function Mini() {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div>
          <button className={styles.categoriesButton}>
            <span>All Categories</span>
          </button>
        </div>

        {/* Barre de recherche */}
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products, brands and more"
          />
          <button className={styles.searchButton}><FaSearch/> </button>
        </div>

        {/* Black Friday Section */}
        <div className={styles.blackFriday}>
          <span>Black Friday</span>
        </div>
      </div>
    </div>
  );
}

export default Mini;
