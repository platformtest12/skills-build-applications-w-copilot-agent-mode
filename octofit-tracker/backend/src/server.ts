import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const jsonResponse = (data: unknown) => ({ baseUrl, data });

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(jsonResponse(users));
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(jsonResponse(user));
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(jsonResponse(teams));
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(jsonResponse(team));
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(jsonResponse(activities));
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(jsonResponse(activity));
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json(jsonResponse(leaderboard));
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(jsonResponse(entry));
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(jsonResponse(workouts));
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(jsonResponse(workout));
});

async function start() {
  await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
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
