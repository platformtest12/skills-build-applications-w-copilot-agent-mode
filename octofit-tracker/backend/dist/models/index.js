"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
    city: String,
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    members: { type: Number, required: true },
    goal: String,
});
const activitySchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
const leaderboardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    streak: Number,
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: Number,
    focus: String,
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.models = {
    User: exports.User,
    Team: exports.Team,
    Activity: exports.Activity,
    LeaderboardEntry: exports.LeaderboardEntry,
    Workout: exports.Workout,
};
