import { useEffect, useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useFirebaseAuth = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    setIsConnecting(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return { user: result.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    } finally {
      setIsConnecting(false);
    }
  };

  const signInWithFacebook = async () => {
    setIsConnecting(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return { user: result.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    } finally {
      setIsConnecting(false);
    }
  };

  const signInWithTwitter = async () => {
    setIsConnecting(true);
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return { user: result.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    } finally {
      setIsConnecting(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    setIsConnecting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }
      setUser(cred.user);
      return { user: cred.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    } finally {
      setIsConnecting(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setIsConnecting(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      return { user: cred.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    } finally {
      setIsConnecting(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    isConnecting,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signUpWithEmail,
    signInWithEmail,
    signOut
  };
};