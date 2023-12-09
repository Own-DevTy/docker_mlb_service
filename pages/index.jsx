import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/pages/Home.module.css';
import SelectButton from '@/components/common/SelectButton';
import { useState } from 'react';

/**
 * @param AL
 * @param NL
 * @param AL.teams[]
 * @param NL.teams[]
 */
export default function Home({ AL, NL }) {
    const [position, setPosition] = useState(true);
    return (
        <div>
            <SelectButton selectPosition={setPosition} position={position} />
        </div>
    );
}

export async function getStaticProps() {
    const res_hitting = await fetch(
        `${process.env.api}/all/hitting?skip=0&limit=1000`
    );
    const res_pitching = await fetch(
        `${process.env.api}/all/pitching?skip=0&limit=1000`
    );

    const hitting = await res_hitting.json();
    const pitching = await res_pitching.json();

    console.log(hitting);
    // const hit_age = hitting.hitting.sort((a, b) => a.age > b.age);
    // const pit_age = pitching.pitching.filter(())

    return { props: { hitting, pitching }, revalidate: 1 };
}
