import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import McGillTimer from "@/components/McGillTimer";

export default function Home() {
  return (
    <div className="bg-[#F5F5F5] text-[#333333] font-sans min-h-screen flex flex-col">
      <AppHeader />

      <main className="flex-grow pt-16 pb-20 px-4 w-full">
        {/* Welcome Message */}
        <section className="my-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Welcome to McGill Big 3!</h2>
          <p className="text-sm text-gray-600">Complete these exercises daily for a stronger core.</p>
        </section>
        
        {/* McGill Timer Component */}
        <McGillTimer />
      </main>

      <BottomNavigation />
    </div>
  );
}
