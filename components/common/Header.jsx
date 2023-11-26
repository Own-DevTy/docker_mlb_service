import {Fragment, useState} from "react";
import styles from "@/styles/components/common/Header.module.css"
import Link from "next/link";
import SearchBar from "./SearchBar";
import Sidebar from "@/components/common/Sidebar";
import {FaRegUserCircle} from "react-icons/fa";
import {SlLogin} from "react-icons/sl";

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
                    {}
                    <SlLogin color={'white'} fontSize={'1.5rem'} cursor={'pointer'} />
                    <FaRegUserCircle color={'white'} fontSize={'1.5rem'} cursor={'pointer'} />
                </div>
            </div>
        </div>
    );
}

export default Header;