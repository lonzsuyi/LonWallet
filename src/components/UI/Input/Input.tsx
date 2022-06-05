import { ReactNode, ComponentProps } from 'react';
import './stylesheets/Input.scss';

type InputProps = ComponentProps<'input'> & {
    inputSize?: 'large' | 'normal' | 'small'
    width?: number
    inputPanelClassName?: string
    inputPanelStyle?: React.CSSProperties
    inputClassName?: string
    inputStyle?: React.CSSProperties
    suffixIcon?: ReactNode
    suffixClassName?: string
    suffixStyle?: React.CSSProperties
}



export default function Input(props: InputProps) {
    const { inputPanelClassName, inputPanelStyle, inputClassName, inputStyle, suffixIcon, suffixClassName, suffixStyle, width, inputSize, ...ohterProps } = props;

    return (
        <div className={`ui-input-container ${inputPanelClassName ? inputPanelClassName : ''}`} style={inputPanelStyle}>
            <input className={`${inputSize} ${inputClassName ? inputClassName : ''}`} style={{ width: width, ...inputStyle }} {...ohterProps} />
            {
                suffixIcon ? <span className={`${inputSize} ${suffixClassName ? suffixClassName : ''}`} style={suffixStyle}>{suffixIcon}</span> : null
            }
        </div>
    )
}