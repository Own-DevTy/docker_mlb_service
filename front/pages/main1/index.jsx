import {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/button.module.css"


const render = () => {
    return (
        <div className={styles.main_frame}>
            <div className={styles.left}>
                <div className={styles.left_league}>
                    <h1 className={styles.text_choose}>Choose the League</h1>
                    <select className={styles.left_select}>
                        <option value="none">===Choose===</option>
                        <option value="n_league">National League</option>
                        <option value="a_league">American League</option>
                    </select>
                </div>
                <div className={styles.left_plist}>
                    <h1 className={styles.text_list}>MLB Player List</h1>
                    <div className={styles.check_box}>
                        <div className={styles.l_check_box}>
                            <input type="checkbox" id="l_player1" name="option"/>
                            <label htmlFor="l_player1">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Gunnar Henderson</label><br/>
                            <input type="checkbox" id="l_player2" name="option"/>
                            <label htmlFor="l_player2">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/642715/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Willy Adames</label><br/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.center}>
                <h2>
                    <center>▶▶player stat◀◀</center>
                </h2>
                <a href="#;" className={styles.Button1}>Compare</a>
                <a href="#;" className={styles.Button2}>More</a>
            </div>

            <div className={styles.right}>
                <div className={styles.right_league}>
                    <h1 className={styles.text_choose}>Choose the League</h1>
                    <select className={styles.right_select}>
                        <option value="none">===Choose===</option>
                        <option value="n_league">National League</option>
                        <option value="a_league">American League</option>
                    </select>
                </div>
                <div className={styles.right_plist}>
                    <h1 className={styles.text_list}>MLB Player List</h1>
                    <div className={styles.check_box}>
                        <div className={styles.r_check_box}>
                            <input type="checkbox" id="r_player1" name="option"/>
                            <label htmlFor="r_player1">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Gunnar Henderson</label><br/>
                            <input type="checkbox" id="r_player2" name="option"/>
                            <label htmlFor="r_player2">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/642715/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Willy Adames</label><br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default render;