import { Fragment } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

export default function UserMenu() {
    return (
        <Fragment>
            <FaRegUserCircle
                color={'white'}
                fontSize={'1.5rem'}
                cursor={'pointer'}
            />
        </Fragment>
    );
}
