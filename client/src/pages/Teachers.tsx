import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Users, Clock, BookOpen, Target, ListOrdered, FileText } from "lucide-react";
import FullscreenToggle from "@/components/FullscreenToggle";
import FullscreenRestoreNotification from "@/components/FullscreenRestoreNotification";
import { useFullscreenSync } from "@/hooks/useFullscreenSync";

export default function Teachers() {
  useFullscreenSync();
  const [activeSection, setActiveSection] = useState<"fork" | "ablauf" | "manual">("fork");
  const dailySchedule = [
    {
      day: 1,
      title: "Einführung und Kohlenhydrate",
      individual: [
        "Einführung in die Unterrichtseinheit durch die Lehrerin/den Lehrer",
        "Gemeinsames Anschauen des Intros (digitale Schultafel oder Beamer)",
        "Kurzer Gedankenaustausch zum Gesehenen",
        "Individuelles Anschauen des Films 'Kohlenhydrate'",
        "Erneutes Anschauen und Notieren von Fragen",
        "Erarbeiten zentraler Zusammenhänge in Gruppen",
        "Vorstellung im Klassenverband",
        "Klärung offener Fragen",
        "Quiz"
      ],
      hours: "3 Schulstunden",
      groupHours: "3 Schulstunden"
    },
    {
      day: 2,
      title: "Fette",
      individual: ["Bearbeitung des Films 'Fette' nach dem Schema von Tag 1"],
      hours: "3 Schulstunden",
      groupHours: "3 Schulstunden"
    },
    {
      day: 3,
      title: "Proteine",
      individual: ["Bearbeitung des Films 'Proteine' nach dem Schema von Tag 1"],
      hours: "3 Schulstunden",
      groupHours: "3 Schulstunden"
    },
    {
      day: 4,
      title: "Mikronährstoffe",
      individual: ["Bearbeitung des Films 'Mikronährstoffe' nach dem Schema von Tag 1"],
      hours: "2 Schulstunden",
      groupHours: "4 Schulstunden (1 für Probepräsentation)"
    },
    {
      day: 5,
      title: "Unterwelt und Abschluss",
      individual: [
        "Bearbeitung des Films 'Unterwelt' nach dem Schema von Tag 1",
        "Vorstellung der Gruppenarbeiten",
        "Gemeinsames Anschauen des Schlussfilms (digitale Schultafel oder Beamer)",
        "Abschlussdiskussion"
      ],
      hours: "2 Schulstunden",
      groupHours: "3 Schulstunden",
      finalHour: "1 Schulstunde"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Fullscreen Restore Notification */}
      <FullscreenRestoreNotification />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Zurück zur Startseite
                </motion.button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 ml-4">Hinweise für Lehrer:innen</h1>
            </div>
            
            <FullscreenToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Fork Selection */}
        {activeSection === "fork" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection("ablauf")}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-purple-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-5">
                  <ListOrdered className="text-purple-600" size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Ablauf</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hier finden Sie Informationen zum Ablauf der Unterrichtseinheit und zu den Funktionen der App
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection("manual")}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-green-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                  <FileText className="text-green-600" size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Lehrer:innen-Manual</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hier erhalten Sie Zusammenfassungen zu den Inhalten der Lehrfilme und vertiefende Informationen
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Back button for sub-sections */}
        {activeSection !== "fork" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <button
              onClick={() => setActiveSection("fork")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={16} />
              Zurück zur Übersicht
            </button>
          </motion.div>
        )}

        {/* Ablauf Section (existing content) */}
        {activeSection === "ablauf" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          {/* Individual Mode Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Lernmodus</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-4">
                Im Lernmodus erlernen die Schüler:innen das grundlegende Wissen zum Thema gesunde Ernährung. 
                Sie sehen sich die Filme eigenständig auf ihrem Endgerät an und beantworten das 'Quiz' zum jeweiligen Film.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
                <p className="font-semibold text-orange-800 mb-2">Wichtiger Hinweis:</p>
                <p className="text-orange-700">
                  Es ist unerlässlich, die Schüler:innen den Film wiederholt anschauen zu lassen. 
                  Beim zweiten Anschauen notieren sie Fragen zu unverstandenen Begriffen und/oder Zusammenhängen.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Ablauf einer Unterrichtseinheit:</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Anschließend werden in Gruppen die zentralen Zusammenhänge des Films diskutiert, zusammengefasst und im Klassenverband einander vorgestellt. Jede Gruppe konzentriert sich auf einen bestimmten Aspekt.</li>
                <li>Danach kontrollieren die Schüler:innen, ob von den notierten Fragen noch welche offen geblieben sind. Diese Fragen werden im Klassenverband geklärt, ggf. anhand des Films.</li>
                <li>Abschließend beantworten die Schüler:innen das Quiz auf ihren Geräten. Dabei dürfen sie einander helfen, bis alle das Quiz geschafft haben.</li>
                <li>Die korrekte Beantwortung aller Fragen führt zur Freischaltung des nächsten Films und Quiz.</li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <p className="font-semibold text-blue-800">
                  Auf das Intro und auf den Schlussfilm folgt kein Quiz.
                </p>
              </div>
            </div>
          </div>

          {/* Group Mode Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="text-green-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Gruppenmodus</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-4">
                Der Gruppenmodus beinhaltet Aufgaben ('Quests'), die durch die Schüler:innen in Gruppen erarbeitet werden. 
                (Diese Gruppen sind unabhängig von den oben erwähnten Lerngruppen.) Hier geht es um die Vertiefung des 
                Erlernten sowie die praktische Umsetzung des Wissens im Alltag.
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="font-semibold text-red-800 mb-2">Wichtig:</p>
                <p className="text-red-700">
                  Wenn die Schüler:innen zur Gruppenarbeit übergehen, müssen sie oben rechts neben dem 
                  'Hamburger-Menü' vom Lernmodus in den Gruppenmodus wechseln.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Organisation der Gruppenarbeit:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Die Schüler:innen entscheiden sich anhand der Vorschau-Texte zu Beginn für eine Gruppe.</li>
                <li>Die Gruppengrößen sollten möglichst ausgewogen sein.</li>
                <li>Für große Klassengrößen (über 25 Personen) gibt es eine Kreativaufgabe, bei der Schüler:innen selbst eine Gruppenaufgabe entwickeln und durchführen.</li>
                <li>Hinter den Aufgabenfeldern sind für die anvisierten 5 Tage der Gruppenarbeit Anweisungen hinterlegt.</li>
                <li>Das 'Abschließen' eines Tages schaltet den nächsten frei.</li>
              </ul>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-6">
                <p className="font-semibold text-purple-800 mb-2">Genie-Aufgaben:</p>
                <p className="text-purple-700">
                  Sogenannte Genie-Aufgaben (jeweils an Tag 1 und Tag 3) richten sich an besonders 
                  engagierte Schüler:innen bzw. solche mit großem Vorwissen.
                </p>
              </div>

              <p className="text-lg mt-6">
                Eine Abschlusspräsentation aller Gruppen beschließt die Gruppenarbeit.
              </p>
            </div>
          </div>

          {/* Implementation Example Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Clock className="text-indigo-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Umsetzungsbeispiel im Rahmen einer Projektwoche</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-center text-lg font-semibold text-gray-800">
                Die Unterrichtseinheit umfasst insgesamt <span className="text-indigo-600">30 Schulstunden</span>.
              </p>
            </div>

            {/* Daily Breakdown */}
            <div className="space-y-6">
              {dailySchedule.map((dayInfo) => (
                <motion.div
                  key={dayInfo.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dayInfo.day * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Tag {dayInfo.day}
                    </span>
                    {dayInfo.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <BookOpen size={16} />
                        Einzelarbeit ({dayInfo.hours})
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {dayInfo.individual.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Users size={16} />
                        Gruppenarbeit ({dayInfo.groupHours})
                      </h4>
                      {dayInfo.finalHour && (
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Abschlussdiskussion:</strong> {dayInfo.finalHour}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        )}

        {/* Manual Section */}
        {activeSection === "manual" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="text-green-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Lehrer:innen-Manual</h2>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg">
                Dieser Bereich wird in Kürze mit Zusammenfassungen zu den Inhalten der Lehrfilme und vertiefenden Informationen ergänzt.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}