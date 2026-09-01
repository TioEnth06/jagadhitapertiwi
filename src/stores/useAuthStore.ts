import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { anggota } from '../data/mockData'
import type { Anggota } from '../types'

interface AuthState {
  isAuthenticated: boolean
  anggota: Anggota | null
  login: (noAnggota: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      anggota: null,
      login: (noAnggota: string) => {
        set({
          isAuthenticated: true,
          anggota: { ...anggota, noAnggota: noAnggota || anggota.noAnggota },
        })
      },
      logout: () => set({ isAuthenticated: false, anggota: null }),
    }),
    {
      name: 'jdp-auth',
      merge: (persisted, current) => {
        const saved = persisted as Partial<AuthState> | undefined
        if (saved?.isAuthenticated && !saved.anggota) {
          return {
            ...current,
            ...saved,
            anggota: { ...anggota, noAnggota: anggota.noAnggota },
          }
        }
        return { ...current, ...saved }
      },
    },
  ),
)
