import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Users, BookOpen, Lightbulb, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Hexagon({ cx, cy, r, label }: { cx: number; cy: number; r: number; label: string }) {
  const pts = [0,1,2,3,4,5].map(i => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <g>
      <polygon points={pts} fill="#7ccf5e" stroke="#4a9e2f" strokeWidth="2.5" />
      <polygon points={pts} fill="url(#hexGrad)" opacity="0.4" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={r > 20 ? "18" : "14"} fontWeight="bold" fill="#1a5c00">{label}</text>
    </g>
  );
}

function PhotosyntheseDiagram() {
  return (
    <div className="my-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Photosynthese: Bildung von Glucose durch grüne Pflanzen</h4>
      <svg viewBox="0 0 750 280" className="w-full max-w-2xl mx-auto" aria-label="Photosynthese Diagramm">
        <rect x="0" y="0" width="750" height="280" fill="#f2f2f2" rx="10" />
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="30" y="50" width="150" height="36" rx="18" fill="#f5f5a0" stroke="#d4d470" strokeWidth="1.5" />
        <text x="105" y="73" textAnchor="middle" fontSize="15" fontWeight="600" fill="#333">Sonnenlicht</text>
        <rect x="30" y="115" width="150" height="36" rx="18" fill="#b8b8b8" stroke="#999" strokeWidth="1.5" />
        <text x="105" y="138" textAnchor="middle" fontSize="15" fontWeight="600" fill="#333">Kohlendioxid</text>
        <rect x="30" y="180" width="150" height="36" rx="18" fill="#87ceeb" stroke="#5fafd7" strokeWidth="1.5" />
        <text x="105" y="203" textAnchor="middle" fontSize="15" fontWeight="600" fill="#333">Wasser</text>
        <line x1="185" y1="68" x2="260" y2="68" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
        <line x1="185" y1="133" x2="260" y2="133" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
        <line x1="185" y1="198" x2="260" y2="198" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
        <defs>
          <marker id="arrowDark" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#555" /></marker>
        </defs>
        <g transform="translate(280, 20)">
          <line x1="40" y1="220" x2="40" y2="170" stroke="#5a8a3c" strokeWidth="3" />
          <ellipse cx="40" cy="155" rx="22" ry="14" fill="#3a8c1e" transform="rotate(-30, 40, 155)" />
          <ellipse cx="40" cy="130" rx="24" ry="13" fill="#4da82e" transform="rotate(15, 40, 130)" />
          <ellipse cx="40" cy="105" rx="22" ry="14" fill="#3a8c1e" transform="rotate(-20, 40, 105)" />
          <ellipse cx="40" cy="80" rx="24" ry="13" fill="#4da82e" transform="rotate(10, 40, 80)" />
          <ellipse cx="40" cy="55" rx="22" ry="14" fill="#3a8c1e" transform="rotate(-25, 40, 55)" />
          <ellipse cx="40" cy="32" rx="20" ry="12" fill="#4da82e" transform="rotate(5, 40, 32)" />
          <ellipse cx="40" cy="12" rx="16" ry="10" fill="#3a8c1e" transform="rotate(-10, 40, 12)" />
        </g>
        <line x1="365" y1="133" x2="440" y2="133" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
        <rect x="455" y="95" width="85" height="36" rx="4" fill="#b8b8b8" stroke="#999" strokeWidth="1.5" />
        <text x="497" y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">Kohlen</text>
        <rect x="540" y="95" width="4" height="36" fill="#333" />
        <rect x="544" y="95" width="95" height="36" rx="4" fill="#87ceeb" stroke="#5fafd7" strokeWidth="1.5" />
        <text x="591" y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">Hydrate</text>
        <line x1="550" y1="135" x2="550" y2="175" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark)" />
        <Hexagon cx={550} cy={210} r={28} label="G" />
        <text x="550" y="252" textAnchor="middle" fontSize="14" fontWeight="600" fill="#333">Glucose</text>
      </svg>
    </div>
  );
}

function AtmungDiagram() {
  return (
    <div className="my-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Atmung: Nutzung von Glucose zur Energiegewinnung für unseren Organismus</h4>
      <svg viewBox="0 0 750 280" className="w-full max-w-2xl mx-auto" aria-label="Atmung Diagramm">
        <rect x="0" y="0" width="750" height="280" fill="#f2f2f2" rx="10" />
        <defs>
          <linearGradient id="hexGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <marker id="arrowDark2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#555" /></marker>
        </defs>
        <Hexagon cx={85} cy={120} r={30} label="G" />
        <text x="85" y="165" textAnchor="middle" fontSize="14" fontWeight="600" fill="#333">Glucose</text>
        <line x1="120" y1="120" x2="200" y2="120" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark2)" />
        <g transform="translate(220, 15)">
          <ellipse cx="120" cy="30" rx="28" ry="30" fill="#e8cca8" stroke="#c9a87c" strokeWidth="1.5" />
          <ellipse cx="120" cy="95" rx="32" ry="45" fill="#e8cca8" stroke="#c9a87c" strokeWidth="1.5" />
          <line x1="88" y1="75" x2="55" y2="110" stroke="#c9a87c" strokeWidth="6" strokeLinecap="round" />
          <line x1="152" y1="75" x2="185" y2="110" stroke="#c9a87c" strokeWidth="6" strokeLinecap="round" />
          <line x1="108" y1="140" x2="95" y2="210" stroke="#c9a87c" strokeWidth="6" strokeLinecap="round" />
          <line x1="132" y1="140" x2="145" y2="210" stroke="#c9a87c" strokeWidth="6" strokeLinecap="round" />
        </g>
        <line x1="395" y1="68" x2="475" y2="68" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark2)" />
        <line x1="395" y1="133" x2="475" y2="133" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark2)" />
        <line x1="395" y1="198" x2="475" y2="198" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrowDark2)" />
        <rect x="490" y="50" width="150" height="36" rx="18" fill="#f5f5a0" stroke="#d4d470" strokeWidth="1.5" />
        <text x="565" y="73" textAnchor="middle" fontSize="15" fontWeight="600" fill="#333">Energie</text>
        <rect x="490" y="115" width="150" height="36" rx="18" fill="#b8b8b8" stroke="#999" strokeWidth="1.5" />
        <text x="565" y="138" textAnchor="middle" fontSize="15" fontWeight="600" fill="#333">Kohlendioxid</text>
        <rect x="490" y="180" width="150" height="36" rx="18" fill="#87ceeb" stroke="#5fafd7" strokeWidth="1.5" />
        <text x="565" y="203" textAnchor="middle" fontSize="15" fontWeight="600" fill="#333">Wasser</text>
      </svg>
    </div>
  );
}

function ZuckerartenDiagram() {
  const hexR = 24;
  const hexSpacing = 48;
  return (
    <div className="my-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Zuckerarten schematisch</h4>
      <svg viewBox="0 0 500 340" className="w-full max-w-lg mx-auto" aria-label="Zuckerarten Diagramm">
        <rect x="0" y="0" width="500" height="340" fill="#f2f2f2" rx="10" />
        <defs>
          <linearGradient id="hexGrad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        <Hexagon cx={80} cy={45} r={hexR} label="G" />
        <text x="45" y="90" fontSize="15" fontWeight="bold" fill="#333">Einfachzucker</text>
        <Hexagon cx={80} cy={145} r={hexR} label="G" />
        <line x1={80 + hexR} y1={145} x2={80 + hexSpacing - hexR} y2={145} stroke="#4a9e2f" strokeWidth="3" />
        <Hexagon cx={80 + hexSpacing} cy={145} r={hexR} label="G" />
        <text x="45" y="190" fontSize="15" fontWeight="bold" fill="#333">Zweifachzucker</text>
        {[0,1,2,3,4,5].map((i) => (
          <g key={i}>
            <Hexagon cx={80 + i * hexSpacing} cy={250} r={hexR} label="G" />
            {i < 5 && <line x1={80 + i * hexSpacing + hexR} y1={250} x2={80 + (i + 1) * hexSpacing - hexR} y2={250} stroke="#4a9e2f" strokeWidth="3" />}
          </g>
        ))}
        <text x={80 + 5 * hexSpacing + hexR + 5} y={255} fontSize="20" fontWeight="bold" fill="#555">....</text>
        <text x="45" y="295" fontSize="15" fontWeight="bold" fill="#333">Mehrfachzucker</text>
      </svg>
    </div>
  );
}

interface AccordionSectionProps {
  number: number;
  title: string;
  color: string;
  bgColor: string;
  textColor: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({ number, title, color, bgColor, textColor, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 ${bgColor} hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-3">
          <span className={`${color} text-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold`}>
            {number}
          </span>
          <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
        </div>
        {isOpen ? <ChevronUp className={textColor} size={22} /> : <ChevronDown className={textColor} size={22} />}
      </button>
      {isOpen && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export default function LehrerManual() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [weiterOpen, setWeiterOpen] = useState(false);
  const [fragenOpen, setFragenOpen] = useState(false);
  const [hintergrundOpen, setHintergrundOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = (n: number) => setOpenSections(prev => ({ ...prev, [n]: !prev[n] }));

  const handleDownloadPdf = async () => {
    if (!contentRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);

    const prevSections = { ...openSections };
    const prevWeiter = weiterOpen;
    const prevFragen = fragenOpen;
    const prevHintergrund = hintergrundOpen;
    setOpenSections({ 1: true, 2: true, 3: true, 4: true, 5: true });
    setWeiterOpen(true);
    setFragenOpen(true);
    setHintergrundOpen(true);

    await new Promise(r => setTimeout(r, 500));

    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 900,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pdfWidth - margin * 2;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = usableWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;
      const usableHeight = pdfHeight - margin * 2;

      let yOffset = 0;
      let page = 0;

      while (yOffset < scaledHeight) {
        if (page > 0) pdf.addPage();
        const sourceY = (yOffset / ratio);
        const sourceHeight = Math.min(usableHeight / ratio, imgHeight - sourceY);
        const destHeight = sourceHeight * ratio;

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
        }

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(pageImgData, "JPEG", margin, margin, usableWidth, destHeight);

        yOffset += usableHeight;
        page++;
      }

      pdf.save("Lehrer-innen-Manual.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setOpenSections(prevSections);
      setWeiterOpen(prevWeiter);
      setFragenOpen(prevFragen);
      setHintergrundOpen(prevHintergrund);
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-wait text-sm font-medium"
        >
          <Download size={16} />
          {isGeneratingPdf ? "PDF wird erstellt..." : "Manual als PDF herunterladen"}
        </button>
      </div>
      <div ref={contentRef}>
      {/* Section 1: Kohlenhydrate */}
      <AccordionSection
        number={1}
        title="Kohlenhydrate"
        color="bg-green-600"
        bgColor="bg-green-50"
        textColor="text-green-800"
        isOpen={!!openSections[1]}
        onToggle={() => toggle(1)}
      >
        {/* Hintergrund */}
        <div className="mb-8">
          <button
            onClick={() => setHintergrundOpen(!hintergrundOpen)}
            className="flex items-center gap-3 mb-4 w-full text-left cursor-pointer"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-green-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 flex-1">Hintergrund zur Beantwortung</h4>
            {hintergrundOpen ? <ChevronUp className="text-green-600" size={20} /> : <ChevronDown className="text-green-600" size={20} />}
          </button>
          {hintergrundOpen && <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <p className="mb-3">Über die Nahrung nimmt unser Körper zwei Arten von Nährstoffen auf: <strong>Makronährstoffe</strong> und <strong>Mikronährstoffe</strong>.</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Makronährstoffe benötigt der Körper zur Energiegewinnung.</li>
              <li>Sämtliche lebenswichtigen Körperfunktionen verbrauchen Energie.</li>
              <li>Wenn dem Körper nicht genügend Energie durch die Nahrung bereitgestellt wird, kann er nicht gesund funktionieren.</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="font-semibold text-blue-800">Es gibt drei Makronährstoffe: Kohlenhydrate, Fette und Proteine.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Kohlenhydrate als Energielieferant</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Kohlenhydrate sind ein wichtiger Energielieferant (Makronährstoff) für unseren Körper.</li>
              <li>Kohlenhydrate werden vom Körper zu Glucose verstoffwechselt.</li>
              <li>Glucose ist der wichtigste Energielieferant für das Gehirn, auch andere Organe benötigen Glucose.</li>
              <li>Ist der Körper nicht ausreichend mit Glucose versorgt, fühlen wir uns müde und unkonzentriert.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Komplexität der Kohlenhydrate</h5>
            <p className="mb-3">Kohlenhydrate kommen in Nahrungsmitteln in unterschiedlicher Form vor: Sie können mehr oder weniger komplex aufgebaut sein.</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Die Komplexität der Kohlenhydrate hat einen Einfluss darauf, wie schnell sie vom Körper zu Glucose verstoffwechselt werden können.</li>
              <li>Je komplexer die Kohlenhydrate, desto langsamer werden sie zu Glucose verarbeitet.</li>
              <li>Komplexe Kohlenhydrate bestehen aus langen Ketten aus vielen Einfachzuckern. Hier dauert der Gewinn von Glucose lange.</li>
              <li>Weniger komplexe Kohlenhydrate bestehen aus kurzen Bausteinen aus bloß ein oder zwei Einfachzuckern. Hier ist die Glucose sehr schnell verfügbar.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Einfachzucker vs. komplexe Kohlenhydrate</h5>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="font-semibold text-orange-800 mb-2">Einfachzucker:</p>
              <ul className="list-disc pl-5 space-y-1 text-orange-700">
                <li>Bei Nahrungsmitteln mit Einfachzuckern gelangt die enthaltene Glucose sehr schnell ins Blut.</li>
                <li>Die Folge: ein schneller Energieschub – aber die Energie ist schnell wieder verbraucht.</li>
                <li>Ist keine Glucose mehr verfügbar, fühlen wir uns schlapp. Wir bekommen schnell wieder Hunger und haben immer wieder ‚Lust auf Süßes'.</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="font-semibold text-green-800 mb-2">Komplexe Kohlenhydrate:</p>
              <ul className="list-disc pl-5 space-y-1 text-green-700">
                <li>Komplexe Kohlenhydrate sind für eine gleichmäßige Energieversorgung deutlich vorteilhafter als Einfachzucker.</li>
                <li>Bei Nahrungsmitteln mit komplexen Kohlenhydraten hält die Energieversorgung durch die Glucose länger an.</li>
                <li>Wir fühlen uns länger wach, konzentriert und satt.</li>
              </ul>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Lebensmittel mit komplexen Kohlenhydraten</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Gemüse und Obst</li>
              <li>Vollkornprodukte</li>
              <li>Hülsenfrüchte</li>
            </ul>
            <p className="mb-2">Diese Lebensmittel enthalten außerdem wichtige <strong>Ballaststoffe</strong>.</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Ballaststoffe = Nahrungsbestandteile, die vom Körper nicht verdaut werden können.</li>
              <li>zögern die Verdauung hinaus</li>
              <li>wirken sich positiv auf eine langsame, gleichmäßige Energieversorgung des Körpers mit Glucose aus</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="font-semibold text-yellow-800 mb-2">Beispiel Banane:</p>
              <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                <li>enthält Glucose in schnell und weniger schnell verfügbarer Form (komplexe Kohlenhydrate)</li>
                <li>enthält viele Ballaststoffe</li>
                <li>versorgt den Körper sowohl schnell als auch länger anhaltend mit Energie</li>
                <li>gut geeignet als Snack zur Konzentrationssteigerung (etwa vor einer Prüfung)</li>
                <li>Vergleich mit Schokolade: Schokolade enthält ausschließlich Einfachzucker, keine Kohlenhydrate und keine Ballaststoffe.</li>
              </ul>
            </div>
          </div>}
        </div>

        {/* Fragen */}
        <div className="mb-8">
          <button
            onClick={() => setFragenOpen(!fragenOpen)}
            className="flex items-center gap-3 mb-4 w-full text-left cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 flex-1">Fragen für die Gruppenarbeit</h4>
            {fragenOpen ? <ChevronUp className="text-blue-600" size={20} /> : <ChevronDown className="text-blue-600" size={20} />}
          </button>
          {fragenOpen && <div className="space-y-3 ml-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="font-semibold text-blue-800 mb-1">Gruppe 1:</p>
              <p className="text-blue-700">Wie wird die Energie aus den Makronährstoffen im Körper gespeichert? Warum sind Kohlenhydrate wichtig für unser Gehirn?</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-800 mb-1">Gruppe 2:</p>
              <p className="text-green-700">Worin unterscheiden sich komplexe Kohlenhydrate von Einfachzuckern (chemisch gesehen) und welche Folgen hat das für die Verdauung? Wie funktioniert die Verwertung von Kohlenhydraten?</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="font-semibold text-orange-800 mb-1">Gruppe 3:</p>
              <p className="text-orange-700">Welche Kohlenhydrate können als ‚gut' gelten und warum? In welchen Lebensmitteln befinden sie sich? Welche Kohlenhydrate müssen als ‚schlecht' gelten und warum? In welchen Lebensmitteln befinden sie sich?</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="font-semibold text-purple-800 mb-1">Gruppe 4:</p>
              <p className="text-purple-700">Welche Folgen hat der Konsum von Einfachzuckern für unser Körpergefühl und unsere Leistungsfähigkeit, welche der Konsum von komplexen Kohlenhydraten? Warum ist es möglich, durch Essen einer Banane vor Prüfungen die Effekte beider Arten von Kohlenhydraten optimal auszunutzen?</p>
            </div>
          </div>}
        </div>

        {/* Weiterführende Informationen */}
        <div>
          <button
            onClick={() => setWeiterOpen(!weiterOpen)}
            className="flex items-center gap-3 mb-4 w-full text-left group cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Lightbulb className="text-indigo-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 flex-1">Weiterführende Informationen für Lehrkräfte</h4>
            {weiterOpen ? <ChevronUp className="text-indigo-600" size={20} /> : <ChevronDown className="text-indigo-600" size={20} />}
          </button>
          {weiterOpen && <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <h5 className="text-base font-semibold text-gray-800 mt-4 mb-2">Wie entstehen Kohlenhydrate?</h5>
            <p className="mb-3">Grundlage für die Bildung von Kohlenhydraten die Photosynthese durch grüne Pflanzen. Dabei bilden die Pflanzen aus Wasser und Kohlendioxid (CO₂) das energiehaltige Molekül Glucose. Als Energiequelle dient dabei das Sonnenlicht.</p>

            <PhotosyntheseDiagram />

            <p className="mb-3">Alle Zellen unseres Körpers können Glucose als Energiequelle nutzen. Manche Zellen wie etwa die Nervenzellen im Gehirn sind sogar ausschließlich auf diese Zuckerart als Energiequelle angewiesen.</p>
            <p className="mb-3">Bei der Gewinnung von Energie aus Glucose wird diese wieder in ihre ursprünglichen Bausteine zerlegt: Wasser und Kohlendioxid. Diesen Vorgang bezeichnet man als Atmung. Die bei der Atmung freiwerdende Energie wird von unserem Organismus auf vielfältige Weise genutzt.</p>

            <AtmungDiagram />

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4">
              <p className="text-indigo-700">Aus dem Vergleich der beiden Schaubilder wird deutlich, dass die Atmung die Umkehrung der Photosynthese darstellt.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Zuckerarten</h5>
            <p className="mb-2"><strong>Einfachzucker:</strong> Die wichtigsten Einfachzucker, die in unserer Ernährung eine Rolle spielen, sind Traubenzucker (Glucose) und Fruchtzucker (Fructose). Glukose ist die Hauptenergiequelle für das Gehirn und die Muskeln.</p>
            <p className="mb-2"><strong>Zweifachzucker:</strong> Der bekannteste Zweifachzucker ist die Saccharose, unser „Haushaltszucker". Er ist aus Fructose und Glucose zusammengesetzt.</p>
            <p className="mb-2"><strong>Mehrfachzucker:</strong> Die Zuckermoleküle können miteinander verbunden werden. Dann entstehen Mehrfachzucker (Polysaccharide). Tatsächlich liegt in der Natur der meiste Zucker als Mehrfachzucker vor.</p>

            <ZuckerartenDiagram />

            <p className="mb-3">Pflanzen nutzen diese ketten- oder auch netzartig verbundenen Mehrfachzucker als Baustoffe – zum Beispiel in Form der Zellulose für ihre feste Zellwand. Dabei wird der Traubenzucker sehr fest miteinander verbunden, so dass er kaum wieder aufzuspalten ist. Deshalb können wir dieses Pflanzenmaterial nicht verdauen.</p>
            <p className="mb-3">Eine weitere Verwendung der Mehrfachzucker ist die Bildung von Speicherstoff, der sogenannten Stärke. Stärke findet man vor allem in Samen und Knollen. Dort dient sie den keimenden Jungpflanzen als Energiequelle.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Aufbau der Stärke</h5>
            <p className="mb-3">Im Gegensatz zu den Einfach- und Zweifachzuckern ist Stärke ein sogenanntes „komplexes Kohlenhydrat". In der Stärke sind die Einfachzucker zu linearen oder verzweigten Ketten verbunden.</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Amylose</strong> (20–30 % der Stärke): lineare Ketten mit einer schraubenartigen Struktur.</li>
              <li><strong>Amylopektin</strong> (70–80 % der Stärke): vielfach verzweigte, netzartige Strukturen, die sehr große Moleküle bilden.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Wichtige stärkehaltige Nahrungsquellen</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Getreide:</strong> Weizen, Roggen, Gerste, Dinkel, Mais, Reis, Hafer</li>
              <li><strong>Kartoffeln</strong></li>
              <li><strong>Hülsenfrüchte:</strong> Bohnen, Erbsen, Erdnüsse, Kichererbsen, Linsen, Sojabohnen, Hirse</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Verdauung von Stärke und Energiegewinnung</h5>
            <p className="mb-3">Die Verdauung von Stärke in unserer Nahrung beginnt bereits im Mund. Unser Speichel enthält das stärkespaltende Enzym Alpha-Amylase. Die Amylase spaltet die Stärke zu Dextrinen (Bruchstücke der Stärke). Daher ist es wichtig, dass man lange und gründlich kaut.</p>
            <p className="mb-3">Die Dextrine, welche die Alpha-Amylase gebildet hat, werden im Dünndarm durch die Pankreas-Amylase und Saccharidasen weiter gespalten. Die schließlich entstehenden Einzelzucker (Monosaccharide) werden durch die Darmzellen aufgenommen und gelangen ins Blut, von wo sie in alle Organe, Gewebe und Zellen des Körpers transportiert werden.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Gewinnung von Energie</h5>
            <p className="mb-3">Unsere Zellen nehmen die Zuckermoleküle auf, die über den Blutstrom angeliefert werden. Dies wird durch das Hormon Insulin reguliert. In den Zellen erfolgt der Abbau des Zuckers ebenfalls von zahlreichen Enzymen gesteuert durch den Vorgang der Zellatmung.</p>
            <p className="mb-3">Die gesamte Reaktion besteht aus drei aufeinander folgenden Teilprozessen – einer mehrstufigen Kaskade von enzymgesteuerten chemischen Reaktionen, bei denen die Glucose zu Kohlendioxid (CO₂) und Wasser abgebaut wird. Die Reaktionsschritte nutzt die Zelle zur Bildung von Adenosin-Triphosphat (ATP). Dieses energiereiche Molekül dient als Treibstoff für nahezu alle Prozesse, die in Zellen und Organen ablaufen.</p>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4">
              <p className="font-semibold text-indigo-800">ATP (Adenosin-Triphosphat), der universelle Energieträger der Zelle.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Glucose ist der Treibstoff für unser Gehirn</h5>
            <p className="mb-3">Unser Gehirn hat nur einen kleinen Anteil am Körpergewicht, dafür aber einen exorbitant hohen Energieverbrauch. Es benötigt 20 Prozent der Gesamtenergie, die unser Körper täglich braucht.</p>
            <p className="mb-3">Dies liegt unteranderem daran, dass unser Gehirn rund um die Uhr aktiv ist. Außerdem benötigt die tägliche Arbeit der Nervenzellen besonders viel Energie. Auch der Transport von Molekülen und Botenstoffen ist energetisch sehr aufwändig.</p>
            <p className="mb-3">Nervenzellen können die Glucose aber nicht speichern. Daher ist eine stetige, ausreichende Versorgung unerlässlich, denn unser Gehirn verbrennt etwa 130 Gramm Glucose am Tag.</p>
          </div>}
        </div>
      </AccordionSection>

      {/* Section 2: Fette */}
      <AccordionSection
        number={2}
        title="Fette"
        color="bg-orange-600"
        bgColor="bg-orange-50"
        textColor="text-orange-800"
        isOpen={!!openSections[2]}
        onToggle={() => toggle(2)}
      >
        {/* Fragen */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Fragen für die Gruppenarbeit</h4>
          </div>
          <div className="space-y-3 ml-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="font-semibold text-blue-800 mb-1">Gruppe 1:</p>
              <p className="text-blue-700">Welche Funktionen erfüllen Fette im Körper? Warum ist es bei Fetten besonders wichtig, nicht zu viel zu konsumieren? Was sind die Obergrenzen?</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-800 mb-1">Gruppe 2:</p>
              <p className="text-green-700">Wie sind Fette chemisch aufgebaut und welche Rolle spielen die Fettsäuren? Was sind die wichtigsten Unterschiede zwischen den Fettsäuren hinsichtlich ihrer Funktion/Wirkung und Herstellung?</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="font-semibold text-orange-800 mb-1">Gruppe 3:</p>
              <p className="text-orange-700">Was ist der Unterschied zwischen gesättigten Fettsäuren und einfach ungesättigten Fettsäuren (chemisch gesehen)? Warum gelten erstere als ‚schlecht' und letztere als relativ ‚gut'? In welchen Lebensmitteln findet man sie jeweils?</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="font-semibold text-purple-800 mb-1">Gruppe 4:</p>
              <p className="text-purple-700">Was sind mehrfach ungesättigte Fettsäuren (chemisch gesehen) und in welchen Lebensmitteln befinden sie sich? Inwiefern haben sie eine Sonderstellung unter den Fettsäuren und warum sind sie so gesund?</p>
            </div>
          </div>
        </div>

        {/* Hintergrund */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-green-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Hintergrund zur Beantwortung</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <p className="mb-3">Fette sind auch ein Energielieferant (Makronährstoff) für unseren Körper. Außerdem erfüllen sie weitere wichtige Funktionen:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Wir benötigen Fette, damit bestimmte Vitamine vom Körper aufgenommen werden.</li>
              <li>Fette sind Bestandteil der Zellmembran, d.i. die Hülle, die die Körperzellen umschließt.</li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="text-orange-700"><strong>Fette sind der Nährstoff mit der mit Abstand höchsten Energiedichte.</strong> Ein Gramm Fett liefert mehr als doppelt so viel Energie wie ein Gramm Kohlenhydrate oder Proteine. Fette sollten bewusst konsumiert werden.</p>
            </div>

            <p className="mb-3">Fette setzen sich aus Fettsäuren zusammen, von diesen Fettsäuren gibt es unterschiedliche Arten mit unterschiedlichen Funktionen und Effekten. Es gibt gesättigte und ungesättigte Fettsäuren.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Gesättigte Fettsäuren</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>kommen vor allem in tierischen Lebensmitteln vor, z.B. in Fleisch, Milchprodukten und Eigelb.</li>
              <li>pflanzliche Fette, die gesättigte Fettsäuren enthalten: Kokosfett und Palmöl</li>
              <li>Gesättigte Fettsäuren kann der Körper selbst herstellen.</li>
              <li>Gesättigte Fettsäuren stehen im Verdacht, die Menge an schädlichem Cholesterin im Blut zu erhöhen – das kann negative Effekte für die Gesundheit haben.</li>
              <li>Gesättigte Fettsäuren sollten nicht unbegrenzt konsumiert werden.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Einfach ungesättigte Fettsäuren</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Lebensmittel: pflanzliche Öle (z.B. Olivenöl und Rapsöl), Nüsse und Samen, Avocados.</li>
              <li>Einfach ungesättigte Fettsäuren kann der Körper ebenfalls selbst herstellen.</li>
              <li>Einfach ungesättigte Fettsäuren gelten auch in größeren Mengen als gesund.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Mehrfach ungesättigte Fettsäuren</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Lebensmittel: bestimmte pflanzliche Öle, Nüsse und Samen, fetter Seefisch (z.B. Lachs, Hering, Tunfisch).</li>
              <li>Auch die sogenannten Omega-3- und Omega-6-Fettsäuren sind mehrfach ungesättigte Fettsäuren – für den Körper besonders wertvoll.</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700"><strong>Besonderheit:</strong> Der Körper kann mehrfach ungesättigte Fettsäuren nicht selbst herstellen. Sie heißen darum auch ‚essentielle Fettsäuren'. Wir müssen sie über die Nahrung aufnehmen. Man sollte möglichst reichlich mehrfach ungesättigte Fettsäuren zu sich nehmen.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Die ‚Fett-Faustregeln'</h5>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <ul className="list-disc pl-5 space-y-2 text-green-700">
                <li>Fette sollten bei der Ernährung maximal ein Drittel ausmachen.</li>
                <li>Nicht mehr als 10 Prozent sollte aus gesättigten Fettsäuren bestehen.</li>
                <li>Man sollte möglichst viele ungesättigte Fettsäuren zu sich nehmen, vor allem mehrfach ungesättigte Fettsäuren.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weiterführende Informationen */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Lightbulb className="text-indigo-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Weiterführende Informationen für Lehrkräfte</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <p className="mb-3">Chemisch sind Fette Verbindungen von Glycerin mit sog. Fettsäuren. Sie werden auch Triglyceride genannt.</p>
            <p className="mb-3">In einem Fettmolekül sind drei Fettsäuren mit dem Glycerin verbunden: → Triglyceride</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Bildung von Fetten im Körper</h5>
            <p className="mb-3">Die Herstellung von Fetten kann in mehreren Organen stattfinden: Leber, Niere, Fettgewebe, Darmwand oder Muskulatur. In mehreren Reaktionsschritten verbinden Enzyme das Molekül Glycerin mit Fettsäuren. Zu den wichtigsten Produzenten von Triglyceriden in unserem Körper gehören die Zellen des weißen Fettgewebes, die Adipozyten (Fettzellen). An der Regulierung dieser Vorgänge sind Hormone wie etwa Insulin oder Adrenalin beteiligt.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Abbau der Fette</h5>
            <p className="mb-3">Am Abbau der Triglyceride sind spezielle Enzyme beteiligt, die sog. Lipasen aus der Bauchspeicheldrüse. In drei Schritten findet die Abspaltung der Fettsäuren vom Glycerinmolekül statt. Ergebnisse der Reaktion sind Glycerin und Fettsäuren.</p>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4">
              <p className="font-semibold text-indigo-800 mb-1">Der biologische Fettabbau (durch das Enzym Lipase)</p>
              <p className="text-indigo-700">Fett + Lipase → Glycerin + 3 Fettsäuremoleküle</p>
            </div>
            <p className="mb-3">Das Glycerin wird für Biosynthesen weiterverwendet. Die Fettsäuren können von den Körperzellen aufgenommen, in den Vorgang der Zellatmung (sog. Fettverbrennung zur Energiegewinnung) eingeschleust oder ebenfalls für Biosynthesen eingesetzt werden. Dazu erfolgt zunächst die Spaltung in kleinere Einheiten mit je zwei Kohlenstoffatomen (C2-Einheiten).</p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded">
              <p className="text-gray-700 mb-1">Fettsäure → Abbau zu C2-Einheiten und Verwendung für</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Bau-Stoffwechsel und Biosynthese</li>
                <li>Zellatmung und Energiegewinnung</li>
              </ul>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Wichtig für unsere Ernährung: die Fettsäuren</h5>
            <p className="mb-3">Das beim Fettabbau entstehende Molekül Glycerin ist immer gleich. Unterschiedlich sind hingegen die Fettsäuren, die bei der Fettverdauung freigesetzt werden. Man unterscheidet sie anhand ihres Aufbaus in</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>gesättigte Fettsäuren und</li>
              <li>ungesättigte Fettsäuren.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Was sind Fettsäuren und wie werden sie unterschieden?</h5>
            <p className="mb-3">Fettsäuren sind organische Verbindungen aus den Elementen Kohlenstoff (C), Wasserstoff (H) und Sauerstoff (O), sog. Monocarbonsäuren. Ein Fettsäure-Molekül besteht aus einer langen Kohlenwasserstoffkette, die an einem Ende eine COOH-Gruppe (Carboxylgruppe) trägt und namengebend zur Bezeichnung ‚-säure' beiträgt. Die Zahl der C-Atome ist immer gerade und liegt zwischen 8 und 24. Man unterscheidet gesättigte und ungesättigte Fettsäuren.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Gesättigte Fettsäuren</h5>
            <p className="mb-3">Jedes C-Atom in der Kohlenwasserstoffkette ist hier mit der maximal möglichen Anzahl von Wasserstoffatomen verbunden. Alle C-Atome sind durch Einfachbindungen verknüpft. Die Kohlenstoffatome in der Kette besitzen ausschließlich Einfachbindungen.</p>
            <p className="mb-2">Beispiele für gesättigte Fettsäuren:</p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded space-y-2">
              <p className="text-gray-700">Palmitinsäure<br /><span className="font-mono">C16H32O2</span></p>
              <p className="text-gray-700">Stearinsäure<br /><span className="font-mono">C18H36O2</span></p>
            </div>
            <p className="mb-3">Gesättigte Fette besitzen nur gesättigte Fettsäuren. Große Mengen an gesättigten Fettsäuren findet man vor allem in Nahrungsmitteln tierischer Herkunft. Nur wenige pflanzliche Nahrungsmittel enthalten größere Anteile an gesättigte Fettsäuren.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Ungesättigte Fettsäuren</h5>
            <p className="mb-3">Hier besitzen nicht alle C-Atome in der Kohlenwasserstoffkette die maximale Anzahl an Wasserstoffatomen. Manche C-Atome sind durch eine Doppelbindung verknüpft. Man unterscheidet zwischen einfach und mehrfach ungesättigte Fettsäuren.</p>
            <p className="mb-2">Beispiele für ungesättigte Fettsäuren:</p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded space-y-2">
              <p className="text-gray-700">Ölsäure (einfach ungesättigt)<br /><span className="font-mono">C18H34O2</span></p>
              <p className="text-gray-700">Linolsäure (zweifach ungesättigt)<br /><span className="font-mono">C18H32O2</span></p>
            </div>
            <p className="mb-3">Ungesättigte Fette besitzen einen hohen Anteil an ungesättigten Fettsäuren. Diese sind überwiegend in pflanzlichen Nahrungsmitteln und in fettem Fisch enthalten.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Was versteht man unter „Omega-Fettsäuren"?</h5>
            <p className="font-semibold text-gray-800 mb-2">Omega-3-Fettsäuren</p>
            <p className="mb-3">Die Omega-3-Fettsäuren bilden eine Untergruppe der ungesättigten Fettsäuren. Omega-3 bedeutet: Die letzte Doppelbindung in der ungesättigten Kohlenstoffkette befindet sich bei der vom COOH-Ende aus gesehen drittletzten C-C-Bindung. Omega (ω) ist der letzte Buchstabe des griechischen Alphabets und bezeichnet das von der Carboxylgruppe entfernteste C-Atom in der Kette.</p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded">
              <p className="text-gray-700">Beispiel:<br />α-Linolensäure (C18H30O2)<br />↑ Omega-3</p>
            </div>
            <p className="font-semibold text-gray-800 mb-2">Omega-6-Fettsäuren</p>
            <p className="mb-3">Die Omega-6-Fettsäuren weisen – vom Omega-Ende (ω-Ende) her betrachtet – an der sechsten Position die erste Doppelbindung auf.</p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded">
              <p className="text-gray-700">Beispiel: ↓ Omega-6<br />Linolsäure (C18H32O2)</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Was sind ‚essentielle' Fettsäuren?</h5>
            <p className="mb-3">Essentielle Fettsäuren sind Fettsäuren, die vom Körper nicht selbst hergestellt werden können. Sie müssen über die Nahrung zugeführt werden. Für den Menschen essentiell sind die oben dargestellte Omega-3-Fettsäure α-Linolensäure und die Omega-6-Fettsäure Linolsäure.</p>
            <p className="mb-3">Essentielle Fettsäuren erfüllen lebenswichtige Funktionen: Sie sind u.a. Bausteine unserer Zellmembranen. Zudem spielen sie eine Rolle bei der Steuerung von Entzündungsprozessen, sind wichtig für die Regulierung des Blutdrucks und stärken das Immunsystem. Auch unterstützen sie die Regeneration der Muskulatur und wirken bei der Hormon-Produktion mit.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Fettsäuren und Cholesterin</h5>
            <p className="mb-3">Gesättigte Fettsäuren können den Cholesterinspiegel erhöhen. Cholesterin ist eine natürliche Verbindung aus der Gruppe der sog. Steroide und Baustein vieler Hormone. Einen Großteil des benötigten Cholesterins stellt der Körper selbst her. Der Rest wird mit der Nahrung aufgenommen. Ein hoher Cholesterinspiegel im Blut gilt als Risikofaktor für Arterienverkalkung (Arteriosklerose), denn überschüssiges Cholesterin kann sich in den Gefäßen ablagern. Dies stellt eine Gesundheitsgefahr dar und kann langfristig zu Herzinfarkten, Schlaganfällen oder Gefäßverschlüssen führen.</p>
          </div>
        </div>
      </AccordionSection>

      {/* Section 3: Proteine */}
      <AccordionSection
        number={3}
        title="Proteine"
        color="bg-red-600"
        bgColor="bg-red-50"
        textColor="text-red-800"
        isOpen={!!openSections[3]}
        onToggle={() => toggle(3)}
      >
        {/* Fragen */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Fragen für die Gruppenarbeit</h4>
          </div>
          <div className="space-y-3 ml-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="font-semibold text-blue-800 mb-1">Gruppe 1:</p>
              <p className="text-blue-700">Wie sind Proteine chemisch aufgebaut und was macht sie so kompliziert, aber auch faszinierend? Welche Funktionen erfüllen sie in unserem Körper? Welchen Beitrag leisten sie zum Muskelaufbau?</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-800 mb-1">Gruppe 2:</p>
              <p className="text-green-700">Was ist der wesentliche Unterschied zwischen tierischem und pflanzlichem Protein im Hinblick auf den Menschen? Was sind jeweils die Vorteile und Nachteile von pflanzlichem und tierischem Protein?</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="font-semibold text-orange-800 mb-1">Gruppe 3:</p>
              <p className="text-orange-700">Wie lassen sich die Nachteile von pflanzlichem Protein ausgleichen, um seine Vorteile nutzen zu können? – Welche Lebensmittel werden dafür benötigt?</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="font-semibold text-purple-800 mb-1">Gruppe 4:</p>
              <p className="text-purple-700">Diskutiert: Inwieweit führen die Ernährungsempfehlungen zum Thema Protein zu einer veganen Lebensweise?</p>
            </div>
          </div>
        </div>

        {/* Hintergrund */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-green-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Hintergrund zur Beantwortung</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <p className="mb-3">Proteine sind auch Energielieferanten (Makronährstoffe) für unseren Körper. Außerdem erfüllen sie weitere wichtige Funktionen:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>wichtig beim Aufbau von Muskeln und Gewebe</li>
              <li>übernehmen die Rolle von Enzymen, Hormonen und Antikörpern</li>
              <li>ermöglichen die Kommunikation zwischen den Körperzellen</li>
              <li>transportieren wichtige Stoffe</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Aminosäuren</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Proteine bestehen aus sogenannten Aminosäuren.</li>
              <li>Aminosäuren werden vom Körper zu Ketten verbunden und bilden räumliche Strukturen aus.</li>
              <li>Wenn wir Proteine zu uns nehmen, zerlegt unser Stoffwechsel sie in einzelne Aminosäuren.</li>
              <li>Anschließend baut er daraus jene Proteine neu zusammen, die er braucht.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700"><strong>Essentielle Aminosäuren:</strong> Es gibt Aminosäuren, die vom Körper nicht selbst hergestellt werden können und über die Nahrung zugeführt werden müssen.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Tierisches Protein</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>ist dem Protein in unserem Körper strukturell ähnlich</li>
              <li>enthält in der Regel alle essentiellen Aminosäuren</li>
              <li>kann sehr gut verwertet werden</li>
              <li>Quellen: Fleisch, Eier, Milchprodukte</li>
            </ul>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="font-semibold text-orange-800 mb-1">Nachteile von tierischem Protein:</p>
              <p className="text-orange-700">kommt häufig in Lebensmitteln vor, die auch gesättigte Fettsäuren enthalten. Ausnahme: Fettreicher Seefisch – reich an tierischem Protein und essentiellen Fettsäuren, enthält kaum gesättigte Fettsäuren.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Pflanzliches Protein</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>ist dem körpereigenen Protein weniger ähnlich</li>
              <li>enthält in der Regel nicht alle essentiellen Aminosäuren</li>
              <li>kann weniger gut verwertet werden</li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="font-semibold text-green-800 mb-2">Aber:</p>
              <p className="text-green-700 mb-2">Pflanzliches Protein ist nicht weniger wertvoll für unsere gesunde Ernährung als tierisches Protein. Unterschiedliche pflanzliche Nahrungsmittel haben unterschiedliche Aminosäuren-Zusammensetzungen. Wenn man sie richtig kombiniert, erhält der Körper alle essentiellen Aminosäuren in ausreichender Menge.</p>
              <p className="text-green-700">Einige wenige pflanzliche Proteinquellen enthalten für sich genommen alle essentiellen Aminosäuren, z.B. die Sojabohne (Tofu).</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Quellen für pflanzliches Protein</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Getreide (z.B. Reis, Dinkel, Hafer)</li>
              <li>Hülsenfrüchte (z.B. Bohnen, Linsen, Erbsen)</li>
              <li>Nüsse (z.B. Mandeln, Haselnüsse, Walnüsse)</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="font-semibold text-blue-800 mb-1">Vorteile von pflanzlichem Protein:</p>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>kommt häufig in Lebensmitteln vor, die keine gesättigten Fettsäuren enthalten</li>
                <li>kommt häufig in Lebensmitteln vor, die wertvolle Ballaststoffe und Vitamine oder auch ungesättigte Fettsäuren enthalten</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weiterführende Informationen */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Lightbulb className="text-indigo-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Weiterführende Informationen für Lehrkräfte</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <p className="mb-3">Proteine (abgeleitet vom griechischen Wort prōteios für „grundlegend" und „vorrangig") werden auch als Eiweiße bezeichnet. Die Bezeichnung Eiweiß ist historisch bedingt und geht auf die ursprüngliche Isolierung dieser Stoffe aus dem Hühnereiweiß (Hühnerei) zurück. Heute wird allgemein die Bezeichnung Protein dem älteren Begriff Eiweiß vorgezogen.</p>

            <p className="mb-2">Proteine erfüllen im Organismus zahlreiche lebenswichtige Aufgaben, etwa</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>als Bausteine für Muskeln (z.B. Aktin und Myosin)</li>
              <li>als Gerüste und Stabilisatoren (Kollagen, Keratin)</li>
              <li>als Transporter und Kanäle in und zwischen Zellen (Hämoglobin, Natriumkanäle)</li>
              <li>als Regulatoren (z.B. Hormone: Insulin)</li>
              <li>als Beschleuniger chemischer Reaktionen (Enzyme)</li>
              <li>als Abwehrstoffe im Immunsystem (Antikörper)</li>
              <li>bei der Blutgerinnung (Fibrin)</li>
            </ul>
            <p className="mb-3">So vielfältig wie ihre Aufgaben sind auch die Strukturen und Formen der Proteine. Enthält ein Bakterium geschätzte 3.000 unterschiedliche Proteine, so sind es beim Menschen über 100.000.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Woraus bestehen und wie entstehen Proteine?</h5>
            <p className="mb-3">Proteine bildet der Stoffwechsel aus 20 verschiedenen Aminosäuren (AS). Zur Bildung von Proteinen werden die AS zu ursprünglich linear aufgebauten Molekülen verbunden. Besteht eine Kette aus mehr als 100 AS, spricht man von einem Protein. Aufgrund von Wechselwirkungen innerhalb des großen Moleküls bilden sich spezifische, an die jeweiligen Funktionen angepasste räumliche Strukturen aus. Man nennt das Proteinfaltung.</p>
            <p className="mb-3">Falsch geformte Proteine können ihre biologischen Aufgaben nicht mehr erfüllen und klumpen oft zu unlöslichen Aggregaten zusammen, die sich in der Zelle oder ihrer unmittelbaren Umgebung ansammeln. Derartige Abfallprodukte schädigen die Zellen. Nach neuen Erkenntnissen spielt das vermutlich so verursachte Absterben von Nervenzellen eine entscheidende Rolle bei vielen altersbedingten Krankheiten des Nervensystems, etwa bei der Alzheimerdemenz. Falsch geformte Proteine stellen außerdem eine energetisch teure ‚Fehlinvestition' des Stoffwechsels dar.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Die Rolle der Aminosäuren</h5>
            <p className="mb-3">Der Körper benötigt zur Proteinbildung 20 verschiedene Aminosäuren. Die Baupläne für die Proteine sind im Erbgut einer jeden Zelle gespeichert.</p>
            <p className="mb-2">Chemische Grundstruktur einer Aminosäure:</p>
            <p className="mb-2">Jede Aminosäure hat:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>eine Aminogruppe (NH2)</li>
              <li>eine Carboxylgruppe (COOH)</li>
              <li>eine variable Seitenkette/Restgruppe (R)</li>
              <li>ein Wasserstoffatom (H)</li>
            </ul>
            <p className="mb-3">Die Aminosäuren werden bei der Herstellung von Proteinen miteinander zu Ketten verknüpft.</p>
            <p className="mb-3">Um ihre spätere Gestalt anzunehmen, durchlaufen Proteine den o.g. Prozess der Proteinfaltung. Dabei entsteht zunächst die Sekundärstruktur. Anschließend nimmt das Molekül seine Tertiärstruktur an, die räumliche Anordnung der gefalteten Kette. Sie bestimmt die vollständige dreidimensionale Gestalt. Viele funktionelle Proteine (z.B. Enzyme) müssen sich noch zu einem großen Komplex aus mehreren Untereinheiten zusammenlagern. Dieser heißt Quartärstruktur.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Proteinbedarf und essentielle (unentbehrliche) Aminosäuren</h5>
            <p className="mb-3">Die benötigte Proteinzufuhr kann über den Verzehr proteinreicher Lebensmittel erreicht werden.</p>
            <p className="mb-3">Von den 20 verschiedenen Aminosäuren, die zum Aufbau von Proteinen benötigt werden, kann unser Organismus neun nicht selbst herstellen. Sie werden als essentiell bezeichnet: Isoleucin, Leucin, Lysin, Methionin, Phenyl­alanin, Threonin, Tryptophan, Valin sowie für Säuglinge Histidin. Ohne eine regelmäßige Zufuhr dieser essentiellen Aminosäuren können Mangelerscheinungen auftreten.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Die Komplexität der Proteinfaltung</h5>
            <p className="mb-3">Proteine bestehen meist aus 100 bis 500 Aminosäuren. Funktionsfähig wird ein Protein aber erst, wenn es sich zu einer hoch komplexen dreidimensionalen Gestalt gefaltet hat (s.o.).</p>
            <p className="mb-3">Die meisten Proteine nehmen schnell die richtige Gestalt an. Das liegt an den Eigenschaften der verschiedenen Aminosäuren eines Proteins: Einige von ihnen lagern sich gern an Wassermoleküle an, andere stoßen diese eher ab. Die beiden Grundtypen kommen in den einzelnen Abschnitten der Aminosäurekette unterschiedlich häufig vor. Sie bilden den Antrieb für den Faltungsprozess.</p>
            <p className="mb-3">Bei größeren Proteinen falten sich unterschiedliche Teile erst getrennt voneinander zu Untereinheiten, die sich dann ihrerseits aneinanderlagern. Für diese komplexe Aufgabe hat die Zelle ein eigenes System zur Qualitätskontrolle entwickelt. Der Proteinfaltung liegt ein biochemisches Grundprinzip zugrunde, demzufolge alle Proteine eine Energieminimierung anstreben, also eine für sie energetisch besonders günstige Faltung.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Die Rolle von Proteinen für Muskel- und Gewebeaufbau</h5>
            <p className="mb-3">Körpereigene Proteine sind einem permanenten Auf- und Abbau unterworfen. Muskelproteine beispielsweise werden im Verlauf von vier Monaten einmal komplett erneuert. Für den Aufbau und Erhalt der Muskulatur ist die regelmäßige Zufuhr von Proteinen mit der Nahrung wichtig.</p>
            <p className="mb-3">Wie hat man sich die Strukturähnlichkeit bzw. -differenz von tierischem resp. pflanzlichem Protein genauer vorzustellen?</p>
            <p className="mb-3">Neben der Proteinmenge ist auch die Proteinqualität wichtig. Lebensmittel sollten so kombiniert werden, dass ein hoher Anteil an essentiellen Aminosäuren erreicht wird.</p>
            <p className="mb-3">Pflanzliche und tierische Proteine unterscheiden sich in der Zusammensetzung und in der Bioverfügbarkeit der Aminosäuren. Proteine aus Lebensmitteln tierischen Ursprungs enthalten i.d.R. alle essentiellen Aminosäuren in ausreichender Menge. Pflanzliche Lebensmittel weisen oft nicht alle essentiellen Aminosäuren auf. So ist beispielsweise Getreide arm an Lysin, Threonin und Tryptophan, aber reich an Methionin. Hülsenfrüchte sind arm an Methionin, aber reich an Threonin und Tryptophan. Durch die gezielte Kombination von Getreide mit Hülsenfrüchten kann man für einen Ausgleich sorgen.</p>
            <p className="mb-3">Man sollte immer auch die Gesamtzusammensetzung des ganzen Lebensmittels im Blick haben. So bringen Lebensmittel mit pflanzlichem Protein meist deutlich mehr Ballaststoffe, komplexe Kohlenhydrate und Vitamine, aber gleichzeitig weniger gesättigte Fettsäuren mit als Lebensmittel, die tierisches Protein enthalten.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Die biologische Wertigkeit</h5>
            <p className="mb-3">In der Ernährungswissenschaft gibt es den Begriff der biologischen Wertigkeit, wenn es um den Vergleich der Qualität von Nahrungsproteinen geht. Diese Methode benutzt als Maßstab das Protein des Hühnereis. In diesem kommen alle essentiellen Aminosäuren in einem sehr günstigen Verhältnis vor und sie können fast vollständig in körpereigenes Protein umgesetzt werden. Daher hat das Hühnerei eine biologische Wertigkeit von 100.</p>
            <p className="mb-3">Alle Nahrungsproteine können mit diesem Referenzwert eingeordnet werden. Einige Beispiele:</p>
            <p className="mb-3">Milch und Milchprodukte haben eine hohe biologische Wertigkeit im 90er-Bereich. Milchprotein ist sehr gut für unsere Versorgung geeignet. Fleisch liegt im hohen 80er-Bereich, denn das Muskelprotein ist unserem körpereigenen sehr ähnlich. Dasselbe gilt für Fisch (&gt;80).</p>
            <p className="mb-3">Unter pflanzlichen Nahrungsmitteln hat Reis mit &gt;80 eine hohe biologische Wertigkeit. Auch Sojaprotein (85) gilt als hochwertig und als gute Alternative zu tierischen Proteinquellen. Die Kartoffel folgt mit 70. Hülsenfrüchten mangelt es zwar an der essentiellen Aminosäure Methionin, sie liegen aber noch bei &gt; 50 und liefern große Mengen an wertvollen Ballaststoffen.</p>
          </div>
        </div>
      </AccordionSection>

      {/* Section 4: Mikronährstoffe */}
      <AccordionSection
        number={4}
        title="Mikronährstoffe"
        color="bg-blue-600"
        bgColor="bg-blue-50"
        textColor="text-blue-800"
        isOpen={!!openSections[4]}
        onToggle={() => toggle(4)}
      >
        {/* Fragen */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Fragen für die Gruppenarbeit</h4>
          </div>
          <div className="space-y-3 ml-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="font-semibold text-blue-800 mb-1">Gruppe 1:</p>
              <p className="text-blue-700">Was ist der Hauptunterschied zwischen Makro- und Mikronährstoffen? Welche Gruppen von Mikronährstoffen gibt es? Welchen Einfluss haben Mikronährstoffe auf die Verwertung der Makronährstoffe?</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-800 mb-1">Gruppe 2:</p>
              <p className="text-green-700">Welche Rolle spielen Vitamine für das Immunsystem, welche Mineralstoffe für das Nervensystem?</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="font-semibold text-orange-800 mb-1">Gruppe 3:</p>
              <p className="text-orange-700">Wie lässt sich der Bedarf an Mikronährstoffen decken und was ist von Nahrungsergänzungsmitteln zu halten?</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="font-semibold text-purple-800 mb-1">Gruppe 4:</p>
              <p className="text-purple-700">Was passiert im Körper bei der Aufnahme von Salz und warum kann das gefährlich werden? Wie lässt sich ein hoher Salzkonsum auf 5 Gramm am Tag reduzieren?</p>
            </div>
          </div>
        </div>

        {/* Hintergrund */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-green-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Hintergrund zur Beantwortung</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <p className="mb-3">Mikronährstoffe sind, anders als die Makronährstoffe, keine Energielieferanten des Körpers. Es gibt zwei Gruppen von Mikronährstoffen: <strong>Vitamine</strong> und <strong>Mineralstoffe</strong>.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Vitamine</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>wichtig für die Verwertung der Makronährstoffe: Vitamine ermöglichen die Energiegewinnung des Körpers aus Kohlenhydraten, Fetten und Proteinen.</li>
              <li>unerlässlich hierfür: B-Vitamine. Alle acht B-Vitamine müssen vorhanden sein, damit der Körper Energie aus Makronährstoffen gewinnen kann.</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="font-semibold text-blue-800 mb-1">Vitamine unterstützen das Immunsystem:</p>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>Vitamin A: Stärkung der Schleimhäute gegen Krankheitserreger</li>
                <li>Vitamin C: fördert Bildung von Immunzellen</li>
                <li>Vitamin D: steuert die gesamte Immunreaktion</li>
              </ul>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Mineralstoffe</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>wie die Vitamine beteiligt an Verwertung der Makronährstoffe, Unterstützung des Immunsystems</li>
              <li>außerdem wichtig für unser Nervensystem: Mineralstoffe regulieren das Nervensystem und stabilisieren seine Funktionen.</li>
              <li>Beispiele: Magnesium, Kalzium, Kalium, Zink, Eisen.</li>
              <li>wirken sich auch auf die psychische Gesundheit aus und beeinflussen Aufmerksamkeit und Denkleistung.</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Die Versorgung des Körpers mit „Mikro"-Nährstoffen</h5>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Der Körper benötigt Mikronährstoffe – verglichen mit den Makronährstoffen – in kleineren Mengen.</li>
              <li>Eine ausgewogene Ernährung reicht aus, um den Bedarf an Vitaminen und Mineralstoffen zu decken.</li>
              <li>Eine ausgewogene Ernährung ist aber unerlässlich für eine gute Versorgung, weil die meisten Mikronährstoffe essentiell sind: Der Körper kann sie nicht selbst herstellen.</li>
            </ul>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="text-orange-700">Vermutete Unterversorgungen mit bestimmten Mikronährstoffen sollten nicht eigenständig mit Nahrungsergänzungsmitteln behandelt, sondern ärztlich diagnostiziert werden.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Salz</h5>
            <p className="mb-3">versorgt den Körper mit den Nährstoffen Natrium und Chlorid</p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="font-semibold text-red-800 mb-1">Gefahr einer Überversorgung:</p>
              <p className="text-red-700">Bei zu viel Salzkonsum gelangt zu viel Natrium ins Blut. Natrium bindet Wasser im Blut, dies führt zu Wassereinlagerungen im umliegenden Gewebe. Krankheiten wie Herzinfarkt und Schlaganfall werden so begünstigt.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="font-semibold text-blue-800 mb-1">Salz-Empfehlung der Weltgesundheitsorganisation („WHO": „World Health Organization"):</p>
              <p className="text-blue-700">Höchstens 5 Gramm Salz pro Tag (entspricht einem nicht zu vollen Teelöffel).</p>
            </div>
            <p className="mb-2 font-semibold">Tipps:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>auf Salzgehalt von Lebensmitteln achten: Fertigprodukte enthalten oft viel Salz.</li>
              <li>beim Kochen wenig salzen, nicht voreilig nachsalzen.</li>
            </ul>
          </div>
        </div>

        {/* Weiterführende Informationen */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Lightbulb className="text-indigo-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Weiterführende Informationen für Lehrkräfte</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <h5 className="text-base font-semibold text-gray-800 mt-4 mb-2">Vitamine: Allgemeines</h5>
            <p className="mb-3">Zu den Vitaminen zählt man eine Reihe lebenswichtiger Stoffe. Wir müssen sie in kleinen Mengen regelmäßig über die Nahrung aufnehmen. Die meisten Vitamine sind essentiell. Sie sind an lebenswichtigen Reaktionen beteiligt und spielen in vielen Stoffwechselprozessen eine unverzichtbare Rolle.</p>
            <p className="mb-3">Die Vitamine lassen sich in wasserlösliche und fettlösliche einteilen. Zu den wasserlöslichen Vitaminen gehören die Gruppe der B-Vitamine und das Vitamin C. Zu den fettlöslichen Vitaminen zählen wir die Vitamine A, D, E und K.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Vitamine: Ein Überblick</h5>
            <p className="font-semibold text-gray-800 mb-2">Warum gibt es mehrere ‚Nummern' vom gleichen Vitamin: Was bedeutet das?</p>
            <p className="mb-3">Die Benennung der Vitamine wirkt auf den ersten Blick lückenhaft und unordentlich. Das ist historisch bedingt. Die Lücken in der Namensgebung entstanden unter anderem deshalb, weil viele der ursprünglich als Vitamine entdeckten und listenartig benannten Stoffe sich später als keineswegs einheitliche Substanzen herausstellten. In der Folge wurden einige Bezeichnungen aus der Benennungsliste entfernt, die übrigen aber beibehalten.</p>
            <p className="mb-3">Die Entdeckung der Vitamine begann Anfang des 20. Jahrhunderts. Damals war deren chemische Struktur noch nicht bekannt, so dass man sie zunächst nicht exakt wissenschaftlich bezeichnen konnte. Daher wurde den Vitaminen je ein großer Buchstabe des Alphabets zugeordnet.</p>
            <p className="font-semibold text-gray-800 mb-2">Die heutige Benennung der Vitamine</p>
            <p className="mb-3">Heute richtet sich der chemische Name eines Vitamins nach seiner chemischen Struktur. Bei den Trivialnamen werden immer noch die altbekannten Buchstaben verwendet, teilweise mit einer Nummer ergänzt. Teilweise gab es mehrere Trivialnamen, in der Regel hat sich aber jeweils nur ein Trivialname durchgesetzt.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Wasserlösliche Vitamine anhand von Beispielen</h5>
            <p className="font-semibold text-gray-800 mb-2">Makronährstoff-Verwertung und B-Vitamine</p>
            <p className="mb-3">Die B-Vitamine Panthotensäure, Folsäure, Biotin, Niacin und Cobalamin werden vor allem im Stoffwechsel gebraucht. Sie ermöglichen den Abbau von Kohlenhydraten und Fetten zu Energie oder den Aufbau von neuen Eiweißen aus Aminosäuren. Sie sind aber auch für die normale Funktion und Entwicklung jeder Zelle wichtig. Cobalamin ist außerdem ein gutes Beispiel für die Bedeutung von Spuren-Metallen im Stoffwechsel. Es enthält als wichtiges funktionsnotwendiges Zentralatom ein Kobalt-Atom. Kobalt ist in größeren Mengen ein gefährliches Schwermetall, in Form einzelner Atome jedoch ein Spurenelement und lebenswichtig als Bestandteil dieses Vitamins.</p>

            <p className="font-semibold text-gray-800 mb-2">Funktionen von B-Vitaminen (Beispiele)</p>
            <p className="mb-3">Vitamin B1 (Thiamin) spielt eine zentrale Rolle im Stoffwechsel der Kohlenhydrate. Bei der Umsetzung dieser Gruppe von Makronährstoffen in Energie wird Vitamin B1 benötigt. Da es sich bei den Reaktionen verbraucht, muss es mit der Nahrung nachgeliefert werden.</p>
            <p className="mb-3">Vitamin B2 (Riboflavin) dient als chemische Vorstufe für die sog. Flavin-Koenzyme (FAD, FMN). Diese besitzen eine zentrale Funktion bei der Energiegewinnung aus allen drei Makronährstoffen: Kohlenhydrate, Fette, Proteine.</p>
            <p className="mb-3">Vitamin B12 (Cobalamin) nimmt eine Sonderstellung ein. Es kann nur von Bakterien gebildet werden, von Tieren oder Pflanzen hingegen nicht oder nur in geringer Menge. Im menschlichen Darm bilden Mikroben zwar etwas B12, dies reicht aber nicht für die eigene Versorgung aus. Daher muss es mit der Nahrung aufgenommen werden. Cobalamin benötigen wir für Zellteilung, Blutbildung sowie die Funktion des Nervensystems. Der Hauptlieferant ist Fleisch. Ein Mangel kann durch unzureichende oder einseitige Ernährung entstehen (z.B. bei veganen Ernährungsformen). Menschen, die sich vegetarisch oder vegan ernähren, sollten ihren B12-Wert im Auge behalten. Meist ist dann eine kontrollierte Substitution dieses Vitamins notwendig.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Fettlösliche Vitamine anhand von Beispielen</h5>
            <p className="mb-3">Vitamin A (Retinol) benötigen wir für Zellwachstum und -entwicklung. Auch für die Funktion von Schleimhäuten (Lunge, Darm) wird es gebraucht. Zudem spielt es beim Sehvorgang eine Rolle und bei der Arbeit des Immunsystems. Wir nehmen Vitamin A mit tierischen Lebensmitteln direkt auf oder bilden es aus pflanzlichen Vorstufen (z.B. aus Carotinoiden) selbst.</p>
            <p className="mb-3">Vitamin D (Calciferol) ist unverzichtbar bei Aufbau und Stoffwechsel der Knochen. Einem Mangel an Vitamin D kann man nur zum Teil mit entsprechender Ernährung entgegenwirken (vor allem Seefisch ist reich an Vitamin D), für die Bildung von Vitamin D ist unser Körper vor allem von Sonneneinstrahlung auf unsere Haut angewiesen. Ein dauerhafter Mangel an diesem Vitamin führt zu einem Verlust von Knochenmasse (Osteoporose). Eine kontrollierte Substitution kann auch hier sinnvoll sein.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Mineralstoffe: Allgemeines</h5>
            <p className="mb-3">Unter Mineralstoffen versteht man mehr als 20 chemische Elemente, die im Organismus viele Aufgaben erfüllen. Sie werden zum Beispiel für den Aufbau von Zähnen und Knochen benötigt oder auch für die Funktion von Enzymen. Zudem spielen sie im Wasserhaushalt eine Rolle und im Hormon- sowie im Immunsystem. Sie werden entsprechend unserem Bedarf in Mengenelemente und Spurenelemente eingeteilt.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Mineralstoffe: Ein Überblick</h5>
            <p className="mb-2">Die Funktionen der Mineralstoffe in Kürze:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Natrium/Kalium: Regulation des Wasserhaushalts; Kalium: Funktion von Membranen</li>
              <li>Magnesium: aktiviert Enzyme; unterstützt die Reizübertragung von Muskeln und Nerven</li>
              <li>Calcium: Baustoff für Knochen und Zähne</li>
              <li>Eisen: Blutbildung und Sauerstofftransport (Zentralatom im Hämoglobin)</li>
              <li>Zink: unterstützt Zellbildung, Hormonwirkung und Immunsystem; neutralisiert schädliche Moleküle („Radikale")</li>
              <li>Selen: fördert antioxidative Prozesse/Entgiftung; unterstützt Funktion der Bauchspeicheldrüse</li>
              <li>Jod: Bestandteil der Schilddrüsenhormone</li>
              <li>Fluorid/Fluor: kein ‚echtes' Spurenelement; hilft aber bei der Aushärtung von Knochen, Zahnschmelz und Dentin der Zähne und erhöht die Widerstandsfähigkeit gegen Karies</li>
            </ul>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Warum bringt ein Zuviel an Nährstoffen (etwa durch Einnahme von Nahrungsergänzungsmitteln) nichts? Warum gilt bei Mikronährstoffen nicht: ‚Mehr ist besser'?</h5>
            <p className="mb-3">Normalerweise können wir unseren Bedarf an Mikronährstoffen mit ausgewogener Ernährung mühelos decken. Motto: Je bunter es auf dem Teller ist, desto eher sind wir auf der sicheren Seite. Allerdings gibt es Bedingungen, unter denen es für einige Stoffe knapp werden kann. Dazu zählt die Versorgung mit Vitamin D in der dunklen Jahreszeit oder – bei veganer Ernährungsweise – mit Vitaminen der B-Gruppe. Bei Mangelzuständen können sie unter ärztlicher Kontrolle von außen zugefügt (substituiert) werden.</p>
            <p className="mb-3">Ein Zuviel an einzelnen Nährstoffen kann die Aufnahme anderer Nährstoffe behindern, etwa Zink und Eisen. Fettlösliche Vitamine können sich bei übermäßiger Aufnahme im Körper anreichern, weil wir sie nicht wie die wasserlöslichen über die Niere ausscheiden können. Daher besteht hier eine Gefahr der Überdosierung bzw. Akkumulation, was zu unerwünschten Nebenwirkungen führt.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Was passiert im Körper genau nach Salzkonsum? Warum kann zu viel Salz auf Dauer bestimmte Erkrankungen auslösen?</h5>
            <p className="mb-3">Natrium als Bestandteil von Kochsalz ist das wichtigste Ion im Körper. Ein Ion ist ein elektrisch geladenes Atom. Ionen können sich bilden, wenn Atome miteinander reagieren und beispielsweise zu Salzen werden (z.B. Kochsalz, NaCl: gelöst als Na+ und Cl-). Sind die Salze in Wasser gelöst, liegen die Ionen in der Lösung mit einer wässrigen Hydrathülle vor.</p>
            <p className="mb-3">Natrium ist unverzichtbar für den Wasserhaushalt im Zusammenspiel mit Kalium. Außerdem benötigen wir Natrium für die Knochen und die Funktion von Membranen. Natrium reguliert den osmotischen Druck (Konzentrationsdruck gelöster Teilchen) der Zellen und des Flüssigkeitsraums außerhalb der Zellen. Dadurch beeinflusst es auch maßgeblich die Blutmenge in den Gefäßen und damit den Blutdruck, weil es das Wasser in den Blutgefäßen ‚festhält' und sich der Druck innerhalb dieses begrenzten Raumes daraufhin erhöht.</p>
            <p className="mb-3">Wird zu viel Speisesalz verzehrt, hat das eine Erhöhung des Blutdrucks zur Folge. Das Risiko für Bluthochdruck (Hypertonie) steigt. Bluthochdruck wiederum gehört zu den wichtigsten Risikofaktoren für das Auftreten von Herz-Kreislauf-Krankheiten.</p>
          </div>
        </div>
      </AccordionSection>

      {/* Section 5: Unterwelt */}
      <AccordionSection
        number={5}
        title="‚Unterwelt'"
        color="bg-purple-600"
        bgColor="bg-purple-50"
        textColor="text-purple-800"
        isOpen={!!openSections[5]}
        onToggle={() => toggle(5)}
      >
        {/* Fragen */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Fragen für die Gruppenarbeit</h4>
          </div>
          <div className="space-y-3 ml-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="font-semibold text-blue-800 mb-1">Gruppe 1:</p>
              <p className="text-blue-700">Was verspricht man sich von zuckerfreien Süßstoffen? Aus welchen Gründen sind sie dennoch problematisch? Auf welche Produkte sollte man lieber ganz verzichten?</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-800 mb-1">Gruppe 2:</p>
              <p className="text-green-700">Worum handelt es sich bei Transfetten chemisch gesehen? Wie entstehen sie – in der Natur und in der Lebensmittelindustrie? Worin befinden sich Transfette und wie erkennt man entsprechende Produkte im Supermarkt?</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="font-semibold text-orange-800 mb-1">Gruppe 3:</p>
              <p className="text-orange-700">Warum werden Proteinshakes zum Muskelaufbau nicht wirklich benötigt? Wozu sollte man sportlichen Menschen stattdessen raten?</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="font-semibold text-purple-800 mb-1">Gruppe 4:</p>
              <p className="text-purple-700">Diskutiert: – Ist es möglich, auf die Produkte aus der ‚Unterwelt' der Ernährung ganz zu verzichten? – Sollte ihre Verwendung in der Lebensmittelindustrie von der Politik stärker reguliert werden?</p>
            </div>
          </div>
        </div>

        {/* Hintergrund */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-green-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Hintergrund zur Beantwortung</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <h5 className="text-base font-semibold text-gray-800 mt-4 mb-2">Süßstoffe</h5>
            <p className="mb-3">Menschen versuchen durch den Konsum von Süßstoffen die Gefahren eines zu hohen Zuckerkonsums zu vermeiden.</p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="font-semibold text-red-800 mb-1">Das Risiko:</p>
              <p className="text-red-700">Der Konsum von mit Süßstoffen gesüßten Lebensmitteln kann unser Verlangen nach Süßem deutlich steigern.</p>
            </div>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Der Konsum von Süßstoffen verändert auf Dauer unser Süße-Empfinden.</li>
              <li>Süßstoffe sind häufig deutlich süßer als Zucker.</li>
              <li>Typisches Beispiel: Zuckerfreie, mit Süßstoffen gesüßte Getränke (Energy-Drinks, Coke Zero etc.)</li>
              <li>Der Konsum von Süßstoffen führt vermutlich zu einer Herabsetzung der Schwelle, ab der wir Süße wahrnehmen.</li>
              <li>Die Folge: Bei häufigem Konsum verlangt der Körper nach immer süßeren Lebensmitteln, wir konsumieren letztlich immer mehr Süßes.</li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="font-semibold text-green-800 mb-1">Tipp:</p>
              <p className="text-green-700">Lebensmittel, die von Natur aus süß sind (z.B. Obst) enthalten Zucker in einer Form, die vom Körper gesund verstoffwechselt werden kann. Solche Lebensmittel sind Lebensmitteln mit künstlichen Süßstoffen vorzuziehen.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Transfette</h5>
            <p className="mb-3">Transfette sind Fettsäuren, die durch das Härten pflanzlicher Öle entstehen. Transfettsäuren sind für den menschlichen Körper besonders ungesund.</p>
            <h6 className="text-sm font-semibold text-gray-800 mt-4 mb-2">Wie entstehen Transfettsäuren?</h6>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Transfette entstehen natürlicherweise z.B. im Magen von Wiederkäuern (z.B. Kühen) durch bestimmte Mikroorganismen.</li>
              <li>Problematisch ist die industrielle Härtung, z.B. bei der Herstellung von Margarine aus flüssigen Pflanzenölen.</li>
              <li>Die ursprünglich gesunden ungesättigten Fettsäuren der Pflanzenöle werden nicht ganz durchgehärtet – es bilden sich ungesättigte Fettsäuren mit einer speziellen chemischen Struktur = Transfettsäuren.</li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="font-semibold text-orange-800 mb-1">Typische Lebensmittel mit Transfettsäuren:</p>
              <ul className="list-disc pl-5 space-y-1 text-orange-700">
                <li>Backwaren (z.B. Croissants, Berliner/Krapfen, Kekse)</li>
                <li>Süßigkeiten und Snacks (z.B. Chips)</li>
                <li>Fertigprodukte (z.B. Fertigpizza, Fertigsuppen)</li>
                <li>Fast Food und Frittiertes (z.B. Hamburger, Pommes)</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="font-semibold text-blue-800 mb-1">Wie erkenne ich Transfettsäuren?</p>
              <p className="text-blue-700">Lebensmitteln, auf deren Verpackung „teilweise gehärtete Fette" angegeben sind, enthalten Transfettsäuren.</p>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Protein: Shakes, Riegel etc.</h5>
            <p className="mb-3">Über eine ausgewogene Ernährung kann der Körper ausreichend mit Protein versorgt werden. Eine Ergänzung durch künstliche Protein-Produkte ist nicht notwendig.</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Künstliche Protein-Produkte enthalten oft viele Zusatzstoffe. Bei vielen dieser Stoffe wissen wir nichts über die Effekte auf unseren Körper.</li>
              <li>In natürlichen Lebensmitteln kommt Protein immer gepaart mit anderen Nährstoffen vor, die der Körper ebenfalls benötigt.</li>
              <li>Nahrungsergänzungsmittel sollten nie reguläre Mahlzeiten ersetzen.</li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="font-semibold text-green-800 mb-1">Für Sportler:innen:</p>
              <p className="text-green-700">Proteine spielen beim Muskelaufbau eine wichtige Rolle. Auch für Sportler:innen gilt: Der Körper kann seinen Bedarf, auch für den Muskelaufbau, über das in natürlichen Lebensmitteln vorkommende Protein decken.</p>
            </div>
          </div>
        </div>

        {/* Weiterführende Informationen */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Lightbulb className="text-indigo-600" size={16} />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Weiterführende Informationen für Lehrkräfte</h4>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed ml-4">
            <h5 className="text-base font-semibold text-gray-800 mt-4 mb-2">Süßstoffe</h5>
            <p className="font-semibold text-gray-800 mb-2">Wie kommt es, dass wir uns an Süßes gewöhnen können?</p>
            <p className="mb-3">Zentral ist hier unser körpereigenes Belohnungssystem. Eine Studie des Max-Planck-Instituts für Stoffwechselforschung hat gezeigt, dass unmittelbar nach dem Verzehr von zuckerreichen Lebensmitteln Dopamin (Begriffserklärung s.u.) ausgeschüttet wird, noch bevor die Nahrung den Magen erreicht (vgl. Thanarajah et al.). Je nach individuellem Verlangen wird sogar zu unterschiedlichen Zeitpunkten unterschiedlich viel Dopamin ausgeschüttet. Die Gehirne von Versuchsteilnehmer:innen mit einem starken Verlangen nach zuckerreicher Nahrung schütteten direkt nach dem Verzehr eine große Menge an Dopamin aus.</p>

            <p className="font-semibold text-gray-800 mb-2">Zucker (und Fett) programmieren unsere Synapsen um</p>
            <p className="mb-3">Forschende maßen die Aktivität bestimmter Hirnregionen und stellten fest, dass das Dopamin-ausschüttende System besonders stark bei Teilnehmer:innen aktiviert wurde, die ein sehr fett- und zuckerreiches Gericht aßen. Der erhöhte Zuckerkonsum veränderte die neuronalen Schaltkreise so, dass zuckerreiche Nahrung bei den Proband:innen eine stärkere belohnende Wirkung hatte und sie nach dem Experiment zucker- und fettreiche Lebensmittel positiver bewerteten.</p>

            <p className="font-semibold text-gray-800 mb-2">Dopamin</p>
            <p className="mb-3">Dopamin ist ein Botenstoff (sog. Neurotransmitter), der hauptsächlich im Gehirn vorkommt. Es wird umgangssprachlich auch als Wohlfühl- oder Glücks-Botenstoff bezeichnet.</p>
            <p className="mb-3">Neueren Befunden zufolge spielt Dopamin eine wichtige Rolle im Belohnungs- und Motivationssystem des Gehirns (sog. mesolimbisches System). Dopamin vermittelt vor allem die Zuweisung von Begehren (wanting). Interessant: Das wanting, das beim Belohnungslernen eine zentrale Funktion ausübt, wird in der Psychologie als bedeutsam bei der Entstehung von Suchterkrankungen angesehen.</p>

            <p className="font-semibold text-gray-800 mb-2">Die Wirkung von Süßstoffen</p>
            <p className="mb-3">Zucker-Ersatzstoffe sollen eine Aktivierung des Belohnungssystems ohne die ‚Nebenwirkungen' von Zucker wie Übergewicht, Typ-2-Diabetes etc. ermöglichen. Zu beachten ist aber, dass viele langfristige Effekte von Zucker-Ersatzstoffen auf den Organismus bisher nicht eingeschätzt werden können.</p>
            <p className="mb-3">Was bisher als gesichert gilt: Künstliche Süßstoffe wie Aspartam, Saccharin und Sucralose beeinflussen das Darmmikrobiom (d.h. die im Darm vorkommenden Mikroorganismen) negativ, so zeigt eine Studie (vgl. Suez et al.). Untersuchungen zeigen, dass bereits moderate Mengen der Süßstoffe die Zusammensetzung und Funktion der Darmbakterien verändern können. Dadurch verschlechtert sich die Glukosetoleranz, das Risiko für Erkrankungen wie Typ-2-Diabetes steigt. Außerdem fördern sie das Wachstum unerwünschter Bakterien, können die Darmbarriere schädigen („leaky gut") und Entzündungen begünstigen. Überdies konnte eine weitere Studie zeigen, dass regelmäßiger Konsum künstlicher Süßstoffe wie Aspartam, Sucralose oder Saccharin mit einem beschleunigten kognitiven Abbau und Herz-Kreislauf-Erkrankungen verbunden sein kann (vgl. Gonçalves et al.).</p>
            <p className="mb-3">Weiterhin wird das Verlangen nach Süßem durch den Konsum von Süßstoffen nicht gestillt, sondern – im Gegenteil – verstärkt. Eine aktuelle Studie belegt z.B., dass der Zuckerersatzstoff Sucralose den Hypothalamus aktiviert, eine wichtige Schaltzentrale für Hunger und Sättigung (vgl. Chakravartti et al.). Daraufhin steigert sich das Hungergefühl, und zwar besonders bei Menschen mit Übergewicht (Adipositas). Wenn künstliche Süßstoffe dem Gehirn Zuckersignale senden, aber die vom Körper erwarteten Kalorien ausbleiben, führt genau dies zu einem größeren Hungergefühl.</p>
            <p className="mb-3">Die Weltgesundheitsorganisation (WHO: World Health Organization) gibt in ihren Richtlinien zum Gebrauch von Zucker-Ersatzstoffen einen Rat, den man einfach umsetzen kann: Statt zu diesen Mitteln sollte man bei Lust auf Süßes lieber Obst essen, denn dieses liefert wertvolle Ballaststoffe, Vitamine, Mineralien und Spurenelemente.</p>

            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded">
              <p className="font-semibold text-gray-800 mb-2">Quellen „Süßstoffe":</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                <li>Chakravartti SP, Jann K, Veit R, Liu H, Yunker AG, Angelo B, Monterosso JR, Xiang AH, Kullmann S, Page KA. Non-caloric sweetener effects on brain appetite regulation in individuals across varying body weights. Nat Metab. 2025 Mar;7(3):574-585. doi: 10.1038/s42255-025-01227-8. Epub 2025 Mar 26. PMID: 40140714.</li>
                <li>Gonçalves NG, Martinez-Steele E, Lotufo PA, Bensenor I, Goulart AC, Barreto SM, Giatti L, de Faria CP, Molina MDCB, Caramelli P, Marchioni DM, Suemoto CK. Association Between Consumption of Low- and No-Calorie Artificial Sweeteners and Cognitive Decline: An 8-Year Prospective Study. Neurology. 2025 Oct 7;105(7):e214023. doi: 10.1212/WNL.0000000000214023. Epub 2025 Sep 3. Erratum in: Neurology. 2025 Dec 9;105(11):e214393. doi: 10.1212/WNL.0000000000214393. PMID: 40902134.</li>
                <li>Suez J, Korem T, Zeevi D, Zilberman-Schapira G, Thaiss CA, Maza O, Israeli D, Zmora N, Gilad S, Weinberger A, Kuperman Y, Harmelin A, Kolodkin-Gal I, Shapiro H, Halpern Z, Segal E, Elinav E. Artificial sweeteners induce glucose intolerance by altering the gut microbiota. Nature. 2014 Oct 9;514(7521):181-6. doi: 10.1038/nature13793. Epub 2014 Sep 17. PMID: 25231862.</li>
                <li>Thanarajah SE, Backes H, DiFeliceantonio AG, Albus K, Cremer AL, Hanssen R, Lippert RN, Cornely OA, Small DM, Brüning JC, Tittgemeyer M. Food Intake Recruits Orosensory and Post-ingestive Dopaminergic Circuits to Affect Eating Desire in Humans. Cell Metab. 2019 Mar 5;29(3):695-706.e4. doi: 10.1016/j.cmet.2018.12.006. Epub 2018 Dec 27. PMID: 30595479.</li>
              </ul>
            </div>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Transfette</h5>
            <p className="font-semibold text-gray-800 mb-2">Wie entstehen Transfettsäuren?</p>
            <p className="mb-3">Transfettsäuren entstehen vor allem durch lebensmitteltechnologische Prozesse wie die sog. Fetthärtung. Dies ist ein Verfahren, bei dem fette Öle in feste oder streichfähige Fette umgewandelt werden. Aus ursprünglich gesunden Pflanzenölen werden Produkte gewonnen, die bessere technische Eigenschaften als natürliche (feste) Fette wie Butter oder Schmalz aufweisen und sich gut lagern lassen. Solche industriell gehärteten Fette werden aufgrund ihres z.T. hohen Gehaltes an Transfettsäuren auch als Transfette bezeichnet.</p>

            <p className="font-semibold text-gray-800 mb-2">Was sind Transfettsäuren?</p>
            <p className="mb-3">Ungesättigte Fettsäuren liegen in der Natur hauptsächlich in sogenannter cis-Konfiguration vor. Durch die Härtung kann es zu einer Veränderung der Konfiguration der Doppelbindungen kommen: Es entstehen Transfettsäuren, in denen sich die Wasserstoffatome an den durch Doppelbindungen verknüpften Kohlenstoffatomen auf entgegengesetzten Seiten befinden.</p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded">
              <p className="text-gray-700 mb-1">Ölsäure (C18:1 cis 9)</p>
              <p className="text-gray-700 mb-1">Elaidinsäure (C18:1 trans 9)</p>
              <p className="text-gray-700">Trans-Vaccensäure (C18:1 trans 11)</p>
              <p className="text-gray-500 text-sm mt-2">Chemische Struktur der Ölsäure im Vergleich mit den beiden trans-C18:1-Fettsäuren</p>
            </div>

            <p className="font-semibold text-gray-800 mb-2">Die Wirkung von Transfettsäuren</p>
            <p className="mb-3">Transfettsäuren besitzen keine bekannte positive Funktion im Organismus, aber negative Auswirkungen auf den Stoffwechsel sind eindeutig belegt. Eine hohe Zufuhr von Transfettsäuren birgt das Risiko für eine Fettstoffwechselstörung, die zu einer Erhöhung des Triglycerid-Spiegels führt. Auch wird das Verhältnis zwischen LDL-Cholesterol und HDL-Cholesterol im Blut nachteilig verändert. Die Auswirkungen auf die Gesundheit können erheblich sein und sowohl die Entstehung von Arteriosklerose als auch einer koronaren Herzkrankheit begünstigen sowie das Herzinfarktrisiko erhöhen.</p>

            <h5 className="text-base font-semibold text-gray-800 mt-6 mb-2">Protein-Produkte: Shakes, Riegel etc.</h5>
            <p className="font-semibold text-gray-800 mb-2">Braucht unser Körper Protein-Produkte?</p>
            <p className="mb-3">Die benötigte Proteinzufuhr kann für einen Menschen in der Regel über den Verzehr proteinreicher Lebensmittel mühelos sichergestellt werden.</p>
            <p className="mb-3">Gerade bei jüngeren Menschen, die viel Sport treiben, hat sich die Meinung verbreitet, man müsse den Körper durch eine hohe Proteinaufnahme bei Erhalt und Aufbau der Muskulatur unterstützen. Das ist in einem gewissen Rahmen sinnvoll, kann aber schon durch Anpassungen im persönlichen Speiseplan erreicht werden.</p>

            <p className="font-semibold text-gray-800 mb-2">Kann man zu viel Protein zu sich nehmen?</p>
            <p className="mb-3">In der Wissenschaft wird überdies diskutiert, ob ein Zuviel an Protein schädlich sein könnte. Die Befunde sind bislang nicht eindeutig, aber es gibt Hinweise darauf, dass ein Übermaß an Protein die Niere belastet. Zudem ist eine mögliche Erhöhung des Risikos für Typ 2-Diabetes durch übermäßig hohen Proteinkonsum in der wissenschaftlichen Diskussion. Teure ‚High Protein'-Produkte oder zusätzliche Eiweißshakes sind für gesunde Menschen nicht notwendig. Der vermutete Nutzen wird in der Regel überschätzt, während potenzielle Risiken nicht ausgeschlossen werden können.</p>
          </div>
        </div>
      </AccordionSection>
      </div>
    </div>
  );
}