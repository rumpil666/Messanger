'use client'
import { create, StateCreator, State} from 'zustand';
import { genUUID } from '@/utils/helpers';
import dayjs, { Dayjs } from "dayjs";

interface Message {
  id: string;
  title: string;
  createdAt: Dayjs;
  userId: string;
  fileList?: string[];
};

interface EditableMessage {
  id: string;
  title: string;
  fileList?: string[];
}

interface MessageStore {
  messages: Message[];
  editableMessage: EditableMessage;
  editMode: boolean,
  sendMessage: (userId: string, title: string, fileList?: string[]) => void;
  updateMessage: (id: string, title: string) => void;
  removeMessage: (id: string) => void;
  toggleEditMode: (editMode: boolean, id: string, title: string, fileList?: string[]) => void;
};

function isMessageStore(object: any): object is MessageStore {
  return 'messages' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isMessageStore(nextState)) {
      window.localStorage.setItem('messages', JSON.stringify(
        nextState.messages
      ))
    }
    set(nextState, ...args);
}, get, api);

const getCurrentState = () => {
  try {
    const currentState = (JSON.parse(window.localStorage.getItem('messages') || '[]')) as Message[];
    return currentState;
  } catch(err) {
    window.localStorage.setItem('messages', '[]');
  }
  return [];
}

export const useMessageStore = create<MessageStore>(localStorageUpdate((set, get) => ({
  messages: getCurrentState(),

  editableMessage: {
    id: '',
    title: '',
    fileList: [],
  },

  editMode: false,

  sendMessage: (userId: string, title: string, fileList?: string[]) => {
    const { messages } = get();
    const newMessage = {
      id: genUUID(),
      title,
      createdAt: dayjs(),
      userId,
      fileList
    }

    set({
      messages: [...messages, newMessage]
    })
  },

  updateMessage: (id: string, title: string) => {
    const { messages } = get();
    set({
      messages: messages.map((message) => ({
        ...message,
        title: message.id === id ? title : message.title,
      }))
    })
  },

  removeMessage: (id: string) => {
    const { messages } = get();
    set({
      messages: messages.filter((message) => message.id !== id)
    })
  },

  toggleEditMode: (editMode: boolean, id: string, title: string, fileList?: string[]) => {
    set({
      editMode,
      editableMessage: {
        id,
        title,
        fileList
      }
    })
  }
})));