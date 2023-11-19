import {Fragment} from "react";
import Link from "next/link";
import Image from "next/image"
import styles from "@/styles/pages/Home.module.css"

/**
 * @param AL
 * @param NL
 * @param AL.teams[]
 * @param NL.teams[]
 */
export default function Home({AL, NL}) {

    return (
        <div className={styles.mlbWrapper}>
            <div className={styles.leagueWrapper}>
                <div style={{fontSize: "xx-large"}}>American League</div>
                <div className={styles.teamWrapper}>
                    {AL && AL.teams.map(({name, id}) => (
                        <div key={id} className={styles.teamItem}>
                            <Link href={`/search/${id}`}>
                                <Image src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${id}.svg`}
                                       alt={"404"} height={150} width={150}/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.leagueWrapper}>
                <div style={{fontSize: "xx-large"}}>National League</div>
                <div className={styles.teamWrapper}>
                    {NL && NL.teams.map(({name, id}) => (
                        <div key={id} className={styles.teamItem}>
                            <Link href={`/search/${id}`}>
                                <Image src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${id}.svg`}
                                       alt={"404"} height={150} width={150}/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const res_AL = await fetch( `${process.env.api}/team/AL`);
    const res_NL = await fetch( `${process.env.api}/team/NL`);

    const AL = await res_AL.json();
    const NL = await res_NL.json();
    return {props: {AL, NL}, revalidate: 1};
}