// src/db/db.ts
import Dexie, { Table } from 'dexie';

export interface ChatMessage {
  id: number;
  text: string;
  type: 'sent' | 'received' | 'system';
}

export interface ChatSession {
  id?: number;
  sessionName: string;
  userId: number; // now indexed
  messages: ChatMessage[];
  timestamp: number;
}

export interface AuthData {
  id?: number;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export class MyAppDatabase extends Dexie {
  chatSessions!: Table<ChatSession, number>;
  authData!: Table<AuthData, number>;

  constructor() {
    super('MyAppDatabase');
    // Increase version to force schema update
    this.version(2).stores({
      chatSessions: '++id, userId, sessionName, timestamp',
      authData: '++id, token',
    });
  }
}

export const db = new MyAppDatabase();
