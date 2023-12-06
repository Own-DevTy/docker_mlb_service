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
                        <h3>Data Table</h3>
                        <table className={styles.table_}>
                            <thead>
                                <tr>
                                    <th>Created_at</th>
                                    <th>Player_Id</th>
                                    <th>Position</th>
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
                                                <td>{created_at}</td>
                                                <td>{player_id}</td>
                                                <td>{player_position ? '투수' : '타자'}</td>
                                                <td>삭제 버튼 예정</td>
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

export async function getServerSideProps(context) {
    const props = {};
    return UseAuth(context, props);
}