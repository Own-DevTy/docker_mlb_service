import Image from "next/image";
import styles from "@/styles/pages/Search.module.css"
import {useState} from "react";
import {motion} from "framer-motion";
import {FaBaseballBatBall} from "react-icons/fa6";
import {BiBaseball} from "react-icons/bi";
import SelectButton from "@/components/common/SelectButton";

function PlayerWrapper({position, hitting_json, pitching_json}) {
    return (
        <div className={styles.playerWrapper}>

        </div>
    )
}

export default function Search({id, hitting_json, pitching_json}) {
    const [position, selectPosition] = useState(true)
    return (
        <div className={styles.searchWrapper}>
            <Image className={styles.teamLogo} height={150} width={100} alt={"404"}
                   src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${id}.svg`}/>
            <div className={styles.container}>
                <SelectButton position={position} selectPosition={selectPosition}/>
                <PlayerWrapper hitting_json={hitting_json} pitching_json={pitching_json}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    // const hitting_res = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${id}`);
    // const pitching_res = await fetch(`http://127.0.0.1:8000/api/v1/search/pitching/${id}`);

    // const [hitting_json, pitching_json] = await Promise.all([hitting_res.json(), pitching_res.json()])
    const hitting_json = {}
    const pitching_json = {}
    return {props: {id, hitting_json, pitching_json}}
}