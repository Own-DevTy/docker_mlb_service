import Image from "next/image";
import styles from "@/styles/pages/Search.module.css"
import {useState} from "react";
import {motion} from "framer-motion";
import {FaBaseballBatBall} from "react-icons/fa6";
import {BiBaseball} from "react-icons/bi";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 70
}

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
            <Image className={styles.teamLogo} width={150} height={150} alt={"404"}
                   src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${id}.svg`}/>
            <div className={styles.container}>
                <div className={styles.selectorWrapper}>
                    <div className={styles.selector} data-ison={position}
                         onClick={() => selectPosition(!position)}>
                        <motion.div className={styles.handle} layout transition={spring}>
                            {position ? (<FaBaseballBatBall/>) : (<BiBaseball/>)}
                        </motion.div>
                        <PlayerWrapper
                            hitting_json={hitting_json}
                            pitching_json={pitching_json}
                            position={position}
                        />
                    </div>
                </div>
                <PlayerWrapper hitting_json={hitting_json} pitching_json={pitching_json}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const hitting_res = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${id}`);
    const pitching_res = await fetch(`http://127.0.0.1:8000/api/v1/search/pitching/${id}`);

    const [hitting_json, pitching_json] = await Promise.all([hitting_res.json(), pitching_res.json()])

    return {props: {id, hitting_json, pitching_json}}
}