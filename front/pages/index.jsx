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

function ClickCell({ children, pid, position }) {
    return (
        <Cell>
            <Link
                href={`/choose?pid=${pid}&position=${
                    position ? 'pitching' : 'hitting'
                }`}
            >
                {children}
            </Link>
        </Cell>
    );
}

export default function Home(props) {
    const [position, setPosition] = useState(true);
    const theme = useTheme({
        HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
        Row: `
            cursor: pointer;
            &:hover .td {
                color: #007FFF;
            }
          `,
        BaseCell: `
        width: 120%;
          text-align: left;
          padding: 1%;
          &:nth-child(-n+2) {
            width: 150%;
        }
        &:nth-child(3) {
            margin-left: 30%;
        }
        &:nth-child(5) {
            margin-left: -20%;
        }
      `,
    });

    return (
        <div>
            <div className={styles.main}>
                <SelectButton
                    selectPosition={setPosition}
                    position={position}
                />
                <div className={styles.table_box}>
                    {position
                        ? '개발자가 좋아하는 타자 Top5'
                        : '개발자가 좋아하는 투수 Top5'}
                    <div className={styles.table_like}>
                        <Table
                            data={position ? props.hit_like : props.pit_like}
                            theme={theme}
                        >
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
                                                <ClickCell pid={item.id}>
                                                    {item.team_name}
                                                </ClickCell>
                                                <ClickCell pid={item.id}>
                                                    {item.name}
                                                </ClickCell>
                                                <ClickCell pid={item.id}>
                                                    {item.age}
                                                </ClickCell>
                                                <ClickCell pid={item.id}>
                                                    {item.height}
                                                </ClickCell>
                                                <ClickCell pid={item.id}>
                                                    {item.weight}
                                                </ClickCell>
                                            </Row>
                                        ))}
                                    </Body>
                                </>
                            )}
                        </Table>
                    </div>
                    {position
                        ? '나이가 많은 타자 Top3'
                        : '나이가 많은 투수 Top3'}
                    <div className={styles.table_age}>
                        <Table
                            data={position ? props.hit_age : props.pit_age}
                            theme={theme}
                        >
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
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.team_name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.age}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.height}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.weight}
                                                </ClickCell>
                                            </Row>
                                        ))}
                                    </Body>
                                </>
                            )}
                        </Table>
                    </div>
                    {position ? '키가 큰  타자 Top3' : '키가 큰  투수 Top3'}
                    <div className={styles.table_height}>
                        <Table
                            data={
                                position ? props.hit_height : props.pit_height
                            }
                            theme={theme}
                        >
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
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.team_name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.age}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.height}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.weight}
                                                </ClickCell>
                                            </Row>
                                        ))}
                                    </Body>
                                </>
                            )}
                        </Table>
                    </div>
                    {position
                        ? '무게가 가벼운 타자 Top3'
                        : '무게가 가벼운 투수 Top3'}
                    <div className={styles.table_weight}>
                        <Table
                            data={
                                position ? props.hit_weight : props.pit_weight
                            }
                            theme={theme}
                        >
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
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.team_name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.age}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.height}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.weight}
                                                </ClickCell>
                                            </Row>
                                        ))}
                                    </Body>
                                </>
                            )}
                        </Table>
                    </div>
                    {position
                        ? '이름이 가장 긴 타자 Top3'
                        : '이름이 가장 긴 투수 Top3'}
                    <div className={styles.table_length}>
                        <Table
                            data={
                                position ? props.hit_length : props.pit_length
                            }
                            theme={theme}
                        >
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
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.team_name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.name}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.age}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.height}
                                                </ClickCell>
                                                <ClickCell
                                                    pid={item.id}
                                                    position={position}
                                                >
                                                    {item.weight}
                                                </ClickCell>
                                            </Row>
                                        ))}
                                    </Body>
                                </>
                            )}
                        </Table>
                    </div>
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
            hit_like: { nodes: hit_like },
            hit_age: { nodes: hit_age },
            hit_length: { nodes: hit_length },
            hit_height: { nodes: hit_height },
            hit_weight: { nodes: hit_weight },
            pit_like: { nodes: pit_like },
            pit_age: { nodes: pit_age },
            pit_length: { nodes: pit_length },
            pit_height: { nodes: pit_height },
            pit_weight: { nodes: pit_weight },
        },
    };
}
