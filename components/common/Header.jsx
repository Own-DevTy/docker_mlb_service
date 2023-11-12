import {Fragment} from "react";
import styles from "@/styles/Header.module.css"
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = () => {
    return (
      <div className={styles.header}>
          <div className={styles.flexItem}>
              <Link href={'/'}>VMS</Link>
          </div>
          <div className={styles.flexItem}>
              <SearchBar />
          </div>
      </div>
    );
}

export default Header;