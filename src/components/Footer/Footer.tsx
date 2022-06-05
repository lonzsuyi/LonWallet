import React from 'react';

import './stylesheets/Footer.scss';

type FooterProps = {

}

export default function Footer(props: FooterProps) {
    return (
        <footer>
            {/* <div className="footer-hold"></div> */}
            <div className="footer-container">
                Copyright &copy; LonWallet 2022
            </div>
        </footer>
    )
}