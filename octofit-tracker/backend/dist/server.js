"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
const jsonResponse = (data) => ({ baseUrl, data });
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(jsonResponse(users));
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(jsonResponse(user));
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(jsonResponse(teams));
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(jsonResponse(team));
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(jsonResponse(activities));
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(jsonResponse(activity));
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).lean();
    res.json(jsonResponse(leaderboard));
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(jsonResponse(entry));
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(jsonResponse(workouts));
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(jsonResponse(workout));
});
async function start() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('MongoDB connected');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
}
start().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
