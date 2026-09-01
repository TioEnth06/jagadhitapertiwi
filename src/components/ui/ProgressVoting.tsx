interface ProgressVotingProps {
  setuju: number
  tidakSetuju: number
  abstain: number
  total: number
}

export default function ProgressVoting({
  setuju,
  tidakSetuju,
  abstain,
  total,
}: ProgressVotingProps) {
  const pctSetuju = total > 0 ? Math.round((setuju / total) * 100) : 0
  const pctTidak = total > 0 ? Math.round((tidakSetuju / total) * 100) : 0
  const pctAbstain = total > 0 ? Math.round((abstain / total) * 100) : 0
  const totalSuara = setuju + tidakSetuju + abstain

  return (
    <div className="space-y-3">
      <div className="h-3 overflow-hidden rounded-full bg-abu-terang">
        <div
          className="h-full rounded-full bg-merah-utama transition-all"
          style={{ width: `${pctSetuju}%` }}
          role="progressbar"
          aria-valuenow={pctSetuju}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Persentase setuju"
        />
      </div>
      <div className="space-y-2 text-base text-teks-utama">
        <div className="flex justify-between font-medium">
          <span>Setuju: {setuju.toLocaleString('id-ID')} suara ({pctSetuju}%)</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Tidak Setuju: {tidakSetuju.toLocaleString('id-ID')} suara ({pctTidak}%)</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Abstain: {abstain.toLocaleString('id-ID')} suara ({pctAbstain}%)</span>
        </div>
        <p className="pt-1 text-sm text-teks-caption">
          Total: {total.toLocaleString('id-ID')} anggota terdaftar, {totalSuara.toLocaleString('id-ID')} sudah memilih
        </p>
      </div>
    </div>
  )
}
