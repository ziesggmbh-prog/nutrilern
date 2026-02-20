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

        <div className="flex items-center gap-3 mb-6">
          <MessageCircleQuestion className="text-purple-custom" size={24} />
          <h2 className="text-2xl font-bold text-white">
            Vertiefende Fragen: {data.lessonTitle}
          </h2>
        </div>

        <div className="space-y-5">
          {data.gruppen.map((g) => (
            <div key={g.gruppe} className="bg-gray-800 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="text-green-custom" size={18} />
                <h3 className="text-lg font-bold text-green-custom">Frage {g.gruppe}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{g.fragen}</p>
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
