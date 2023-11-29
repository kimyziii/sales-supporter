import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCvJq5JUY8ouoWlLAivEuNnh5BzKJKzjPc',
//   authDomain: 'sales-supporter-98a84.firebaseapp.com',
//   databaseURL:
//     'https://sales-supporter-98a84-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'sales-supporter-98a84',
//   storageBucket: 'sales-supporter-98a84.appspot.com',
//   messagingSenderId: '890299206018',
//   appId: '1:890299206018:web:c6e11482932c6af971679b',
// }

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export default db
