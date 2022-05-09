import { useRecoilState } from 'recoil';
import { userState } from '../services/User';
import Alert from './Alert';

export default function RequireAuth({ children }) {

    /* Recoil User State */
    const user = useRecoilState(userState);

    const authenticated = user[0].isLogged;

    return authenticated === true ? children : <Alert message="Et voi pelata holdemia kirjautumatta sisään kasinolle. Ole hyvä ja kirjaudu jatkaaksesi." />
}