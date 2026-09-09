import { 
  signInWithPopup, 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, googleAuthProvider, WORKSPACE_SCOPES } from './firebase';

export const SCOPES = WORKSPACE_SCOPES;

// In-memory token cache (never persisted in localStorage/sessionStorage as required by security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Initialize auth state listener. Clears token cache on logout.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User is authenticated in Firebase but access token needs fresh retrieval or popup
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Sign in with Google using Firebase Auth popup and extract OAuth access token
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('No OAuth access token was returned from Google Sign-In.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Get current in-memory access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Set in-memory access token
 */
export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

/**
 * Logout and clear token cache
 */
export const logout = async (): Promise<void> => {
  await auth.signOut();
  cachedAccessToken = null;
};
