import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoPersonOutline, IoKeyOutline } from 'react-icons/io5';

// Any default
import globalConstants from '../../constants/globalConfig';

import Logo from '../../components/UI/Logo/Logo';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import { useAppDispatch } from '../../app/hooks';
import { signInASync } from '../../app/slices/authSlice';

import './stylesheets/Login.scss';

type LoginProps = {}

export default function Login(props: LoginProps) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const signIn = async () => {
        await dispatch(signInASync({ username: username, password: password })).unwrap();
        navigate(globalConstants.ROUTES.DASHBOARD);
    }

    return (
        <div className="login-container">
            <div className="login-panel">
                <div className="logo-title">
                    <Logo txtStyle={{ fontSize: 28 }} iconStyle={{ fontSize: 34 }} />
                </div>
                <div className="login-item">
                    <Input inputSize="large" placeholder="Username" suffixIcon={<IoPersonOutline />} onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="login-item">
                    <Input inputSize="large" placeholder="Password" type="password" suffixIcon={<IoKeyOutline />} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="login-btn-panel">
                    <Button width={200} buttonType="primary" buttonSize="large" onClick={signIn}>Login</Button>
                </div>
            </div>
        </div>
    )
}