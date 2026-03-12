import { motion } from "framer-motion";
import { X, MessageCircleQuestion, HelpCircle } from "lucide-react";
import type { VertiefendeFrage } from "@/lib/vertiefendeFragen";

interface VertiefendeFragenModalProps {
  data: VertiefendeFrage;
  onClose: () => void;
}

export default function VertiefendeFragenModal({ data, onClose }: VertiefendeFragenModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-navy-light rounded-xl p-8 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Vertiefende Fragen: {data.lessonTitle}
          </h2>
        </div>

        <div className="space-y-5">
          {data.gruppen.map((g) => (
            <div key={g.gruppe} className="bg-gray-800 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-custom rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{g.gruppe}</span>
                </div>
              </div>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                {(() => {
                  if (g.fragen.startsWith("Diskutiert:")) {
                    const rest = g.fragen.replace(/^Diskutiert:\s*/, "");
                    const questions = rest.split("?").filter(f => f.trim());
                    return (
                      <>
                        <li className="list-none mb-1">Diskutiert:</li>
                        {questions.map((frage, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-0.5">–</span>
                            <span>{frage.trim()}?</span>
                          </li>
                        ))}
                      </>
                    );
                  }
                  return g.fragen.split("?").filter(f => f.trim()).map((frage, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5">–</span>
                      <span>{frage.trim()}?</span>
                    </li>
                  ));
                })()}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Schließen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
