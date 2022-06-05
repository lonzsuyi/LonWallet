import { stringify } from 'qs';
import httpRequest, { ResponseResult } from '../../untils/httpRequest';

import { AuthState, AuthStatusEnum } from '../slices/authSlice';

import CONSTANTS from '../../constants/globalConfig';

export async function signIn(username: string, password: string): Promise<ResponseResult<AuthState>> {
    // Mock
    return new Promise<ResponseResult<AuthState>>((resolve) => {
        setTimeout(() => resolve(
            {
                code: 200,
                msg: 'successed',
                data: {
                    token: 'abcd12345',
                    userId: '1',
                    username: 'test1234',
                    email: 'test1234@gmail.com',
                    avatar: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
                    expired: null,
                    authStatus: AuthStatusEnum.None,
                    authVisible: true
                }
            }
        ), 1000);
    });
}

