import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { IS_DEV } from './commons/constants.ts';
import Events from './components/Events.tsx';
import Event from './components/Event.tsx';

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

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>

      {/*
        Don't do what I've done with the styling here, you should create a general page wrapper component somewhere, maybe in the components/ folder,...
        placing padding on a wrapper like the one below is a bad bad idea
      */}
      <div className="w-full h-full overflow-x-hidden overflow-y-auto p-14 bg-amber-100 text-black">
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/events/:id" element={<Event />} />
        </Routes>
      </div>
    </StrictMode>
  </BrowserRouter>
);
