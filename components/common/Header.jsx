import {Fragment} from "react";
import styles from "@/styles/Header.module.css"
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = ({className}) => {
    return (
        <div className={className}>
            <div className={styles.header}>
                <div className={styles.flexItem}>
                    <Link href={'/'} style={{color: "#FFFFFF", "font-size": "xx-large"}}>VMS</Link>
                </div>
                <div className={styles.flexItem}>
                    <SearchBar/>
                </div>
            </div>
        </div>
    );
}

export default Header;