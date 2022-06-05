import { Link } from 'react-router-dom';
import { IoGrid, IoChatboxEllipses } from 'react-icons/io5';

// Any default
import globalConstants from '../../constants/globalConfig';

import Logo from '../UI/Logo/Logo';

import './stylesheets/Menu.scss';

type MenuProps = {

}

export default function Menu(props: MenuProps) {
    return (
        <div className="menu-container">
            <div className="menu-logo">
                <Logo />
            </div>
            <div className="menu-panel">
                <div className="menu-title">MENU</div>
                <ul className="menu-item-list">
                    <li className='current'>
                        <Link to={globalConstants.ROUTES.DASHBOARD}>
                            <IoGrid className="menu-icon" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={globalConstants.ROUTES.DASHBOARD}>
                            <IoChatboxEllipses className="menu-icon" />
                            <span>Message</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}