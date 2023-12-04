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
                    <div>
                        {favorites.map(
                            ({
                                id,
                                user_id,
                                created_at,
                                player_id,
                                player_position,
                            }) => (
                                <div key={id}>
                                    <p>{user_id}</p>
                                    <p>{created_at}</p>
                                    <p>{player_id}</p>
                                    <p>{player_position ? '투수' : '타자'}</p>
                                </div>
                            )
                        )}
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
