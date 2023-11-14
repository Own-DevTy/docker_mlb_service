import {Fragment} from "react";
import styles from "@/styles/compare.module.css"
import RChart from "@/components/chart/chart";


    const render =()=>{
        return (
                <div class ={styles.body}>
                    <div className={styles.left}>   
                        <div>    
                        <div className={styles.Circle_left}>
                            <div className={styles.img_wrap1}></div>        
                            <img className={styles.thumb} src="https://img.mlbstatic.com/mlb-photos/image/upload/d_people:
                            generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current"/>
                        </div>
                    </div>
                    <div className={styles.left_stats}>
                        <h2>능력치 정보</h2>
                        <div className={styles.button_container}>
                            <button className={styles.text_button_l}>
                                <b>[ 표 ]</b>
                            </button>
                            <button className={styles.graph_button_l}>
                                <b>[텍스트]</b>
                            </button>
                    
                        </div>
                        개인 차트 삽입예정
                        </div>
                        
                        <br/><br/><br/><br/><br/>
                    </div>

                    <div className={styles.center}>
                        <div className={styles.center_top}>MLB 로고 삽입                        </div>
                        <br/><br/>
                        <div className={styles.center_bottom}>
                            {RChart()}
                            <b>차트 들어갈예정</b>
                           <br/><br/><br/><br/><br/><br/>
                      </div>
                    </div>

                    <div className={styles.right}>
                        <div>
                        <div className={styles.Circle_right}>
                            <div className={styles.img_wrap2}></div>
                            <img className={styles.thumb} src="https://img.mlbstatic.com/mlb-photos/image/upload/d_people:
                            generic:headshot:67:current.png/w_213,q_auto:best/v1/people/500743/headshot/67/current"/>
                        </div>
                    </div>
                    <div className={styles.right_stats}>
                        <h2>능력치 정보</h2>
                        <div className={styles.button_container}>
                            <button className={styles.text_button_r}>
                                <b>[ 표 ]</b>
                            </button>
                            <button className={styles.graph_button_r}>
                                <b>[텍스트]</b>
                            </button>
                        </div>
                        </div>
                        <br/><br/><br/><br/><br/>
                    </div>
                </div>
        );
    }

export default render;