import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import LandingLayout from './components/layout/LandingLayout'
import { useAuthStore } from './stores/useAuthStore'
import type { TabNav } from './types'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const BerandaPage = lazy(() => import('./pages/BerandaPage'))
const SimpananPage = lazy(() => import('./pages/SimpananPage'))
const PinjamanPage = lazy(() => import('./pages/PinjamanPage'))
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'))
const SuaraAnggotaPage = lazy(() => import('./pages/SuaraAnggotaPage'))
const AkunPage = lazy(() => import('./pages/AkunPage'))

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-abu-terang">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-merah-muda border-t-merah-utama" />
        <p className="mt-4 text-abu-teks">Memuat...</p>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const anggota = useAuthStore((s) => s.anggota)
  if (!isAuthenticated || !anggota) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/beranda" replace />
  return <>{children}</>
}

function AppRoute({
  tab,
  children,
}: {
  tab: TabNav
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <AppLayout activeTab={tab}>{children}</AppLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <LandingLayout>
                  <LandingPage />
                </LandingLayout>
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/beranda"
            element={
              <AppRoute tab="beranda">
                <BerandaPage />
              </AppRoute>
            }
          />
          <Route
            path="/simpanan"
            element={
              <AppRoute tab="simpanan">
                <SimpananPage />
              </AppRoute>
            }
          />
          <Route
            path="/pinjaman"
            element={
              <AppRoute tab="pinjaman">
                <PinjamanPage />
              </AppRoute>
            }
          />
          <Route
            path="/pasar"
            element={
              <AppRoute tab="pasar">
                <MarketplacePage />
              </AppRoute>
            }
          />
          <Route
            path="/suara-anggota"
            element={
              <AppRoute tab="beranda">
                <SuaraAnggotaPage />
              </AppRoute>
            }
          />
          <Route
            path="/akun"
            element={
              <AppRoute tab="akun">
                <AkunPage />
              </AppRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
