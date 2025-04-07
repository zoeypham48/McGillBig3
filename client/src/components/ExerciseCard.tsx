import { Exercise } from "@/lib/types";

type ExerciseCardProps = {
  exercise: Exercise;
  onLogClick: () => void;
};

export default function ExerciseCard({ exercise, onLogClick }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h4 className="font-bold text-lg">{exercise.name}</h4>
        <p className="text-sm text-gray-500 mt-1">{exercise.description}</p>
        
        <div className="mt-3 flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">Last time:</p>
            <p className="text-sm">{exercise.lastTime}</p>
          </div>
          <button 
            onClick={onLogClick}
            className="bg-[#ED1B2F] text-white py-2 px-4 rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            Log
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-sm">
        <div className="flex">
          <div className="mr-4">
            <p className="font-medium">Max</p>
            <p>{exercise.max}</p>
          </div>
          <div className="mr-4">
            <p className="font-medium">Goal</p>
            <p>{exercise.goal}</p>
          </div>
          <div>
            <p className="font-medium">This week</p>
            <p>{exercise.thisWeek} {exercise.thisWeek === 1 ? 'session' : 'sessions'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
