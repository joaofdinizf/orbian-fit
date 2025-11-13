export interface User {
  id: string;
  name: string;
  email: string;
  role: 'trainer' | 'student';
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  restTime: number;
  muscleGroup?: string;
  equipment?: string;
  difficulty?: 'Iniciante' | 'Intermediário' | 'Avançado';
  gifUrl?: string;
  instructions?: string[];
  tips?: string[];
  variations?: string[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  trainerId: string;
  studentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmotionalCheckIn {
  id: string;
  studentId: string;
  workoutId?: string;
  mood: 'excellent' | 'good' | 'neutral' | 'tired' | 'stressed';
  energyLevel: number; // 1-10
  notes?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  trainerId: string;
  studentId: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}