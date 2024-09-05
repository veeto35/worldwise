import styles from "./Spinner.module.css";
import * as React from "react";
function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
