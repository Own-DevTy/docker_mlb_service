'use server';
import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/Signup.module.css';

export default async function SignUpForm() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [idExists, setIdExists] = useState(false); // 아이디 존재 확인
    const [emailExists, setEmailExists] = useState(false); // 이메일 존재 확인
    const [formError, setFormError] = useState(false); // 폼 에러 상태
    //유효성 검사
    const [idValid, setIdValid] = useState(false);
    const [nameVaild, setNameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    //오류 메세지 상태 저장
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [duplicateIdMessage, setDuplicateIdMessage] = useState(''); // 아이디 중복 체크 메세지
    const [duplicateEmailMessage, setDuplicateEmailMessage] = useState(''); // 이메일 중복 체크 메세지
    //필수 입력 요소 Ref
    const idInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    useEffect(() => {
        if (
            (idInputRef.current ||
                nameInputRef.current ||
                emailInputRef.current ||
                passwordInputRef.current ||
                confirmPassword.current) &&
            formError
        ) {
            if (!id) {
                idInputRef.current.focus();
            } else if (!name) {
                nameInputRef.current.focus();
            } else if (!email) {
                emailInputRef.current.focus();
            } else if (!password) {
                passwordInputRef.current.focus();
            } else if (!confirmPassword) {
                confirmPasswordInputRef.current.focus();
            }
        }
    }, [formError]);

    // 아이디 중복체크 버튼
    const handleCheckId = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `${process.env.api}/user/validate/id/${id}`
        );
        const result = await response.json();

        if (result.user_id_validate == 0) {
            setDuplicateIdMessage('이미 사용 중인 아이디입니다.');
            setIdExists(true);
        } else {
            setDuplicateIdMessage('사용 가능한 아이디입니다.');
            setIdExists(false);
        }
    };

    // 이메일 중복체크 버튼
    const handleCheckEmail = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://0.0.0.0:8000/user/validate/email/${email}`
        );
        const result = await response.json();

        if (result.email_validate == 0) {
            setDuplicateEmailMessage('이미 사용중인 이메일입니다.');
            setEmailExists(true);
        } else {
            setDuplicateEmailMessage('사용 가능한 이메일입니다.');
            setEmailExists(false);
        }
    };

    // 유효성 검사 (정규식 표현)
    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^[a-zA-Z0-9]{3,12}$/;
        if (!regex.test(e.target.value)) {
            setIdMessage('아이디 형식이 올바르지 않습니다.');
            setIdValid(false);
            setDuplicateIdMessage(''); // 아이디 유효성 검사 후 중복 메시지 초기화
        } else {
            setIdValid(true);
        }
    };

    const handleName = (e) => {
        setName(e.target.value);
        const regex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
        if (!regex.test(e.target.value)) {
            setNameValid(false);
        } else {
            setNameValid(true);
        }
    };

    // 비번
    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex =
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+\\\|\[\]{};:'",.<>/?]).{8,23}$/;
        if (!regex.test(e.target.value)) {
            setPasswordMessage(
                '영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.'
            );
            setPasswordValid(false);
        } else {
            setPasswordMessage('안전한 비밀번호입니다.');
            setPasswordValid(true);
        }
    };

    //비번 확인
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
            setConfirmPasswordValid(false);
        } else {
            setConfirmPasswordMessage('올바른 비밀번호입니다.');
            setConfirmPasswordValid(true);
        }
    };

    // 이메일 유효성 검사 추가
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if (!regex.test(e.target.value)) {
            setEmailMessage('이메일 형식이 올바르지 않습니다.');
            setEmailValid(false);
            setDuplicateEmailMessage(''); // 유효성 검사 후 중복 메세지 초기화
        } else {
            setEmailValid(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 입력 칸이 비어 있는지 확인 (빈 필수 입력칸으로 focus)
        if (!id || !email || !name || !password) {
            setFormError(true);

            if (!id) {
                idInputRef.current.focus();
                return;
            } else if (!email) {
                emailInputRef.current.focus();
                return;
            } else if (!name) {
                nameInputRef.current.focus();
                return;
            } else if (!password) {
                passwordInputRef.current.focus();
                return;
            }
        }

        // 비번 확인 (비번이랑 맞지 않을 시 focus)
        if (password !== confirmPassword) {
            confirmPasswordInputRef.current.focus();
            setFormError(true);
            return;
        }

        // 필수 입력 칸이 모두 채워졌을 때 메시지 숨기기
        if (
            idValid &&
            emailValid &&
            nameVaild &&
            passwordValid &&
            confirmPasswordValid
        ) {
            setFormError(false);
        }
        // 중복버튼을 클릭 안할시(중복에 관한 메세지가 안나올 시) alert형태 메세지 출력
        if (duplicateIdMessage.length == 0) {
            let message = '';
            if (idValid) {
                message += '아이디 중복여부를 확인해주세요.\n';
            }
            alert(message);
            return;
        }

        if (duplicateEmailMessage.length == 0) {
            let message = '';
            if (emailValid) {
                message += '이메일 중복여부를 확인해주세요.\n';
            }
            alert(message);
            return;
        }
        // 이미 존재하는 아이디나 이메일일 때 알림 창
        if (idExists || emailExists) {
            let message = '';
            if (idExists) {
                message += '아이디의 중복 여부를 확인해주세요.\n';
            }
            if (emailExists) {
                message += '이메일의 중복 여부를 확인해주세요.\n';
            }
            alert(message);
            return;
        }

        fetch(`http://0.0.0.0:8000/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: id,
                password: password,
                email: email,
                full_name: name,
                sex: gender !== 'male',
            }),
        })
            .catch((value) => {
                alert('오류가 발생했습니다.');
                location.reload();
            })
            .then((value) => {
                alert('로그인에 성공하였습니다.');
                window.location.replace('/signin');
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentTitle}>회원가입</div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 아이디 </label>
                        <div valid={idValid ? 'true' : 'false'}>
                            <input
                                className={styles.input}
                                type="text"
                                value={id}
                                placeholder="아이디 입력"
                                onChange={handleId}
                                required
                                ref={idInputRef}
                            ></input>
                            <button
                                onClick={handleCheckId}
                                className={styles.Checkbutton}
                                disabled={!idValid || !id} // 아이디가 유효하고 입력되었을 때만 버튼 활성화
                            >
                                중복 확인
                            </button>
                        </div>
                        <span className={styles.error_message}>
                            <p>{duplicateIdMessage}</p>
                            {!idValid && id.length > 0 && <p> {idMessage} </p>}
                        </span>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 이메일</label>
                        <div valid={emailValid ? 'true' : 'false'}>
                            <input
                                className={styles.input}
                                type="email"
                                value={email}
                                placeholder="이메일 입력"
                                onChange={handleEmail}
                                required
                                ref={emailInputRef}
                            ></input>
                            <button
                                onClick={handleCheckEmail}
                                className={styles.Checkbutton}
                                disabled={!emailValid || !email} // 이메일이 유효하고 입력된 경우에만 버튼 활성화
                            >
                                중복 확인
                            </button>
                        </div>
                        <span className={styles.error_message}>
                            <p>{duplicateEmailMessage}</p>
                            {!emailValid && email.length > 0 && (
                                <p> {emailMessage} </p>
                            )}
                        </span>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 이름 </label>
                        <div valid={nameVaild ? 'true' : 'false'}>
                            <input
                                className={styles.input}
                                type="text"
                                value={name}
                                placeholder="이름 입력"
                                onChange={handleName}
                                required
                                ref={nameInputRef}
                            />
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 비밀번호 </label>
                        <div valid={passwordValid ? 'true' : 'false'}>
                            <input
                                className={styles.input}
                                type="password"
                                value={password}
                                placeholder="비밀번호 입력"
                                onChange={handlePassword}
                                required
                                ref={passwordInputRef}
                            />
                        </div>
                        <span className={styles.error_message}>
                            {!passwordValid && password.length > 0 && (
                                <p> {passwordMessage} </p>
                            )}
                            {passwordValid && password.length > 0 && (
                                <p> {passwordMessage} </p>
                            )}
                        </span>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}>
                            {' '}
                            비밀번호 확인
                        </label>
                        <div valid={confirmPasswordValid ? 'true' : 'false'}>
                            <input
                                className={styles.input}
                                type="password"
                                value={confirmPassword}
                                placeholder="비밀번호 재입력"
                                onChange={handleConfirmPassword}
                                required
                                ref={confirmPasswordInputRef}
                            />
                        </div>
                        <span className={styles.error_message}>
                            {!confirmPasswordValid &&
                                confirmPassword.length > 0 && (
                                    <p> {confirmPasswordMessage} </p>
                                )}
                            {confirmPasswordValid &&
                                confirmPassword.length > 0 && (
                                    <p> {confirmPasswordMessage} </p>
                                )}
                        </span>
                    </div>
                    <div className={styles.input_genderfield}>
                        <label className={styles.inputTitle}>성별</label>
                        <div>
                            <input
                                className={styles.inputgender}
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="male">남자</label>
                        </div>
                        <div>
                            <input
                                className={styles.inputgender}
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="female">여자</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={styles.submitbutton}
                    >
                        가입하기
                    </button>
                    {formError && (
                        <div className={styles.submit_error_message}>
                            필수 입력 칸을 모두 채워주세요.
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
