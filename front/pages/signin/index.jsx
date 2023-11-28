import { useEffect, useState } from 'react'
import styles from "@/styles/Login.module.css"

const User = {
    id: 'lhjjhg',
    pw: '@@test123'
  }
// 임시로 만든 로그인 성공 아이디 

export default function Login() {
    const [id, setId] =useState("");
    const [pw,setPw] = useState("");

    const [idValid, setIdValid] = useState(true);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(false);

    useEffect(() => {
        if(idValid && pwValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [idValid, pwValid]);

    const handleId = (e) => {
        setId(e.target.value);
        const regex =  /^[a-z A-Z][a-z A-Z 0-9- _]{3,23}$/;
        if (regex.test(e.target.value)) {
          setIdValid(true);
        } else {
          setIdValid(false);
        }
      };
      // 유효성 검사: 아이디 정규표현식(regex) = 영어(소문자,대문자), 숫자 포함 3> , <23 사이 입력시 true 
      const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
      };
      // 비번 유효성 검사: 정규표현식 = 영어(대,소문자), 숫자, 특수문자 포함 

      const onClickConfirmButton = () => {
        if(id === User.id && pw === User.pw) {
          alert('로그인에 성공했습니다.')
        } else {
          alert("등록되지 않은 회원입니다.");
        }
      }
        // login 버튼 
        const handleSignUp = () => {
          // 회원가입 로직을 추가할 수 있어.
          // 회원가입 모달을 띄우거나 새로운 페이지로 이동하는 방식 등을 사용해 새로운 계정을 생성할 수 있어.
          alert('회원가입 페이지로 이동합니다.');
        };

    return (
        <div className={styles.page}>
            <div className={styles.titleWrap}>
                Login
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.inputTitle}>User ID</div>
                <div className={styles.inputWrap}>
                    <input className={styles.input}
                    placeholder="아이디"
                    value={id}
                    onChange={handleId} />
                </div>
                <div className={styles.errorMessageWrap}>
                {!idValid && id.length > 0 && (   
                   <div> 올바른 ID를 입력해주세요 </div>
                )}
                </div>
            
                <div className={styles.inputTitle}>Password</div>
                <div className={styles.inputWrap}>
                    <input className={styles.input}
                    type="password"
                    placeholder="비밀번호"
                    value={pw}
                    onChange={handlePw} />
                </div>
                <div className={styles.errorMessageWrap}>
                    {!pwValid && pw.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div> )}
                </div>
              </div>
            
            <div>
           <button onClick={onClickConfirmButton} disabled={notAllow} className={styles.bottomButton}>login</button> 
           <div className={styles.signupbutton}>
            <a href="./signup" onClick={handleSignUp} > 회원가입</a>
        </div>
        </div>
      </div>
    );
}
