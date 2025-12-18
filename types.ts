export type QuestionType = 'choice' | 'input' | 'multiple_input';
export type Path = 'database' | 'reality';

export interface Level {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional property for the question image URL
  type: QuestionType;
  options?: string[]; // For 'choice'
  answer?: string | string[] | number; // number for choice index, string/string[] for inputs
  answers?: string[]; // For 'multiple_input'
  answer_placeholder?: string[]; // For 'multiple_input'
}

export interface UserInfo {
  id: string;
  name: string; // 新增：姓名
  phone: string; // 新增：電話
  completed: boolean; // This can be deprecated or used as a general flag
  completedDate?: string;
}

export interface UserCompletionStatus {
  database: boolean;
  reality: boolean;
}

export enum GameState {
  START = 'START',
  USER_INFO = 'USER_INFO',
  REALITY_INTRO = 'REALITY_INTRO', // New: Intro before Stage 1
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED', // Stage 1 Completed (Reality)
  DATABASE_INTRO = 'DATABASE_INTRO', // New: VPN check before Stage 2
  ALL_COMPLETED = 'ALL_COMPLETED' // Stage 2 Completed (Database)
}