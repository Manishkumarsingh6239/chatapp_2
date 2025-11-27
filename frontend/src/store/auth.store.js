import {create} from 'zustand'

export const useAuthStore = create((set) => ({
    authuser: {name: "Manish", _id: "123", age: 25},
    isLoggedIn: false,

    login: () => {
        console.log("Login function called");
        set({isLoggedIn: true});
    }
}));