import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Events from "./components/Events";
import { IS_DEV } from "./commons/constants";
import Button from "./components/Button";

const firebaseConfig = {
  "projectId": import.meta.env.VITE_FIREBASE_PROJECTID,
  "appId": import.meta.env.VITE_FIREBASE_APPID,
  "storageBucket": import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  "apiKey": import.meta.env.VITE_FIREBASE_APIKEY,
  "authDomain": import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  "messagingSenderId": import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  "measurementId": import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

console.log('config:', firebaseConfig);

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

// FIXME: DON'T copy the code below pulease, this is for when you are using firebase emulator, code will work without this so long as the above is config has it's info setup correctly
IS_DEV && connectAuthEmulator(auth, "http://localhost:9099");

function App() {
  // We'll store the user here
  const [loading, set_loading] = useState(true);
  const [user, set_user] = useState<User>();
  const [signin_form, set_signin_form] = useState<{ email: string, password: string }>({
    email: 'posuser@example.com',
    password: 'posuser',
  });

  useEffect(() => {
    // Double check that we are logged in
    onAuthStateChanged(auth, user => {
      if (user) {
        // Store the user
        set_user(user);

        // TODO: get session tokens below from server and console.log or maybe display on page for visual verification
        // c
      } else {
        // NOTE: user is signed out
        set_user(null as any);
      }
      set_loading(false);
    });
  }, []);
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto p-14 bg-amber-100 text-black">
      {loading && <div className="flex w-full h-full justify-center items-center">Loading</div>}
      {!loading && <>
        <h1>Ma Tickets</h1>

        {
          !user &&
          <div>
            <h2>Login</h2>

            <div className="flex justify-start gap-1" key="login">
              <input type="email" placeholder="email" value="posuser@example.com" className="border rounded-sm px-2.5" onChange={(evt) => {
                set_signin_form({
                  ...signin_form,
                  ...{
                    email: evt.target.value,
                  }
                });
              }} />
              <input type="password" placeholder="password" value="posuser" className="border rounded-sm px-2.5" onChange={(evt) => {
                set_signin_form({
                  ...signin_form,
                  ...{
                    password: evt.target.value,
                  }
                });
              }} />
              {/* NOTE: Replace this button with whatever you want, just make sure to double check how I've implemented things here */}
              <Button onClick={() => {
                signInWithEmailAndPassword(auth, signin_form.email, signin_form.password)
                  .then(authResp => {
                    // User is logged in
                    set_user(authResp.user);
                  })
                  .catch(err => {
                    console.error(err);
                  });
              }}>Login</Button>
            </div>
          </div>
        }

        {
          user &&
          <div>
            Currently logged in: {user?.displayName}
            <br />
            <Button onClick={() => {
              signOut(auth);
            }}>Logout</Button>

            <h2 className="mt-7">Events</h2>
            <Events />
          </div>
        }
      </>}
    </div>
  )
}

export default App;
