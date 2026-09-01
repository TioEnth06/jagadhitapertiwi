import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import TombolUtama from '../ui/TombolUtama'
import PremiumCard from '../ui/PremiumCard'

export default function GantiPinPanel() {
  const [pinLama, setPinLama] = useState('')
  const [pinBaru, setPinBaru] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [show, setShow] = useState({ lama: false, baru: false, konfirmasi: false })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!pinLama || !pinBaru || !konfirmasi) {
      setError('Semua field wajib diisi.')
      return
    }
    if (pinBaru.length < 4) {
      setError('PIN baru minimal 4 digit.')
      return
    }
    if (pinBaru !== konfirmasi) {
      setError('Konfirmasi PIN tidak cocok.')
      return
    }

    setSuccess(true)
    setPinLama('')
    setPinBaru('')
    setKonfirmasi('')
  }

  const fields = [
    { id: 'pinLama', label: 'PIN Lama', value: pinLama, set: setPinLama, key: 'lama' as const },
    { id: 'pinBaru', label: 'PIN Baru', value: pinBaru, set: setPinBaru, key: 'baru' as const },
    {
      id: 'konfirmasi',
      label: 'Konfirmasi PIN Baru',
      value: konfirmasi,
      set: setKonfirmasi,
      key: 'konfirmasi' as const,
    },
  ]

  return (
    <>
      <p className="text-base text-abu-teks">
        Ganti PIN akun Anda secara berkala demi keamanan.
      </p>

      {success && (
        <div className="rounded-xl bg-hijau-sukses/10 px-4 py-3 text-sm font-semibold text-hijau-sukses">
          PIN berhasil diubah! (demo)
        </div>
      )}

      <PremiumCard className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {fields.map(({ id, label, value, set, key }) => (
            <div key={id}>
              <label htmlFor={id} className="mb-2 block text-sm text-label">
                {label}
              </label>
              <div className="relative">
                <input
                  id={id}
                  type={show[key] ? 'text' : 'password'}
                  value={value}
                  onChange={(e) => {
                    set(e.target.value)
                    setSuccess(false)
                  }}
                  className="input-premium pr-12"
                  inputMode="numeric"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-abu-teks"
                  aria-label={show[key] ? 'Sembunyikan' : 'Tampilkan'}
                >
                  {show[key] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          ))}

          {error && (
            <p className="text-sm font-medium text-merah-utama" role="alert">
              {error}
            </p>
          )}

          <TombolUtama type="submit" fullWidth variant="pill">
            Simpan PIN Baru
          </TombolUtama>
        </form>
      </PremiumCard>

      <p className="text-sm text-abu-teks">
        Lupa PIN lama? Hubungi pengurus koperasi untuk reset.
      </p>
    </>
  )
}
