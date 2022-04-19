import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const userState = atom({
    key: 'userState',
    default: {
        username: "",
        amount: 0.0,
        isAdmin: false,
        isLogged: false,
        cookie: null,
        sessionID: null
    },
    effects_UNSTABLE: [persistAtom]
});
