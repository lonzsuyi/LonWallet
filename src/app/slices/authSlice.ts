import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import * as authRequest from '../apis/authRequest';

// Types
export interface AuthState {
    token: string | null | undefined
    userId: string | null | undefined
    username: string | null | undefined
    email: string | null | undefined
    avatar: string | null | undefined
    expired: string | null | undefined
    authStatus: AuthStatusEnum
    authVisible: boolean
}

export enum AuthStatusEnum {
    None,
    Loading,
    LoginError,
    RegisterError,
}

export const SET_AUTH = 'SET_AUTH'
interface SetAuthAction {
    type: typeof SET_AUTH
    payload: AuthState
}

export const CLEAN_AUTH = 'CLEAN_AUTH'
interface CleanAuthAction {
    type: typeof CLEAN_AUTH
}

export type AuthActionTypes = SetAuthAction | CleanAuthAction


// Functions
const initialState: AuthState = {
    token: null,
    userId: null,
    username: null,
    email: null,
    avatar: null,
    expired: null,
    authStatus: AuthStatusEnum.None,
    authVisible: false
}

export const signInASync = createAsyncThunk(
    'auth/signInASync',
    async (params: any) => {
        const response = await authRequest.signIn(params.username, params.password);
        return response
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state = {
                ...state,
                ...action.payload
            }
        },
        cleanAuth: (state) => {
            state = {
                ...state,
                token: null,
                username: null,
                email: null,
                expired: null
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInASync.fulfilled, (state, action) => {
                if (action.payload.code === 200) {
                    const result = action.payload.data;
                    state.token = result.token;
                    state.userId = result.userId;
                    state.username = result.username;
                    state.email = result.email;
                    state.avatar = result.avatar;
                    state.expired = result.expired;
                    state.authStatus = result.authStatus;
                    state.authVisible = result.authVisible;
                }
            });
    }
})

export const { setAuth, cleanAuth } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer