import publicAxios from "../api/publicAxios";
import authAxios from "../api/authAxios";

type signupDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

type loginDataType = {
    email: string,
    password: string
}


export const AuthService = {
    signup: (data: signupDataType) => publicAxios.post('/api/auth/createuser', data),
    login: (data: loginDataType) => publicAxios.post('/api/auth/loginuser', data),

    verifyToken: () => authAxios.get('/api/auth/verifytoken')
}