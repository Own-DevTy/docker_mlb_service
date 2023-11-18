import styles from "@/styles/components/common/Sidebar.module.css"
import {AnimatePresence, motion} from "framer-motion";
import {MdDensityMedium} from "react-icons/md";
import {Fragment, useState} from "react";

const sidebar = {
    initial: {
        x: "100%",
        opacity: 0,
    },
    animate: {
        x: "0%",
        opacity: 1,
    },
    exit: {
        x: "100%",
        opacity: 0,
    },
    transition: {type: "spring", bounce: 100, duration: 0.3},
};

function SidebarDiv({isOpen, setOpen}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal"
                    className={styles.sidebar}
                    initial={"initial"}
                    animate={"animate"}
                    exit={"exit"}
                    transition={"transition"}
                    variants={sidebar}>
                    <div className={styles.exit} onClick={() => setOpen(false)}>&times;</div>
                    <h2>Compare History</h2>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Sidebar() {
    const [isOpen, setOpen] = useState(false);
    return (
        <Fragment>
            <MdDensityMedium color={'white'} fontSize={'1.5rem'} cursor={'pointer'}
                             onClick={() => setOpen(true)}/>
            <SidebarDiv {...{isOpen, setOpen}}/>
        </Fragment>
    )
}