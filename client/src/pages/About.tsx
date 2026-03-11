import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import FullscreenToggle from "@/components/FullscreenToggle";
import { useFullscreenSync } from "@/hooks/useFullscreenSync";
import bkkFirmusLogo from "@assets/bkk_firmus_logo.svg";
import ziesLogo from "@assets/zies_logo_official.svg";

export default function About() {
  useFullscreenSync();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
              <h1 className="text-2xl font-bold text-gray-800 ml-4">Über das Programm</h1>
            </div>
            <FullscreenToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Program description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <p className="text-gray-700 leading-relaxed text-base">
            Die Webapplikation NutriLern zielt darauf ab, das Ernährungsverhalten in der Gruppe der Schüler:innen von
            Abschlussklassen, Auszubildenden und jungen Erwachsenen zu verbessern und so der Entstehung
            nicht-übertragbarer Krankheiten (NCDs) vorzubeugen.
          </p>
          <p className="text-gray-700 leading-relaxed text-base mt-4">
            Die Inhalte der Unterrichtseinheit wurden auf Basis aktueller wissenschaftlicher Forschung entwickelt. Sie
            stehen im Einklang mit den Ernährungsempfehlungen der Weltgesundheitsorganisation (WHO) und der Deutschen
            Gesellschaft für Ernährung (DGE).
          </p>
        </motion.div>

        {/* ZIES gGmbH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Über den Anbieter</h2>
              <p className="text-gray-700 leading-relaxed text-base mb-4">
                Die ZIES gGmbH verfügt über jahrelange Erfahrung in der medizinisch-wissenschaftlich fundierten
                Konzeption und Umsetzung zielgruppenspezifischer Programme und Medien zur Gesundheitsförderung. Im
                Rahmen settingbezogener Pilotprojekte entwickelte sie umfassende Maßnahmen für Schüler:innen,
                Auszubildende/Studierende und berufstätige Erwachsene, die sie in Bildungseinrichtungen und Betrieben,
                u.a. Kliniken und Pflegeeinrichtungen, umsetzt.
              </p>
              <p className="text-gray-700 leading-relaxed text-base mb-4">
                Die ZIES gGmbH setzt die Programme in engem Austausch mit Kultusbehörden und Gesundheitsministerien
                der Länder, gesetzlichen Krankenkassen, Bildungseinrichtungen und Betrieben um.
              </p>
              <a
                href="https://www.zies-frankfurt.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                www.zies-frankfurt.de
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex justify-center md:justify-end md:w-40 flex-shrink-0">
              <img
                src={ziesLogo}
                alt="ZIES gGmbH Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* BKK firmus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Über die fördernde Krankenkasse</h2>
              <p className="text-gray-700 leading-relaxed text-base mb-4">
                Die BKK firmus kann auf eine mehr als 180-jährige Geschichte zurückblicken. Ursprünglich entstanden
                durch den Zusammenschluss mehrerer erfolgreicher Betriebskrankenkassen in Nord-West-Deutschland,
                betreut die BKK firmus mittlerweile mehr als eine Million Versicherte und rund 240.000 Arbeitgeber.
              </p>
              <p className="text-gray-700 leading-relaxed text-base mb-4">
                Die BKK firmus ist sich ihrer Verantwortung für ihre Versicherten und die Bevölkerung bewusst und
                nimmt diese aktiv wahr. Daher legt die Krankenkasse seit jeher großen Wert auf nachhaltige und
                qualitativ hochwertige Präventionsangebote. In diesem Rahmen kooperiert die Betriebskrankenkasse
                seit vielen Jahren erfolgreich mit verschiedenen Partnern, unter anderem mit der ZIES gGmbH.
              </p>
              <a
                href="https://www.bkk-firmus.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                www.bkk-firmus.de
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex justify-center md:justify-end md:w-40 flex-shrink-0">
              <img
                src={bkkFirmusLogo}
                alt="BKK firmus Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
