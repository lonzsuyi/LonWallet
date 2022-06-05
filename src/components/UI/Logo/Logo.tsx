import { IoWalletOutline } from 'react-icons/io5'

import './stylesheets/Logo.scss';

type LogoProps = {
    containerClassName?: string
    containerStyle?: React.CSSProperties
    iconClassName?: string
    iconStyle?: React.CSSProperties
    txtClassName?: string
    txtStyle?: React.CSSProperties
}

export default function Logo(props: LogoProps) {
    return (
        <div className={`logo-container ${props.containerClassName ? props.containerClassName : ''}`} style={props.containerStyle}>
            <IoWalletOutline className={`logo-icon ${props.iconClassName ? props.iconClassName : ''}`} style={props.iconStyle} />
            <span className={`logo-txt ${props.txtClassName ? props.txtClassName : ''}`} style={props.txtStyle}>LonWallet</span>
        </div>
    )
}