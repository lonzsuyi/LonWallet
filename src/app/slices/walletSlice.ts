import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import type { RootState } from '../store';
import { plus, minus } from '../../untils/calculate';

import * as wallet from '../apis/walletRequest';

// Types
export interface WalletState {
    userId: string | null | undefined
    balance: number
    history: Array<History>
    cards: Array<Card>
}

export interface History {
    date: string,
    balance: number,
    type: number
}

export interface Card {
    no: number,
    accountName: string
}

// Functions
const initialState: WalletState = {
    userId: null,
    balance: 0.00,
    cards: [],
    history: []
}

export const getWalletInfoASync = createAsyncThunk('wallet/getWalletInfoAsync', async (params: any) => {
    const response = await wallet.getWalletInfo(params.userId);
    return response;
})

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        incrementBalance: (state, action: PayloadAction<number>) => {
            const tempBalance = plus(action.payload, state.balance)
            state.balance = tempBalance;
            const date = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
            state.history.push({ balance: tempBalance, type: action.payload, date: date });
        },
        reduceBalance: (state, action: PayloadAction<number>) => {
            const tempBalance = minus(state.balance, action.payload);
            state.balance = tempBalance;
            const date = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
            state.history.push({ balance: tempBalance, type: -action.payload, date: date });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWalletInfoASync.fulfilled, (state, action) => {
            if (action.payload.code === 200) {
                const result = action.payload.data;
                state.userId = result.userId;
                state.balance = result.balance;
                state.cards = result.cards;
            }
        })
    }
})

export const { incrementBalance, reduceBalance } = walletSlice.actions
export const selectWallet = (state: RootState) => state.wallet


export default walletSlice.reducer