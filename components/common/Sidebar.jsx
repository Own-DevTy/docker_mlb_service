import styles from '@/styles/components/common/Sidebar.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { MdDeleteOutline } from 'react-icons/md';
import { Fragment, useCallback, useEffect, useReducer, useState } from 'react';
import { useHistoryCookies } from '@/cookie/useHistoryCookies';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaBaseballBatBall, FaRegAddressBook } from 'react-icons/fa6';
import { BiBaseball } from 'react-icons/bi';

function HistoryInCookies({ setOpen }) {
    const { historyCookies, setHistoryCookie, removeHistoryCookie } =
        useHistoryCookies();

    function reducer(state, action) {
        const getCookiesKey = Object.keys(historyCookies);
        switch (action.type) {
            case 'remove':
                return state.filter((value) => value.key !== action.hist_key);
            case 'load':
                return getCookiesKey.map((key) => {
                    return historyCookies[key];
                });
            default:
                return state;
        }
    }

    const [cookiesData, dispatch] = useReducer(reducer, []);

    function deleteHistory(hist_key) {
        removeHistoryCookie(hist_key);
        dispatch({ type: 'remove', hist_key: hist_key });
    }

    useEffect(() => {
        dispatch({ type: 'load' });
    }, []);

    if (cookiesData.length === 0)
        return (
            <Fragment>
                <p className={styles.warnMessage}>저장된 기록이 없습니다.</p>
                <p className={styles.warnMessage}>
                    비회원은 검색기록이 영구적으로 저장되지 않습니다.
                </p>
            </Fragment>
        );

    return (
        <Fragment>
            {cookiesData.map((data, index, array) => (
                <div key={index} className={styles.historyItem}>
                    <Link
                        href={`/compare?pid=${data.player1.id}&position=${data.position}&pids=[${data.player2.id}]`}
                        onClick={() => setOpen(false)}
                    >
                        {data.player1.name} VS {data.player2.name}
                    </Link>
                    <div>
                        {data.position !== 'hitting' ? (
                            <BiBaseball fontSize={'1.1rem'} />
                        ) : (
                            <FaBaseballBatBall fontSize={'1.1rem'} />
                        )}
                        <MdDeleteOutline
                            fontSize={'1.5rem'}
                            onClick={() => {
                                deleteHistory(
                                    `${data.player1.id} ${data.player2.id}`
                                );
                            }}
                        />
                    </div>
                </div>
            ))}
            <p className={styles.warnMessage}>
                비회원은 검색기록이 영구적으로 저장되지 않습니다.
            </p>
        </Fragment>
    );
}

function HistoryInDB({ setOpen, id }) {
    const [histories, setHistories] = useState([]);
    const [state, updateState] = useState(false);

    function deleteHistory(hist_id) {
        fetch(`http://0.0.0.0:8000/api/v1/compare_history/${hist_id}`, {
            method: 'delete',
        }).then(() => {
            updateState(!state);
        });
    }

    useEffect(() => {
        async function getHistory() {
            const res = await fetch(
                `http://0.0.0.0:8000/api/v1/compare_history/${id}`
            );
            const data = await res.json();
            const history = await Promise.all(
                data.histories.map(
                    async ({ id, player_fir, player_sec, player_position }) => {
                        const fir = await fetch(
                            `http://0.0.0.0:8000/api/v1/player/${player_fir}/${
                                player_position ? 'pitching' : 'hitting'
                            }`
                        );

                        const sec = await fetch(
                            `http://0.0.0.0:8000/api/v1/player/${player_sec}/${
                                player_position ? 'pitching' : 'hitting'
                            }`
                        );
                        return {
                            id: id,
                            fir: await fir.json(),
                            sec: await sec.json(),
                            position: player_position,
                        };
                    }
                )
            );
            setHistories(history);
        }

        getHistory();
    }, [state]);

    if (histories.length === 0) {
        return <p className={styles.warnMessage}>저장된 기록이 없습니다.</p>;
    }

    return (
        <Fragment>
            {histories.map((data, index) => (
                <div key={index} className={styles.historyItem}>
                    <Link
                        key={index}
                        href={`/compare?pid=${data.fir.id}&position=${
                            data.position ? 'pitching' : 'hitting'
                        }&pids=[${data.sec.id}]`}
                        onClick={() => setOpen(false)}
                    >
                        {data.fir.name} VS {data.sec.name}
                    </Link>
                    <div>
                        {data.position ? (
                            <BiBaseball fontSize={'1.1rem'} />
                        ) : (
                            <FaBaseballBatBall fontSize={'1.1rem'} />
                        )}
                        <MdDeleteOutline
                            fontSize={'1.5rem'}
                            onClick={() => {
                                deleteHistory(data.id);
                            }}
                        />
                    </div>
                </div>
            ))}
        </Fragment>
    );
}

const sidebar = {
    initial: {
        x: '100%',
        opacity: 0,
    },
    animate: {
        x: '0%',
        opacity: 1,
    },
    exit: {
        x: '100%',
        opacity: 0,
    },
    transition: { type: 'spring', bounce: 100, duration: 0.3 },
};

function SidebarDiv({ isOpen, setOpen }) {
    const { data: session, status } = useSession();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal"
                    className={styles.sidebar}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    transition={'transition'}
                    variants={sidebar}
                >
                    <div className={styles.exit} onClick={() => setOpen(false)}>
                        &times;
                    </div>
                    <h1>비교기록</h1>
                    <div className={styles.history}>
                        {status === 'authenticated' ? (
                            <Fragment>
                                <HistoryInDB
                                    id={session.user.id}
                                    setOpen={setOpen}
                                ></HistoryInDB>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <HistoryInCookies
                                    setOpen={setOpen}
                                ></HistoryInCookies>
                            </Fragment>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Sidebar() {
    const [isOpen, setOpen] = useState(false);
    return (
        <Fragment>
            <FaRegAddressBook
                color={'white'}
                fontSize={'1.6rem'}
                cursor={'pointer'}
                onClick={() => setOpen(true)}
            />
            <SidebarDiv {...{ isOpen, setOpen }} />
        </Fragment>
    );
}
