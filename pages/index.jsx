import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/pages/Home.module.css';
import SelectButton from '@/components/common/SelectButton';
import { useState } from 'react';
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

export default function Home(props) {
    const [position, setPosition] = useState(true);
    const theme = useTheme({
        Row: `
            cursor: pointer;
            &:hover .td {
                color: #007FFF;
            }
          `,
        BaseCell: `
            width: 80%;
            text-align: left;
            padding: 1%;
            &:nth-child(-n+2) {
                width: 150%;
            }
            &:nth-child(2) {
                margin-left: 50%;
            }
            &:nth-child(3) {
                margin-left: 100%;
            }
            &:nth-child(n+4):nth-child(-n+7) {
                margin-left: 100%;
            }
          `,
    });

    return (
        <div>
            <SelectButton selectPosition={setPosition} position={position} />
            <div className={styles.main} position={position}>
                {position === 'hitting'
                    ? '나이가 많은 타자 Top3'
                    : '나이가 많은 투수 Top3'}
                (console.log{props.hit_age})
                <div className={styles.table_age}>
                    <Table data={props.hit_age} theme={theme}>
                        {(tableList) => (
                            <>
                                <Header>
                                    <HeaderRow>
                                        <HeaderCell>팀 이름</HeaderCell>
                                        <HeaderCell>선수 이름</HeaderCell>
                                        <HeaderCell>나이</HeaderCell>
                                        <HeaderCell>키</HeaderCell>
                                        <HeaderCell>몸무게</HeaderCell>
                                    </HeaderRow>
                                </Header>
                                <Body>
                                    {tableList.map((item, index) => (
                                        <Row key={index}>
                                            <Cell>{item.team_name}</Cell>
                                            <Cell>{item.name}</Cell>
                                            <Cell>{item.age}</Cell>
                                            <Cell>{item.height}</Cell>
                                            <Cell>{item.weight}</Cell>
                                        </Row>
                                    ))}
                                </Body>
                            </>
                        )}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const res_hitting = await fetch(
        `${process.env.api}/all/hitting?skip=0&limit=1000`
    );
    const res_pitching = await fetch(
        `${process.env.api}/all/pitching?skip=0&limit=1000`
    );

    const hitting = await res_hitting.json();
    const pitching = await res_pitching.json();

    const likeHitter = [595751, 621566, 606192, 691406, 660271];
    const likePitcher = [592826, 543243, 592662, 579328, 547943];
    // //민증, 동준, 선빈, 현구, 태양
    // const likeHitter = [595751, 621566, 606192, , 660271];
    // const likePitcher = [592826, 543243, 592662, , 547943];
    const hit_like = hitting.hitting.filter((a) => likeHitter.includes(a.id));
    const pit_like = pitching.pitching.filter((a) =>
        likePitcher.includes(a.id)
    );

    const hit_age = hitting.hitting.sort((a, b) => b.age - a.age).slice(0, 3);
    const pit_age = pitching.pitching.sort((a, b) => b.age - a.age).slice(0, 3);

    const hit_length = hitting.hitting
        .sort((a, b) => b.name.length - a.name.length)
        .slice(0, 3);
    const pit_length = pitching.pitching
        .sort((a, b) => b.name.length - a.name.length)
        .slice(0, 3);

    const hit_height = hitting.hitting
        .sort((a, b) => b.height - a.height)
        .slice(0, 3);
    const pit_height = pitching.pitching
        .sort((a, b) => b.height - a.height)
        .slice(0, 3);

    const hit_weight = hitting.hitting
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3);
    const pit_weight = pitching.pitching
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3);

    return {
        props: {
            hit_like,
            hit_age,
            hit_length,
            hit_height,
            hit_weight,
            pit_like,
            pit_age,
            pit_length,
            pit_height,
            pit_weight,
        },
    };
}
