import { createContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db, { app } from '../../firebaseApp'
import { collection, getDocs, query, where } from 'firebase/firestore'

const AuthContext = createContext({
  authUser: null,
  user: null,
})

export const AuthContextProvider = ({ children }) => {
  const auth = getAuth(app)
  const [authUser, setAuthUser] = useState(null)
  const [user, setUser] = useState(null)

  function updateValue(newValue) {
    setUser(newValue)
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user)

        const userRef = collection(db, 'user')
        const q = query(userRef, where('uid', '==', user.uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setUser({ ...doc.data(), id: doc.id })
        })
      } else {
        setAuthUser(null)
        setUser(null)
      }
    })
  }, [auth])

  return (
    <AuthContext.Provider value={{ authUser, user, updateValue }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
