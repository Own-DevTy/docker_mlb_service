import {Fragment} from "react";
import {useState} from "react";
import styles from "@/styles/compare.module.css"
import Chart from "@/components/chart/chart";
import TableComponent from "@/components/table/CompareTable";
import TablePlayer1 from "@/components/table/Player1Table";
import TablePlayer2 from "@/components/table/Player2Table";

function App() {
    const [showGraphL,setShowGraphL]= useState(false);
    const [showTextL,setShowTextL]=useState(false);
    const [showGraphR,setShowGraphR]= useState(false);
    const [showTextR,setShowTextR]=useState(false);

    const render =()=>{
        

        return (
                <div className ={styles.body}>
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
                            <button className={styles.text_button_l} onClick={()=>{setShowGraphL(false); setShowTextL(true);}}>
                                <b>[ 텍스트 ]</b>
                            </button>
                            
                            <button className={styles.graph_button_l }onClick={()=>{setShowGraphL(true);setShowTextL(false);}}>
                                <b>[ 그래프 ]</b>
                            </button>
                        </div>
                        {showGraphL && (
                            <div>
                                <div className ={styles.chart_background}>
                                <p> {Chart(true, "이름", 5, 4, 3, 2, 1)}</p>
                                </div>
                            </div>
                        )}
                        {showTextL && (
                            <div>
                                <p>Left 스탯정보를 텍스트롤 표현합니다.</p>
                               <TablePlayer1/>
                            </div>
                        )}

                        </div>
                    </div>

                    <div className={styles.center}>
                        <div className={styles.center_top}>             MLB 로고 삽입               </div>
                        <br/><br/>
                        <div className={styles.center_bottom}>
                            {Chart(
                                "Name1", 1, 2, 3, 4, 5,
                                "Name2", 3, 3, 2, 5, 6, true
                            )}
                            {Chart(
                                "C", 1, 2, 3, 4, 5,
                                "D", 6, 3, 2, 3, 6, false
                            )}
                            <TableComponent/>
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
                            <button className={styles.text_button_l} onClick={()=>{setShowGraphR(false); setShowTextR(true);}}>
                                <b>[ 텍스트 ]</b>
                            </button>
                            <button className={styles.graph_button_l }onClick={()=>{setShowGraphR(true);setShowTextR(false);}}>
                                <b>[ 그래프 ]</b>
                            </button>
                        </div>
                        {showGraphR && (
                            <div>
                                <p>{Chart(false, null, null, null, null, null, null,
                                    "name2", 1, 5, 7, 3, 2)}</p>
                            </div>
                        )}
                        {showTextR && (
                            <div>
                                <p>Right 스탯정보를 텍스트롤 표현합니다.</p>
                                <TablePlayer2/>
                            </div>
                        )}
                        </div>
                        <br/><br/><br/><br/><br/>
                    </div>
                    
                </div>
        );
    }
    return render();
}

export default App;