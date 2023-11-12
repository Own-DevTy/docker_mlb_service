import {Fragment} from "react";
import Header from "@/components/common/Header";
import styles from "@/styles/AppLayout.module.css"

const AppLayout = ({children}) => {
    return (
        <div className={styles.service}>
            <Header/>
            {children}
        </div>
    )
}

export default AppLayout;