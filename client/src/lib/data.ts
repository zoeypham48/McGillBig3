import { Exercise } from "./types";

export const exerciseData: Exercise[] = [
  {
    id: "bench-press",
    name: "Bench Press",
    description: "Push strength • Chest, shoulders, triceps",
    lastTime: "165 lbs × 5 reps × 3 sets",
    max: "185 lbs",
    goal: "225 lbs",
    thisWeek: 3
  },
  {
    id: "squat",
    name: "Squat",
    description: "Leg strength • Quads, glutes, core",
    lastTime: "205 lbs × 5 reps × 3 sets",
    max: "225 lbs",
    goal: "315 lbs",
    thisWeek: 2
  },
  {
    id: "deadlift",
    name: "Deadlift",
    description: "Pull strength • Back, hamstrings, traps",
    lastTime: "245 lbs × 5 reps × 3 sets",
    max: "275 lbs",
    goal: "365 lbs",
    thisWeek: 1
  }
];
