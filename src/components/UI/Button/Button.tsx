import { ComponentProps } from 'react';
import './stylesheets/Button.scss';

type ButtonProps = ComponentProps<'button'> & {
    width?: number,
    buttonSize?: 'large' | 'normal' | 'small'
    buttonType?: 'primary' | 'grey'
    buttonClassName?: string
    buttonStyle?: React.CSSProperties
}

export default function Button(props: ButtonProps) {
    const { buttonSize, buttonClassName, width, buttonType, buttonStyle, ...otherProps } = props;

    return (
        <button className={`ui-button-container ${buttonType} ${buttonSize}  ${buttonClassName ? buttonClassName : ''}`} style={{ width: width, ...buttonStyle }} {...otherProps}>
            {props.children}
        </button>
    )
}