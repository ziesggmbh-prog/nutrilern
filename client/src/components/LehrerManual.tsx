import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Users, Lightbulb } from "lucide-react";

function DocImage({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-4 flex flex-col items-center">
      <img
        src={src}
        alt={caption}
        className="max-w-full rounded-md border border-gray-200 bg-white"
        style={{ maxHeight: "340px", objectFit: "contain" }}
      />
      <figcaption className="mt-2 text-center text-sm text-gray-500 italic">{caption}</figcaption>
    </figure>
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
    <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 ${bgColor} hover:opacity-90 transition-opacity text-left`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full ${color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
            {number}
          </span>
          <h3 className={`text-lg font-bold ${textColor}`}>{title}</h3>
        </div>
        {isOpen ? <ChevronUp className={textColor} size={20} /> : <ChevronDown className={textColor} size={20} />}
      </button>
      {isOpen && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

interface SubSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function SubSection({ icon, title, children, defaultOpen = false }: SubSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="text-base font-bold text-gray-800">{title}</h4>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>
      {open && (
        <div className="p-5 bg-white text-gray-700 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function LehrerManual() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 1: true });
  const toggle = (n: number) => setOpenSections(prev => ({ ...prev, [n]: !prev[n] }));

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">NutriLern – Manual für Lehrkräfte</h2>
        <p className="text-gray-600">Zentrale Inhalte der Lerneinheit,<br />vertiefende Fragen<br />und weiterführende Informationen</p>
      </div>

      <div className="space-y-4">

        {/* 1. Kohlenhydrate */}
        <AccordionSection number={1} title="Kohlenhydrate" color="bg-green-600" bgColor="bg-green-50" textColor="text-green-800" isOpen={!!openSections[1]} onToggle={() => toggle(1)}>

          <SubSection icon={<div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center"><BookOpen className="text-green-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={true}>
            <p className="mb-3">Über die Nahrung nimmt unser Körper zwei Arten von Nährstoffen auf: Makronährstoffe und Mikronährstoffe.</p>
            <p className="mb-1">Makronährstoffe benötigt der Körper zur Energiegewinnung.</p>
            <p className="mb-1">Sämtliche lebenswichtigen Körperfunktionen verbrauchen Energie.</p>
            <p className="mb-3">Wenn dem Körper nicht genügend Energie durch die Nahrung bereitgestellt wird, kann er nicht gesund funktionieren.</p>
            <p className="mb-3">Es gibt drei Makronährstoffe: Kohlenhydrate, Fette und Proteine.</p>
            <p className="mb-1">Kohlenhydrate sind ein wichtiger Energielieferant (Makronährstoff) für unseren Körper.</p>
            <p className="mb-1">Kohlenhydrate werden vom Körper zu Glucose verstoffwechselt.</p>
            <p className="mb-1">Glucose ist der wichtigste Energielieferant für das Gehirn, auch andere Organe benötigen Glucose.</p>
            <p className="mb-3">Ist der Körper nicht ausreichend mir Glucose versorgt, fühlen wir uns müde und unkonzentriert.</p>
            <p className="mb-3">Kohlenhydrate kommen in Nahrungsmitteln in unterschiedlicher Form vor: Sie können mehr oder weniger komplex aufgebaut sein.</p>
            <p className="mb-1">Die Komplexität der Kohlenhydrate hat einen Einfluss darauf, wie schnell sie vom Körper zu Glucose verstoffwechselt werden können.</p>
            <p className="mb-1">Je komplexer die Kohlenhydrate, desto langsamer werden sie zu Glucose verarbeitet.</p>
            <p className="mb-1">Komplexe Kohlenhydrate bestehen aus langen Ketten aus vielen Einfachzuckern.</p>
            <p className="mb-1">Hier dauert der Gewinn von Glucose lange.</p>
            <p className="mb-1">Weniger komplexe Kohlenhydrate bestehen aus kurzen Bausteinen aus bloß ein oder zwei Einfachzuckern.</p>
            <p className="mb-3">Hier ist die Glucose sehr schnell verfügbar.</p>
            <p className="mb-1">Bei Nahrungsmitteln mit Einfachzuckern gelangt die enthaltene Glucose sehr schnell ins Blut.</p>
            <p className="mb-1">Die Folge: ein schneller Energieschub</p>
            <p className="mb-1">Aber: Die Energie ist schnell wieder verbraucht.</p>
            <p className="mb-3">Der Effekt auf unseren Körper: Ist keine Glucose mehr verfügbar, fühlen wir uns schlapp. Wir bekommen schnell wieder Hunger und haben immer wieder ‚Lust auf Süßes'.</p>
            <p className="mb-1">Komplexe Kohlenhydrate sind für eine gleichmäßige Energieversorgung deutlich vorteilhafter als Einfachzucker.</p>
            <p className="mb-1">Bei Nahrungsmitteln mit komplexen Kohlenhydraten hält die Energieversorgung durch die Glucose länger an.</p>
            <p className="mb-3">Wir fühlen uns länger wach, konzentriert und satt.</p>
            <p className="mb-1">Lebensmittel, die komplexe Kohlenhydrate enthalten:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Gemüse und Obst</li>
              <li>Vollkornprodukte</li>
              <li>Hülsenfrüchte</li>
            </ul>
            <p className="mb-3">Diese Lebensmittel enthalten außerdem wichtige Ballaststoffe.</p>
            <p className="mb-1">Ballaststoffe = Nahrungsbestandteile, die vom Körper nicht verdaut werden können.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>zögern die Verdauung hinaus</li>
              <li>wirken sich positiv auf eine langsame, gleichmäßige Energieversorgung des Körpers mit Glucose aus</li>
            </ul>
            <p className="mb-1">Beispiel Banane:</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>enthält Glucose in schnell und weniger schnell verfügbarer Form (komplexe Kohlenhydrate)</li>
              <li>enthält viele Ballaststoffe</li>
              <li>versorgt den Körper sowohl schnell als auch länger anhaltend mit Energie</li>
            </ul>
            <p className="mb-1">Bananen sind gut geeignet als Snack zur Konzentrationssteigerung (etwa vor einer Prüfung).</p>
            <p>Vergleich mit Schokolade: Schokolade enthält ausschließlich Einfachzucker, keine Kohlenhydrate und keine Ballaststoffe.</p>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-600" size={14} /></div>} title="Vertiefende Fragen">
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 rounded-lg text-blue-800">Wie wird die Energie aus den Makronährstoffen im Körper gespeichert? Warum sind Kohlenhydrate wichtig für unser Gehirn?</li>
              <li className="p-3 bg-green-50 rounded-lg text-green-800">Worin unterscheiden sich komplexe Kohlenhydrate von Einfachzuckern (chemisch gesehen) und welche Folgen hat das für die Verdauung? Wie funktioniert die Verwertung von Kohlenhydraten?</li>
              <li className="p-3 bg-orange-50 rounded-lg text-orange-800">Welche Kohlenhydrate können als ‚gut' gelten und warum? In welchen Lebensmitteln befinden sie sich? Welche Kohlenhydrate müssen als ‚schlecht' gelten und warum? In welchen Lebensmitteln befinden sie sich?</li>
              <li className="p-3 bg-purple-50 rounded-lg text-purple-800">Welche Folgen hat der Konsum von Einfachzuckern für unser Körpergefühl und unsere Leistungsfähigkeit, welche der Konsum von komplexen Kohlenhydraten? Warum ist es möglich, durch Essen einer Banane vor Prüfungen die Effekte beider Arten von Kohlenhydraten optimal auszunutzen?</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center"><Lightbulb className="text-indigo-600" size={14} /></div>} title="Weiterführende Informationen">
            <p className="font-semibold mb-2">Wie entstehen Kohlenhydrate?</p>
            <p className="mb-1">Grundlage für die Bildung von Kohlenhydraten ist die Photosynthese durch grüne Pflanzen.</p>
            <p className="mb-3">Dabei bilden die Pflanzen aus Wasser und Kohlendioxid (CO2) das energiehaltige Molekül Glucose. Als Energiequelle dient dabei das Sonnenlicht.</p>
            <DocImage src="/manual-images/image1.png" caption="Photosynthese: Bildung von Glucose durch grüne Pflanzen" />
            <p className="mb-3">Alle Zellen unseres Körpers können Glucose als Energiequelle nutzen. Manche Zellen, wie etwa die Nervenzellen im Gehirn, sind sogar ausschließlich auf diese Zuckerart als Energiequelle angewiesen.</p>
            <p className="mb-3">Bei der Gewinnung von Energie aus Glucose wird diese wieder in ihre ursprünglichen Bausteine zerlegt: Wasser und Kohlendioxid. Diesen Vorgang bezeichnet man als Atmung. Die bei der Atmung freiwerdende Energie wird von unserem Organismus auf vielfältige Weise genutzt.</p>
            <DocImage src="/manual-images/image2.png" caption="Atmung: Nutzung von Glucose zur Energiegewinnung für unseren Organismus" />
            <p className="mb-3 text-gray-500 italic text-sm">(Aus dem Vergleich der beiden Schaubilder wird deutlich, dass die Atmung die Umkehrung der Photosynthese darstellt.)</p>
            <p className="font-semibold mb-1">Einfachzucker</p>
            <p className="mb-3">Die wichtigsten Einfachzucker, die in unserer Ernährung eine Rolle spielen, sind Traubenzucker (Glucose) und Fruchtzucker (Fructose). Glucose ist die Hauptenergiequelle für das Gehirn und die Muskeln.</p>
            <p className="font-semibold mb-1">Zweifachzucker</p>
            <p className="mb-3">Der bekannteste Zweifachzucker ist die Saccharose, unser ‚Haushaltszucker'. Er ist aus Fructose und Glucose zusammengesetzt.</p>
            <p className="font-semibold mb-1">Mehrfachzucker</p>
            <p className="mb-3">Die Zuckermoleküle können miteinander verbunden werden, dann spricht man von Mehrfachzuckern (Polysaccharide). Tatsächlich liegt in der Natur der meiste Zucker als Mehrfachzucker vor.</p>
            <DocImage src="/manual-images/image3.png" caption="Zuckerarten schematisch" />
            <p className="mb-3">Pflanzen nutzen diese ketten- oder auch netzartig verbundenen Mehrfachzucker als Baustoffe – zum Beispiel in Form der Zellulose für ihre feste Zellwand. Dabei wird die Glucose sehr fest miteinander verbunden, so dass sie kaum wieder aufzuspalten ist. Deshalb können wir dieses Pflanzenmaterial nicht verdauen.</p>
            <p className="mb-3">Eine weitere Verwendung der Mehrfachzucker ist die Bildung von Speicherstoff, der sog. Stärke. Stärke findet man vor allem in Samen und Knollen. Dort dient sie den keimenden Jungpflanzen als Energiequelle.</p>
            <p className="font-semibold mb-1">Aufbau der Stärke</p>
            <p className="mb-3">Im Gegensatz zu den Einfach- und Zweifachzuckern ist Stärke ein sog. komplexes Kohlenhydrat. In der Stärke sind die Einfachzucker zu linearen oder verzweigten Ketten verbunden.</p>
            <p className="mb-3">Stärke besteht zu etwa 20–30 % aus Amylose (lineare Ketten mit einer schraubenartigen Struktur).</p>
            <DocImage src="/manual-images/image4.png" caption="Struktur der Amylose" />
            <p className="mb-3">Die weiteren 70–80 % der Stärke bestehen aus Amylopektin (vielfach verzweigte, netzartige Strukturen), das sehr große Moleküle bildet.</p>
            <DocImage src="/manual-images/image5.png" caption="Ausschnitt aus einem Amylopektin-Molekül" />
            <p className="mb-1">Die wichtigsten stärkehaltigen Nahrungsquellen:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Getreide: Weizen, Roggen, Gerste, Dinkel, Mais, Reis, Hafer</li>
              <li>Kartoffeln</li>
              <li>Hülsenfrüchte: Bohnen, Erbsen, Erdnüssen, Kichererbsen, Linsen, Sojabohnen, Hirse</li>
            </ul>
            <p className="font-semibold mb-1">Wie werden Zucker und Stärke im Körper verstoffwechselt, und wie wird daraus Energie gewonnen?</p>
            <p className="font-semibold mb-1">Abbau von Stärke zu Zweifach- und Einfachzuckern</p>
            <p className="mb-3">Die Verdauung von Stärke in unserer Nahrung beginnt bereits im Mund. Unser Speichel enthält das stärkespaltende Enzym Alpha-Amylase. Die Amylase spaltet die Stärke zu Dextrinen (Bruchstücke der Stärke). Daher ist es wichtig, dass man lange und gründlich kaut.</p>
            <p className="mb-3">Die Dextrine, welche die Alpha-Amylase gebildet hat, werden im Dünndarm durch die Pankreas-Amylase und Saccharidasen weiter gespalten. Die schließlich entstehenden Einfachzucker (Monosaccharide) werden nun durch die Darmzellen aufgenommen und gelangen ins Blut, von wo sie in alle Organe, Gewebe und Zellen des Körpers transportiert werden.</p>
            <p className="font-semibold mb-1">Gewinnung von Energie</p>
            <p className="mb-3">Unsere Zellen nehmen die Zuckermoleküle auf, die über den Blutstrom angeliefert werden. Dies wird durch das Hormon Insulin reguliert. In den Zellen erfolgt der Abbau des Zuckers ebenfalls von zahlreichen Enzymen gesteuert durch den Vorgang der Zellatmung.</p>
            <p className="mb-3">Die gesamte Reaktion besteht aus drei aufeinander folgenden Teilprozessen. Dabei handelt es sich um eine mehrstufige Kaskade von enzymgesteuerten chemischen Reaktionen, bei denen die Glucose zu Kohlendioxid (CO2) und Wasser abgebaut wird. Die Reaktionsschritte nutzt die Zelle dabei zur Bildung von Adenosin-Triphosphat (ATP). Dieses energiereiche Molekül dient als Treibstoff für nahezu alle Prozesse, die in Zellen und Organen ablaufen.</p>
            <DocImage src="/manual-images/image6.png" caption="ATP (Adenosin-Triphosphat), der universelle Energieträger der Zelle" />
            <p className="font-semibold mb-1">Glucose ist der Treibstoff für unser Gehirn</p>
            <p className="mb-3">Unser Gehirn hat nur einen kleinen Anteil am Körpergewicht, dafür aber einen exorbitant hohen Energieverbrauch. Es benötigt rund 20 Prozent der Gesamtenergie, die unser Körper täglich braucht.</p>
            <p className="mb-3">Dies liegt unter anderem daran, dass unser Gehirn rund um die Uhr aktiv ist. Außerdem benötigt die tägliche Arbeit der Nervenzellen besonders viel Energie. Auch der Transport von Molekülen und Botenstoffen ist energetisch sehr aufwändig.</p>
            <p>Nervenzellen können die Glucose aber nicht speichern. Daher ist eine stetige, ausreichende Versorgung unerlässlich, denn unser Gehirn verbrennt etwa 130 Gramm Glucose am Tag.</p>
          </SubSection>
        </AccordionSection>

        {/* 2. Fette */}
        <AccordionSection number={2} title="Fette" color="bg-orange-600" bgColor="bg-orange-50" textColor="text-orange-800" isOpen={!!openSections[2]} onToggle={() => toggle(2)}>

          <SubSection icon={<div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center"><BookOpen className="text-orange-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={true}>
            <p className="mb-1">Fette sind auch ein Energielieferant (Makronährstoff) für unseren Körper.</p>
            <p className="mb-1">Außerdem erfüllen sie weitere wichtige Funktionen:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Wir benötigen Fette, damit bestimmte Vitamine vom Körper aufgenommen werden.</li>
              <li>Fette sind Bestandteil der Zellmembran, d.i. die Hülle, die die Körperzellen umschließt.</li>
            </ul>
            <p className="mb-1">Fette sind der Nährstoff mit der mit Abstand höchsten Energiedichte.</p>
            <p className="mb-3">Ein Gramm Fett liefert mehr als doppelt so viel Energie wie ein Gramm Kohlenhydrate oder Proteine.</p>
            <p className="mb-3">Fette sollten bewusst konsumiert werden.</p>
            <p className="mb-3">Fette setzen sich aus Fettsäuren zusammen, von diesen Fettsäuren gibt es unterschiedliche Arten. Die unterschiedlichen Arten von Fettsäuren haben unterschiedliche Funktionen und Effekte.</p>
            <p className="mb-3">Es gibt gesättigte und ungesättigte Fettsäuren.</p>
            <p className="font-semibold mb-1">Gesättigte Fettsäuren</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>kommen vor allem in tierischen Lebensmitteln vor</li>
              <li>z.B. in Fleisch, Milchprodukten und Eigelb</li>
              <li>pflanzliche Fette, die gesättigte Fettsäuren enthalten:</li>
            </ul>
            <ul className="list-disc pl-10 mb-1 space-y-1">
              <li>Kokosfett und Palmöl</li>
            </ul>
            <p className="mb-3">Gesättigte Fettsäuren kann der Körper selbst herstellen.</p>
            <p className="mb-3">Gesättigte Fettsäuren stehen im Verdacht, die Menge an schädlichem Cholesterin im Blut zu erhöhen – das kann negative Effekte für die Gesundheit haben.</p>
            <p className="mb-3">Gesättigte Fettsäuren sollten nicht unbegrenzt konsumiert werden.</p>
            <p className="mb-3">Ungesättigte Fettsäuren gibt es wiederum in verschiedenen Formen.</p>
            <p className="font-semibold mb-1">Einfach ungesättigte Fettsäuren</p>
            <p className="mb-1">Lebensmittel, die einfach ungesättigte Fettsäuren enthalten:</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>pflanzliche Öle (z.B. Olivenöl und Rapsöl)</li>
              <li>Nüsse und Samen</li>
              <li>Avocados</li>
            </ul>
            <p className="mb-3">Einfach ungesättigte Fettsäuren kann der Körper ebenfalls selbst herstellen.</p>
            <p className="mb-3">Einfach ungestäätigze Fettsäuren gelten auch in größeren Mengen als gesund.</p>
            <p className="font-semibold mb-1">Mehrfach ungesättigte Fettsäuren</p>
            <p className="mb-1">Lebensmittel, die mehrfach ungesättigte Fettsäuren enthalten:</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>bestimmte pflanzliche Öle</li>
              <li>Nüsse und Samen</li>
              <li>fetter Seefisch (z.B. Lachs, Hering, Tunfisch)</li>
              <li>Auch die sog. Omega-3- und Omega-6-Fettsäuren sind mehrfach ungesättigte Fettsäuren.</li>
              <li>für den Körper besonders wertvoll</li>
            </ul>
            <p className="mb-1">Besonderheit: Der Körper kann mehrfach ungesättigte Fettsäuren nicht selbst herstellen.</p>
            <p className="mb-1">Mehrfach ungesättigte Fettsäuren heißen darum auch essentielle Fettsäuren.</p>
            <p className="mb-3">Wir müssen sie über die Nahrung aufnehmen.</p>
            <p className="mb-3">Man sollte möglichst reichlich mehrfach ungesättigte Fettäsuren zu sich nehmen.</p>
            <p className="font-semibold mb-1">Die ‚Fett-Faustregeln':</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fette sollten bei der Ernährung maximal ein Drittel ausmachen.</li>
              <li>Nicht mehr als 10 Prozent sollte aus gesättigten Fettsäuren bestehen.</li>
              <li>Man sollte möglichst viele ungesättigte Fettsäuren zu sich nehmen, vor allem mehrfach ungesättigte Fettsäuren.</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-600" size={14} /></div>} title="Vertiefende Fragen">
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 rounded-lg text-blue-800">Welche Funktionen erfüllen Fette im Körper? Warum ist es bei Fetten besonders wichtig, nicht zu viel zu konsumieren? Was sind die Obergrenzen?</li>
              <li className="p-3 bg-green-50 rounded-lg text-green-800">Wie sind Fette chemisch aufgebaut und welche Rolle spielen die Fettsäuren? Was sind die wichtigsten Unterschiede zwischen den Fettsäuren hinsichtlich ihrer Funktion/Wirkung und Herstellung?</li>
              <li className="p-3 bg-orange-50 rounded-lg text-orange-800">Was ist der Unterschied zwischen gesättigten Fettsäuren und einfach ungesättigten Fettsäuren (chemisch gesehen)? Warum gelten erstere als ‚schlecht' und letztere als relativ ‚gut'? In welchen Lebensmitteln findet man sie jeweils?</li>
              <li className="p-3 bg-purple-50 rounded-lg text-purple-800">Was sind mehrfach ungesättigte Fettsäuren (chemisch gesehen) und in welchen Lebensmitteln befinden sie sich? Inwiefern haben sie eine Sonderstellung unter den Fettsäuren und warum sind sie so gesund?</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center"><Lightbulb className="text-indigo-600" size={14} /></div>} title="Weiterführende Informationen">
            <p className="mb-3">Chemisch sind Fette Verbindungen von Glycerin mit sog. Fettsäuren. Sie werden auch Triglyceride genannt.</p>
            <DocImage src="/manual-images/image7.png" caption="Glycerinanteil / Fettsäureanteil" />
            <p className="mb-3">In einem Fettmolekül sind drei Fettsäuren mit dem Glycerin verbunden: → Triglyceride</p>
            <p className="font-semibold mb-1">Bildung von Fetten im Körper</p>
            <p className="mb-3">Die Herstellung von Fetten kann in mehreren Organen stattfinden: Leber, Niere, Fettgewebe, Darmwand oder Muskulatur. In mehreren Reaktionsschritten verbinden Enzyme das Molekül Glycerin mit Fettsäuren. Zu den wichtigsten Produzenten von Triglyceriden in unserem Körper gehören die Zellen des weißen Fettgewebes, die Adipozyten (Fettzellen). An der Regulierung dieser Vorgänge sind Hormone wie etwa Insulin oder Adrenalin beteiligt.</p>
            <p className="font-semibold mb-1">Abbau der Fette</p>
            <p className="mb-3">Am Abbau der Triglyceride sind spezielle Enzyme beteiligt, die sog. Lipasen aus der Bauchspeicheldrüse. In drei Schritten findet die Abspaltung der Fettsäuren vom Glycerinmolekül statt. Ergebnisse der Reaktion sind Glycerin und Fettsäuren.</p>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 mb-3 rounded">
              <p className="font-semibold text-indigo-800 mb-1">Der biologische Fettabbau (durch das Enzym Lipase)</p>
              <p className="text-indigo-700">Fett + Lipase → Glycerin + 3 Fettsäuremoleküle</p>
            </div>
            <p className="mb-3">Das Glycerin wird für Biosynthesen weiterverwendet. Die Fettsäuren können von den Körperzellen aufgenommen, in den Vorgang der Zellatmung (sog. Fettverbrennung zur Energiegewinnung) eingeschleust oder ebenfalls für Biosynthesen eingesetzt werden. Dazu erfolgt zunächst die Spaltung in kleinere Einheiten mit je zwei Kohlenstoffatomen (C2-Einheiten).</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-3 rounded">
              <p className="mb-1">Fettsäure → Abbau zu C2-Einheiten und Verwendung für</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bau-Stoffwechsel und Biosynthese</li>
                <li>Zellatmung und Energiegewinnung</li>
              </ul>
            </div>
            <p className="font-semibold mb-1">Wichtig für unsere Ernährung: die Fettsäuren</p>
            <p className="mb-1">Das beim Fettabbau entstehende Molekül Glycerin ist immer gleich. Unterschiedlich sind hingegen die Fettsäuren, die bei der Fettverdauung freigesetzt werden. Man unterscheidet sie anhand ihres Aufbaus in</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>gesättigte Fettsäuren und</li>
              <li>ungesättigte Fettsäuren.</li>
            </ul>
            <p className="font-semibold mb-1">Was sind Fettsäuren und wie werden sie unterschieden?</p>
            <p className="mb-3">Fettsäuren sind organische Verbindungen aus den Elementen Kohlenstoff (C), Wasserstoff (H) und Sauerstoff (O), sog. Monocarbonsäuren. Ein Fettsäure-Molekül besteht aus einer langen Kohlenwasserstoffkette, die an einem Ende eine COOH-Gruppe (Carboxylgruppe) trägt und namengebend zur Bezeichnung ‚-säure' beiträgt. Die Zahl der C-Atome ist immer gerade und liegt zwischen 8 und 24. Man unterscheidet gesättigte und ungesättigte Fettsäuren.</p>
            <p className="font-semibold mb-1">Gesättigte Fettsäuren</p>
            <p className="mb-3">Jedes C-Atom in der Kohlenwasserstoffkette ist hier mit der maximal möglichen Anzahl von Wasserstoffatomen verbunden. Alle C-Atome sind durch Einfachbindungen verknüpft. Die Kohlenstoffatome in der Kette besitzen ausschließlich Einfachbindungen.</p>
            <p className="mb-2">Beispiele für gesättigte Fettsäuren:</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-2 rounded">
              <p className="mb-1 font-medium">Palmitinsäure</p>
              <p className="font-mono text-sm mb-2">C16H32O2</p>
              <DocImage src="/manual-images/image8.png" caption="Palmitinsäure" />
              <p className="mb-1 font-medium">Stearinsäure</p>
              <p className="font-mono text-sm mb-2">C18H36O2</p>
              <DocImage src="/manual-images/image9.png" caption="Stearinsäure" />
            </div>
            <p className="mb-3">Gesättigte Fette besitzen nur gesättigte Fettsäuren. Große Mengen an gesättigten Fettsäuren findet man vor allem in Nahrungsmitteln tierischer Herkunft. Nur wenige pflanzliche Nahrungsmittel enthalten größere Anteile an gesättigte Fettsäuren.</p>
            <p className="font-semibold mb-1">Ungesättigte Fettsäuren</p>
            <p className="mb-3">Hier besitzen nicht alle C-Atome in der Kohlenwasserstoffkette die maximale Anzahl an Wasserstoffatomen. Manche C-Atome sind durch eine Doppelbindung verknüpft. Man unterscheidet zwischen einfach und mehrfach ungesättigte Fettsäuren.</p>
            <p className="mb-2">Beispiele für ungesättigte Fettsäuren:</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-3 rounded">
              <p className="mb-1 font-medium">Ölsäure (einfach ungesättigt)</p>
              <p className="font-mono text-sm mb-2">C18H34O2</p>
              <DocImage src="/manual-images/image10.png" caption="Ölsäure (einfach ungesättigt)" />
              <p className="mb-1 font-medium">Linolsäure (zweifach ungesättigt)</p>
              <p className="font-mono text-sm mb-2">C18H32O2</p>
              <DocImage src="/manual-images/image11.png" caption="Linolsäure (zweifach ungesättigt)" />
            </div>
            <p className="mb-3">Ungesättigte Fette besitzen einen hohen Anteil an ungesättigten Fettsäuren. Diese sind überwiegend in pflanzlichen Nahrungsmitteln und in fettem Fisch enthalten.</p>
            <p className="font-semibold mb-1">Was versteht man unter „Omega-Fettsäuren"?</p>
            <p className="font-semibold mb-1">Omega-3-Fettsäuren</p>
            <p className="mb-3">Die Omega-3-Fettsäuren bilden eine Untergruppe der ungesättigten Fettsäuren. Omega-3 bedeutet: Die letzte Doppelbindung in der ungesättigten Kohlenstoffkette befindet sich bei der vom COOH-Ende aus gesehen drittletzten C-C-Bindung. Omega (ω) ist der letzte Buchstabe des griechischen Alphabets und bezeichnet das von der Carboxylgruppe entfernteste C-Atom in der Kette.</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-3 rounded">
              <p className="mb-2">Beispiel:</p>
              <p className="mb-1 font-medium">α-Linolensäure (C18H30O2)</p>
              <DocImage src="/manual-images/image12.png" caption="α-Linolensäure ↑ Omega-3" />
            </div>
            <p className="font-semibold mb-1">Omega-6-Fettsäuren</p>
            <p className="mb-3">Die Omega-6-Fettsäuren weisen – vom Omega-Ende (ω-Ende) her betrachtet – an der sechsten Position die erste Doppelbindung auf.</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-3 rounded">
              <p className="mb-2">Beispiel:</p>
              <p className="mb-1 font-medium">Linolsäure (C18H32O2) ↓ Omega-6</p>
              <DocImage src="/manual-images/image13.png" caption="Linolsäure ↓ Omega-6" />
            </div>
            <p className="font-semibold mb-1">Was sind ‚essentielle' Fettsäuren?</p>
            <p className="mb-3">Essentielle Fettsäuren sind Fettsäuren, die vom Körper nicht selbst hergestellt werden können. Sie müssen über die Nahrung zugeführt werden. Für den Menschen essentiell sind die oben dargestellte Omega-3-Fettsäure α-Linolensäure und die Omega-6-Fettsäure Linolsäure.</p>
            <p className="mb-3">Essentielle Fettsäuren erfüllen lebenswichtige Funktionen: Sie sind u.a. Bausteine unserer Zellmembranen. Zudem spielen sie eine Rolle bei der Steuerung von Entzündungsprozessen, sind wichtig für die Regulierung des Blutdrucks und stärken das Immunsystem. Auch unterstützen sie die Regeneration der Muskulatur und wirken bei der Hormon-Produktion mit.</p>
            <p className="font-semibold mb-1">Fettsäuren und Cholesterin</p>
            <p>Gesättigte Fettsäuren können den Cholesterinspiegel erhöhen. Cholesterin ist eine natürliche Verbindung aus der Gruppe der sog. Steroide und Baustein vieler Hormone. Einen Großteil des benötigten Cholesterins stellt der Körper selbst her. Der Rest wird mit der Nahrung aufgenommen. Ein hoher Cholesterinspiegel im Blut gilt als Risikofaktor für Arterienverkalkung (Arteriosklerose), denn überschüssiges Cholesterin kann sich in den Gefäßen ablagern. Dies stellt eine Gesundheitsgefahr dar und kann langfristig zu Herzinfarkten, Schlaganfällen oder Gefäßverschlüssen führen.</p>
          </SubSection>
        </AccordionSection>

        {/* 3. Proteine */}
        <AccordionSection number={3} title="Proteine" color="bg-red-600" bgColor="bg-red-50" textColor="text-red-800" isOpen={!!openSections[3]} onToggle={() => toggle(3)}>

          <SubSection icon={<div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center"><BookOpen className="text-red-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={true}>
            <p className="mb-1">Proteine sind auch Energielieferanten (Makronährstoffe) für unseren Körper.</p>
            <p className="mb-1">Außerdem erfüllen sie weitere wichtige Funktionen:</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>wichtig beim Aufbau von Muskeln und Gewebe</li>
              <li>übernehmen die Rolle von</li>
            </ul>
            <ul className="list-disc pl-10 mb-1 space-y-1">
              <li>Enzymen</li>
              <li>Hormonen</li>
              <li>Antikörpern</li>
            </ul>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>ermöglichen die Kommunikation zwischen den Körperzellen</li>
              <li>transportieren wichtige Stoffe</li>
            </ul>
            <p className="mb-1">Proteine bestehen aus sog. Aminosäuren.</p>
            <p className="mb-1">Aminosäuren werden vom Körper zu Ketten verbunden und bilden räumliche Strukturen aus.</p>
            <p className="mb-1">Wenn wir Proteine zu uns nehmen, zerlegt unser Stoffwechsel sie in einzelne Aminosäuren.</p>
            <p className="mb-3">Anschließend baut er daraus jene Proteine neu zusammen, die er braucht.</p>
            <p className="mb-1">Es gibt essentielle Aminosäuren</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>können vom Körper nicht selbst hergestellt werden</li>
              <li>Essentielle Aminosäuren müssen über die Nahrung zugeführt werden.</li>
            </ul>
            <p className="mb-3">In unserer Nahrung kommen Proteine aus tierischen und pflanzlichen Quellen vor.</p>
            <p className="font-semibold mb-1">Tierisches Protein</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>ist dem Protein in unserem Körper strukturell ähnlich</li>
              <li>enthält in der Regel alle essentiellen Aminosäuren</li>
              <li>Tierisches Protein kann sehr gut verwertet werden.</li>
            </ul>
            <p className="mb-1">Quellen für tierisches Protein:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Fleisch</li>
              <li>Eier</li>
              <li>Milchprodukte</li>
            </ul>
            <p className="mb-1">Besonderheit von Lebensmitteln mit tierischem Protein:</p>
            <p className="mb-1">Tierisches Protein kommt häufig in Lebensmitteln vor, die auch gesättigte Fettsäuren enthalten.</p>
            <p className="mb-1">Ausnahme: Fettreicher Seefisch</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>reich an tierischem Protein und essentiellen Fettsäuren</li>
              <li>enthält kaum gesättigte Fettsäuren</li>
            </ul>
            <p className="font-semibold mb-1">Pflanzliches Protein</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>ist dem körpereigenen Protein weniger ähnlich</li>
              <li>enthält in der Regel nicht alle essentiellen Aminosäuren</li>
              <li>Tierisches Protein kann weniger gut verwertet werden.</li>
            </ul>
            <p className="mb-3">Aber: Pflanzliches Protein ist nicht weniger wertvoll für unsere gesunde Ernährung als tierisches Protein.</p>
            <p className="mb-1">Unterschiedliche pflanzliche Nahrungsmittel haben unterschiedliche Aminosäuren-Zusammensetzungen.</p>
            <p className="mb-3">Wenn man unterschiedliche pflanzliche Nahrungsmittel richtig kombiniert, erhält der Körper alle essentiellen Aminosäuren in ausreichender Menge.</p>
            <p className="mb-1">Einige wenige pflanzliche Proteinquellen enthalten für sich genommen alle essentiellen Aminosäuren.</p>
            <p className="mb-3">Beispiel: Die Sojabohne, aus der Tofu hergestellt wird.</p>
            <p className="mb-1">Quellen für pflanzliches Protein:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Getreide (z.B. Reis, Dinkel, Hafer)</li>
              <li>Hülsenfrüchte (z.B. Bohnen, Linsen, Erbsen)</li>
              <li>Nüsse (z.B. Mandeln, Haselnüsse, Walnüsse)</li>
            </ul>
            <p className="mb-1">Besonderheit von Lebensmitteln mit pflanzlichem Protein:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Pflanzliches Protein kommt häufig in Lebensmitteln vor, die keine gesättigten Fettsäuren enthalten.</li>
              <li>Pflanzliches Protein kommt häufig in Lebensmitteln vor, die wertvolle Ballaststoffe und Vitamine oder auch ungesättigte Fettsäuren enthalten.</li>
            </ul>
            <p>Tierisches Protein wird oft von ungesunden Stoffen begleitet, pflanzliches Protein meist von gesunden Stoffen.</p>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-600" size={14} /></div>} title="Vertiefende Fragen">
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 rounded-lg text-blue-800">Wie sind Proteine chemisch aufgebaut und was macht sie so kompliziert, aber auch faszinierend? Welche Funktionen erfüllen sie in unserem Körper? Welchen Beitrag leisten sie zum Muskelaufbau?</li>
              <li className="p-3 bg-green-50 rounded-lg text-green-800">Was ist der wesentliche Unterschied zwischen tierischem und pflanzlichem Protein im Hinblick auf den Menschen? Was sind jeweils die Vorteile und Nachteile von pflanzlichem und tierischem Protein?</li>
              <li className="p-3 bg-orange-50 rounded-lg text-orange-800">Wie lassen sich die Nachteile von pflanzlichem Protein ausgleichen, um seine Vorteile nutzen zu können? Welche Lebensmittel werden dafür benötigt?</li>
              <li className="p-3 bg-purple-50 rounded-lg text-purple-800">Diskutiert: Inwieweit führen die Ernährungsempfehlungen zum Thema Protein zu einer veganen Lebensweise?</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center"><Lightbulb className="text-indigo-600" size={14} /></div>} title="Weiterführende Informationen">
            <p className="mb-3">Proteine (abgeleitet vom griechischen Wort prōteios für „grundlegend" und „vorrangig") werden auch als Eiweiße bezeichnet. Die Bezeichnung Eiweiß ist historisch bedingt und geht auf die ursprüngliche Isolierung dieser Stoffe aus dem Hühnereiweiß (Hühnerei) zurück. Heute wird allgemein die Bezeichnung Protein dem älteren Begriff Eiweiß vorgezogen.</p>
            <p className="mb-1">Proteine erfüllen im Organismus zahlreiche lebenswichtige Aufgaben, etwa</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>als Bausteine für Muskeln (z.B. Aktin und Myosin)</li>
              <li>als Gerüste und Stabilisatoren (Kollagen, Keratin)</li>
              <li>als Transporter und Kanäle in und zwischen Zellen (Hämoglobin, Natriumkanäle)</li>
              <li>als Regulatoren (z.B. Hormone: Insulin)</li>
              <li>als Beschleuniger chemischer Reaktionen (Enzyme)</li>
              <li>als Abwehrstoffe im Immunsystem (Antikörper)</li>
              <li>bei der Blutgerinnung (Fibrin)</li>
            </ul>
            <p className="mb-3">So vielfältig wie ihre Aufgaben sind auch die Strukturen und Formen der Proteine. Enthält ein Bakterium geschätzte 3.000 unterschiedliche Proteine, so sind es beim Menschen über 100.000.</p>
            <p className="font-semibold mb-1">Woraus bestehen und wie entstehen Proteine?</p>
            <p className="mb-3">Proteine bildet der Stoffwechsel aus 20 verschiedenen Aminosäuren (AS). Zur Bildung von Proteinen werden die AS zu ursprünglich linear aufgebauten Molekülen verbunden. Besteht eine Kette aus mehr als 100 AS, spricht man von einem Protein. Aufgrund von Wechselwirkungen innerhalb des großen Moleküls bilden sich spezifische, an die jeweiligen Funktionen angepasste räumliche Strukturen aus. Man nennt das Proteinfaltung.</p>
            <DocImage src="/manual-images/image14.png" caption="Schema der Proteinfaltung" />
            <p className="mb-3">Falsch geformte Proteine können ihre biologischen Aufgaben nicht mehr erfüllen und klumpen oft zu unlöslichen Aggregaten zusammen, die sich in der Zelle oder ihrer unmittelbaren Umgebung ansammeln. Derartige Abfallprodukte schädigen die Zellen. Nach neuen Erkenntnissen spielt das vermutlich so verursachte Absterben von Nervenzellen eine entscheidende Rolle bei vielen altersbedingten Krankheiten des Nervensystems, etwa bei der Alzheimerdemenz. Falsch geformte Proteine stellen außerdem eine energetisch teure ‚Fehlinvestition' des Stoffwechsels dar.</p>
            <p className="font-semibold mb-1">Die Rolle der Aminosäuren</p>
            <p className="mb-3">Der Körper benötigt zur Proteinbildung 20 verschiedene Aminosäuren. Die Baupläne für die Proteine sind im Erbgut einer jeden Zelle gespeichert.</p>
            <p className="mb-1">Chemische Grundstruktur einer Aminosäure:</p>
            <DocImage src="/manual-images/image15.png" caption="Struktur einer Aminosäure" />
            <p className="mb-1">Jede Aminosäure hat:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>eine Aminogruppe (NH2)</li>
              <li>eine Carboxylgruppe (COOH)</li>
              <li>eine variable Seitenkette/Restgruppe (R)</li>
              <li>ein Wasserstoffatom (H)</li>
            </ul>
            <p className="mb-3">Die Aminosäuren werden bei der Herstellung von Proteinen miteinander zu Ketten verknüpft.</p>
            <DocImage src="/manual-images/image16.png" caption="Aufbau einer Proteinkette" />
            <p className="mb-3">Um ihre spätere Gestalt anzunehmen, durchlaufen Proteine den o.g. Prozess der Proteinfaltung. Dabei entsteht zunächst die Sekundärstruktur. Anschließend nimmt das Molekül seine Tertiärstruktur an, die räumliche Anordnung der gefalteten Kette. Sie bestimmt die vollständige dreidimensionale Gestalt. Viele funktionelle Proteine (z.B. Enzyme) müssen sich noch zu einem großen Komplex aus mehreren Untereinheiten zusammenlagern. Dieser heißt Quartärstruktur.</p>
            <DocImage src="/manual-images/image17.png" caption="Proteine: verschiedene Ebenen der Organisation" />
            <p className="font-semibold mb-1">Proteinbedarf und essentielle (unentbehrliche) Aminosäuren</p>
            <p className="mb-3">Die benötigte Proteinzufuhr kann über den Verzehr proteinreicher Lebensmittel erreicht werden.</p>
            <p className="mb-3">Von den 20 verschiedenen Aminosäuren, die zum Aufbau von Proteinen benötigt werden, kann unser Organismus neun nicht selbst herstellen. Sie werden als essentiell bezeichnet: Isoleucin, Leucin, Lysin, Methionin, Phenyl­alanin, Threonin, Tryptophan, Valin sowie für Säuglinge Histidin. Ohne eine regelmäßige Zufuhr dieser essentiellen Aminosäuren können Mangelerscheinungen auftreten.</p>
            <p className="font-semibold mb-1">Die Komplexität der Proteinfaltung</p>
            <p className="mb-3">Proteine bestehen meist aus 100 bis 500 Aminosäuren. Funktionsfähig wird ein Protein aber erst, wenn es sich zu einer hoch komplexen dreidimensionalen Gestalt gefaltet hat (s.o.).</p>
            <p className="mb-3">Die meisten Proteine nehmen schnell die richtige Gestalt an. Das liegt an den Eigenschaften der verschiedenen Aminosäuren eines Proteins: Einige von ihnen lagern sich gern an Wassermoleküle an, andere stoßen diese eher ab. Die beiden Grundtypen kommen in den einzelnen Abschnitten der Aminosäurekette unterschiedlich häufig vor. Sie bilden den Antrieb für den Faltungsprozess.</p>
            <p className="mb-3">Bei größeren Proteinen falten sich unterschiedliche Teile erst getrennt voneinander zu Untereinheiten, die sich dann ihrerseits aneinanderlagern. Für diese komplexe Aufgabe hat die Zelle ein eigenes System zur Qualitätskontrolle entwickelt. Der Proteinfaltung liegt ein biochemisches Grundprinzip zugrunde, demzufolge alle Proteine eine Energieminimierung anstreben, also eine für sie energetisch besonders günstige Faltung.</p>
            <p className="font-semibold mb-1">Die Rolle von Proteinen für Muskel- und Gewebeaufbau</p>
            <p className="mb-3">Körpereigene Proteine sind einem permanenten Auf- und Abbau unterworfen. Muskelproteine beispielsweise werden im Verlauf von vier Monaten einmal komplett erneuert. Für den Aufbau und Erhalt der Muskulatur ist die regelmäßige Zufuhr von Proteinen mit der Nahrung wichtig.</p>
            <p className="mb-3">Wie hat man sich die Strukturähnlichkeit bzw. -differenz von tierischem resp. pflanzlichem Protein genauer vorzustellen?</p>
            <p className="mb-3">Neben der Proteinmenge ist auch die Proteinqualität wichtig. Lebensmittel sollten so kombiniert werden, dass ein hoher Anteil an essentiellen Aminosäuren erreicht wird.</p>
            <p className="mb-3">Pflanzliche und tierische Proteine unterscheiden sich in der Zusammensetzung und in der Bioverfügbarkeit der Aminosäuren. Proteine aus Lebensmitteln tierischen Ursprungs enthalten i.d.R. alle essentiellen Aminosäuren in ausreichender Menge. Pflanzliche Lebensmittel weisen oft nicht alle essentiellen Aminosäuren auf. So ist beispielsweise Getreide arm an Lysin, Threonin und Tryptophan, aber reich an Methionin. Hülsenfrüchte sind arm an Methionin, aber reich an Threonin und Tryptophan. Durch die gezielte Kombination von Getreide mit Hülsenfrüchten kann man für einen Ausgleich sorgen.</p>
            <p className="mb-3">Man sollte immer auch die Gesamtzusammensetzung des ganzen Lebensmittels im Blick haben. So bringen Lebensmittel mit pflanzlichem Protein meist deutlich mehr Ballaststoffe, komplexe Kohlenhydrate und Vitamine, aber gleichzeitig weniger gesättigte Fettsäuren mit als Lebensmittel, die tierisches Protein enthalten.</p>
            <p className="font-semibold mb-1">Die biologische Wertigkeit</p>
            <p className="mb-3">In der Ernährungswissenschaft gibt es den Begriff der biologischen Wertigkeit, wenn es um den Vergleich der Qualität von Nahrungsproteinen geht. Diese Methode benutzt als Maßstab das Protein des Hühnereis. In diesem kommen alle essentiellen Aminosäuren in einem sehr günstigen Verhältnis vor und sie können fast vollständig in körpereigenes Protein umgesetzt werden. Daher hat das Hühnerei eine biologische Wertigkeit von 100.</p>
            <p className="mb-1">Alle Nahrungsproteine können mit diesem Referenzwert eingeordnet werden. Einige Beispiele:</p>
            <p className="mb-1">Milch und Milchprodukte haben eine hohe biologische Wertigkeit im 90er-Bereich. Milchprotein ist sehr gut für unsere Versorgung geeignet. Fleisch liegt im hohen 80er-Bereich, denn das Muskelprotein ist unserem körpereigenen sehr ähnlich. Dasselbe gilt für Fisch (&gt;80).</p>
            <p>Unter pflanzlichen Nahrungsmitteln hat Reis mit &gt;80 eine hohe biologische Wertigkeit. Auch Sojaprotein (85) gilt als hochwertig und als gute Alternative zu tierischen Proteinquellen. Die Kartoffel folgt mit 70. Hülsenfrüchten mangelt es zwar an der essentiellen Aminosäure Methionin, sie liegen aber noch bei &gt; 50 und liefern große Mengen an wertvollen Ballaststoffen.</p>
          </SubSection>
        </AccordionSection>

        {/* 4. Mikronährstoffe */}
        <AccordionSection number={4} title="Mikronährstoffe" color="bg-blue-600" bgColor="bg-blue-50" textColor="text-blue-800" isOpen={!!openSections[4]} onToggle={() => toggle(4)}>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><BookOpen className="text-blue-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={true}>
            <p className="mb-3">Mikronährstoffe sind, anders als die Makronährstoffe, keine Energielieferanten des Körpers.</p>
            <p className="mb-3">Es gibt zwei Gruppen von Mikronährstoffen: Vitamine und Mineralstoffe.</p>
            <p className="font-semibold mb-1">Vitamine:</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>wichtig für die Verwertung der Makronährstoffe</li>
              <li>Vitamine ermöglichen die Energiegewinnung des Körpers aus Kohlenhydraten, Fetten und Proteinen.</li>
              <li>unerlässlich hierfür: die B-Vitamine. Alle acht B-Vitamine spielen eine Rolle bei der Energiegewinnung des Körpers aus Makronährstoffen.</li>
              <li>unterstützen das Immunsystem</li>
              <li>Unterschiedliche Vitamine haben hierbei unterschiedliche Funktionen. Beispiele:</li>
            </ul>
            <ul className="list-disc pl-10 mb-3 space-y-1">
              <li>Vitamin A: Stärkung der Schleimhäute gegen Krankheitserreger</li>
              <li>Vitamin C: fördert die Bildung von Immunzellen</li>
              <li>Vitamin D: steuert die gesamte Immunreaktion</li>
            </ul>
            <p className="font-semibold mb-1">Mineralstoffe:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>wie die Vitamine beteiligt an</li>
            </ul>
            <ul className="list-disc pl-10 mb-1 space-y-1">
              <li>Verwertung der Makronährstoffe</li>
              <li>Unterstützung des Immunsystems</li>
            </ul>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>außerdem wichtig für unser Nervensystem: Mineralstoffe regulieren das Nervensystem und stabilisieren seine Funktionen.</li>
              <li>Beispiele: Magnesium, Kalzium, Kalium, Zink, Eisen</li>
              <li>wirken sich auch auf die psychische Gesundheit aus</li>
              <li>beeinflussen Aufmerksamkeit und Denkleistung</li>
            </ul>
            <p className="font-semibold mb-1">Die Versorgung des Körpers mit Mikronährstoffen:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Der Körper benötigt Mikronährstoffe – verglichen mit den Makronährstoffen – in kleineren Mengen.</li>
              <li>Eine ausgewogene Ernährung reicht aus, um den Bedarf an Vitaminen und Mineralstoffen zu decken.</li>
              <li>Eine ausgewogene Ernährung ist aber unerlässlich für eine gute Versorgung, weil die meisten Mikronährstoffe essentiell sind: Der Körper kann sie nicht selbst herstellen.</li>
              <li>Vermutete Unterversorgungen mit bestimmten Mikronährstoffen sollten nicht eigenständig mit Nahrungsergänzungsmitteln behandelt, sondern ärztlich diagnostiziert werden.</li>
            </ul>
            <p className="font-semibold mb-1">Salz:</p>
            <ul className="list-disc pl-5 mb-1 space-y-1">
              <li>versorgt den Körper mit den Nährstoffen Natrium und Chlorid</li>
              <li>Gefahr einer Überversorgung:</li>
            </ul>
            <p className="mb-3 pl-5">Bei zu viel Salzkonsum gelangt zu viel Natrium ins Blut. Natrium bindet Wasser im Blut, dies führt zu Wassereinlagerungen im umliegenden Gewebe. Krankheiten wie Herzinfarkt und Schlaganfall werden so begünstigt.</p>
            <p className="mb-1">Salz-Empfehlung der Weltgesundheitsorganisation (WHO: World Health Organization):</p>
            <p className="mb-1 pl-5">Höchstens 5 Gramm Salz pro Tag</p>
            <p className="mb-3 pl-5">Dies ist eine sehr kleine Menge (entspricht einem nicht zu vollen Teelöffel).</p>
            <p className="mb-1">Tipps:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>auf Salzgehalt von Lebensmitteln achten: Fertigprodukte enthalten oft viel Salz</li>
              <li>beim Kochen wenig salzen, nicht voreilig nachsalzen</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-600" size={14} /></div>} title="Vertiefende Fragen">
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 rounded-lg text-blue-800">Was ist der Hauptunterschied zwischen Makro- und Mikronährstoffen? Welche Gruppen von Mikronährstoffen gibt es? Welchen Einfluss haben Mikronährstoffe auf die Verwertung der Makronährstoffe?</li>
              <li className="p-3 bg-green-50 rounded-lg text-green-800">Welche Rolle spielen Vitamine für das Immunsystem, welche Mineralstoffe für das Nervensystem?</li>
              <li className="p-3 bg-orange-50 rounded-lg text-orange-800">Wie lässt sich der Bedarf an Mikronährstoffen decken und was ist von Nahrungsergänzungsmitteln zu halten?</li>
              <li className="p-3 bg-purple-50 rounded-lg text-purple-800">Was passiert im Körper bei der Aufnahme von Salz und warum kann das gefährlich werden? Wie lässt sich ein hoher Salzkonsum auf 5 Gramm am Tag reduzieren?</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center"><Lightbulb className="text-indigo-600" size={14} /></div>} title="Weiterführende Informationen">
            <p className="font-semibold mb-1">Vitamine: Allgemeines</p>
            <p className="mb-3">Zu den Vitaminen zählt man eine Reihe lebenswichtiger Stoffe. Wir müssen sie in kleinen Mengen regelmäßig über die Nahrung aufnehmen. Die meisten Vitamine sind essentiell. Sie sind an lebenswichtigen Reaktionen beteiligt und spielen in vielen Stoffwechselprozessen eine unverzichtbare Rolle.</p>
            <p className="mb-3">Die Vitamine lassen sich in wasserlösliche und fettlösliche einteilen. Zu den wasserlöslichen Vitaminen gehören die Gruppe der B-Vitamine und das Vitamin C. Zu den fettlöslichen Vitaminen zählen wir die Vitamine A, D, E und K.</p>
            <DocImage src="/manual-images/image18.jpeg" caption="Vitamine: Ein Überblick" />
            <p className="font-semibold mb-1">Warum gibt es mehrere ‚Nummern' vom gleichen Vitamin: Was bedeutet das?</p>
            <p className="mb-3">Die Benennung der Vitamine wirkt auf den ersten Blick lückenhaft und unordentlich. Das ist historisch bedingt. Die Lücken in der Namensgebung entstanden unter anderem deshalb, weil viele der ursprünglich als Vitamine entdeckten und listenartig benannten Stoffe sich später als keineswegs einheitliche Substanzen herausstellten. In der Folge wurden einige Bezeichnungen aus der Benennungsliste entfernt, die übrigen aber beibehalten.</p>
            <p className="mb-3">Die Entdeckung der Vitamine begann Anfang des 20. Jahrhunderts. Damals war deren chemische Struktur noch nicht bekannt, so dass man sie zunächst nicht exakt wissenschaftlich bezeichnen konnte. Daher wurde den Vitaminen je ein großer Buchstabe des Alphabets zugeordnet.</p>
            <p className="font-semibold mb-1">Die heutige Benennung der Vitamine</p>
            <p className="mb-3">Heute richtet sich der chemische Name eines Vitamins nach seiner chemischen Struktur. Bei den Trivialnamen werden immer noch die altbekannten Buchstaben verwendet, teilweise mit einer Nummer ergänzt. Teilweise gab es mehrere Trivialnamen, in der Regel hat sich aber jeweils nur ein Trivialname durchgesetzt.</p>
            <p className="font-semibold mb-1">Wasserlösliche Vitamine anhand von Beispielen</p>
            <p className="font-semibold mb-1">Makronährstoff-Verwertung und B-Vitamine</p>
            <p className="mb-3">Die B-Vitamine Panthotensäure, Folsäure, Biotin, Niacin und Cobalamin werden vor allem im Stoffwechsel gebraucht. Sie ermöglichen den Abbau von Kohlenhydraten und Fetten zu Energie oder den Aufbau von neuen Eiweißen aus Aminosäuren. Sie sind aber auch für die normale Funktion und Entwicklung jeder Zelle wichtig. Cobalamin ist außerdem ein gutes Beispiel für die Bedeutung von Spuren-Metallen im Stoffwechsel. Es enthält als wichtiges funktionsnotwendiges Zentralatom ein Kobalt-Atom. Kobalt ist in größeren Mengen ein gefährliches Schwermetall, in Form einzelner Atome jedoch ein Spurenelement und lebenswichtig als Bestandteil dieses Vitamins:</p>
            <DocImage src="/manual-images/image19.jpeg" caption="Cobalamin (Vitamin B12)" />
            <p className="font-semibold mb-1">Funktionen von B-Vitaminen (Beispiele)</p>
            <p className="mb-3">Vitamin B1 (Thiamin) spielt eine zentrale Rolle im Stoffwechsel der Kohlenhydrate. Bei der Umsetzung dieser Gruppe von Makronährstoffen in Energie wird Vitamin B1 benötigt. Da es sich bei den Reaktionen verbraucht, muss es mit der Nahrung nachgeliefert werden.</p>
            <p className="mb-3">Vitamin B2 (Riboflavin) dient als chemische Vorstufe für die sog. Flavin-Koenzyme (FAD, FMN). Diese besitzen eine zentrale Funktion bei der Energiegewinnung aus allen drei Makronährstoffen: Kohlenhydrate, Fette, Proteine.</p>
            <p className="mb-3">Vitamin B12 (Cobalamin) nimmt eine Sonderstellung ein. Es kann nur von Bakterien gebildet werden, von Tieren oder Pflanzen hingegen nicht oder nur in geringer Menge. Im menschlichen Darm bilden Mikroben zwar etwas B12, dies reicht aber nicht für die eigene Versorgung aus. Daher muss es mit der Nahrung aufgenommen werden. Cobalamin benötigen wir für Zellteilung, Blutbildung sowie die Funktion des Nervensystems. Der Hauptlieferant ist Fleisch. Ein Mangel kann durch unzureichende oder einseitige Ernährung entstehen (z.B. bei veganen Ernährungsformen). Menschen, die sich vegetarisch oder vegan ernähren, sollten ihren B12-Wert im Auge behalten. Meist ist dann eine kontrollierte Substitution dieses Vitamins notwendig.</p>
            <p className="font-semibold mb-1">Fettlösliche Vitamine anhand von Beispielen</p>
            <p className="mb-3">Vitamin A (Retinol) benötigen wir für Zellwachstum und -entwicklung. Auch für die Funktion von Schleimhäuten (Lunge, Darm) wird es gebraucht. Zudem spielt es beim Sehvorgang eine Rolle und bei der Arbeit des Immunsystems. Wir nehmen Vitamin A mit tierischen Lebensmitteln direkt auf oder bilden es aus pflanzlichen Vorstufen (z.B. aus Carotinoiden) selbst.</p>
            <p className="mb-3">Vitamin D (Calciferol) ist unverzichtbar bei Aufbau und Stoffwechsel der Knochen. Einem Mangel an Vitamin D kann man nur zum Teil mit entsprechender Ernährung entgegenwirken (vor allem Seefisch ist reich an Vitamin D), für die Bildung von Vitamin D ist unser Körper vor allem von Sonneneinstrahlung auf unsere Haut angewiesen. Ein dauerhafter Mangel an diesem Vitamin führt zu einem Verlust von Knochenmasse (Osteoporose). Eine kontrollierte Substitution kann auch hier sinnvoll sein.</p>
            <p className="font-semibold mb-1">Mineralstoffe: Allgemeines</p>
            <p className="mb-3">Unter Mineralstoffen versteht man mehr als 20 chemische Elemente, die im Organismus viele Aufgaben erfüllen. Sie werden zum Beispiel für den Aufbau von Zähnen und Knochen benötigt oder auch für die Funktion von Enzymen. Zudem spielen sie im Wasserhaushalt eine Rolle und im Hormon- sowie im Immunsystem. Sie werden entsprechend unserem Bedarf in Mengenelemente und Spurenelemente eingeteilt.</p>
            <DocImage src="/manual-images/image20.jpeg" caption="Mineralstoffe: Ein Überblick" />
            <p className="font-semibold mb-1">Die Funktionen der Mineralstoffe in Kürze:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Natrium/Kalium: Regulation des Wasserhaushalts; Kalium: Funktion von Membranen</li>
              <li>Magnesium: aktiviert Enzyme; unterstützt die Reizübertragung von Muskeln und Nerven</li>
              <li>Calcium: Baustoff für Knochen und Zähne</li>
              <li>Eisen: Blutbildung und Sauerstofftransport (Zentralatom im Hämoglobin)</li>
              <li>Zink: unterstützt Zellbildung, Hormonwirkung und Immunsystem; neutralisiert schädliche Moleküle („Radikale")</li>
              <li>Selen: fördert antioxidative Prozesse/Entgiftung; unterstützt Funktion der Bauchspeicheldrüse</li>
              <li>Jod: Bestandteil der Schilddrüsenhormone</li>
              <li>Fluorid/Fluor: kein ‚echtes' Spurenelement; hilft aber bei der Aushärtung von Knochen, Zahnschmelz und Dentin der Zähne und erhöht die Widerstandsfähigkeit gegen Karies</li>
            </ul>
            <p className="font-semibold mb-1">Warum bringt ein Zuviel an Nährstoffen (etwa durch Einnahme von Nahrungsergänzungsmitteln) nichts? Warum gilt bei Mikronährstoffen nicht: ‚Mehr ist besser'?</p>
            <p className="mb-3">Normalerweise können wir unseren Bedarf an Mikronährstoffen mit ausgewogener Ernährung mühelos decken. Motto: Je bunter es auf dem Teller ist, desto eher sind wir auf der sicheren Seite. Allerdings gibt es Bedingungen, unter denen es für einige Stoffe knapp werden kann. Dazu zählt die Versorgung mit Vitamin D in der dunklen Jahreszeit oder – bei veganer Ernährungsweise – mit Vitaminen der B-Gruppe. Bei Mangelzuständen können sie unter ärztlicher Kontrolle von außen zugefügt (substituiert) werden.</p>
            <p className="mb-3">Ein Zuviel an einzelnen Nährstoffen kann die Aufnahme anderer Nährstoffe behindern, etwa Zink und Eisen. Fettlösliche Vitamine können sich bei übermäßiger Aufnahme im Körper anreichern, weil wir sie nicht wie die wasserlöslichen über die Niere ausscheiden können. Daher besteht hier eine Gefahr der Überdosierung bzw. Akkumulation, was zu unerwünschten Nebenwirkungen führt.</p>
            <p className="font-semibold mb-1">Was passiert im Körper genau nach Salzkonsum? Warum kann zu viel Salz auf Dauer bestimmte Erkrankungen auslösen?</p>
            <p className="mb-3">Natrium als Bestandteil von Kochsalz ist das wichtigste Ion im Körper. Ein Ion ist ein elektrisch geladenes Atom. Ionen können sich bilden, wenn Atome miteinander reagieren und beispielsweise zu Salzen werden (z.B. Kochsalz, NaCl: gelöst als Na+ und Cl-). Sind die Salze in Wasser gelöst, liegen die Ionen in der Lösung mit einer wässrigen Hydrathülle vor.</p>
            <p className="mb-3">Natrium ist unverzichtbar für den Wasserhaushalt im Zusammenspiel mit Kalium. Außerdem benötigen wir Natrium für die Knochen und die Funktion von Membranen. Natrium reguliert den osmotischen Druck (Konzentrationsdruck gelöster Teilchen) der Zellen und des Flüssigkeitsraums außerhalb der Zellen. Dadurch beeinflusst es auch maßgeblich die Blutmenge in den Gefäßen und damit den Blutdruck, weil es das Wasser in den Blutgefäßen ‚festhält' und sich der Druck innerhalb dieses begrenzten Raumes daraufhin erhöht.</p>
            <p>Wird zu viel Speisesalz verzehrt, hat das eine Erhöhung des Blutdrucks zur Folge. Das Risiko für Bluthochdruck (Hypertonie) steigt. Bluthochdruck wiederum gehört zu den wichtigsten Risikofaktoren für das Auftreten von Herz-Kreislauf-Krankheiten.</p>
          </SubSection>
        </AccordionSection>

        {/* 5. Unterwelt */}
        <AccordionSection number={5} title="‚Unterwelt'" color="bg-purple-600" bgColor="bg-purple-50" textColor="text-purple-800" isOpen={!!openSections[5]} onToggle={() => toggle(5)}>

          <SubSection icon={<div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center"><BookOpen className="text-purple-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={true}>
            <p className="font-semibold mb-1">Süßstoffe</p>
            <p className="font-semibold mb-1">Warum Süßstoffe?</p>
            <p className="mb-1">Die Idee: Durch den Konsum von Süßstoffen sollen die Gefahren eines zu hohen Zuckerkonsums vermieden werden.</p>
            <p className="mb-3">Das Risiko: Der Konsum von mit Süßstoffen gesüßten Lebensmitteln kann unser Verlangen nach Süßem deutlich steigern.</p>
            <p className="mb-3">Der Konsum von Süßstoffen verändert auf Dauer unser Süße-Empfinden.</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Süßstoffe sind häufig deutlich süßer als Zucker.</li>
              <li>Typisches Beispiel: Zuckerfreie, mit Süßstoffen gesüßte Getränke (Energy-Drinks, Coke Zero etc.)</li>
              <li>Der Konsum von Süßstoffen führt vermutlich zu einer Herabsetzung der Schwelle, ab der wir Süße wahrnehmen.</li>
              <li>Die Folge: Bei häufigem Konsum verlangt der Körper nach immer süßeren Lebensmitteln, wie konsumieren letztlich immer mehr Süßes.</li>
            </ul>
            <p className="mb-3">Tipp zum Umgang mit Süßem: Lebensmittel, die von Natur aus süß sind (z.B. Obst) enthalten Zucker in einer Form, die vom Körper gesund verstoffwechselt werden kann. Solche Lebensmittel sind Lebensmitteln mit künstlichen Süßstoffen vorzuziehen.</p>
            <p className="font-semibold mb-1">Transfette</p>
            <p className="font-semibold mb-1">Was sind Transfettsäuren?</p>
            <p className="mb-3">Transfettsäuren sind Fettsäuren, die durch das Härten pflanzlicher Öle entstehen. Transfettsäuren sind für den menschlichen Körper besonders ungesund.</p>
            <p className="font-semibold mb-1">Wie entstehen Transfettsäuren?</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Transfettsäuren entstehen natürlicherweise z.B. im Magen von Wiederkäuern (z.B. von Kühen) durch bestimmte Mikroorganismen.</li>
              <li>Problematisch ist die industrielle Härtung, z.B. bei der Herstellung von Margarine aus flüssigen Pflanzenölen.</li>
            </ul>
            <p className="mb-1">Vorgang:</p>
            <p className="mb-3">Die ursprünglich gesunden ungesättigten Fettsäuren der Pflanzenöle werden nicht ganz durchgehärtet, es bilden sich ungesättigte Fettsäuren mit einer speziellen chemischen Struktur: Transfettsäuren.</p>
            <p className="font-semibold mb-1">Wo kommen Transfettsäuren vor?</p>
            <p className="mb-1">Typische Lebensmittel, die Transfettsäuren enthalten:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Backwaren (z.B. Croissants, Berliner/Krapfen, Kekse)</li>
              <li>Süßigkeiten und Snacks (z.B. Chips)</li>
              <li>Fertigprodukte (z.B. Fertigpizza, Fertigsuppen)</li>
              <li>Fast Food und Frittiertes (z.B. Hamburger, Pommes)</li>
            </ul>
            <p className="font-semibold mb-1">Wie erkenne ich Transfettsäuren?</p>
            <p className="mb-3">Lebensmittel, auf deren Verpackung „teilweise gehärtete Fette" angegeben sind, enthalten Transfettsäuren.</p>
            <p className="font-semibold mb-1">Protein-Produkte: Shakes, Riegel etc.</p>
            <p className="font-semibold mb-1">Müssen wir unserem Körper zusätzliches Protein zuführen?</p>
            <p className="mb-3">Über eine ausgewogene Ernährung kann der Körper ausreichend mit Protein versorgt werden. Eine Ergänzung durch künstliche Protein-Produkte ist nicht notwendig.</p>
            <p className="mb-1">Die unnatürliche Zusammensetzung künstlicher Protein-Produkte:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Künstliche Protein-Produkte enthalten oft viele Zusatzstoffe. Bei vielen dieser Stoffe wissen wir nichts über die Effekte auf unseren Körper.</li>
              <li>In natürlichen Lebensmitteln kommt Protein immer gepaart mit anderen Nährstoffen vor, die der Körper ebenfalls benötigt.</li>
              <li>Nahrungsergänzungsmittel sollten nie reguläre Mahlzeiten ersetzen.</li>
            </ul>
            <p className="mb-1">Für Sportler:innen: Proteine für den Muskelaufbau</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Proteine spielen beim Muskelaufbau eine wichtige Rolle.</li>
              <li>Auch für Sportler:innen gilt: Der Körper kann seinen Bedarf, auch für den Muskelaufbau, über das in natürlichen Lebensmitteln vorkommende Protein decken.</li>
              <li>Auch Sportler:innen benötigen alle Nährstoffe in ausreichender Menge – nicht nur Protein. Dies kann nur über eine ausgewogene Ernährung erreicht werden.</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><Users className="text-blue-600" size={14} /></div>} title="Vertiefende Fragen">
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 rounded-lg text-blue-800">Was verspricht man sich von zuckerfreien Süßstoffen? Aus welchen Gründen sind sie dennoch problematisch? Auf welche Produkte sollte man lieber ganz verzichten?</li>
              <li className="p-3 bg-green-50 rounded-lg text-green-800">Worum handelt es sich bei Transfetten chemisch gesehen? Wie entstehen sie – in der Natur und in der Lebensmittelindustrie? Worin befinden sich Transfette und wie erkennt man entsprechende Produkte im Supermarkt?</li>
              <li className="p-3 bg-orange-50 rounded-lg text-orange-800">Warum werden Proteinshakes zum Muskelaufbau nicht wirklich benötigt? Wozu sollte man sportlichen Menschen stattdessen raten?</li>
              <li className="p-3 bg-purple-50 rounded-lg text-purple-800">Diskutiert: Ist es möglich, auf die Produkte aus der ‚Unterwelt' der Ernährung ganz zu verzichten? Sollte ihre Verwendung in der Lebensmittelindustrie von der Politik stärker eingeschränkt werden?</li>
            </ul>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center"><Lightbulb className="text-indigo-600" size={14} /></div>} title="Weiterführende Informationen">
            <p className="font-semibold mb-1">Süßstoffe</p>
            <p className="font-semibold mb-1">Wie kommt es, dass wir uns an Süßes gewöhnen können?</p>
            <p className="mb-3">Zentral ist hier unser körpereigenes Belohnungssystem. Eine Studie des Max-Planck-Instituts für Stoffwechselforschung hat gezeigt, dass unmittelbar nach dem Verzehr von zuckerreichen Lebensmitteln Dopamin (Begriffserklärung s.u.) ausgeschüttet wird, noch bevor die Nahrung den Magen erreicht (vgl. Thanarajah et al.). Je nach individuellem Verlangen wird sogar zu unterschiedlichen Zeitpunkten unterschiedlich viel Dopamin ausgeschüttet. Die Gehirne von Versuchsteilnehmer:innen mit einem starken Verlangen nach zuckerreicher Nahrung schütteten direkt nach dem Verzehr eine große Menge an Dopamin aus.</p>
            <p className="font-semibold mb-1">Zucker (und Fett) programmieren unsere Synapsen um</p>
            <p className="mb-3">Forschende maßen die Aktivität bestimmter Hirnregionen und stellten fest, dass das Dopamin-ausschüttende System besonders stark bei Teilnehmer:innen aktiviert wurde, die ein sehr fett- und zuckerreiches Gericht aßen. Der erhöhte Zuckerkonsum veränderte die neuronalen Schaltkreise so, dass zuckerreiche Nahrung bei den Proband:innen eine stärkere belohnende Wirkung hatte und sie nach dem Experiment zucker- und fettreiche Lebensmittel positiver bewerteten.</p>
            <p className="font-semibold mb-1">Dopamin</p>
            <p className="mb-3">Dopamin ist ein Botenstoff (sog. Neurotransmitter), der hauptsächlich im Gehirn vorkommt. Es wird umgangssprachlich auch als Wohlfühl- oder Glücks-Botenstoff bezeichnet.</p>
            <p className="mb-3">Neueren Befunden zufolge spielt Dopamin eine wichtige Rolle im Belohnungs- und Motivationssystem des Gehirns (sog. mesolimbisches System). Dopamin vermittelt vor allem die Zuweisung von Begehren (wanting). Interessant: Das wanting, das beim Belohnungslernen eine zentrale Funktion ausübt, wird in der Psychologie als bedeutsam bei der Entstehung von Suchterkrankungen angesehen.</p>
            <p className="font-semibold mb-1">Die Wirkung von Süßstoffen</p>
            <p className="mb-3">Zucker-Ersatzstoffe sollen eine Aktivierung des Belohnungssystems ohne die ‚Nebenwirkungen' von Zucker wie Übergewicht, Typ-2-Diabetes etc. ermöglichen. Zu beachten ist aber, dass viele langfristige Effekte von Zucker-Ersatzstoffen auf den Organismus bisher nicht eingeschätzt werden können.</p>
            <p className="mb-3">Was bisher als gesichert gilt: Künstliche Süßstoffe wie Aspartam, Saccharin und Sucralose beeinflussen das Darmmikrobiom (d.h. die im Darm vorkommenden Mikroorganismen) negativ, so zeigt eine Studie (vgl. Suez et al.). Untersuchungen zeigen, dass bereits moderate Mengen der Süßstoffe die Zusammensetzung und Funktion der Darmbakterien verändern können. Dadurch verschlechtert sich die Glukosetoleranz, das Risiko für Erkrankungen wie Typ-2-Diabetes steigt. Außerdem fördern sie das Wachstum unerwünschter Bakterien, können die Darmbarriere schädigen („leaky gut") und Entzündungen begünstigen. Überdies konnte eine weitere Studie zeigen, dass regelmäßiger Konsum künstlicher Süßstoffe wie Aspartam, Sucralose oder Saccharin mit einem beschleunigten kognitiven Abbau und Herz-Kreislauf-Erkrankungen verbunden sein kann (vgl. Gonçalves et al.).</p>
            <p className="mb-3">Weiterhin wird das Verlangen nach Süßem durch den Konsum von Süßstoffen nicht gestillt, sondern – im Gegenteil – verstärkt. Eine aktuelle Studie belegt z.B., dass der Zuckerersatzstoff Sucralose den Hypothalamus aktiviert, eine wichtige Schaltzentrale für Hunger und Sättigung (vgl. Chakravartti et al.). Daraufhin steigert sich das Hungergefühl, und zwar besonders bei Menschen mit Übergewicht (Adipositas). Wenn künstliche Süßstoffe dem Gehirn Zuckersignale senden, aber die vom Körper erwarteten Kalorien ausbleiben, führt genau dies zu einem größeren Hungergefühl.</p>
            <p className="mb-3">Die Weltgesundheitsorganisation (WHO: World Health Organization) gibt in ihren Richtlinien zum Gebrauch von Zucker-Ersatzstoffen einen Rat, den man einfach umsetzen kann: Statt zu diesen Mitteln sollte man bei Lust auf Süßes lieber Obst essen, denn dieses liefert wertvolle Ballaststoffe, Vitamine, Mineralien und Spurenelemente.</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-3 rounded">
              <p className="font-semibold mb-2">Quellen „Süßstoffe":</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Chakravartti SP, Jann K, Veit R, Liu H, Yunker AG, Angelo B, Monterosso JR, Xiang AH, Kullmann S, Page KA. Non-caloric sweetener effects on brain appetite regulation in individuals across varying body weights. Nat Metab. 2025 Mar;7(3):574-585. doi: 10.1038/s42255-025-01227-8. Epub 2025 Mar 26. PMID: 40140714.</li>
                <li>Gonçalves NG, Martinez-Steele E, Lotufo PA, Bensenor I, Goulart AC, Barreto SM, Giatti L, de Faria CP, Molina MDCB, Caramelli P, Marchioni DM, Suemoto CK. Association Between Consumption of Low- and No-Calorie Artificial Sweeteners and Cognitive Decline: An 8-Year Prospective Study. Neurology. 2025 Oct 7;105(7):e214023. doi: 10.1212/WNL.0000000000214023. Epub 2025 Sep 3. Erratum in: Neurology. 2025 Dec 9;105(11):e214393. doi: 10.1212/WNL.0000000000214393. PMID: 40902134.</li>
                <li>Suez J, Korem T, Zeevi D, Zilberman-Schapira G, Thaiss CA, Maza O, Israeli D, Zmora N, Gilad S, Weinberger A, Kuperman Y, Harmelin A, Kolodkin-Gal I, Shapiro H, Halpern Z, Segal E, Elinav E. Artificial sweeteners induce glucose intolerance by altering the gut microbiota. Nature. 2014 Oct 9;514(7521):181-6. doi: 10.1038/nature13793. Epub 2014 Sep 17. PMID: 25231862.</li>
                <li>Thanarajah SE, Backes H, DiFeliceantonio AG, Albus K, Cremer AL, Hanssen R, Lippert RN, Cornely OA, Small DM, Brüning JC, Tittgemeyer M. Food Intake Recruits Orosensory and Post-ingestive Dopaminergic Circuits to Affect Eating Desire in Humans. Cell Metab. 2019 Mar 5;29(3):695-706.e4. doi: 10.1016/j.cmet.2018.12.006. Epub 2018 Dec 27. PMID: 30595479.</li>
              </ul>
            </div>
            <p className="font-semibold mb-1">Transfette</p>
            <p className="font-semibold mb-1">Wie entstehen Transfettsäuren?</p>
            <p className="mb-3">Transfettsäuren entstehen vor allem durch lebensmitteltechnologische Prozesse wie die sog. Fetthärtung. Dies ist ein Verfahren, bei dem fette Öle in feste oder streichfähige Fette umgewandelt werden. Aus ursprünglich gesunden Pflanzenölen werden Produkte gewonnen, die bessere technische Eigenschaften als natürliche (feste) Fette wie Butter oder Schmalz aufweisen und sich gut lagern lassen. Solche industriell gehärteten Fette werden aufgrund ihres z.T. hohen Gehaltes an Transfettsäuren auch als Transfette bezeichnet.</p>
            <p className="font-semibold mb-1">Was sind Transfettsäuren?</p>
            <p className="mb-3">Ungesättigte Fettsäuren liegen in der Natur hauptsächlich in sogenannter cis-Konfiguration vor. Durch die Härtung kann es zu einer Veränderung der Konfiguration der Doppelbindungen kommen: Es entstehen Transfettsäuren, in denen sich die Wasserstoffatome an den durch Doppelbindungen verknüpften Kohlenstoffatomen auf entgegengesetzten Seiten befinden.</p>
            <div className="bg-gray-50 border border-gray-200 p-3 mb-3 rounded">
              <p className="mb-1">Ölsäure (C18:1 cis 9)</p>
              <p className="mb-1">Elaidinsäure (C18:1 trans 9)</p>
              <p className="mb-1">Trans-Vaccensäure (C18:1 trans 11)</p>
              <p className="text-gray-500 italic text-sm mt-2">Chemische Struktur der Ölsäure im Vergleich mit den beiden trans-C18:1-Fettsäuren<br />(Diagramm im Originaldokument als EMF-Datei, nicht darstellbar im Browser)</p>
            </div>
            <p className="font-semibold mb-1">Die Wirkung von Transfettsäuren</p>
            <p className="mb-3">Transfettsäuren besitzen keine bekannte positive Funktion im Organismus, aber negative Auswirkungen auf den Stoffwechsel sind eindeutig belegt. Eine hohe Zufuhr von Transfettsäuren birgt das Risiko für eine Fettstoffwechselstörung, die zu einer Erhöhung des Triglycerid-Spiegels führt. Auch wird das Verhältnis zwischen LDL-Cholesterol und HDL-Cholesterol im Blut nachteilig verändert. Die Auswirkungen auf die Gesundheit können erheblich sein und sowohl die Entstehung von Arteriosklerose als auch einer koronaren Herzkrankheit begünstigen sowie das Herzinfarktrisiko erhöhen.</p>
            <p className="font-semibold mb-1">Protein-Produkte: Shakes, Riegel etc.</p>
            <p className="font-semibold mb-1">Braucht unser Körper Protein-Produkte?</p>
            <p className="mb-3">Die benötigte Proteinzufuhr kann für einen Menschen in der Regel über den Verzehr proteinreicher Lebensmittel mühelos sichergestellt werden.</p>
            <p className="mb-3">Gerade bei jüngeren Menschen, die viel Sport treiben, hat sich die Meinung verbreitet, man müsse den Körper durch eine hohe Proteinaufnahme bei Erhalt und Aufbau der Muskulatur unterstützen. Das ist in einem gewissen Rahmen sinnvoll, kann aber schon durch Anpassungen im persönlichen Speiseplan erreicht werden.</p>
            <p className="font-semibold mb-1">Kann man zu viel Protein zu sich nehmen?</p>
            <p>In der Wissenschaft wird überdies diskutiert, ob ein Zuviel an Protein schädlich sein könnte. Die Befunde sind bislang nicht eindeutig, aber es gibt Hinweise darauf, dass ein Übermaß an Protein die Niere belastet. Zudem ist eine mögliche Erhöhung des Risikos für Typ 2-Diabetes durch übermäßig hohen Proteinkonsum in der wissenschaftlichen Diskussion. Teure ‚High Protein'-Produkte oder zusätzliche Eiweißshakes sind für gesunde Menschen nicht notwendig. Der vermutete Nutzen wird in der Regel überschätzt, während potenzielle Risiken nicht ausgeschlossen werden können.</p>
          </SubSection>
        </AccordionSection>

      </div>
    </div>
  );
}
