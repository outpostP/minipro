import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {
        id: null,
        username: '',
        email: '',
        phone: '',
        imgProfile: '',
        isVerified: false,
       
    },
    login: false
}

export const AuthReducer = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {
                id,
                username,
                email,
                phone,
                imgProfile,
                isVerified,
              
            } = action.payload;
            state.user = {
                id,
                username,
                email,
                phone,
                imgProfile,
                isVerified,
            
            }
        },
        loginSuccess: (state, action) => {
            state.login = true;
            
        },
        logoutSuccess: (state) => {
            state.login = false;
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            setTimeout(() => {
                window.location.href = '/'
              },0)
        },
        keepLoginSuccess: (state) => {
            state.login = true;
        }
    }
})

export const keepLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        if (token) {
            const res = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            dispatch(setUser(res.data));
            dispatch(keepLoginSuccess());
        }
    }
}

export const { loginSuccess, logoutSuccess, setUser, keepLoginSuccess } = AuthReducer.actions;

export default AuthReducer.reducer;

