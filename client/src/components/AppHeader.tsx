export default function AppHeader() {
  return (
    <header className="bg-[#ED1B2F] text-white p-4 shadow-md fixed top-0 w-full z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">McGill Big 3 Timer</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm hidden sm:inline">Core Stabilization Exercises</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
}
