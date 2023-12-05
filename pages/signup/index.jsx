import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/Signup.module.css';

export default function SignUpForm() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [idExists, setIdExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false); // 이메일 존재 확인 
    const [formError, setFormError] = useState(false); // 폼 에러 상태
    // const [isRegistered, setIsRegistered] = useState(false); // 가입 성공 상태
    const [passwordMatch, setPasswordMatch] = useState(false); // 비밀번호 일치 여부

    const [idValid, setIdValid] = useState(false);
    const [nameVaild, setNameValid] = useState(false); //12.5 이름 추가 
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [emailVaild, setEmailVaild] = useState(false); // 이메일 vaild 추가 
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState(''); 
    const [duplicateIdMessage, setDuplicateIdMessage] = useState(''); // 아이디 중복 메세지 
    const [duplicateEmailMessage, setDuplicateEmailMessage] = useState('');// 이메일 중복 메세지 

    const nameInputRef = useRef(null); // 이름 입력 요소 ref
    const emailInputRef = useRef(null); // 이메일 입력 요소 ref
    const passwordInputRef = useRef(null); // 비밀번호 입력 요소 ref
    const confirmPasswordInputRef = useRef(null); // 비밀번호 확인 입력 요소 ref

    useEffect(() => {
        if (
            (nameInputRef.current ||
            emailInputRef.current ||
            passwordInputRef.current) &&
            formError
        ) {
            if (!name) {
                nameInputRef.current.focus();
            } else if (!password) {
                passwordInputRef.current.focus();
                emailInputRef.current.focus();
            } else if (!email) {
                emailInputRef.current.focus();
            }
        }
    }, [formError]);
    
    // 아이디 중복 검사 로직 (우선 임시로 더미 데이터로 검사)
    const handleCheckId = () => {
        const existingIds = ['user1', 'user2', 'user3']; // 더미 데이터

        if (existingIds.includes(id)) {
            setIdExists(true);
        } else {
            setIdExists(false);
        }

        if (id === 'existingId') {
            setDuplicateIdMessage('이미 사용 중인 아이디입니다.');
            setIdExists(true);
        } else {    
            setDuplicateIdMessage('');
            setIdExists(false);
        }
    };

    // 이메일 중복 검사 로직 
    const handleCheckEmail = () => {
        if (email === 'existingEmail@example.com') {
            setDuplicateEmailMessage('이미 사용 중인 이메일입니다.');
            setEmailExists(true);
        } else {
            setDuplicateEmailMessage('');
            setEmailExists(false);
        }
    };

    // 유효성 검사 (아이디)
    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^[a-zA-Z0-9]{3,12}$/;
        if (!regex.test(e.target.value)) {
            setIdMessage('아이디 형식이 올바르지 않습니다.');
            setIdValid(false);
        } else {
            setIdMessage('올바른 아이디 형식입니다.');
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
            setEmailVaild(false);
        } else {
            setEmailMessage('올바른 이메일 형식입니다.');
            setEmailVaild(true);
        }
    }

    const handleSubmit = (e) => {
        // 필수 입력 칸이 비어 있는지 확인
        if (!id || !name || !password || !email) {
            setFormError(true);

            // 빈 필수 입력 칸이 있으면 해당 입력 칸으로 focus
            if (!id) {
                return;
            } else if (!name) {
                nameInputRef.current.focus();
                return;
            } else if (!password) {
                passwordInputRef.current.focus();
                return;
            } else if (!confirmPassword) {
                confirmPasswordInputRef.current.focus();
                return;
            } else if (!email) {
                emailInputRef.current.focus();
                return;
            }
        }
        // 비번 확인
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            confirmPasswordInputRef.current.focus(); // 비밀번호 확인 입력 요소로 focus
            return;
        }

        // 여기에 회원가입 처리 로직 추가
        console.log('회원가입 정보:', { id, name, password, gender, email });

        //회원가입 성공 메시지 표시 -> 실제로 회원가입 처리하는 API 호출 등의 로직을 추가 (우선 지움)
        // setIsRegistered(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentTitle}>회원가입</div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 아이디 </label> 
                        <div valid={idValid ? "true" : "false"}>
                            <input
                                className={styles.input}
                                type="text"
                                value={id}
                                placeholder="아이디 입력"
                                onChange={handleId}
                                required
                            />
                        </div>
                        <span className = {styles.error_message}>
                            {!idValid && id.length > 0 && (
                                <p> {idMessage} </p>
                            )}
                        <button
                            onClick={handleCheckId}
                            className={styles.Checkbutton}
                        >
                            중복 확인
                        </button>
                            {!idExists && (
                                <p> {duplicateIdMessage} </p>
                            )}
                        </span>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 이메일</label>
                        <div valid={emailVaild ? "true" : "false"}>
                            <input
                                className={styles.input}
                                type="email"
                                value={email}
                                placeholder="이메일 입력"
                                onChange={handleEmail}
                                required
                                ref={emailInputRef} 
                            />
                        </div>
                        <span className={styles.error_message}>
                            {!emailVaild && email.length > 0 && ( 
                                <p> {emailMessage} </p>
                            )}
                        <button 
                            onClick={handleCheckEmail} 
                            className={styles.Checkbutton}
                        >
                            중복 확인
                        </button>
                            {emailExists && (
                            <p> {duplicateEmailMessage} </p>
                            )}
                        </span>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 이름 </label>
                        <div valid={nameVaild ? "true" : "false"}>
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
                        <div valid={passwordValid ? "true" : "false"}>
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
                            </span>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.inputTitle}> 비밀번호 확인</label>
                        <div valid={confirmPasswordValid ? "true" : "false"}>
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
                            {!confirmPasswordValid && confirmPassword.length > 0 && (
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
                        <div>
                            <input
                                className={styles.inputgender}        
                                type="radio"
                                id="private"
                                name="gender"
                                value=""
                                checked={gender === ''}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="private">비공개</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={styles.submitbutton}
                    >
                        가입하기
                    </button>
                    {/* form 태그에 대한 submit 제거 후 버튼 클릭으로 handleSubmit 호출 */}
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


