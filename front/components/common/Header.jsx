import {Fragment, useState} from "react";
import styles from "@/styles/components/common/Header.module.css"
import Link from "next/link";
import SearchBar from "./SearchBar";
import Sidebar from "@/components/common/Sidebar";

const Header = ({className}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={className}>
            <div className={styles.header}>
                <div className={styles.flexItem}>
                    <Link href={'/'} style={{color: "#FFFFFF", fontSize: "xx-large"}}>VMS</Link>
                </div>
                <div className={styles.flexItem}>
                    <SearchBar/>
                    <Sidebar/>
                </div>
            </div>
        </div>
    );
}

export default Header;