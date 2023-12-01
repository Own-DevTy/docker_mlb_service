import { useEffect, useState } from 'react';
import styles from '@/styles/pages/SignIn.module.css';
import Link from 'next/link';
import { getCsrfToken } from 'next-auth/react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default function SignIn({ csrfToken }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [validID, setValidID] = useState(false);
    const [validPW, setValidPW] = useState(false);
    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (validID && validPW) {
            setAllow(false);
            return;
        }
        setAllow(true);
    }, [validID, validPW]);

    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^[a-z A-Z][a-z A-Z 0-9- _]{4,23}$/;
        if (regex.test(e.target.value)) {
            setValidID(true);
        } else {
            setValidID(false);
        }
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setValidPW(true);
        } else {
            setValidPW(false);
        }
    };

    return (
        <div className={styles.container}>
            <form
                className={styles.contentWrapper}
                method="post"
                action="/api/auth/callback/credentials"
            >
                <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                />
                <div className={styles.contentTitle}>Login</div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputTitle}>User ID</label>
                    <div valid={`${validID}`}>
                        <input
                            className={styles.input}
                            name="username"
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={handleId}
                        />
                    </div>
                    <span className={styles.error}>
                        {!validID && id.length > 0 && (
                            <p> 올바른 ID를 입력해주세요 </p>
                        )}
                    </span>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputTitle}>Password</label>
                    <div valid={`${validPW}`}>
                        <input
                            className={styles.input}
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={handlePw}
                        />
                    </div>
                    <span className={styles.error}>
                        {!validPW && pw.length > 0 && (
                            <p>
                                영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                            </p>
                        )}
                    </span>
                </div>
                <button
                    type="submit"
                    disabled={allow}
                    className={styles.submit}
                >
                    login
                </button>
                <div className={styles.signupButton}>
                    <Link href="/signup">회원가입</Link>
                </div>
            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );
    if (session) {
        return { redirect: { destination: '/' } };
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
