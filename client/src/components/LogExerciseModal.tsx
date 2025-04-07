import { useState } from "react";
import { Exercise, WorkoutLog } from "@/lib/types";

type LogExerciseModalProps = {
  exercise: Exercise;
  onClose: () => void;
  onSubmit: (log: WorkoutLog) => void;
};

export default function LogExerciseModal({ exercise, onClose, onSubmit }: LogExerciseModalProps) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!weight || !reps || !sets) {
      return;
    }
    
    onSubmit({
      exerciseId: exercise.id,
      weight: parseInt(weight),
      reps: parseInt(reps),
      sets: parseInt(sets),
      notes,
      date: new Date(),
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-4 bg-[#ED1B2F] text-white flex justify-between items-center">
          <h3 className="font-bold text-lg">Log {exercise.name}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
              <input 
                type="number" 
                id="weight" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1B2F]" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
              <input 
                type="number" 
                id="reps" 
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1B2F]" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
              <input 
                type="number" 
                id="sets" 
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1B2F]" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea 
                id="notes" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1B2F]"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-[#ED1B2F] hover:bg-red-700 rounded-md transition-colors"
            >
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
