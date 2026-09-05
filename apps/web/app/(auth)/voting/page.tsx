"use client";

import Btn from "@/components/ui/Btn";
import Tag from "@/components/ui/Tag";
import SectionLabel from "@/components/shared/SectionLabel";
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
  const getTallies = useVotingStore((s) => s.getTallies);
  const aktif = proposalsAktif[0];
  const akanDatang = proposalsAktif[1];
  const myVote = getVote(aktif.id);
  const tallies = getTallies(aktif.id);

  return (
    <div className="pb-6">
      <div className="app-hero-merah px-5 pb-6 pt-8 text-white">
        <p className="text-sm opacity-80">Tata Kelola</p>
        <h1 className="font-display text-xl font-bold">Suara Anggota</h1>
        <p className="mt-1 text-sm opacity-80">Ikut menentukan arah koperasi kita bersama</p>
      </div>

      <div className="app-content space-y-6">
        <div className="app-card p-4">
          <Tag variant="kuning">Sedang Berlangsung</Tag>
          <h2 className="mt-3 text-base font-bold">{aktif.judul}</h2>
          <p className="mt-2 text-sm leading-relaxed text-abu-teks">{aktif.deskripsi}</p>
          <p className="mt-2 text-sm font-semibold">{aktif.deadline}</p>

          <div className="mt-4">
            <ProgressVoting
              setuju={tallies.setuju}
              tidakSetuju={tallies.tidakSetuju}
              abstain={tallies.abstain}
              total={tallies.totalAnggota}
            />
          </div>

          {myVote ? (
            <p className="mt-4 rounded-xl bg-merah-muda px-4 py-3 text-sm font-semibold text-merah">
              Anda sudah memilih: {voteLabel[myVote]} ✓
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Btn className="!min-h-[44px] !text-xs" onClick={() => vote(aktif.id, "setuju")}>
                Setuju
              </Btn>
              <Btn
                variant="outline"
                className="!min-h-[44px] !text-xs"
                onClick={() => vote(aktif.id, "tidak")}
              >
                Tidak
              </Btn>
              <Btn
                variant="ghost"
                className="!min-h-[44px] !text-xs"
                onClick={() => vote(aktif.id, "abstain")}
              >
                Abstain
              </Btn>
            </div>
          )}
        </div>

        {akanDatang && (
          <div className="app-card p-4 opacity-80">
            <Tag variant="abu">Akan Datang</Tag>
            <h2 className="mt-3 text-base font-bold">{akanDatang.judul}</h2>
            <p className="mt-2 text-sm text-abu-teks">{akanDatang.deskripsi}</p>
            <p className="mt-2 text-sm font-semibold text-abu-teks">{akanDatang.mulai}</p>
          </div>
        )}

        <section>
          <SectionLabel title="Riwayat Voting" className="mb-3" />
          <div className="space-y-2">
            {proposalsSelesai.map((p) => (
              <div key={p.id} className="app-card p-4">
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
        </section>
      </div>
    </div>
  );
}
