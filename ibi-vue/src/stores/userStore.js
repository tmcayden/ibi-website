import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', () => {
    const session = ref(null)
    const isLoggedIn = computed(() => session.value !== null)

    // This uses a one time password (OTP) to authenticate the user
    // a link is sent to their email
    const handleLogin = async (email) => {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: 'http://localhost:5173/admin'
          }
        })
        if (error)
        {
          return { success: false, error }
        }
        return { success: true }
      } catch (error) {
        if (error instanceof Error) {
          return { success: false, error }
        }
      }
    }

    const handleLogout = async () => {
      const {error} = await supabase.auth.signOut()
      if (error)
      {
        session.value = null
        return { success: false, error }
      }
    }

    return {
        session,
        isLoggedIn,
        handleLogin,
        handleLogout
    };
});
