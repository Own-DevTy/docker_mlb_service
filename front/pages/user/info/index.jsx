import { UseAuth } from '@/hooks/useAuth';
import styles from '@/styles/pages/user/info.module.css';

export default function UserInfo({ user, props }) {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>개인정보</h1>
                <div className={styles.tableWrapper}>
                    <table border={0} className={styles.infoTable}>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>{user.full_name}</td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td>
                                    {user.sex == null
                                        ? '비공개'
                                        : user.sex
                                          ? '여성'
                                          : '남성'}
                                </td>
                            </tr>
                            <tr>
                                <th>생성일자</th>
                                <td>{user.created_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const props = {};
    return UseAuth(context, props);
}
