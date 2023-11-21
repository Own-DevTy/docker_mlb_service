import {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/total.module.css"

export default function House() {
    //리그 선택 관리
    const [l_selectedValue, l_setSelectedValue] = useState('none');
    const [r_selectedValue, r_setSelectedValue] = useState('none');
    const l_handleSelectChange = (event) => {
        l_setSelectedValue(event.target.value);
    };
    const r_handleSelectChange = (event) => {
        r_setSelectedValue(event.target.value);
    };

    useEffect(()=>{console.log(l_selectedValue)},[l_selectedValue]); //console.log 추후 삭제
    useEffect(()=>{console.log(r_selectedValue)},[r_selectedValue]);

    //선수 목록 선택 관리(1~5)
    const [l_isChecked1, l_setIsChecked1] = useState(false);
    const [l_isChecked2, l_setIsChecked2] = useState(false);
    const [l_isChecked3, l_setIsChecked3] = useState(false);
    const [l_isChecked4, l_setIsChecked4] = useState(false);
    const [l_isChecked5, l_setIsChecked5] = useState(false);
    const [r_isChecked1, r_setIsChecked1] = useState(false);
    const [r_isChecked2, r_setIsChecked2] = useState(false);
    const [r_isChecked3, r_setIsChecked3] = useState(false);
    const [r_isChecked4, r_setIsChecked4] = useState(false);
    const [r_isChecked5, r_setIsChecked5] = useState(false);

    const l_handleCheckboxChange = (l_checkboxNumber) => {
        if (l_checkboxNumber === 1) {
            l_setIsChecked1(!l_isChecked1);
            console.log('lCheckbox 1 checked:', !l_isChecked1);
        } else if (l_checkboxNumber === 2) {
            l_setIsChecked2(!l_isChecked2);
            console.log('lCheckbox 2 checked:', !l_isChecked2);
        } else if (l_checkboxNumber === 3) {
            l_setIsChecked3(!l_isChecked3);
            console.log('lCheckbox 3 checked:', !l_isChecked3);
        } else if (l_checkboxNumber === 4) {
            l_setIsChecked4(!l_isChecked4);
            console.log('lCheckbox 4 checked:', !l_isChecked4);
        } else if (l_checkboxNumber === 5) {
            l_setIsChecked5(!l_isChecked5);
            console.log('lCheckbox 5 checked:', !l_isChecked5);
        } else {
            console.log("Error")
        }
    };
    const r_handleCheckboxChange = (r_checkboxNumber) => {
        if (r_checkboxNumber === 1) {
            r_setIsChecked1(!r_isChecked1);
            console.log('rCheckbox 1 checked:', !r_isChecked1);
        } else if (r_checkboxNumber === 2) {
            r_setIsChecked2(!r_isChecked2);
            console.log('rCheckbox 2 checked:', !r_isChecked2);
        } else if (r_checkboxNumber === 3) {
            r_setIsChecked3(!r_isChecked3);
            console.log('rCheckbox 3 checked:', !r_isChecked3);
        } else if (r_checkboxNumber === 4) {
            r_setIsChecked4(!r_isChecked4);
            console.log('rCheckbox 4 checked:', !r_isChecked4);
        } else if (r_checkboxNumber === 5) {
            r_setIsChecked5(!r_isChecked5);
            console.log('rCheckbox 5 checked:', !r_isChecked5);
        } else {
            console.log("Error")
        }
    };

    return (
        <div className={styles.main_frame}>
            <div className={styles.left}>
                <div className={styles.left_league}>
                    <h1 className={styles.text_choose}>Choose the League</h1>
                    <select className={styles.left_select} value={l_selectedValue} onChange={l_handleSelectChange}>
                        <option value="l_none">===Choose===</option>
                        <option value="l_n_league">National League</option>
                        <option value="l_a_league">American League</option>
                    </select>
                </div>
                <div className={styles.left_plist}>
                    <h1 className={styles.text_list}>MLB Player List</h1>
                    <div className={styles.check_box}>
                        <div className={styles.l_check_box}>
                            <input type="checkbox" id="l_player1" name="option" checked={l_isChecked1}
                                   onChange={() => l_handleCheckboxChange(1)}/>
                            <label htmlFor="l_player1">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Gunnar Henderson</label><br/>
                            <input type="checkbox" id="l_player2" name="option" checked={l_isChecked2}
                                   onChange={() => l_handleCheckboxChange(2)}/>
                            <label htmlFor="l_player2">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/642715/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Willy Adames</label><br/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.center}>
                <h2></h2>
            </div>

            <div className={styles.right}>
                <div className={styles.right_league}>
                    <h1 className={styles.text_choose}>Choose the League</h1>
                    <select className={styles.right_select} value={r_selectedValue} onChange={r_handleSelectChange}>
                        <option value="r_none">===Choose===</option>
                        <option value="r_n_league">National League</option>
                        <option value="r_a_league">American League</option>
                    </select>
                </div>
                <div className={styles.right_plist}>
                    <h1 className={styles.text_list}>MLB Player List</h1>
                    <div className={styles.check_box}>
                        <div className={styles.r_check_box}>
                            <input type="checkbox" id="r_player1" name="option" checked={r_isChecked1}
                                   onChange={() => r_handleCheckboxChange(1)}/>
                            <label htmlFor="r_player1">
                                <img className={styles.id_photo}
                                     src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current`}
                                     alt={"404"} height={50} width={50}/>Gunnar Henderson</label><br/>
                            <input type="checkbox" id="r_player2" name="option" checked={r_isChecked2}
                                   onChange={() => r_handleCheckboxChange(2)}/>
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