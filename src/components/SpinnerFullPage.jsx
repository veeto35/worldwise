import Spinner from "./Spinner";
import styles from "./SpinnerFullPage.module.css";
import * as React from "react";
function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
