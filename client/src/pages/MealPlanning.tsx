import MealPlanningCompanion from "@/components/MealPlanningCompanion";

export default function MealPlanning() {
  return (
    <div className="min-h-screen bg-structured text-white">
      {/* Header */}
      <header className="relative overflow-visible bg-black bg-opacity-30 z-10">
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Meal Planning</h1>
            <p className="text-gray-300">Gamifizierte Mahlzeitenplanung für optimale Ernährung</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <MealPlanningCompanion />
      </main>
    </div>
  );
}