import React from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.scss';

const cx = classNames.bind(styles);

type ProfileProps = {
    name: string;
    age: number;
};

export default function Profile({
    name,
    age,
}: ProfileProps): React.ReactElement {
    return (
        <div className={cx('profile')}>
            <p className={cx('name')}>{name}</p>
            <p className={cx('age')}>{age}</p>
        </div>
    );
}
