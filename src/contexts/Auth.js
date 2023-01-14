import { useContext, createContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')))

  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session))
  }, [session])

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, data) => {
      setSession(data ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [session])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    session,
  }

  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}