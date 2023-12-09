import { useState } from 'react';
import styled from '@emotion/styled';
import styles from '@/styles/Plist.module.css';
import { motion, AnimatePresence } from 'framer-motion';

//추후 삭제 import
import PlayerTable from '@/components/table/PlayerTable';
import Chart from '@/components/chart/chart';

const Accordion = ({ children }) => {
    return (
        <Container>
            <motion.ul
                layout
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                {children}
            </motion.ul>
        </Container>
    );
};

export const Item = ({ playerData, data, position }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <ItemWrap
                onClick={toggleOpen}
                layout
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                <motion.h1>{data.name}</motion.h1>
                <Img>
                    <motion.img
                        src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${data.id}/headshot/67/current`}
                        alt={data.name}
                        layout
                        transition={{
                            duration: 0.3,
                            ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                    />
                </Img>
            </ItemWrap>
            <AnimatePresence>
                {isOpen && (
                    <SubWrap>
                        <motion.div
                            layout
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.43, 0.13, 0.23, 0.96],
                            }}
                        >
                            <div className={styles.up_box}>
                                <div className={styles.player_info}>
                                    <p>이름 : {data.name}</p>
                                </div>
                                <div className={styles.player_info_}>
                                    <p>나이 : {data.age}</p>
                                    <p>&nbsp;&nbsp;키 : {data.height}</p>
                                    <p>&nbsp;&nbsp;몸무게 : {data.weight}</p>
                                </div>
                                <PlayerTable data={data} position={position} />
                            </div>
                            <div className={styles.player_graph}>
                                <div className={styles.player_graph_size}>
                                    {Chart(
                                        position === 'hitting',
                                        playerData.name,
                                        position === 'hitting'
                                            ? playerData.avg * 100
                                            : playerData.strikeOuts,
                                        position === 'hitting'
                                            ? playerData.obp * 100
                                            : playerData.era,
                                        position === 'hitting'
                                            ? playerData.slg * 100
                                            : playerData.baseOnBalls,
                                        position === 'hitting'
                                            ? playerData.ops * 100
                                            : playerData.whip,
                                        position === 'hitting'
                                            ? playerData.homeRuns
                                            : playerData.strikeoutsPer9Inn,
                                        data.name,
                                        position === 'hitting'
                                            ? data.avg * 100
                                            : data.strikeOuts,
                                        position === 'hitting'
                                            ? data.obp * 100
                                            : data.era,
                                        position === 'hitting'
                                            ? data.slg * 100
                                            : data.baseOnBalls,
                                        position === 'hitting'
                                            ? data.ops * 100
                                            : data.whip,
                                        position === 'hitting'
                                            ? data.homeRuns
                                            : data.strikeoutsPer9Inn
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </SubWrap>
                )}
            </AnimatePresence>
        </>
    );
};

//선수 목록 뜨는 칸
const Container = styled(motion.div)`
    margin-top: 0.5%;
    width: 100%;
    text-align: center;

    ul {
        height: 100%;
        width: 100%;
        background: #fff;
        margin: 0 auto;
    }
`;

const ItemWrap = styled(motion.li)`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin-top: -1px;
    background: white;
    overflow: hidden;
    padding: 3% 3% 3% 3%;

    h1 {
        font-size: 1.5rem;
        opacity: 0.9;
    }
`;
//선수 얼굴 사진
const Img = styled(motion.div)`
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 30px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;

    img {
        width: 130%;
        height: 130%;
        border-radius: 50%;
        vertical-align: bottom;
        object-fit: cover;
    }
`;

const SubWrap = styled(motion.div)`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
`;

export default Accordion;
