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
              <p className="text-orange-700">Wie lassen sich die Nachteile von pflanzlichem Protein ausgleichen, um seine Vorteile nutzen zu können? Welche Lebensmittel werden dazu benötigt?</p>
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
              <p className="text-green-700">Worum handelt es sich bei Transfetten chemisch gesehen? Wie entstehen sie, in der Natur und in der Lebensmittelindustrie? Worin befinden sich Transfette und wie erkennt man entsprechende Produkte im Supermarkt?</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="font-semibold text-orange-800 mb-1">Gruppe 3:</p>
              <p className="text-orange-700">Warum werden Proteinshakes zum Muskelaufbau nicht wirklich benötigt? Wozu sollte man sportlichen Menschen stattdessen raten?</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
              <p className="font-semibold text-purple-800 mb-1">Gruppe 4:</p>
              <p className="text-purple-700">Diskutiert: Ist es möglich, auf die Produkte aus der ‚Unterwelt' der Ernährung ganz zu verzichten? Sollte ihre Verwendung in der Lebensmittelindustrie von der Politik stärker reguliert werden?</p>
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
      </AccordionSection>
      </div>
    </div>
  );
}