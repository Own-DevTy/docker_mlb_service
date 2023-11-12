import {Fragment} from "react";
import Link from "next/link";
import Image from "next/image"
import styles from "@/styles/Home.module.css"

/**
 * @param AL
 * @param NL
 * @param AL.teams[]
 * @param NL.teams[]
 */
export default function Home({AL, NL}) {

    return (
        <div className={styles.mlbWrapper}>
            <div className={styles.teamWrapper}>
                {AL && AL.teams.map(({name, id}) => (
                    <div key={id} className={styles.teamItem}>
                        <Link href={"/"}>
                            <Image src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${id}.svg`}
                                 alt={"404"} height={100} width={100}/>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.teamWrapper}>
                {NL && NL.teams.map(({name, id}) => (
                    <div key={id} className={styles.teamItem}>
                        <Link href={"/"}>
                            <Image src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${id}.svg`}
                                   alt={"404"} height={100} width={100}/>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const res_AL = await fetch("http://127.0.0.1:8000/api/v1/team/AL");
    const res_NL = await fetch("http://127.0.0.1:8000/api/v1/team/NL");

    const AL = await res_AL.json();
    const NL = await res_NL.json();
    return {props: {AL, NL}};
}