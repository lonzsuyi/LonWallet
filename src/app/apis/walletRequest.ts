import { stringify } from 'qs';
import httpRequest, { ResponseResult } from '../../untils/httpRequest';

import { WalletState } from '../slices/walletSlice';

import CONSTANTS from '../../constants/globalConfig';

export async function getWalletInfo(userId: string): Promise<ResponseResult<WalletState>> {
    // Mock
    return new Promise<ResponseResult<WalletState>>((resolve) => {
        setTimeout(() => resolve({
            code: 200,
            msg: 'successed',
            data: {
                userId: '1',
                balance: 999999.99,
                cards: [
                    {
                        no: 4040203111212121,
                        accountName: 'Tester',
                    }
                ],
                history: []
            }
        }), 1000);
    });
}

