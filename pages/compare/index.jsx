import {Fragment} from "react";
import {useState} from "react";
import styles from "@/styles/compare.module.css"
import Plist from "@/pages/newcompare";
import PlayerComponent from "@/components/table/fetchData";

function App() {
    const render = () => {

        return (
            <div className={styles.body}>
            <div className={styles.left}>
                <div className={styles.left_top}>
                    <div className={styles.circle_left}>
                        <img
                            className={styles.thumb}
                            src="https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/500871/headshot/67/current"
                            alt="Player"
                        />
                        <div className={styles.left_stats1}>
                            <PlayerComponent/>
                        </div>
                    </div>

                </div>
                <div className={styles.left_body}>

                    <div className={styles.left_stats2}>
                        stats 2
                    </div>
                    <div className={styles.left_stats3}>
                        stats 3
                    </div>
                </div>
            </div>


            <div className={styles.right}>
                <Plist/>
            </div>
        </div>  
        );
    }
    return render();
}

export default App;
