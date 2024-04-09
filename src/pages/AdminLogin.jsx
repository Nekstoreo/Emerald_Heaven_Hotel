import React from "react";
import styles from "./adminLogin.module.css";

function adminLogin() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles["header-text"]}>Admin Login</div>
      </div>
      <div className={styles["success"]}>
        <form action="/goToAdminSection" method="post">
          <input
            type="text"
            name="adminUsername"
            placeholder="Username"
            autocomplete="off"
          />
          <br />
          <input type="password" name="adminPassword" placeholder="password" />
          <br />
          <button
            type="submit"
            className={`${styles["btn"]} ${styles["btn-dark"]}`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default adminLogin;
