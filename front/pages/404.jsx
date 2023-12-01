import { Fragment } from 'react';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                margin: 'calc(var(--contents-margin-top)*-1 auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    border: '1px solid #000000',
                    borderRadius: '1rem',
                    padding: '3rem',
                    textAlign: 'center',
                }}
            >
                <h1>404 Not Found</h1>
                <h1>요청하신 페이지는 없는 페이지입니다.</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        color: '#9e30f4',
                        fontSize: '1.5rem',
                        marginTop: '3rem',
                    }}
                >
                    <Link href={'/'}>메인화면으로 이동하기</Link>
                </div>
            </div>
        </div>
    );
}
