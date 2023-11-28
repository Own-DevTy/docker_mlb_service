import { useEffect, useState } from 'react';
import styles from '@/styles/pages/SignIn.module.css';
import Link from 'next/link';

const User = {
    id: 'lhjjhg',
    pw: '@@test123',
};
// 임시로 만든 로그인 성공 아이디

export default function SignIn() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [validID, setValidID] = useState(false);
    const [validPW, setValidPW] = useState(false);
    const [notAllow, setNotAllow] = useState(false);

    useEffect(() => {
        if (validID && validPW) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [validID, validPW]);

    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^[a-z A-Z][a-z A-Z 0-9- _]{3,23}$/;
        if (regex.test(e.target.value)) {
            setValidID(true);
        } else {
            setValidID(false);
        }
    };
    // 유효성 검사: 아이디 정규표현식(regex) = 영어(소문자,대문자), 숫자 포함 3> , <23 사이 입력시 true
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
    // 비번 유효성 검사: 정규표현식 = 영어(대,소문자), 숫자, 특수문자 포함

    const onClickConfirmButton = () => {
        if (id === User.id && pw === User.pw) {
            alert('로그인에 성공했습니다.');
        } else {
            alert('등록되지 않은 회원입니다.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.contentTitle}>Login</div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputTitle}>User ID</label>
                    <div valid={`${validID}`}>
                        <input
                            className={styles.input}
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
                    onClick={onClickConfirmButton}
                    disabled={notAllow}
                    className={styles.loginBtn}
                >
                    login
                </button>
                <div className={styles.signupButton}>
                    <Link href="/signup">회원가입</Link>
                </div>
            </div>
        </div>
    );
}
