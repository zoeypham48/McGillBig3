export interface Exercise {
  id: string;
  name: string;
  description: string;
  lastTime: string;
  max: string;
  goal: string;
  thisWeek: number;
}

export interface WorkoutLog {
  exerciseId: string;
  weight: number;
  reps: number;
  sets: number;
  notes: string;
  date: Date;
}
