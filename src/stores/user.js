import { defineStore } from 'pinia';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import router from '../router';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        loggedIn: false
    }),
    getters: {
        isLoggedIn: (state) => state.loggedIn,
    },
    actions: {
        login(username, password) {
            signInWithEmailAndPassword(getAuth(), username, password)
                .then(() => {
                    this.loggedIn = true;
                    router.push('/controls');
                })
                .catch((error) => {
                    throw error;
                });
        },
        logout() {
            this.loggedIn = false;
        }
    }
});