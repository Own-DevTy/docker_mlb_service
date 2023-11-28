import { Fragment } from 'react';
import { useState } from 'react';
import styles from '@/styles/compare.module.css';
import Plist from '@/pages/compare/Plist';
import PlayerComponent from '@/components/table/fetchData';
import Chart from '@/components/chart/chart';
import Player1Data from '@/components/table/Player1Table';


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
                                <PlayerComponent />
                            </div>
                        </div>
                    </div>
                    <div className={styles.left_body}>
                        <div className={styles.left_stats2}>
                            <br></br><br></br>
                            {Player1Data()}
                        </div>
                        <div className={styles.left_stats3}>
                            <div className={styles.left_stats3_1}>
                            {Chart(true,
                                'Eduardo Escobar', 1, 3, 2, 4, 6)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <Plist />
                </div>
            </div>
        );
    };
    return render();
}

export default App;
