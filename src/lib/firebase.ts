// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
// import { getFunctions } from "firebase/functions";

// // For now, we use a dummy config. In production, this would be env vars.
// const firebaseConfig = {
//   apiKey: "AIzaSyDummyKey",
//   authDomain: "mymedx-app.firebaseapp.com",
//   projectId: "mymedx-app",
//   storageBucket: "mymedx-app.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:abcdef"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const functions = getFunctions(app);

// // Enable offline persistence
// try {
//     enableIndexedDbPersistence(db).catch((err) => {
//         if (err.code == 'failed-precondition') {
//             console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
//         } else if (err.code == 'unimplemented') {
//             console.warn('The current browser does not support all of the features required to enable persistence');
//         }
//     });
// } catch (e) {
//     console.log("Persistence not supported or already enabled");
// }

// export default app;
