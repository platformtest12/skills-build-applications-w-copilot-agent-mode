"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        await models_1.User.create([
            { name: 'Ava Chen', email: 'ava.chen@example.com', age: 29, fitnessGoal: 'Marathon prep', city: 'Seattle' },
            { name: 'Mina Patel', email: 'mina.patel@example.com', age: 31, fitnessGoal: 'Strength gain', city: 'Austin' },
            { name: 'Noah Brooks', email: 'noah.brooks@example.com', age: 27, fitnessGoal: 'Weight loss', city: 'Denver' },
        ]);
        await models_1.Team.create([
            { name: 'Power Squad', description: 'High-energy training group', members: 5, goal: 'Complete 3 group challenges' },
            { name: 'Peak Performers', description: 'Performance-focused team', members: 3, goal: 'Win weekly leaderboard' },
        ]);
        await models_1.Activity.create([
            { type: 'Run', duration: 35, calories: 420, date: new Date('2026-07-20') },
            { type: 'Cycling', duration: 60, calories: 610, date: new Date('2026-07-22') },
            { type: 'Yoga', duration: 45, calories: 220, date: new Date('2026-07-24') },
        ]);
        await models_1.LeaderboardEntry.create([
            { name: 'Ava Chen', score: 982, streak: 8 },
            { name: 'Mina Patel', score: 951, streak: 6 },
            { name: 'Noah Brooks', score: 912, streak: 4 },
        ]);
        await models_1.Workout.create([
            { title: 'HIIT Circuit', difficulty: 'Intermediate', duration: 25, focus: 'Cardio' },
            { title: 'Core Strength', difficulty: 'Beginner', duration: 20, focus: 'Core' },
            { title: 'Tempo Run', difficulty: 'Advanced', duration: 40, focus: 'Endurance' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
