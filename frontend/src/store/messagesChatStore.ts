import { create } from 'zustand'

interface Message {
    id: string,
    user: string,
    text: string
}

interface MessagesState {
    messages: Message[],
    addMessages: (data: Message[]) => void,
    resetMessages: () => void
}

export const useMessagesChat = create<MessagesState>((set) => ({
    messages: [],
    addMessages: (data) => set((state) => ({
        messages: [...state.messages, ...data]
    })),
    resetMessages: () => set({ messages: [] })
}));