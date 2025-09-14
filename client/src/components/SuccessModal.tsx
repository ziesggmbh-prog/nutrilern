import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrganicShape from "./OrganicShape";

interface SuccessModalProps {
  onClose: () => void;
  onContinue: () => void;
}

export default function SuccessModal({ onClose, onContinue }: SuccessModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-navy-light rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <OrganicShape
          className="absolute top-0 right-0 w-24 h-24 bg-green-custom opacity-20"
          variant="default"
        />
        
        <div className="relative z-10">
          <motion.div
            className="w-16 h-16 bg-green-custom rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="text-white" size={32} />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2">Gratulation!</h2>
          <p className="text-gray-400 mb-6">
            Ihr habt diese Quest erfolgreich gemeistert.
          </p>
          
          <Button
            onClick={onContinue}
            className="bg-green-custom hover:bg-green-custom/90 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Zurück zu allen Quests
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
