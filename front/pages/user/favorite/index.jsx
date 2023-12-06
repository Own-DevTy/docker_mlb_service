import { UseAuth } from '@/hooks/useAuth';
import { Fragment, useEffect, useState } from 'react';
import styles from '@/styles/pages/user/favorite.module.css';

const initial_state = [
    {
        player_id: null,
        player_position: null,
        created_at: null,
        id: null,
        user_id: null,
    },
];

export default function UserFavorite({ user, props }) {
    const [render, setRender] = useState(false);
    const [favorites, setFavorite] = useState(initial_state);

    useEffect(() => {
        async function getFavorite() {
            const res = await fetch(`${process.env.api}/favorite/${user.id}`);
            return await res.json().then((value) => {
                return value.favorites;
            });
        }
        getFavorite().then((data) => {
            setFavorite(data);
            setRender(true);
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.favoriteWrapper}>
                {render && favorites.length !== 0 ? (
                    <div className={styles.table_title}>
                        <h3>선수 즐겨찾기</h3>
                        <table className={styles.table_}>
                            <thead>
                                <tr>
                                    <th>생성 날짜</th>
                                    <th>선수 ID</th>
                                    <th>포지션</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {favorites.map(
                                ({
                                    id,
                                    user_id,
                                    created_at,
                                    player_id,
                                    player_position,
                                }) => (
                                    <tbody key={id}>
                                            <tr>
                                                <td>
                                                {created_at.substr(0, 4)}년&nbsp;
                                                {created_at.substr(5, 2)}월&nbsp;
                                                {created_at.substr(8, 2)}일
                                                </td>
                                                <td>{player_id}</td>
                                                <td>{player_position ? '투수' : '타자'}</td>
                                                <td>
                                                    <button onClick={
                                                        () => buttonClickEvent(id)
                                                    }>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                    </tbody>
                                )
                            )}
                        </table>
                    </div>
                ) : (
                    <Fragment>검색결과가 없습니다.</Fragment>
                )}
            </div>
        </div>
    );
}

export async function buttonClickEvent(id) {
    await fetch(`${process.env.api}/favorite/${id}`, {
        method: "DELETE",
    });
    location.reload();
}

export async function getServerSideProps(context) {
    const props = {};
    return UseAuth(context, props);
}