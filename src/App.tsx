import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import useAuth from "./commons/hooks/useAuth";
import Button from "./components/Button";
import Events from "./components/Events";
import { auth } from "./main";
import { requestUtil } from "./commons/utils/requestUtil";
import { IEvents } from "./vite-env";
import { SessionStorageKeys } from "./commons/constants";

// const totalAdditionalTime = (1000 * 60 * 2);
const totalAdditionalTime = (1000);

// let startTime = performance.now();
// let endTime = startTime + totalAdditionalTime;
// (window as any).count = 0;
// // let count = 0;

// const doneCounting = () => {
//   console.log((window as any).count);
// }

// const callServer = async () => {
//   requestUtil<IEvents[]>({
//     url: '/events',
//     method: 'POST',
//     body: {
//       page: 1
//     }
//   }).then((resp) => {
//     if (resp) {
//       ++(window as any).count;

//       if (performance.now() < endTime) {
//         callServer();
//       } else {
//         doneCounting();
//       }
//     }
//   });
// }

function App() {
  // We'll store the user here
  const [user, loading] = useAuth();
  const [signin_form, set_signin_form] = useState<{ email: string, password: string }>({
    email: 'posuser@example.com',
    password: 'posuser',
  });
  const [events, set_events] = useState<IEvents[]>();

  useEffect(() => {
    if (user) {
      console.log('start testing');
      
      // startTime = performance.now();
      // endTime = startTime + totalAdditionalTime;
      
      // callServer();
      requestUtil<{data: IEvents[]}>({
        url: '/events',
        method: 'POST',
        body: {
          page: 1
        }
      }).then((resp) => {
        if (resp) {
          const [events, response] = resp;

          console.log('events:', events)
          console.log('response:', response)
          console.log('token:', sessionStorage.getItem(SessionStorageKeys.SESSION_TOKEN));

          set_events(events.data);
        }
      });
    }
  }, [user])

  return (
    <div className="w-full h-full">
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
                    // NOTE: because we are already listening for this event in the "useAuth" hook, our app immediately gets updated to the correct page
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
            {events?.length && <Events data={events} />}
          </div>
        }
      </>}
    </div>
  )
}

export default App;
