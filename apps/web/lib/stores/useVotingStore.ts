import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { proposalsAktif } from '../data/mockData'
import type { VoteChoice } from '../types'

interface ProposalTallies {
  setuju: number
  tidakSetuju: number
  abstain: number
  totalAnggota: number
}

const seedTallies: Record<string, ProposalTallies> = {
  '1': {
    setuju: proposalsAktif[0].setuju ?? 847,
    tidakSetuju: proposalsAktif[0].tidakSetuju ?? 312,
    abstain: proposalsAktif[0].abstain ?? 88,
    totalAnggota: proposalsAktif[0].totalAnggota ?? 1247,
  },
}

interface VotingState {
  votes: Record<string, VoteChoice>
  tallies: Record<string, ProposalTallies>
  vote: (proposalId: string, choice: VoteChoice) => void
  getVote: (proposalId: string) => VoteChoice | undefined
  getTallies: (proposalId: string) => ProposalTallies
}

export const useVotingStore = create<VotingState>()(
  persist(
    (set, get) => ({
      votes: {},
      tallies: { ...seedTallies },

      vote: (proposalId, choice) => {
        const prev = get().votes[proposalId]
        if (prev) return

        set((s) => {
          const current = s.tallies[proposalId] ?? seedTallies[proposalId] ?? {
            setuju: 0,
            tidakSetuju: 0,
            abstain: 0,
            totalAnggota: 1247,
          }
          const updated = { ...current }
          if (choice === 'setuju') updated.setuju += 1
          if (choice === 'tidak') updated.tidakSetuju += 1
          if (choice === 'abstain') updated.abstain += 1

          return {
            votes: { ...s.votes, [proposalId]: choice },
            tallies: { ...s.tallies, [proposalId]: updated },
          }
        })
      },

      getVote: (proposalId) => get().votes[proposalId],

      getTallies: (proposalId) =>
        get().tallies[proposalId] ?? seedTallies[proposalId] ?? {
          setuju: 0,
          tidakSetuju: 0,
          abstain: 0,
          totalAnggota: 1247,
        },
    }),
    {
      name: 'jdp-voting',
      merge: (persisted, current) => {
        const saved = persisted as Partial<VotingState> | undefined
        if (!saved) return current
        return {
          ...current,
          ...saved,
          tallies: { ...seedTallies, ...saved.tallies },
        }
      },
    },
  ),
)
