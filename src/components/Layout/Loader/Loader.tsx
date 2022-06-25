import React from "react";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
