import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VoteChoice } from '../types'

interface VotingState {
  votes: Record<string, VoteChoice>
  vote: (proposalId: string, choice: VoteChoice) => void
  getVote: (proposalId: string) => VoteChoice | undefined
}

export const useVotingStore = create<VotingState>()(
  persist(
    (set, get) => ({
      votes: {},
      vote: (proposalId, choice) =>
        set((s) => ({ votes: { ...s.votes, [proposalId]: choice } })),
      getVote: (proposalId) => get().votes[proposalId],
    }),
    { name: 'jdp-voting' },
  ),
)
