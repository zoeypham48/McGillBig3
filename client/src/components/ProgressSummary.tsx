import { Exercise } from "@/lib/types";

type ProgressSummaryProps = {
  exercises: Exercise[];
};

export default function ProgressSummary({ exercises }: ProgressSummaryProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-semibold text-lg mb-3">Your Progress</h3>
      
      <div className="space-y-4">
        {exercises.map((exercise) => {
          // Calculate progress percentage
          const max = parseInt(exercise.max.split(' ')[0]);
          const goal = parseInt(exercise.goal.split(' ')[0]);
          const progressPercent = Math.min(100, Math.round((max / goal) * 100));
          
          return (
            <div key={exercise.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-gray-500">Current max: <span>{exercise.max}</span></p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-[#ED1B2F] h-2.5 rounded-full" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
