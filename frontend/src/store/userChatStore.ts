import { create } from 'zustand'

interface UserChatState {
    userName: string,
    saveName: (name: string) => void,
    resetName: () => void
}

export const useUserChat = create<UserChatState>((set) => ({
    userName: '',
    saveName: (name) => set(() => ({
        userName: name
    })),
    resetName: () => set({ userName: '' })
}))
