import {Fragment} from "react";
import Header from "@/components/common/Header";
import styles from "@/styles/AppLayout.module.css"

const AppLayout = ({children}) => {
    return (
        <Fragment>
            <div className={styles.header}>
                <Header className={styles.service}/>
            </div>
            <div className={styles.service}>
                {children}
            </div>
        </Fragment>
    )
}

export default AppLayout;