import * as React from 'react';

import {getStore, saveStore, deleteStore} from '../utils/Store'

const initialState = {
    user: {},
    isLoggedIn: false,
    token: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            saveStore("sampleRN.user", JSON.stringify(action.user));
            saveStore("sampleRN.token", action.user.accessToken);
            return {
                user: action.user,
                isLoggedIn: true,
                token: action.user.accessToken,
            };
        case 'LOGOUT':
            deleteStore("sampleRN.user");
            deleteStore("sampleRN.token");
            return initialState;
        default:
            return state;
    }
};

export const AuthContext =  React.createContext();

export function AuthProvider(props) {
    return (
        <AuthContext.Provider value={ React.useReducer(reducer, initialState)  }>
            {props.children}
        </AuthContext.Provider>
    );
}