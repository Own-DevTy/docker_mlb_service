import { Fragment, useState } from 'react';
import styles from '@/styles/components/common/Header.module.css';
import Link from 'next/link';
import SearchBar from './SearchBar';
import Sidebar from '@/components/common/Sidebar';
import { FaRegUserCircle } from 'react-icons/fa';
import { SlLogin } from 'react-icons/sl';
import { signOut, useSession } from 'next-auth/react';
import UserMenu from '@/components/common/UserMenu';

const Header = ({ className }) => {
    const { data: session, status } = useSession();
    return (
        <div className={className}>
            <div className={styles.header}>
                <div className={styles.flexItem}>
                    <Link
                        href={'/'}
                        style={{ color: '#FFFFFF', fontSize: 'xx-large' }}
                    >
                        VMS
                    </Link>
                </div>
                <div className={styles.flexItem}>
                    <SearchBar />
                    {status === 'authenticated' ? (
                        <Fragment>
                            <UserMenu />
                            <button onClick={() => signOut()}></button>
                        </Fragment>
                    ) : (
                        <Link href={'/signin'}>
                            <SlLogin
                                color={'white'}
                                fontSize={'1.5rem'}
                                cursor={'pointer'}
                            />
                        </Link>
                    )}
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Header;
