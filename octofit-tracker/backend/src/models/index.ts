import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  age?: number;
  fitnessGoal?: string;
  city?: string;
}

export interface ITeam {
  name: string;
  description?: string;
  members: number;
  goal?: string;
}

export interface IActivity {
  type: string;
  duration: number;
  calories: number;
  date?: Date;
}

export interface ILeaderboardEntry {
  name: string;
  score: number;
  streak?: number;
}

export interface IWorkout {
  title: string;
  difficulty: string;
  duration?: number;
  focus?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  fitnessGoal: String,
  city: String,
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: String,
  members: { type: Number, required: true },
  goal: String,
});

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  streak: Number,
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: Number,
  focus: String,
});

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export const models = {
  User,
  Team,
  Activity,
  LeaderboardEntry,
  Workout,
};

export type ModelName = keyof typeof models;
