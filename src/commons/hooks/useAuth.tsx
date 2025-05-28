import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../main";
import { SessionStorageKeys } from "../constants";

function useAuth() {
    const [loading, set_loading] = useState(true);
    const [user, set_user] = useState<User>();

    useEffect(() => {
        // Double check that we are logged in
        onAuthStateChanged(auth, async user => {
            if (user) {
                sessionStorage.clear()
                const token = JSON.parse(sessionStorage.getItem(SessionStorageKeys.SESSION_TOKEN) || '{}')?.token;

                if (!token) {
                    const idToken = await user.getIdToken();
                    const resp = await fetch('http://localhost:3001/token', { body: JSON.stringify({ id: idToken }), method: 'POST' })
                    const data = await resp.json();

                    sessionStorage.setItem(SessionStorageKeys.SESSION_TOKEN, JSON.stringify(data));
                } else {
                    console.log('token already here:', token)
                }

                // Store the user
                set_user(user);
            } else {
                // NOTE: user is signed out
                set_user(null as any);
            }
            set_loading(false);
        });
    }, []);

    return [user, loading] as const;
}

export default useAuth;