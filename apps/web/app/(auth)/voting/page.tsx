"use client";

import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import { proposalsAktif, proposalsSelesai } from "@/lib/data/mockData";
import { useVotingStore } from "@/lib/stores/useVotingStore";

function ProgressVoting({
  setuju,
  tidakSetuju,
  abstain,
  total,
}: {
  setuju: number;
  tidakSetuju: number;
  abstain: number;
  total: number;
}) {
  const pct = (n: number) => Math.round((n / total) * 100);
  return (
    <div className="space-y-2">
      <div>
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-hijau">Setuju {setuju}</span>
          <span>{pct(setuju)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-abu-bg">
          <div className="h-full bg-hijau" style={{ width: `${pct(setuju)}%` }} />
        </div>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-merah">Tidak {tidakSetuju}</span>
          <span>{pct(tidakSetuju)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-abu-bg">
          <div className="h-full bg-merah" style={{ width: `${pct(tidakSetuju)}%` }} />
        </div>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-abu-teks">Abstain {abstain}</span>
          <span>{pct(abstain)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-abu-bg">
          <div className="h-full bg-abu-teks" style={{ width: `${pct(abstain)}%` }} />
        </div>
      </div>
    </div>
  );
}

const voteLabel = { setuju: "Setuju", tidak: "Tidak Setuju", abstain: "Abstain" };

export default function VotingPage() {
  const vote = useVotingStore((s) => s.vote);
  const getVote = useVotingStore((s) => s.getVote);
  const aktif = proposalsAktif[0];
  const akanDatang = proposalsAktif[1];
  const myVote = getVote(aktif.id);

  return (
    <div className="pb-4 px-5 pt-8">
      <p className="text-xs font-bold uppercase tracking-wider text-abu-teks">Tata Kelola</p>
      <h1 className="text-xl font-bold">Suara Anggota</h1>
      <p className="mt-1 text-sm text-abu-teks">Ikut menentukan arah koperasi kita bersama</p>

      <div className="kartu mt-5 p-4">
        <Tag variant="kuning">Sedang Berlangsung</Tag>
        <h2 className="mt-3 text-base font-bold">{aktif.judul}</h2>
        <p className="mt-2 text-sm leading-relaxed text-abu-teks">{aktif.deskripsi}</p>
        <p className="mt-2 text-sm font-semibold">{aktif.deadline}</p>

        {aktif.setuju !== undefined &&
          aktif.tidakSetuju !== undefined &&
          aktif.abstain !== undefined &&
          aktif.totalAnggota !== undefined && (
            <div className="mt-4">
              <ProgressVoting
                setuju={aktif.setuju}
                tidakSetuju={aktif.tidakSetuju}
                abstain={aktif.abstain}
                total={aktif.totalAnggota}
              />
            </div>
          )}

        {myVote ? (
          <p className="mt-4 rounded-xl bg-merah-muda px-4 py-3 text-sm font-semibold text-merah">
            Anda sudah memilih: {voteLabel[myVote]} ✓
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Btn className="!min-h-[44px] !text-xs" onClick={() => vote(aktif.id, "setuju")}>
              Setuju
            </Btn>
            <Btn variant="outline" className="!min-h-[44px] !text-xs" onClick={() => vote(aktif.id, "tidak")}>
              Tidak
            </Btn>
            <Btn variant="ghost" className="!min-h-[44px] !text-xs" onClick={() => vote(aktif.id, "abstain")}>
              Abstain
            </Btn>
          </div>
        )}
      </div>

      {akanDatang && (
        <div className="kartu mt-4 p-4 opacity-80">
          <Tag variant="abu">Akan Datang</Tag>
          <h2 className="mt-3 text-base font-bold">{akanDatang.judul}</h2>
          <p className="mt-2 text-sm text-abu-teks">{akanDatang.deskripsi}</p>
          <p className="mt-2 text-sm font-semibold text-abu-teks">{akanDatang.mulai}</p>
        </div>
      )}

      <h2 className="mb-3 mt-6 text-xs font-bold uppercase tracking-wider text-abu-teks">
        Riwayat Voting
      </h2>
      <div className="space-y-2">
        {proposalsSelesai.map((p) => (
          <div key={p.id} className="kartu p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{p.judul}</p>
                <p className="text-xs text-abu-teks">{p.bulan}</p>
              </div>
              <Tag variant={p.hasil === "DISETUJUI" ? "hijau" : "merah"}>{p.hasil}</Tag>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
