import {Fragment, useEffect, useRef, useState} from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css"

export default function SearchBar({props}) {
    const text = useRef();
    const wrapper = useRef();

    const initialSearch = {
        searchData: {hitting: [], pitching: [], team: []},
    };

    const [keyword, setKeyword] = useState("");
    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState(initialSearch);
    const [historyList, setHistory] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://127.0.0.1:8000/api/v1/search/${keyword}`);
            const data = await res.json();
            setSearch({
                searchData: {
                    hitting: data.hitting,
                    pitching: data.pitching,
                    team: data.team
                }
            });
        }

        if (keyword.toString().trim() === "") {
            setSearch({
                searchData: {
                    hitting: [],
                    pitching: [],
                    team: []
                }
            });
        } else {
            fetchData();
        }
    }, [keyword]);

    const onFocus = () => {
        setFocus(true);
    }

    const clickText = () => {
        if (document.activeElement !== text.current && document.activeElement !== wrapper.current) {
            setFocus(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", clickText);
        return () => {
            document.removeEventListener("click", clickText);
        }
    });

    const searchRes = () => {
        return (search.searchData.hitting.length === 0 &&
            search.searchData.pitching.length === 0 &&
            search.searchData.team.length === 0)
    }

    return (
        <div className={styles.searchBar}>
            <input type={"text"} ref={text}
                   onChange={(e) => setKeyword(e.target.value)}
                   onFocus={onFocus}/>
            <Link href={"/search/" + keyword}>검색</Link>
            <div className={styles.searchWrapper} ref={wrapper}>
                {focus &&
                    <div className={styles.searchResultWrapper}>
                        {searchRes() ?
                            (
                                <Fragment>
                                    <div>검색결과가 없습니다...</div>
                                </Fragment>
                            ) :
                            (
                                <Fragment>
                                    { search.searchData?.hitting?.length !== 0 &&
                                        ( <div>타자</div>)
                                    }
                                    {search.searchData?.hitting?.map(({name, id}) => (
                                            <Link href={"/" + id} key={id} className={styles.searchItem}>
                                                <div>{name}</div>
                                            </Link>
                                        )
                                    )}
                                    { search.searchData?.pitching?.length !== 0 &&
                                        ( <div>투수</div>)
                                    }
                                    {search.searchData?.pitching?.map(({name, id}) => (
                                            <Link href={"/" + id} key={id} className={styles.searchItem}>
                                                <div>{name}</div>
                                            </Link>
                                        )
                                    )}
                                    { search.searchData?.team?.length !== 0 &&
                                        ( <div>팀</div>)
                                    }
                                    {search.searchData?.team?.map(({name, id}) => (
                                            <Link href={"/" + id} key={id} className={styles.searchItem}>
                                                <div>{name}</div>
                                            </Link>
                                        )
                                    )}
                                </Fragment>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}