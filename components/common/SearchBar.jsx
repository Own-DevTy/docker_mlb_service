import {Fragment, useEffect, useRef, useState} from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css"

export default function SearchBar({props}) {
    const text = useRef();
    const wrapper = useRef();

    const initialSearch = {
        searchKeyword: "",
        searchData: {hitting: [], pitching: [], team: []},
        searchFocus: false,
    };

    const [search, setSearch] = useState(initialSearch);
    const [historyList, setHistory] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://127.0.0.1:8000/api/v1/search/${search.searchKeyword}`);
            const data = await res.json();
            setSearch({
                ...search, searchData: {
                    hitting: data.hitting,
                    pitching: data.pitching,
                    team: data.team
                }
            });
        }

        if (search.searchKeyword.toString().trim() === "") {
            setSearch({
                ...search, searchData: {
                    hitting: [],
                    pitching: [],
                    team: []
                }
            });
        } else {
            fetchData();
        }
    }, [search.searchKeyword]);

    const onFocus = () => {
        setSearch({...search, searchFocus: true});
    }

    const clickText = () => {
        if (document.activeElement !== text.current) {
            setSearch({...search, searchFocus: false})
        }
    }

    useEffect(() => {
        document.addEventListener("click", clickText);
    });

    const searchRes = () => {
        return (search.searchData.hitting.length === 0 &&
            search.searchData.pitching.length === 0 &&
            search.searchData.team.length === 0)
    }

    return (
        <div className={styles.searchBar}>
            <input type={"text"} ref={text}
                   onChange={(e) => setSearch({...search, searchKeyword: e.target.value.trim()})}
                   onFocus={onFocus}/>
            <Link href={"/search/" + search.searchKeyword}>Search</Link>
            <div className={styles.searchWrapper}>
                {search.searchFocus &&
                    <div className={styles.searchResultWrapper}>
                        {searchRes() ?
                            (
                                <Fragment>
                                    <div>검색결과가 없습니다...</div>
                                </Fragment>
                            ) :
                            (
                                <Fragment>
                                    <div>타자</div>
                                    {search.searchData?.hitting?.map(({name, id}) => (
                                            <Link href={"/" + id} key={id} className={styles.searchItem}>
                                                <div>{name}</div>
                                            </Link>
                                        )
                                    )}
                                    <div>투수</div>
                                    {search.searchData?.pitching?.map(({name, id}) => (
                                            <Link href={"/" + id} key={id} className={styles.searchItem}>
                                                <div>{name}</div>
                                            </Link>
                                        )
                                    )}
                                    <div>팀</div>
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