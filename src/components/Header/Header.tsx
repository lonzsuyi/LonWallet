import { IoHelpCircle, IoNotifications } from 'react-icons/io5'

// Data
import { useAppSelector } from '../../app/hooks';
import { AuthState, selectAuth } from '../../app/slices/authSlice';

import Logo from '../UI/Logo/Logo';

import '../Header/stylesheets/Header.scss';

type HeaderProps = {

}

export default function Header(props: HeaderProps) {

    // Auth handle
    const auth: AuthState = useAppSelector(selectAuth);

    return (
        <header className="header-container">
            <div className="header-logo">
                {/* <Logo /> */}
            </div>
            <ul className="header-menu">
                <li><IoHelpCircle className="header-menu-icon" /></li>
                <li><IoNotifications className="header-menu-icon" /></li>
                <li>{auth.avatar ? <img alt={auth.username ? auth.username : ''} src={auth.avatar} className="header-avatar" /> : <span></span>}</li>
            </ul>
        </header>
    )
}