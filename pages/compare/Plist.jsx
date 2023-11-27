import { useState } from 'react';
import styled from 'styled-components';
import styles from '@/styles/Plist.module.css';
import { motion, AnimatePresence } from 'framer-motion';

//추후 삭제 import
import Pstats from '@/components/table/Player2Table';
import Pchart from '@/components/chart/chart';

const items = [
    {
        id: '1',
        title: 'Gunnar Henderson',
        subtitle: (
            <div className={styles.h5_box}>
                <div className={styles.up_box}>
                    <div className={styles.player_info}>
                        <p>별명 : none</p>
                        <p>출생 : 6/29/2001 in Montgomery, AL</p>
                        <p>데뷔 : 8/31/2022</p>
                    </div>
                    <div className={styles.player_table}>
                        <Pstats />
                    </div>
                </div>
                <div className={styles.player_graph}>
                    <Pchart />
                </div>
            </div>
        ),
        img: 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current',
    },
    {
        id: '2',
        title: 'Shohei Ohtani',
        subtitle: (
            <div className={styles.h5_box}>
                <div className={styles.up_box}>
                    <div className={styles.player_info}>
                        <p>별명 : Showtime</p>
                        <p>출생 : 7/05/1994 in Oshu, Japan</p>
                        <p>데뷔 : 3/29/2018</p>
                    </div>
                    <div className={styles.player_table}>
                        <p>여기에는 선수의 스탯 테이블</p>
                    </div>
                </div>
                <div className={styles.player_graph}>
                    <p>여기에는 선수의 스탯 그래프</p>
                </div>
            </div>
        ),
        img: 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/660271/headshot/67/current',
    },
    {
        id: '3',
        title: 'Corey Seager',
        subtitle: (
            <div className={styles.h5_box}>
                <div className={styles.up_box}>
                    <div className={styles.player_info}>
                        <p>별명 : Seags</p>
                        <p>출생 : 4/27/1994 in Charlotte, NC</p>
                        <p>데뷔 : 9/03/2015</p>
                    </div>
                    <div className={styles.player_table}>
                        <p>여기에는 선수의 스탯 테이블</p>
                    </div>
                </div>
                <div className={styles.player_graph}>
                    <p>여기에는 선수의 스탯 그래프</p>
                </div>
            </div>
        ),
        img: 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/608369/headshot/67/current',
    },
];

const Accordion = () => {
    return (
        <Container>
            <motion.ul
                layout
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                {items.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </motion.ul>
        </Container>
    );
};

const Item = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <ItemWrap
                onClick={toggleOpen}
                layout
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                <motion.h1>{item.title}</motion.h1>
                <Img>
                    <motion.img
                        src={item.img}
                        alt={item.title}
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
                        <motion.h5
                            layout
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.43, 0.13, 0.23, 0.96],
                            }}
                        >
                            {item.subtitle}
                        </motion.h5>
                    </SubWrap>
                )}
            </AnimatePresence>
        </>
    );
};

//선수 목록 뜨는 칸
const Container = styled(motion.div)`
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

    h1 {
        padding: 5% 5% 5% 5%;
        font-size: 150%;
        z-index: 1;
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
    font-size: 15px;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;

    h5 {
        padding: 3% 4%;
        font-size: 100%;
        line-height: 250%;
        text-align: left;
    }
`;

export default Accordion;
