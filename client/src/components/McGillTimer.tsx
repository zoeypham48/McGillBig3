import { useState, useEffect, useRef } from "react";

interface Exercise {
  id: string;
  name: string;
}

// Function to play a bell sound using Web Audio API
const playBellSound = (type: "start" | "end") => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sound characteristics for start and end bells
    if (type === "start") {
      oscillator.type = "sine";
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.3;
      
      // Envelope for the sound
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } else {
      oscillator.type = "triangle";
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.3;
      
      // Envelope for the sound
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.8);
    }
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};

export default function McGillTimer() {
  const exercises: Exercise[] = [
    { id: "power-breathing", name: "Power Breathing" },
    { id: "bird-dog", name: "Bird Dog" },
    { id: "side-plank-left", name: "Side Plank (Left)" },
    { id: "side-plank-right", name: "Side Plank (Right)" },
  ];

  // Constants
  const SECONDS_PER_REP = 10;
  const REPS_PER_ROUND = 6;
  const TOTAL_ROUNDS = 3;
  const REST_BETWEEN_REPS = 2;
  const REST_BETWEEN_ROUNDS = 3;
  const REST_BETWEEN_EXERCISES = 5;
  
  // Calculate total workout time
  const TIME_PER_EXERCISE = (SECONDS_PER_REP * REPS_PER_ROUND + REST_BETWEEN_REPS * (REPS_PER_ROUND - 1) + 
                            REST_BETWEEN_ROUNDS * (TOTAL_ROUNDS - 1)) * TOTAL_ROUNDS;
  const TOTAL_WORKOUT_TIME = TIME_PER_EXERCISE * exercises.length + 
                            REST_BETWEEN_EXERCISES * (exercises.length - 1);

  // Timer state
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_WORKOUT_TIME);
  const [isResting, setIsResting] = useState(false);
  const [restType, setRestType] = useState<"rep" | "round" | "exercise" | null>(null);
  const [status, setStatus] = useState("Press Start to begin");
  
  const timerRef = useRef<number | null>(null);
  const stateRef = useRef({
    currentExerciseIndex: 0,
    currentRound: 0,
    currentRep: 0,
    isResting: false
  });

  // Keep stateRef updated with the latest state values
  useEffect(() => {
    stateRef.current = {
      currentExerciseIndex,
      currentRound,
      currentRep,
      isResting
    };
  }, [currentExerciseIndex, currentRound, currentRep, isResting]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10); // Get the first decimal place
    
    // Only show decimals for the current activity timer, not total timer
    if (seconds === totalTimeLeft) {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${tenths}`;
    }
  };

  const startTimer = () => {
    if (isActive) return;
    
    setIsActive(true);
    setIsPaused(false);
    setCurrentExerciseIndex(0);
    setCurrentRound(1);
    setCurrentRep(1);
    setTimeLeft(SECONDS_PER_REP);
    setTotalTimeLeft(TOTAL_WORKOUT_TIME);
    setIsResting(false);
    setRestType(null);
    setStatus("Exercise in progress");
    
    // Play start sound
    playBellSound("start");
    
    startTimerInterval();
  };

  // Handle what happens when the timer ticks to zero
  const handleTimerEnd = () => {
    const { isResting, currentRep, currentRound, currentExerciseIndex } = stateRef.current;

    if (isResting) {
      // Rest period is over, back to exercise
      setIsResting(false);
      setRestType(null);
      setStatus("Exercise in progress");
      playBellSound("start");
      setTimeLeft(SECONDS_PER_REP);
    } 
    else if (currentRep < REPS_PER_ROUND) {
      // Move to rest before next rep
      setCurrentRep(currentRep + 1);
      setIsResting(true);
      setRestType("rep");
      setStatus("Rest between reps");
      playBellSound("end");
      setTimeLeft(REST_BETWEEN_REPS);
    } 
    else if (currentRound < TOTAL_ROUNDS) {
      // Move to rest before next round
      setCurrentRound(currentRound + 1);
      setCurrentRep(1);
      setIsResting(true);
      setRestType("round");
      setStatus("Rest between rounds");
      playBellSound("end");
      setTimeLeft(REST_BETWEEN_ROUNDS);
    } 
    else if (currentExerciseIndex < exercises.length - 1) {
      // Move to rest before next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentRound(1);
      setCurrentRep(1);
      setIsResting(true);
      setRestType("exercise");
      setStatus("Rest between exercises");
      playBellSound("end");
      setTimeLeft(REST_BETWEEN_EXERCISES);
    } 
    else {
      // Workout complete
      resetTimer();
      setStatus("Workout complete!");
      playBellSound("end");
    }
  };

  const startTimerInterval = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    
    // Use a faster update interval (100ms = 10 updates per second) for smoother animation
    const updateInterval = 100;
    const decrementValue = 0.1; // Decrease by 0.1 seconds each update
    
    timerRef.current = window.setInterval(() => {
      // Update current activity timer
      setTimeLeft((prevTime) => {
        if (prevTime <= decrementValue) {
          // Timer has reached zero
          setTimeout(() => handleTimerEnd(), 10); // Small delay to ensure state is updated
          return 0;
        }
        return parseFloat((prevTime - decrementValue).toFixed(1)); // Keep one decimal place
      });
      
      // Update total workout time left
      setTotalTimeLeft((prevTotal) => {
        if (prevTotal <= 0) return 0;
        return parseFloat((prevTotal - decrementValue).toFixed(1)); // Keep one decimal place
      });
    }, updateInterval);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPaused(true);
    setStatus("Paused");
  };

  const resumeTimer = () => {
    setIsPaused(false);
    setStatus(isResting ? `Rest ${restType ? `between ${restType}s` : "period"}` : "Exercise in progress");
    startTimerInterval();
  };

  const resetTimer = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setCurrentExerciseIndex(0);
    setCurrentRound(0);
    setCurrentRep(0);
    setTimeLeft(0);
    setTotalTimeLeft(TOTAL_WORKOUT_TIME);
    setIsResting(false);
    setRestType(null);
    setStatus("Press Start to begin");
  };

  const getCurrentExerciseName = (): string => {
    if (currentExerciseIndex >= 0 && currentExerciseIndex < exercises.length) {
      return exercises[currentExerciseIndex].name;
    }
    return "Ready to Start";
  };

  const getRestSeconds = (): number => {
    if (restType === "rep") return REST_BETWEEN_REPS;
    if (restType === "round") return REST_BETWEEN_ROUNDS;
    if (restType === "exercise") return REST_BETWEEN_EXERCISES;
    return 0;
  };

  const progressPercentage = isActive ? 
    isResting ? 
      ((getRestSeconds() - timeLeft) / getRestSeconds()) * 100 :
      ((SECONDS_PER_REP - timeLeft) / SECONDS_PER_REP) * 100 
    : 0;
    
  const totalProgressPercentage = isActive ? 
    ((TOTAL_WORKOUT_TIME - totalTimeLeft) / TOTAL_WORKOUT_TIME) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto my-8 relative timer-card">
      {/* Total time remaining display in top right corner */}
      {isActive && (
        <div className="absolute top-4 right-4 bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex flex-col items-end exercise-transition">
          <span className="mb-1">Total: {formatTime(totalTimeLeft)}</span>
          <div className="w-20 bg-gray-600 rounded-full h-1">
            <div 
              className="h-1 rounded-full bg-green-500 progress-bar-transition"
              style={{ width: `${totalProgressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-center text-[#ED1B2F] mb-6">McGill Big 3 Timer</h2>
      
      <div className={`timer-display ${isResting ? 'bg-blue-50' : 'bg-gray-100'} rounded-lg p-4 mb-6`}>
        <div className="text-xl font-semibold text-center mb-2 exercise-transition">
          {isActive ? getCurrentExerciseName() : "Ready to Start"}
        </div>
        <div className="text-4xl font-bold text-center mb-4 exercise-transition time-display">
          {formatTime(timeLeft)}
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full progress-bar-transition ${isResting ? 'bg-blue-500' : 'bg-[#ED1B2F]'}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm mb-2">
          <span>Rep: {isActive ? currentRep : 0}/{REPS_PER_ROUND}</span>
          <span>Round: {isActive ? currentRound : 0}/{TOTAL_ROUNDS}</span>
        </div>
        <div className={`text-center text-sm font-medium exercise-transition ${isResting ? 'pulse-animation' : ''}`}>
          <span className={`inline-block ${isResting ? 'bg-blue-100 text-blue-800' : ''} px-2 py-1 rounded-md`}>
            {isResting ? 
              restType === "rep" ? "REST BETWEEN REPS" :
              restType === "round" ? "REST BETWEEN ROUNDS" : 
              restType === "exercise" ? "REST BETWEEN EXERCISES" : 
              "REST" 
            : status}
          </span>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 mb-8">
        {!isActive ? (
          <button 
            onClick={startTimer}
            className="px-6 py-2 rounded-md font-medium bg-[#ED1B2F] text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Start
          </button>
        ) : isPaused ? (
          <button 
            onClick={resumeTimer}
            className="px-6 py-2 rounded-md font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Continue
          </button>
        ) : (
          <button 
            onClick={pauseTimer}
            className="px-6 py-2 rounded-md font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Pause
          </button>
        )}
        
        <button 
          onClick={resetTimer}
          className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow hover:shadow-md"
        >
          Reset
        </button>
      </div>
      
      <div className="exercise-list mb-6">
        <h3 className="font-semibold mb-2">Exercise Sequence:</h3>
        <ol className="list-decimal list-inside space-y-1">
          {exercises.map((exercise, index) => (
            <li 
              key={exercise.id}
              className={`transition-all duration-300 ${
                currentExerciseIndex === index && isActive 
                  ? "font-bold text-[#ED1B2F] exercise-active" 
                  : ""
              }`}
            >
              {exercise.name}
            </li>
          ))}
        </ol>
      </div>
      
      <div className="text-sm text-gray-600 border-t pt-4">
        <p className="mb-1">Each exercise: {SECONDS_PER_REP} seconds per rep × {REPS_PER_ROUND} reps × {TOTAL_ROUNDS} rounds</p>
        <p className="mb-1">• {REST_BETWEEN_REPS} seconds rest between reps</p>
        <p className="mb-1">• {REST_BETWEEN_ROUNDS} seconds rest between rounds</p>
        <p className="mb-1">• {REST_BETWEEN_EXERCISES} seconds rest between exercises</p>
        <p className="mt-2 font-medium">Total workout time: {formatTime(TOTAL_WORKOUT_TIME)}</p>
      </div>
    </div>
  );
}