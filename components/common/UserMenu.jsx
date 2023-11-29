import { FaRegUserCircle } from 'react-icons/fa';
import styles from '@/styles/components/common/UserMenu.module.css';
import { useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import { PiInfo, PiSignOutFill } from 'react-icons/pi';
import Link from 'next/link';
import { MdFavorite } from 'react-icons/md';

export default function UserMenu() {
    const [isOpen, setOpen] = useState(false);
    const user = useRef();
    const userMenu = useRef();

    return (
        <div
            className={styles.userMenuWrapper}
            onClick={() => setOpen(!isOpen)}
        >
            <FaRegUserCircle color={'white'} fontSize={'1.5rem'} />
            <div className={styles.userMenu}>
                {isOpen && (
                    <div className={styles.menu}>
                        <Link href={'/'} className={styles.menuItem}>
                            <MdFavorite />
                            저장한 선수
                        </Link>
                        <Link href={'/'} className={styles.menuItem}>
                            <PiInfo />
                            개인정보
                        </Link>
                        <div
                            className={styles.menuItem}
                            onClick={() => signOut()}
                        >
                            <PiSignOutFill />
                            로그아웃
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
