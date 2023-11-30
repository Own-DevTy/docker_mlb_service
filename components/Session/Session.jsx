import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

export default function Session({ children }) {
    const [data, status] = useSession();

    return status === 'authenticated' ? (
        { children }
    ) : (
        <p>접근 권한이 없습니다.</p>
    );
}
