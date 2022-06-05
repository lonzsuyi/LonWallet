import { ReactNode, ComponentProps } from 'react';
import './stylesheets/Card.scss';

type CardProps = ComponentProps<'div'> & {
    cardClassName?: string,
    cardStyle?: React.CSSProperties
}

export default function Card(props: CardProps) {
    const { cardClassName, cardStyle, children, ...otherProps } = props;

    return (
        <div className={`ui-card-container ${cardClassName ? cardClassName : ''}`} style={cardStyle}  {...otherProps}>
            {children}
        </div>
    )
}
