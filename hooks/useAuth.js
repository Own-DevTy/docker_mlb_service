import { getSession } from 'next-auth/react';

export async function getAuthServerSideProps(context, props) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
            },
        };
    }

    return {
        props: {
            user: session.user,
            ...props,
        },
    };
}

/**
 * @param {Object} context getServerSideProps에서 주어지는 param
 * @param {Object} props 추가로 반환되기를 원하는 props object
 * @return {Object}
 * {
 * props: {
 * user=>세션의 유저정보,
 * props=>추가한 props
 *        }
 * }
 * */
export function UseAuth(context, props) {
    return getAuthServerSideProps(context, props);
}
