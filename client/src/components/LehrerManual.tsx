import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, List, Lightbulb, Download } from "lucide-react";

function B({ children }: { children: ReactNode }) {
  return <strong>{children}</strong>;
}

function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`mt-4 mb-0 first:mt-0${className ? ' ' + className : ''}`}>{children}</p>;
}

function TP({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`mt-0 mb-0${className ? ' ' + className : ''}`}>{children}</p>;
}

function Li({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 mb-0 pl-6 sm:pl-12">
      <span className="flex-shrink-0 select-none">–</span>
      <span>{children}</span>
    </div>
  );
}

function OLi({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 mb-0 pl-12 sm:pl-24">
      <span className="flex-shrink-0 select-none text-[9px] leading-5">○</span>
      <span>{children}</span>
    </div>
  );
}

function SqLi({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 mb-0 pl-20 sm:pl-36">
      <span className="flex-shrink-0 select-none">▪</span>
      <span>{children}</span>
    </div>
  );
}

function Arr({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 mb-0 pl-12 sm:pl-24">
      <span className="flex-shrink-0 select-none text-lg leading-5 font-bold">→</span>
      <span>{children}</span>
    </div>
  );
}

function Num({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex gap-1.5 mb-0 pl-3 sm:pl-6">
      <span className="flex-shrink-0 select-none font-bold">{n}.</span>
      <span>{children}</span>
    </div>
  );
}

function DocImage({ src, caption, maxHeight = "170px", maxWidth }: { src: string; caption: string; maxHeight?: string; maxWidth?: string }) {
  const unconstrained = maxHeight === "none";
  return (
    <figure className="my-3 flex flex-col items-center">
      <img
        src={src}
        alt={caption}
        className="rounded-md bg-white"
        style={unconstrained
          ? { maxWidth: maxWidth ?? "100%", display: "block" }
          : { maxHeight, maxWidth: maxWidth ?? "100%", objectFit: "contain" }
        }
      />
      {caption && <figcaption className="mt-1 text-center text-sm text-gray-500 italic">{caption}</figcaption>}
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
  children: ReactNode;
}

function AccordionSection({ number, title, color, bgColor, textColor, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="mb-4 border border-gray-200 rounded-xl shadow-sm">
      <button onClick={onToggle} className={`w-full flex items-center justify-between p-5 ${bgColor} hover:opacity-90 transition-opacity text-left rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full ${color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>{number}</span>
          <h3 className={`text-lg font-bold ${textColor}`}>{title}</h3>
        </div>
        {isOpen ? <ChevronUp className={textColor} size={20} /> : <ChevronDown className={textColor} size={20} />}
      </button>
      {isOpen && <div className="p-6 bg-white">{children}</div>}
    </div>
  );
}

interface SubSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function SubSection({ icon, title, children, defaultOpen = false }: SubSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-2 border-b border-gray-200 sm:mb-6 sm:border sm:border-gray-100 sm:rounded-lg">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 px-0 sm:p-4 sm:bg-gray-50 sm:hover:bg-gray-100 transition-colors text-left sm:rounded-t-lg">
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="text-base font-bold text-gray-800">{title}</h4>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>
      {open && <div className="pb-4 sm:p-5 sm:bg-white text-gray-800 text-[15px] leading-relaxed">{children}</div>}
    </div>
  );
}

export default function LehrerManual() {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const toggle = (n: number) => setOpenSections(prev => ({ ...prev, [n]: !prev[n] }));

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">NutriLern – Manual für Lehrkräfte</h2>
          <P className="text-gray-600 first:mt-0">Zentrale Inhalte der Lerneinheit,<br />vertiefende Fragen<br />und weiterführende Informationen</P>
        </div>
        <a
          href="/lehrer-manual.pdf"
          download="Manual für Lehrkräfte.pdf"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl shadow-md transition-colors text-sm whitespace-nowrap"
        >
          <Download size={18} />
          Manual als PDF herunterladen
        </a>
      </div>

      <div className="space-y-4">

        {/* ── 1. Kohlenhydrate ─────────────────────────────── */}
        <AccordionSection number={1} title="Kohlenhydrate" color="bg-green-600" bgColor="bg-green-50" textColor="text-green-800" isOpen={!!openSections[1]} onToggle={() => toggle(1)}>

          <SubSection icon={<div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center"><List className="text-green-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={false}>
            <P>Über die Nahrung nimmt unser Körper <B>zwei Arten von Nährstoffen</B> auf: <B>Makronährstoffe</B> und <B>Mikronährstoffe</B>.</P>
            <P><B>Makronährstoffe</B> benötigt der Körper zur <B>Energiegewinnung</B>.</P>
            <Li>Sämtliche lebenswichtigen Körperfunktionen verbrauchen Energie.</Li>
            <Li>Wenn dem Körper nicht genügend Energie durch die Nahrung bereitgestellt wird, kann er nicht gesund funktionieren.</Li>
            <P>Es gibt <B>drei Makronährstoffe</B>: <B>Kohlenhydrate</B>, <B>Fette</B> und <B>Proteine</B>.</P>
            <P><B>Kohlenhydrate</B> sind ein wichtiger <B>Energielieferant</B> (Makronährstoff) für unseren Körper.</P>
            <Li>Kohlenhydrate werden vom Körper zu <B>Glucose</B> verstoffwechselt.</Li>
            <Li>Glucose ist der <B>wichtigste Energielieferant für das Gehirn</B>, auch andere Organe benötigen Glucose.</Li>
            <Li>Ist der Körper nicht ausreichend mit Glucose versorgt, fühlen wir uns müde und unkonzentriert.</Li>
            <P>Kohlenhydrate kommen in Nahrungsmitteln in unterschiedlicher Form vor: Sie können <B>mehr oder weniger komplex aufgebaut</B> sein.</P>
            <P>Die <B>Komplexität der Kohlenhydrate</B> hat einen Einfluss darauf, <B>wie schnell</B> sie vom Körper <B>zu Glucose verstoffwechselt</B> werden können.</P>
            <Li><B>Je komplexer</B> die Kohlenhydrate, <B>desto langsamer</B> werden sie zu Glucose verarbeitet.</Li>
            <Li><B>Komplexe Kohlenhydrate</B> bestehen aus langen Ketten aus vielen Einfachzuckern.</Li>
            <Arr>Hier dauert der Gewinn von Glucose lange.</Arr>
            <Li><B>Weniger komplexe Kohlenhydrate</B> bestehen aus kurzen Bausteinen aus bloß ein oder zwei Einfachzuckern.</Li>
            <Arr>Hier ist die Glucose sehr schnell verfügbar.</Arr>
            <P>Bei Nahrungsmitteln mit <B>Einfachzuckern</B> gelangt die enthaltene Glucose sehr schnell ins Blut.</P>
            <Li>Die Folge: ein <B>schneller Energieschub</B></Li>
            <Li>Aber: Die Energie ist <B>schnell wieder verbraucht</B>.</Li>
            <Li>Der <B>Effekt</B> auf unseren Körper: Ist keine Glucose mehr verfügbar, fühlen wir uns schlapp. Wir bekommen schnell wieder Hunger und haben immer wieder ‚Lust auf Süßes‘.</Li>
            <P><B>Komplexe Kohlenhydrate</B> sind für eine gleichmäßige Energieversorgung <B>deutlich vorteilhafter</B> als Einfachzucker.</P>
            <Li>Bei Nahrungsmitteln mit komplexen Kohlenhydraten hält die <B>Energieversorgung</B> durch die Glucose <B>länger an</B>.</Li>
            <Li>Wir fühlen uns länger wach, konzentriert und satt.</Li>
            <P><B>Lebensmittel</B>, die komplexe Kohlenhydrate enthalten:</P>
            <Li><B>Gemüse und Obst</B></Li>
            <Li><B>Vollkornprodukte</B></Li>
            <Li><B>Hülsenfrüchte</B></Li>
            <P>Diese Lebensmittel enthalten außerdem wichtige <B>Ballaststoffe</B>.</P>
            <P><B>Ballaststoffe</B> = Nahrungsbestandteile, die vom Körper nicht verdaut werden können.</P>
            <Li>zögern die Verdauung hinaus</Li>
            <Li>wirken sich positiv auf eine langsame, gleichmäßige Energieversorgung des Körpers mit Glucose aus</Li>
            <P><B>Beispiel Banane</B>:</P>
            <Li>enthält Glucose in schnell und weniger schnell verfügbarer Form (<B>komplexe Kohlenhydrate</B>)</Li>
            <Li>enthält viele <B>Ballaststoffe</B></Li>
            <Li>versorgt den Körper sowohl schnell als auch länger anhaltend mit Energie</Li>
            <Arr>Bananen sind gut geeignet als Snack zur Konzentrationssteigerung (etwa vor einer Prüfung).</Arr>
            <Li>Vergleich mit Schokolade: Schokolade enthält ausschließlich Einfachzucker, keine Kohlenhydrate und keine Ballaststoffe.</Li>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 font-semibold text-sm leading-none">?</span></div>} title="Vertiefende Fragen">
            <Num n={1}>Wie wird die Energie aus den Makronährstoffen im Körper gespeichert? Warum sind Kohlenhydrate wichtig für unser Gehirn?</Num>
            <Num n={2}>Worin unterscheiden sich komplexe Kohlenhydrate von Einfachzuckern (chemisch gesehen) und welche Folgen hat das für die Verdauung? Wie funktioniert die Verwertung von Kohlenhydraten?</Num>
            <Num n={3}>Welche Kohlenhydrate können als ‚gut‘ gelten und warum? In welchen Lebensmitteln befinden sie sich? Welche Kohlenhydrate müssen als ‚schlecht‘ gelten und warum? In welchen Lebensmitteln befinden sie sich?</Num>
            <Num n={4}>Welche Folgen hat der Konsum von Einfachzuckern für unser Körpergefühl und unsere Leistungsfähigkeit, welche der Konsum von komplexen Kohlenhydraten? Warum ist es möglich, durch Essen einer Banane vor Prüfungen die Effekte beider Arten von Kohlenhydraten optimal auszunutzen?</Num>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center"><Lightbulb className="text-green-600" size={14} /></div>} title="Weiterführende Informationen">
            <P className="mt-8"><B>Wie entstehen Kohlenhydrate?</B></P>
            <TP>Grundlage für die Bildung von Kohlenhydraten ist die Photosynthese durch grüne Pflanzen.</TP>
            <P>Dabei bilden die Pflanzen aus Wasser und Kohlendioxid (CO2) das energiehaltige Molekül Glucose. Als Energiequelle dient dabei das Sonnenlicht.</P>
            <DocImage src="/manual-images/image1.png" caption="Photosynthese: Bildung von Glucose durch grüne Pflanzen" />
            <P>Alle Zellen unseres Körpers können Glucose als Energiequelle nutzen. Manche Zellen, wie etwa die Nervenzellen im Gehirn, sind sogar ausschließlich auf diese Zuckerart als Energiequelle angewiesen.</P>
            <P>Bei der Gewinnung von Energie aus Glucose wird diese wieder in ihre ursprünglichen Bausteine zerlegt: Wasser und Kohlendioxid. Diesen Vorgang bezeichnet man als Atmung. Die bei der Atmung freiwerdende Energie wird von unserem Organismus auf vielfältige Weise genutzt.</P>
            <DocImage src="/manual-images/image2.png" caption="Atmung: Nutzung von Glucose zur Energiegewinnung für unseren Organismus" />
            <P className="text-gray-500 italic text-sm">(Aus dem Vergleich der beiden Schaubilder wird deutlich, dass die Atmung die Umkehrung der Photosynthese darstellt.)</P>
            <P className="mt-8"><B>Einfachzucker</B></P>
            <TP>Die wichtigsten Einfachzucker, die in unserer Ernährung eine Rolle spielen, sind Traubenzucker (Glucose) und Fruchtzucker (Fructose). Glucose ist die Hauptenergiequelle für das Gehirn und die Muskeln.</TP>
            <P className="mt-8"><B>Zweifachzucker</B></P>
            <TP>Der bekannteste Zweifachzucker ist die Saccharose, unser ‚Haushaltszucker‘. Er ist aus Fructose und Glucose zusammengesetzt.</TP>
            <P className="mt-8"><B>Mehrfachzucker</B></P>
            <TP>Die Zuckermoleküle können miteinander verbunden werden, dann spricht man von Mehrfachzuckern (Polysaccharide). Tatsächlich liegt in der Natur der meiste Zucker als Mehrfachzucker vor.</TP>
            <DocImage src="/manual-images/image3.png" caption="Zuckerarten schematisch" />
            <P>Pflanzen nutzen diese ketten- oder auch netzartig verbundenen Mehrfachzucker als Baustoffe – zum Beispiel in Form der Zellulose für ihre feste Zellwand. Dabei wird die Glucose sehr fest miteinander verbunden, so dass sie kaum wieder aufzuspalten ist. Deshalb können wir dieses Pflanzenmaterial nicht verdauen.</P>
            <P>Eine weitere Verwendung der Mehrfachzucker ist die Bildung von Speicherstoff, der sog. Stärke. Stärke findet man vor allem in Samen und Knollen. Dort dient sie den keimenden Jungpflanzen als Energiequelle.</P>
            <P className="mt-8"><B>Aufbau der Stärke</B></P>
            <TP>Im Gegensatz zu den Einfach- und Zweifachzuckern ist Stärke ein sog. komplexes Kohlenhydrat. In der Stärke sind die Einfachzucker zu linearen oder verzweigten Ketten verbunden.</TP>
            <P>Stärke besteht zu etwa 20–30 % aus Amylose (lineare Ketten mit einer schraubenartigen Struktur).</P>
            <DocImage src="/manual-images/image4.png" caption="Struktur der Amylose" maxHeight="85px" />
            <P>Die weiteren 70–80 % der Stärke bestehen aus Amylopektin (vielfach verzweigte, netzartige Strukturen), das sehr große Moleküle bildet.</P>
            <DocImage src="/manual-images/image5.png" caption="Ausschnitt aus einem Amylopektin-Molekül" maxHeight="103px" />
            <P className="mt-8"><B>Die wichtigsten stärkehaltigen Nahrungsquellen:</B></P>
            <Li>Getreide: Weizen, Roggen, Gerste, Dinkel, Mais, Reis, Hafer</Li>
            <Li>Kartoffeln</Li>
            <Li>Hülsenfrüchte: Bohnen, Erbsen, Erdnüsse, Kichererbsen, Linsen, Sojabohnen, Hirse</Li>
            <P className="mt-8"><B>Wie werden Zucker und Stärke im Körper verstoffwechselt, und wie wird daraus Energie gewonnen?</B></P>
            <P className="mt-4"><B>Abbau von Stärke zu Zweifach- und Einfachzuckern</B></P>
            <TP>Die Verdauung von Stärke in unserer Nahrung beginnt bereits im Mund. Unser Speichel enthält das stärkespaltende Enzym Alpha-Amylase. Die Amylase spaltet die Stärke zu Dextrinen (Bruchstücke der Stärke). Daher ist es wichtig, dass man lange und gründlich kaut.</TP>
            <P>Die Dextrine, welche die Alpha-Amylase gebildet hat, werden im Dünndarm durch die Pankreas-Amylase und Saccharidasen weiter gespalten. Die schließlich entstehenden Einfachzucker (Monosaccharide) werden nun durch die Darmzellen aufgenommen und gelangen ins Blut, von wo sie in alle Organe, Gewebe und Zellen des Körpers transportiert werden.</P>
            <P className="mt-8"><B>Gewinnung von Energie</B></P>
            <TP>Unsere Zellen nehmen die Zuckermoleküle auf, die über den Blutstrom angeliefert werden. Dies wird durch das Hormon Insulin reguliert. In den Zellen erfolgt der Abbau des Zuckers ebenfalls von zahlreichen Enzymen gesteuert durch den Vorgang der Zellatmung.</TP>
            <P>Die gesamte Reaktion besteht aus drei aufeinander folgenden Teilprozessen. Dabei handelt es sich um eine mehrstufige Kaskade von enzymgesteuerten chemischen Reaktionen, bei denen die Glucose zu Kohlendioxid (CO2) und Wasser abgebaut wird. Die Reaktionsschritte nutzt die Zelle dabei zur Bildung von Adenosin-Triphosphat (ATP). Dieses energiereiche Molekül dient als Treibstoff für nahezu alle Prozesse, die in Zellen und Organen ablaufen.</P>
            <DocImage src="/manual-images/image6.png" caption="ATP (Adenosin-Triphosphat), der universelle Energieträger der Zelle" maxHeight="129px" />
            <P className="mt-8"><B>Glucose ist der Treibstoff für unser Gehirn</B></P>
            <TP>Unser Gehirn hat nur einen kleinen Anteil am Körpergewicht, dafür aber einen exorbitant hohen Energieverbrauch. Es benötigt rund 20 Prozent der Gesamtenergie, die unser Körper täglich braucht.</TP>
            <P>Dies liegt unter anderem daran, dass unser Gehirn rund um die Uhr aktiv ist. Außerdem benötigt die tägliche Arbeit der Nervenzellen besonders viel Energie. Auch der Transport von Molekülen und Botenstoffen ist energetisch sehr aufwändig.</P>
            <P>Nervenzellen können die Glucose aber nicht speichern. Daher ist eine stetige, ausreichende Versorgung unerlässlich, denn unser Gehirn verbrennt etwa 130 Gramm Glucose am Tag.</P>
          </SubSection>
        </AccordionSection>

        {/* ── 2. Fette ─────────────────────────────────────── */}
        <AccordionSection number={2} title="Fette" color="bg-orange-600" bgColor="bg-orange-50" textColor="text-orange-800" isOpen={!!openSections[2]} onToggle={() => toggle(2)}>

          <SubSection icon={<div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center"><List className="text-orange-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={false}>
            <P>Fette sind auch ein <B>Energielieferant</B> (Makronährstoff) für unseren Körper.</P>
            <TP>Außerdem erfüllen sie weitere wichtige Funktionen:</TP>
            <Li>Wir benötigen Fette, damit bestimmte <B>Vitamine vom Körper aufgenommen</B> werden.</Li>
            <Li>Fette sind <B>Bestandteil der Zellmembran</B>, d.i. die Hülle, die die Körperzellen umschließt.</Li>
            <P>Fette sind der Nährstoff mit der mit Abstand <B>höchsten Energiedichte</B>:</P>
            <Li>Ein Gramm Fett liefert mehr als doppelt so viel Energie wie ein Gramm Kohlenhydrate oder Proteine.</Li>
            <Arr>Fette sollten bewusst konsumiert werden.</Arr>
            <P>Fette setzen sich aus <B>Fettsäuren</B> zusammen, von diesen Fettsäuren gibt es <B>unterschiedliche Arten</B>. Die unterschiedlichen Arten von Fettsäuren haben <B>unterschiedliche Funktionen und Effekte</B>.</P>
            <P>Es gibt <B>gesättigte und ungesättigte Fettsäuren</B>.</P>
            <P className="mt-8"><B>Gesättigte Fettsäuren</B></P>
            <Li>kommen vor allem in tierischen Lebensmitteln vor</Li>
            <OLi>z.B. in Fleisch, Milchprodukten und Eigelb</OLi>
            <Li>pflanzliche Fette, die gesättigte Fettsäuren enthalten:</Li>
            <OLi>Kokosfett und Palmöl</OLi>
            <Li>Gesättigte Fettsäuren <B>kann der Körper selbst herstellen</B>.</Li>
            <P>Gesättigte Fettsäuren stehen im Verdacht, die Menge an schädlichem Cholesterin im Blut zu erhöhen – das kann <B>negative Effekte für die Gesundheit</B> haben.</P>
            <Arr>Gesättigte Fettsäuren sollten <B>nicht unbegrenzt konsumiert</B> werden.</Arr>
            <P><B>Ungesättigte Fettsäuren</B> gibt es wiederum in <B>verschiedenen Formen</B>.</P>
            <P className="mt-8"><B>Einfach ungesättigte Fettsäuren</B></P>
            <Li>Lebensmittel, die einfach ungesättigte Fettsäuren enthalten:</Li>
            <OLi>pflanzliche Öle (z.B. Olivenöl und Rapsöl)</OLi>
            <OLi>Nüsse und Samen</OLi>
            <OLi>Avocados</OLi>
            <Li>Einfach ungesättigte Fettsäuren kann der Körper ebenfalls selbst herstellen.</Li>
            <Arr>Einfach ungesättigte Fettsäuren gelten <B>auch in größeren Mengen als gesund</B>.</Arr>
            <P className="mt-8"><B>Mehrfach ungesättigte Fettsäuren</B></P>
            <Li>Lebensmittel, die mehrfach ungesättigte Fettsäuren enthalten:</Li>
            <OLi>bestimmte pflanzliche Öle</OLi>
            <OLi>Nüsse und Samen</OLi>
            <OLi>fetter Seefisch (z.B. Lachs, Hering, Tunfisch)</OLi>
            <OLi>Auch die sog. Omega-3- und Omega-6-Fettsäuren sind mehrfach ungesättigte Fettsäuren.</OLi>
            <Li>für den Körper besonders wertvoll</Li>
            <P>Besonderheit: Der Körper kann mehrfach ungesättigte Fettsäuren <B>nicht selbst herstellen</B>.</P>
            <Li>Mehrfach ungesättigte Fettsäuren heißen darum auch <B>essentielle Fettsäuren</B>.</Li>
            <Li>Wir müssen sie <B>über die Nahrung aufnehmen</B>.</Li>
            <Arr>Man sollte <B>möglichst reichlich</B> mehrfach ungesättigte Fettsäuren zu sich nehmen.</Arr>
            <P><B>Die ‚Fett-Faustregeln‘</B>:</P>
            <Num n={1}>Fette sollten bei der Ernährung <B>maximal ein Drittel</B> ausmachen.</Num>
            <Num n={2}><B>Nicht mehr als 10 Prozent</B> sollte aus <B>gesättigten Fettsäuren</B> bestehen.</Num>
            <Num n={3}>Man sollte <B>möglichst viele ungesättigte Fettsäuren</B> zu sich nehmen, <B>vor allem mehrfach ungesättigte Fettsäuren</B>.</Num>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-orange-600 font-semibold text-sm leading-none">?</span></div>} title="Vertiefende Fragen">
            <Num n={1}>Welche Funktionen erfüllen Fette im Körper? Warum ist es bei Fetten besonders wichtig, nicht zu viel zu konsumieren? Was sind die Obergrenzen?</Num>
            <Num n={2}>Wie sind Fette chemisch aufgebaut und welche Rolle spielen die Fettsäuren? Was sind die wichtigsten Unterschiede zwischen den Fettsäuren hinsichtlich ihrer Funktion/Wirkung und Herstellung?</Num>
            <Num n={3}>Was ist der Unterschied zwischen gesättigten Fettsäuren und einfach ungesättigten Fettsäuren (chemisch gesehen)? Warum gelten erstere als ‚schlecht‘ und letztere als relativ ‚gut‘? In welchen Lebensmitteln findet man sie jeweils?</Num>
            <Num n={4}>Was sind mehrfach ungesättigte Fettsäuren (chemisch gesehen) und in welchen Lebensmitteln befinden sie sich? Inwiefern haben sie eine Sonderstellung unter den Fettsäuren und warum sind sie so gesund?</Num>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center"><Lightbulb className="text-orange-600" size={14} /></div>} title="Weiterführende Informationen">
            <P>Chemisch sind Fette Verbindungen von Glycerin mit sog. Fettsäuren. Sie werden auch Triglyceride genannt.</P>
            <DocImage src="/manual-images/image7b.png" caption="" />
            <P>In einem Fettmolekül sind drei Fettsäuren mit dem Glycerin verbunden: → Triglyceride</P>
            <P className="mt-8"><B>Bildung von Fetten im Körper</B></P>
            <TP>Die Herstellung von Fetten kann in mehreren Organen stattfinden: Leber, Niere, Fettgewebe, Darmwand oder Muskulatur. In mehreren Reaktionsschritten verbinden Enzyme das Molekül Glycerin mit Fettsäuren. Zu den wichtigsten Produzenten von Triglyceriden in unserem Körper gehören die Zellen des weißen Fettgewebes, die Adipozyten (Fettzellen). An der Regulierung dieser Vorgänge sind Hormone wie etwa Insulin oder Adrenalin beteiligt.</TP>
            <P className="mt-8"><B>Abbau der Fette</B></P>
            <TP>Am Abbau der Triglyceride sind spezielle Enzyme beteiligt, die sog. Lipasen aus der Bauchspeicheldrüse. In drei Schritten findet die Abspaltung der Fettsäuren vom Glycerinmolekül statt. Ergebnisse der Reaktion sind Glycerin und Fettsäuren.</TP>
            <P className="mt-8"><B>Der biologische Fettabbau (durch das Enzym Lipase)</B></P>
            <TP>Fett + Lipase → Glycerin + 3 Fettsäuremoleküle</TP>
            <P>Das Glycerin wird für Biosynthesen weiterverwendet. Die Fettsäuren können von den Körperzellen aufgenommen, in den Vorgang der Zellatmung (sog. Fettverbrennung zur Energiegewinnung) eingeschleust oder ebenfalls für Biosynthesen eingesetzt werden. Dazu erfolgt zunächst die Spaltung in kleinere Einheiten mit je zwei Kohlenstoffatomen (C2-Einheiten).</P>
            <P>Fettsäure → Abbau zu C2-Einheiten und Verwendung für</P>
            <Li>Bau-Stoffwechsel und Biosynthese</Li>
            <Li>Zellatmung und Energiegewinnung</Li>
            <P className="mt-8"><B>Wichtig für unsere Ernährung: die Fettsäuren</B></P>
            <TP>Das beim Fettabbau entstehende Molekül Glycerin ist immer gleich. Unterschiedlich sind hingegen die Fettsäuren, die bei der Fettverdauung freigesetzt werden. Man unterscheidet sie anhand ihres Aufbaus in</TP>
            <Li>gesättigte Fettsäuren und</Li>
            <Li>ungesättigte Fettsäuren.</Li>
            <P className="mt-8"><B>Was sind Fettsäuren und wie werden sie unterschieden?</B></P>
            <TP>Fettsäuren sind organische Verbindungen aus den Elementen Kohlenstoff (C), Wasserstoff (H) und Sauerstoff (O), sog. Monocarbonsäuren. Ein Fettsäure-Molekül besteht aus einer langen Kohlenwasserstoffkette, die an einem Ende eine COOH-Gruppe (Carboxylgruppe) trägt und namengebend zur Bezeichnung ‚-säure‘ beiträgt. Die Zahl der C-Atome ist immer gerade und liegt zwischen 8 und 24. Man unterscheidet gesättigte und ungesättigte Fettsäuren.</TP>
            <P className="mt-8"><B>Gesättigte Fettsäuren</B></P>
            <TP>Jedes C-Atom in der Kohlenwasserstoffkette ist hier mit der maximal möglichen Anzahl von Wasserstoffatomen verbunden. Alle C-Atome sind durch Einfachbindungen verknüpft. Die Kohlenstoffatome in der Kette besitzen ausschließlich Einfachbindungen.</TP>
            <P>Beispiele für gesättigte Fettsäuren:</P>
            <P>Palmitinsäure</P>
            <DocImage src="/manual-images/image8.png" caption="" maxWidth="296px" maxHeight="none" />
            <P>Stearinsäure</P>
            <DocImage src="/manual-images/image9.png" caption="" maxWidth="296px" maxHeight="none" />
            <P>Gesättigte Fette besitzen nur gesättigte Fettsäuren. Große Mengen an gesättigten Fettsäuren findet man vor allem in Nahrungsmitteln tierischer Herkunft. Nur wenige pflanzliche Nahrungsmittel enthalten größere Anteile an gesättigte Fettsäuren.</P>
            <P className="mt-8"><B>Ungesättigte Fettsäuren</B></P>
            <TP>Hier besitzen nicht alle C-Atome in der Kohlenwasserstoffkette die maximale Anzahl an Wasserstoffatomen. Manche C-Atome sind durch eine Doppelbindung verknüpft. Man unterscheidet zwischen einfach und mehrfach ungesättigte Fettsäuren.</TP>
            <P>Beispiele für ungesättigte Fettsäuren:</P>
            <P>Ölsäure (einfach ungesättigt)</P>
            <DocImage src="/manual-images/image10.png" caption="" maxWidth="220px" maxHeight="none" />
            <P>Linolsäure (zweifach ungesättigt)</P>
            <DocImage src="/manual-images/image11.png" caption="" maxWidth="280px" maxHeight="none" />
            <P>Ungesättigte Fette besitzen einen hohen Anteil an ungesättigten Fettsäuren. Diese sind überwiegend in pflanzlichen Nahrungsmitteln und in fettem Fisch enthalten.</P>
            <P className="mt-8"><B>Was versteht man unter ‚Omega‘-Fettsäuren?</B></P>
            <P className="mt-4"><B>Omega-3-Fettsäuren</B></P>
            <P>Die Omega-3-Fettsäuren bilden eine Untergruppe der ungesättigten Fettsäuren. Omega-3 bedeutet: Die letzte Doppelbindung in der ungesättigten Kohlenstoffkette befindet sich bei der vom COOH-Ende aus gesehen drittletzten C-C-Bindung. Omega (ω) ist der letzte Buchstabe des griechischen Alphabets und bezeichnet das von der Carboxylgruppe entfernteste C-Atom in der Kette.</P>
            <P>Beispiel:</P>
            <DocImage src="/manual-images/image12b.png" caption="" maxWidth="480px" />
            <P className="mt-8"><B>Omega-6-Fettsäuren</B></P>
            <TP>Die Omega-6-Fettsäuren weisen – vom Omega-Ende (ω-Ende) her betrachtet – an der sechsten Position die erste Doppelbindung auf.</TP>
            <P>Beispiel:</P>
            <DocImage src="/manual-images/image13b.png" caption="" maxWidth="302px" />
            <P className="mt-8"><B>Was sind ‚essentielle‘ Fettsäuren?</B></P>
            <TP>Essentielle Fettsäuren sind Fettsäuren, die vom Körper nicht selbst hergestellt werden können. Sie müssen über die Nahrung zugeführt werden. Für den Menschen essentiell sind die oben dargestellte Omega-3-Fettsäure α-Linolensäure und die Omega-6-Fettsäure Linolsäure.</TP>
            <P>Essentielle Fettsäuren erfüllen lebenswichtige Funktionen: Sie sind u.a. Bausteine unserer Zellmembranen. Zudem spielen sie eine Rolle bei der Steuerung von Entzündungsprozessen, sind wichtig für die Regulierung des Blutdrucks und stärken das Immunsystem. Auch unterstützen sie die Regeneration der Muskulatur und wirken bei der Hormon-Produktion mit.</P>
            <P className="mt-8"><B>Fettsäuren und Cholesterin</B></P>
            <TP>Gesättigte Fettsäuren können den Cholesterinspiegel erhöhen. Cholesterin ist eine natürliche Verbindung aus der Gruppe der sog. Steroide und Baustein vieler Hormone. Einen Großteil des benötigten Cholesterins stellt der Körper selbst her. Der Rest wird mit der Nahrung aufgenommen. Ein hoher Cholesterinspiegel im Blut gilt als Risikofaktor für Arterienverkalkung (Arteriosklerose), denn überschüssiges Cholesterin kann sich in den Gefäßen ablagern. Dies stellt eine Gesundheitsgefahr dar und kann langfristig zu Herzinfarkten, Schlaganfällen oder Gefäßverschlüssen führen.</TP>
          </SubSection>
        </AccordionSection>

        {/* ── 3. Proteine ──────────────────────────────────── */}
        <AccordionSection number={3} title="Proteine" color="bg-red-600" bgColor="bg-red-50" textColor="text-red-800" isOpen={!!openSections[3]} onToggle={() => toggle(3)}>

          <SubSection icon={<div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center"><List className="text-red-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={false}>
            <P>Proteine sind auch <B>Energielieferanten</B> (Makronährstoffe) für unseren Körper.</P>
            <TP>Außerdem erfüllen sie weitere wichtige Funktionen:</TP>
            <Li>wichtig beim <B>Aufbau von Muskeln und Gewebe</B></Li>
            <Li>übernehmen die Rolle von</Li>
            <OLi><B>Enzymen</B></OLi>
            <OLi><B>Hormonen</B></OLi>
            <OLi><B>Antikörpern</B></OLi>
            <Li>ermöglichen die <B>Kommunikation zwischen den Körperzellen</B></Li>
            <Li><B>transportieren wichtige Stoffe</B></Li>
            <P>Proteine bestehen aus sog. <B>Aminosäuren</B>.</P>
            <Li>Aminosäuren werden vom Körper zu Ketten verbunden und bilden räumliche Strukturen aus.</Li>
            <Li>Wenn wir Proteine zu uns nehmen, zerlegt unser Stoffwechsel sie in einzelne Aminosäuren.</Li>
            <Li>Anschließend baut er daraus jene Proteine neu zusammen, die er braucht.</Li>
            <P>Es gibt <B>essentielle Aminosäuren</B>.</P>
            <Li>Sie können vom Körper nicht selbst hergestellt werden.</Li>
            <Arr>Essentielle Aminosäuren <B>müssen über die Nahrung zugeführt werden</B>.</Arr>
            <P>In unserer Nahrung kommen <B>Proteine aus tierischen</B> und <B>pflanzlichen Quellen</B> vor.</P>
            <P className="mt-8"><B>Tierisches Protein</B></P>
            <Li>ist dem Protein in unserem Körper <B>strukturell ähnlich</B></Li>
            <Li>enthält in der Regel <B>alle essentiellen Aminosäuren</B></Li>
            <Arr>Tierisches Protein kann sehr gut verwertet werden.</Arr>
            <P><B>Quellen für tierisches Protein</B>:</P>
            <Li>Fleisch</Li>
            <Li>Eier</Li>
            <Li>Milchprodukte</Li>
            <P>Besonderheit von <B>Lebensmitteln mit tierischem Protein</B>:</P>
            <Li>Tierisches Protein kommt <B>häufig in Lebensmitteln</B> vor, die <B>auch gesättigte Fettsäuren</B> enthalten.</Li>
            <Li><B>Ausnahme</B>: Fettreicher Seefisch</Li>
            <OLi>reich an tierischem Protein und essentiellen Fettsäuren</OLi>
            <OLi>enthält kaum gesättigte Fettsäuren</OLi>
            <P className="mt-8"><B>Pflanzliches Protein</B></P>
            <Li>ist dem körpereigenen Protein <B>weniger ähnlich</B></Li>
            <Li>enthält in der Regel <B>nicht alle essentiellen Aminosäuren</B></Li>
            <Arr>Tierisches Protein kann weniger gut verwertet werden.</Arr>
            <P><B>Aber: Pflanzliches Protein</B> ist <B>nicht weniger wertvoll</B> für unsere gesunde Ernährung als tierisches Protein.</P>
            <Li>Unterschiedliche pflanzliche Nahrungsmittel haben unterschiedliche Aminosäuren-Zusammensetzungen.</Li>
            <Li>Wenn man unterschiedliche pflanzliche Nahrungsmittel <B>richtig kombiniert</B>, erhält der Körper alle essentiellen Aminosäuren in ausreichender Menge.</Li>
            <P>Einige wenige pflanzliche Proteinquellen enthalten für sich genommen alle essentiellen Aminosäuren.</P>
            <Li>Beispiel: die Sojabohne, aus der Tofu hergestellt wird.</Li>
            <P><B>Quellen für pflanzliches Protein</B>:</P>
            <Li>Getreide (z.B. Reis, Dinkel, Hafer)</Li>
            <Li>Hülsenfrüchte (z.B. Bohnen, Linsen, Erbsen)</Li>
            <Li>Nüsse (z.B. Mandeln, Haselnüsse, Walnüsse)</Li>
            <P>Besonderheit von <B>Lebensmitteln mit pflanzlichem Protein</B>:</P>
            <Li>Pflanzliches Protein kommt <B>häufig in Lebensmitteln</B> vor, die <B>keine gesättigten Fettsäuren</B> enthalten.</Li>
            <Li>Pflanzliches Protein kommt <B>häufig in Lebensmitteln</B> vor, die <B>wertvolle Ballaststoffe</B> und <B>Vitamine</B> oder auch <B>ungesättigte Fettsäuren</B> enthalten.</Li>
            <Arr>Tierisches Protein wird oft von ungesunden Stoffen begleitet, pflanzliches Protein meist von gesunden Stoffen.</Arr>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center"><span className="text-red-600 font-semibold text-sm leading-none">?</span></div>} title="Vertiefende Fragen">
            <Num n={1}>Wie sind Proteine chemisch aufgebaut und was macht sie so kompliziert, aber auch faszinierend? Welche Funktionen erfüllen sie in unserem Körper? Welchen Beitrag leisten sie zum Muskelaufbau?</Num>
            <Num n={2}>Was ist der wesentliche Unterschied zwischen tierischem und pflanzlichem Protein im Hinblick auf den Menschen? Was sind jeweils die Vorteile und Nachteile von pflanzlichem und tierischem Protein?</Num>
            <Num n={3}>Wie lassen sich die Nachteile von pflanzlichem Protein ausgleichen, um seine Vorteile nutzen zu können? Welche Lebensmittel werden dafür benötigt?</Num>
            <Num n={4}>Diskutiert: Inwieweit führen die Ernährungsempfehlungen zum Thema Protein zu einer veganen Lebensweise?</Num>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center"><Lightbulb className="text-red-600" size={14} /></div>} title="Weiterführende Informationen">
            <P>Proteine (abgeleitet vom griechischen Wort prōteios für „grundlegend“ und „vorrangig“) werden auch als Eiweiße bezeichnet. Die Bezeichnung Eiweiß ist historisch bedingt und geht auf die ursprüngliche Isolierung dieser Stoffe aus dem Hühnereiweiß (Hühnerei) zurück. Heute wird allgemein die Bezeichnung Protein dem älteren Begriff Eiweiß vorgezogen.</P>
            <P>Proteine erfüllen im Organismus zahlreiche lebenswichtige Aufgaben, etwa</P>
            <Li>als Bausteine für Muskeln (z.B. Aktin und Myosin)</Li>
            <Li>als Gerüste und Stabilisatoren (Kollagen, Keratin)</Li>
            <Li>als Transporter und Kanäle in und zwischen Zellen (Hämoglobin, Natriumkanäle)</Li>
            <Li>als Regulatoren (z.B. Hormone: Insulin)</Li>
            <Li>als Beschleuniger chemischer Reaktionen (Enzyme)</Li>
            <Li>als Abwehrstoffe im Immunsystem (Antikörper)</Li>
            <Li>bei der Blutgerinnung (Fibrin)</Li>
            <P>So vielfältig wie ihre Aufgaben sind auch die Strukturen und Formen der Proteine. Enthält ein Bakterium geschätzte 3.000 unterschiedliche Proteine, so sind es beim Menschen über 100.000.</P>
            <P className="mt-8"><B>Woraus bestehen und wie entstehen Proteine?</B></P>
            <TP>Proteine bildet der Stoffwechsel aus 20 verschiedenen Aminosäuren (AS). Zur Bildung von Proteinen werden die AS zu ursprünglich linear aufgebauten Molekülen verbunden. Besteht eine Kette aus mehr als 100 AS, spricht man von einem Protein. Aufgrund von Wechselwirkungen innerhalb des großen Moleküls bilden sich spezifische, an die jeweiligen Funktionen angepasste räumliche Strukturen aus. Man nennt das Proteinfaltung.</TP>
            <DocImage src="/manual-images/image14.png" caption="Schema der Proteinfaltung" />
            <P>Falsch geformte Proteine können ihre biologischen Aufgaben nicht mehr erfüllen und klumpen oft zu unlöslichen Aggregaten zusammen, die sich in der Zelle oder ihrer unmittelbaren Umgebung ansammeln. Derartige Abfallprodukte schädigen die Zellen. Nach neuen Erkenntnissen spielt das vermutlich so verursachte Absterben von Nervenzellen eine entscheidende Rolle bei vielen altersbedingten Krankheiten des Nervensystems, etwa bei der Alzheimerdemenz. Falsch geformte Proteine stellen außerdem eine energetisch teure ‚Fehlinvestition‘ des Stoffwechsels dar.</P>
            <P className="mt-8"><B>Die Rolle der Aminosäuren</B></P>
            <TP>Der Körper benötigt zur Proteinbildung 20 verschiedene Aminosäuren. Die Baupläne für die Proteine sind im Erbgut einer jeden Zelle gespeichert.</TP>
            <P>Chemische Grundstruktur einer Aminosäure:</P>
            <DocImage src="/manual-images/image15.png" caption="Struktur einer Aminosäure" />
            <P>Jede Aminosäure hat:</P>
            <Li>eine Aminogruppe (NH2)</Li>
            <Li>eine Carboxylgruppe (COOH)</Li>
            <Li>eine variable Seitenkette/Restgruppe (R)</Li>
            <Li>ein Wasserstoffatom (H)</Li>
            <P>Die Aminosäuren werden bei der Herstellung von Proteinen miteinander zu Ketten verknüpft.</P>
            <DocImage src="/manual-images/image16.png" caption="Aufbau einer Proteinkette" />
            <P>Um ihre spätere Gestalt anzunehmen, durchlaufen Proteine den o.g. Prozess der Proteinfaltung. Dabei entsteht zunächst die Sekundärstruktur. Anschließend nimmt das Molekül seine Tertiärstruktur an, die räumliche Anordnung der gefalteten Kette. Sie bestimmt die vollständige dreidimensionale Gestalt. Viele funktionelle Proteine (z.B. Enzyme) müssen sich noch zu einem großen Komplex aus mehreren Untereinheiten zusammenlagern. Dieser heißt Quartärstruktur.</P>
            <DocImage src="/manual-images/image17.png" caption="Proteine: verschiedene Ebenen der Organisation" />
            <P className="mt-8"><B>Proteinbedarf und essentielle (unentbehrliche) Aminosäuren</B></P>
            <TP>Die benötigte Proteinzufuhr kann über den Verzehr proteinreicher Lebensmittel erreicht werden.</TP>
            <P>Von den 20 verschiedenen Aminosäuren, die zum Aufbau von Proteinen benötigt werden, kann unser Organismus neun nicht selbst herstellen. Sie werden als essentiell bezeichnet: Isoleucin, Leucin, Lysin, Methionin, Phenylalanin, Threonin, Tryptophan, Valin sowie für Säuglinge Histidin. Ohne eine regelmäßige Zufuhr dieser essentiellen Aminosäuren können Mangelerscheinungen auftreten.</P>
            <P className="mt-8"><B>Die Komplexität der Proteinfaltung</B></P>
            <TP>Proteine bestehen meist aus 100 bis 500 Aminosäuren. Funktionsfähig wird ein Protein aber erst, wenn es sich zu einer hoch komplexen dreidimensionalen Gestalt gefaltet hat (s.o.).</TP>
            <P>Die meisten Proteine nehmen schnell die richtige Gestalt an. Das liegt an den Eigenschaften der verschiedenen Aminosäuren eines Proteins: Einige von ihnen lagern sich gern an Wassermoleküle an, andere stoßen diese eher ab. Die beiden Grundtypen kommen in den einzelnen Abschnitten der Aminosäurekette unterschiedlich häufig vor. Sie bilden den Antrieb für den Faltungsprozess.</P>
            <P>Bei größeren Proteinen falten sich unterschiedliche Teile erst getrennt voneinander zu Untereinheiten, die sich dann ihrerseits aneinanderlagern. Für diese komplexe Aufgabe hat die Zelle ein eigenes System zur Qualitätskontrolle entwickelt. Der Proteinfaltung liegt ein biochemisches Grundprinzip zugrunde, demzufolge alle Proteine eine Energieminimierung anstreben, also eine für sie energetisch besonders günstige Faltung.</P>
            <P className="mt-8"><B>Die Rolle von Proteinen für Muskel- und Gewebeaufbau</B></P>
            <TP>Körpereigene Proteine sind einem permanenten Auf- und Abbau unterworfen. Muskelproteine beispielsweise werden im Verlauf von vier Monaten einmal komplett erneuert. Für den Aufbau und Erhalt der Muskulatur ist die regelmäßige Zufuhr von Proteinen mit der Nahrung wichtig.</TP>
            <P className="mt-8"><B>Wie hat man sich die Strukturähnlichkeit bzw. -differenz von tierischem resp. pflanzlichem Protein genauer vorzustellen?</B></P>
            <TP>Neben der Proteinmenge ist auch die Proteinqualität wichtig. Lebensmittel sollten so kombiniert werden, dass ein hoher Anteil an essentiellen Aminosäuren erreicht wird.</TP>
            <P>Pflanzliche und tierische Proteine unterscheiden sich in der Zusammensetzung und in der Bioverfügbarkeit der Aminosäuren. Proteine aus Lebensmitteln tierischen Ursprungs enthalten i.d.R. alle essentiellen Aminosäuren in ausreichender Menge. Pflanzliche Lebensmittel weisen oft nicht alle essentiellen Aminosäuren auf. So ist beispielsweise Getreide arm an Lysin, Threonin und Tryptophan, aber reich an Methionin. Hülsenfrüchte sind arm an Methionin, aber reich an Threonin und Tryptophan. Durch die gezielte Kombination von Getreide mit Hülsenfrüchten kann man für einen Ausgleich sorgen.</P>
            <P>Man sollte immer auch die Gesamtzusammensetzung des ganzen Lebensmittels im Blick haben. So bringen Lebensmittel mit pflanzlichem Protein meist deutlich mehr Ballaststoffe, komplexe Kohlenhydrate und Vitamine, aber gleichzeitig weniger gesättigte Fettsäuren mit als Lebensmittel, die tierisches Protein enthalten.</P>
            <P className="mt-8"><B>Die biologische Wertigkeit</B></P>
            <TP>In der Ernährungswissenschaft gibt es den Begriff der biologischen Wertigkeit, wenn es um den Vergleich der Qualität von Nahrungsproteinen geht. Diese Methode benutzt als Maßstab das Protein des Hühnereis. In diesem kommen alle essentiellen Aminosäuren in einem sehr günstigen Verhältnis vor und sie können fast vollständig in körpereigenes Protein umgesetzt werden. Daher hat das Hühnerei eine biologische Wertigkeit von 100.</TP>
            <P>Alle Nahrungsproteine können mit diesem Referenzwert eingeordnet werden. Einige Beispiele:</P>
            <Li>Milch und Milchprodukte haben eine hohe biologische Wertigkeit im 90er-Bereich. Milchprotein ist sehr gut für unsere Versorgung geeignet. Fleisch liegt im hohen 80er-Bereich, denn das Muskelprotein ist unserem körpereigenen sehr ähnlich. Dasselbe gilt für Fisch (&gt;80).</Li>
            <Li>Unter pflanzlichen Nahrungsmitteln hat Reis mit &gt;80 eine hohe biologische Wertigkeit. Auch Sojaprotein (85) gilt als hochwertig und als gute Alternative zu tierischen Proteinquellen. Die Kartoffel folgt mit 70. Hülsenfrüchten mangelt es zwar an der essentiellen Aminosäure Methionin, sie liegen aber noch bei &gt; 50 und liefern große Mengen an wertvollen Ballaststoffen.</Li>
          </SubSection>
        </AccordionSection>

        {/* ── 4. Mikronährstoffe ───────────────────────────── */}
        <AccordionSection number={4} title="Mikronährstoffe" color="bg-blue-600" bgColor="bg-blue-50" textColor="text-blue-800" isOpen={!!openSections[4]} onToggle={() => toggle(4)}>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><List className="text-blue-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={false}>
            <P><B>Mikronährstoffe</B> sind, anders als die Makronährstoffe, <B>keine Energielieferanten</B> des Körpers.</P>
            <P>Es gibt <B>zwei Gruppen</B> von Mikronährstoffen: <B>Vitamine</B> und <B>Mineralstoffe</B>.</P>
            <P><B>Vitamine</B>:</P>
            <Li>wichtig für die <B>Verwertung der Makronährstoffe</B></Li>
            <OLi>Vitamine ermöglichen die <B>Energiegewinnung</B> des Körpers aus Kohlenhydraten, Fetten und Proteinen.</OLi>
            <OLi>unerlässlich hierfür: die <B>B-Vitamine</B>. Alle acht B-Vitamine spielen eine Rolle bei der Energiegewinnung des Körpers aus Makronährstoffen.</OLi>
            <Li><B>unterstützen das Immunsystem</B></Li>
            <OLi>Unterschiedliche Vitamine haben hierbei unterschiedliche Funktionen. Beispiele:</OLi>
            <SqLi>Vitamin A: Stärkung der Schleimhäute gegen Krankheitserreger</SqLi>
            <SqLi>Vitamin C: fördert die Bildung von Immunzellen</SqLi>
            <SqLi>Vitamin D: steuert die gesamte Immunreaktion</SqLi>
            <P><B>Mineralstoffe</B>:</P>
            <Li>wie die Vitamine beteiligt an</Li>
            <OLi><B>Verwertung der Makronährstoffe</B></OLi>
            <OLi><B>Unterstützung des Immunsystems</B></OLi>
            <Li>außerdem wichtig für unser <B>Nervensystem</B>: Mineralstoffe regulieren das Nervensystem und stabilisieren seine Funktionen.</Li>
            <OLi>Beispiele: Magnesium, Kalzium, Kalium, Zink, Eisen</OLi>
            <Li>wirken sich auch auf die <B>psychische Gesundheit</B> aus</Li>
            <Li>beeinflussen <B>Aufmerksamkeit und Denkleistung</B></Li>
            <P>Die <B>Versorgung</B> des Körpers mit Mikronährstoffen:</P>
            <P>Der Körper benötigt <B>Mikro</B>nährstoffe – verglichen mit den <B>Makro</B>nährstoffen – in <B>kleineren Mengen</B>.</P>
            <Li><B>Eine ausgewogene Ernährung</B> reicht aus, um den Bedarf an Vitaminen und Mineralstoffen zu decken.</Li>
            <Li>Eine ausgewogene Ernährung ist aber unerlässlich für eine gute Versorgung, weil die <B>meisten Mikronährstoffe essentiell</B> sind: Der Körper kann sie nicht selbst herstellen.</Li>
            <Arr><B>Vermutete Unterversorgungen</B> mit bestimmten Mikronährstoffen sollten nicht eigenständig mit Nahrungsergänzungsmitteln behandelt, sondern ärztlich diagnostiziert werden.</Arr>
            <P><B>Salz</B>:</P>
            <Li>versorgt den Körper mit den Nährstoffen <B>Natrium</B> und <B>Chlorid</B></Li>
            <Li><B>Gefahr einer Überversorgung</B>:</Li>
            <OLi>Bei zu viel Salzkonsum gelangt zu viel Natrium ins Blut. Natrium bindet Wasser im Blut, dies führt zu Wassereinlagerungen im umliegenden Gewebe. <B>Krankheiten wie Herzinfarkt und Schlaganfall</B> werden so begünstigt.</OLi>
            <P><B>Salz-Empfehlung</B> der Weltgesundheitsorganisation (WHO: World Health Organization):</P>
            <TP><B>Höchstens 5 Gramm Salz pro Tag</B></TP>
            <Li>Dies ist eine sehr kleine Menge (entspricht einem nicht zu vollen Teelöffel).</Li>
            <P>Tipps:</P>
            <Li>auf Salzgehalt von Lebensmitteln achten: Fertigprodukte enthalten oft viel Salz</Li>
            <Li>beim Kochen wenig salzen, nicht voreilig nachsalzen</Li>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 font-semibold text-sm leading-none">?</span></div>} title="Vertiefende Fragen">
            <Num n={1}>Was ist der Hauptunterschied zwischen Makro- und Mikronährstoffen? Welche Gruppen von Mikronährstoffen gibt es? Welchen Einfluss haben Mikronährstoffe auf die Verwertung der Makronährstoffe?</Num>
            <Num n={2}>Welche Rolle spielen Vitamine für das Immunsystem, welche Mineralstoffe für das Nervensystem?</Num>
            <Num n={3}>Wie lässt sich der Bedarf an Mikronährstoffen decken und was ist von Nahrungsergänzungsmitteln zu halten?</Num>
            <Num n={4}>Was passiert im Körper bei der Aufnahme von Salz und warum kann das gefährlich werden? Wie lässt sich ein hoher Salzkonsum auf 5 Gramm am Tag reduzieren?</Num>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center"><Lightbulb className="text-blue-600" size={14} /></div>} title="Weiterführende Informationen">
            <P className="mt-8"><B>Vitamine: Allgemeines</B></P>
            <TP>Zu den Vitaminen zählt man eine Reihe lebenswichtiger Stoffe. Wir müssen sie in kleinen Mengen regelmäßig über die Nahrung aufnehmen. Die meisten Vitamine sind essentiell. Sie sind an lebenswichtigen Reaktionen beteiligt und spielen in vielen Stoffwechselprozessen eine unverzichtbare Rolle.</TP>
            <P>Die Vitamine lassen sich in wasserlösliche und fettlösliche einteilen. Zu den wasserlöslichen Vitaminen gehören die Gruppe der B-Vitamine und das Vitamin C. Zu den fettlöslichen Vitaminen zählen wir die Vitamine A, D, E und K.</P>
            <DocImage src="/manual-images/image18.jpeg" caption="Vitamine: Ein Überblick" maxHeight="267px" />
            <P className="mt-8"><B>Warum gibt es mehrere ‚Nummern‘ vom gleichen Vitamin: Was bedeutet das?</B></P>
            <TP>Die Benennung der Vitamine wirkt auf den ersten Blick lückenhaft und unordentlich. Das ist historisch bedingt. Die Lücken in der Namensgebung entstanden unter anderem deshalb, weil viele der ursprünglich als Vitamine entdeckten und listenartig benannten Stoffe sich später als keineswegs einheitliche Substanzen herausstellten. In der Folge wurden einige Bezeichnungen aus der Benennungsliste entfernt, die übrigen aber beibehalten.</TP>
            <P>Die Entdeckung der Vitamine begann Anfang des 20. Jahrhunderts. Damals war deren chemische Struktur noch nicht bekannt, so dass man sie zunächst nicht exakt wissenschaftlich bezeichnen konnte. Daher wurde den Vitaminen je ein großer Buchstabe des Alphabets zugeordnet.</P>
            <P className="mt-8"><B>Die heutige Benennung der Vitamine</B></P>
            <TP>Heute richtet sich der chemische Name eines Vitamins nach seiner chemischen Struktur. Bei den Trivialnamen werden immer noch die altbekannten Buchstaben verwendet, teilweise mit einer Nummer ergänzt. Teilweise gab es mehrere Trivialnamen, in der Regel hat sich aber jeweils nur ein Trivialname durchgesetzt.</TP>
            <P className="mt-8"><B>Wasserlösliche Vitamine anhand von Beispielen</B></P>
            <P className="mt-4"><B>Makronährstoff-Verwertung und B-Vitamine</B></P>
            <P>Die B-Vitamine Panthotensäure, Folsäure, Biotin, Niacin und Cobalamin werden vor allem im Stoffwechsel gebraucht. Sie ermöglichen den Abbau von Kohlenhydraten und Fetten zu Energie oder den Aufbau von neuen Eiweißen aus Aminosäuren. Sie sind aber auch für die normale Funktion und Entwicklung jeder Zelle wichtig. Cobalamin ist außerdem ein gutes Beispiel für die Bedeutung von Spuren-Metallen im Stoffwechsel. Es enthält als wichtiges funktionsnotwendiges Zentralatom ein Kobalt-Atom. Kobalt ist in größeren Mengen ein gefährliches Schwermetall, in Form einzelner Atome jedoch ein Spurenelement und lebenswichtig als Bestandteil dieses Vitamins:</P>
            <DocImage src="/manual-images/image19.png" caption="" maxWidth="280px" maxHeight="none" />
            <P className="mt-8"><B>Funktionen von B-Vitaminen (Beispiele)</B></P>
            <TP>Vitamin B1 (Thiamin) spielt eine zentrale Rolle im Stoffwechsel der Kohlenhydrate. Bei der Umsetzung dieser Gruppe von Makronährstoffen in Energie wird Vitamin B1 benötigt. Da es sich bei den Reaktionen verbraucht, muss es mit der Nahrung nachgeliefert werden.</TP>
            <P>Vitamin B2 (Riboflavin) dient als chemische Vorstufe für die sog. Flavin-Koenzyme (FAD, FMN). Diese besitzen eine zentrale Funktion bei der Energiegewinnung aus allen drei Makronährstoffen: Kohlenhydrate, Fette, Proteine.</P>
            <P>Vitamin B12 (Cobalamin) nimmt eine Sonderstellung ein. Es kann nur von Bakterien gebildet werden, von Tieren oder Pflanzen hingegen nicht oder nur in geringer Menge. Im menschlichen Darm bilden Mikroben zwar etwas B12, dies reicht aber nicht für die eigene Versorgung aus. Daher muss es mit der Nahrung aufgenommen werden. Cobalamin benötigen wir für Zellteilung, Blutbildung sowie die Funktion des Nervensystems. Der Hauptlieferant ist Fleisch. Ein Mangel kann durch unzureichende oder einseitige Ernährung entstehen (z.B. bei veganen Ernährungsformen). Menschen, die sich vegetarisch oder vegan ernähren, sollten ihren B12-Wert im Auge behalten. Meist ist dann eine kontrollierte Substitution dieses Vitamins notwendig.</P>
            <P className="mt-8"><B>Fettlösliche Vitamine anhand von Beispielen</B></P>
            <TP>Vitamin A (Retinol) benötigen wir für Zellwachstum und -entwicklung. Auch für die Funktion von Schleimhäuten (Lunge, Darm) wird es gebraucht. Zudem spielt es beim Sehvorgang eine Rolle und bei der Arbeit des Immunsystems. Wir nehmen Vitamin A mit tierischen Lebensmitteln direkt auf oder bilden es aus pflanzlichen Vorstufen (z.B. aus Carotinoiden) selbst.</TP>
            <P>Vitamin D (Calciferol) ist unverzichtbar bei Aufbau und Stoffwechsel der Knochen. Einem Mangel an Vitamin D kann man nur zum Teil mit entsprechender Ernährung entgegenwirken (vor allem Seefisch ist reich an Vitamin D), für die Bildung von Vitamin D ist unser Körper vor allem von Sonneneinstrahlung auf unsere Haut angewiesen. Ein dauerhafter Mangel an diesem Vitamin führt zu einem Verlust von Knochenmasse (Osteoporose). Eine kontrollierte Substitution kann auch hier sinnvoll sein.</P>
            <P className="mt-8"><B>Mineralstoffe: Allgemeines</B></P>
            <TP>Unter Mineralstoffen versteht man mehr als 20 chemische Elemente, die im Organismus viele Aufgaben erfüllen. Sie werden zum Beispiel für den Aufbau von Zähnen und Knochen benötigt oder auch für die Funktion von Enzymen. Zudem spielen sie im Wasserhaushalt eine Rolle und im Hormon- sowie im Immunsystem. Sie werden entsprechend unserem Bedarf in Mengenelemente und Spurenelemente eingeteilt.</TP>
            <DocImage src="/manual-images/image20.jpeg" caption="Mineralstoffe: Ein Überblick" maxHeight="256px" />
            <P className="mt-8"><B>Die Funktionen der Mineralstoffe in Kürze:</B></P>
            <Li>Natrium/Kalium: Regulation des Wasserhaushalts; Kalium: Funktion von Membranen</Li>
            <Li>Magnesium: aktiviert Enzyme; unterstützt die Reizübertragung von Muskeln und Nerven</Li>
            <Li>Calcium: Baustoff für Knochen und Zähne</Li>
            <Li>Eisen: Blutbildung und Sauerstofftransport (Zentralatom im Hämoglobin)</Li>
            <Li>Zink: unterstützt Zellbildung, Hormonwirkung und Immunsystem; neutralisiert schädliche Moleküle („Radikale“)</Li>
            <Li>Selen: fördert antioxidative Prozesse/Entgiftung; unterstützt Funktion der Bauchspeicheldrüse</Li>
            <Li>Jod: Bestandteil der Schilddrüsenhormone</Li>
            <Li>Fluorid/Fluor: kein ‚echtes‘ Spurenelement; hilft aber bei der Aushärtung von Knochen, Zahnschmelz und Dentin der Zähne und erhöht die Widerstandsfähigkeit gegen Karies</Li>
            <P className="mt-8"><B>Warum bringt ein Zuviel an Nährstoffen (etwa durch Einnahme von Nahrungsergänzungsmitteln) nichts? Warum gilt bei Mikronährstoffen nicht: ‚Mehr ist besser‘?</B></P>
            <TP>Normalerweise können wir unseren Bedarf an Mikronährstoffen mit ausgewogener Ernährung mühelos decken. Motto: Je bunter es auf dem Teller ist, desto eher sind wir auf der sicheren Seite. Allerdings gibt es Bedingungen, unter denen es für einige Stoffe knapp werden kann. Dazu zählt die Versorgung mit Vitamin D in der dunklen Jahreszeit oder – bei veganer Ernährungsweise – mit Vitaminen der B-Gruppe. Bei Mangelzuständen können sie unter ärztlicher Kontrolle von außen zugefügt (substituiert) werden.</TP>
            <P>Ein Zuviel an einzelnen Nährstoffen kann die Aufnahme anderer Nährstoffe behindern, etwa Zink und Eisen. Fettlösliche Vitamine können sich bei übermäßiger Aufnahme im Körper anreichern, weil wir sie nicht wie die wasserlöslichen über die Niere ausscheiden können. Daher besteht hier eine Gefahr der Überdosierung bzw. Akkumulation, was zu unerwünschten Nebenwirkungen führt.</P>
            <P className="mt-8"><B>Was passiert im Körper genau nach Salzkonsum? Warum kann zu viel Salz auf Dauer bestimmte Erkrankungen auslösen?</B></P>
            <TP>Natrium als Bestandteil von Kochsalz ist das wichtigste Ion im Körper. Ein Ion ist ein elektrisch geladenes Atom. Ionen können sich bilden, wenn Atome miteinander reagieren und beispielsweise zu Salzen werden (z.B. Kochsalz, NaCl: gelöst als Na+ und Cl-). Sind die Salze in Wasser gelöst, liegen die Ionen in der Lösung mit einer wässrigen Hydrathülle vor.</TP>
            <P>Im Zusammenspiel mit Kalium ist Natrium unverzichtbar für den Wasserhaushalt. Außerdem benötigen wir Natrium für die Knochen und die Funktion von Membranen. Natrium reguliert den osmotischen Druck (Konzentrationsdruck gelöster Teilchen) der Zellen und des Flüssigkeitsraums außerhalb der Zellen. Dadurch beeinflusst es auch maßgeblich die Blutmenge in den Gefäßen und damit den Blutdruck, weil es das Wasser in den Blutgefäßen ‚festhält‘ und sich der Druck innerhalb dieses begrenzten Raumes daraufhin erhöht.</P>
            <P>Wird zu viel Speisesalz verzehrt, hat das eine Erhöhung des Blutdrucks zur Folge. Das Risiko für Bluthochdruck (Hypertonie) steigt. Bluthochdruck wiederum gehört zu den wichtigsten Risikofaktoren für das Auftreten von Herz-Kreislauf-Krankheiten.</P>
          </SubSection>
        </AccordionSection>

        {/* ── 5. Unterwelt ─────────────────────────────────── */}
        <AccordionSection number={5} title="‚Unterwelt‘" color="bg-purple-600" bgColor="bg-purple-50" textColor="text-purple-800" isOpen={!!openSections[5]} onToggle={() => toggle(5)}>

          <SubSection icon={<div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center"><List className="text-purple-600" size={14} /></div>} title="Zentrale Inhalte" defaultOpen={false}>
            <Num n={1}><B>Süßstoffe</B></Num>
            <P className="mt-8"><B>Warum Süßstoffe?</B></P>
            <Li><B>Die Idee</B>: Durch den Konsum von Süßstoffen sollen die Gefahren eines zu hohen Zuckerkonsums vermieden werden.</Li>
            <Li><B>Das Risiko</B>: Der Konsum von mit Süßstoffen gesüßten Lebensmitteln kann <B>unser Verlangen nach Süßem</B> deutlich <B>steigern</B>.</Li>
            <Arr>Der Konsum von Süßstoffen <B>verändert</B> auf Dauer unser <B>Süße-Empfinden</B>.</Arr>
            <P><B>Süßstoffe</B> sind häufig <B>deutlich süßer</B> als Zucker.</P>
            <Li><B>Typisches Beispiel</B>: Zuckerfreie, mit Süßstoffen gesüßte Getränke (Energy-Drinks, Coke Zero etc.)</Li>
            <Li>Der Konsum von Süßstoffen führt vermutlich zu einer <B>Herabsetzung der Schwelle</B>, ab der wir <B>Süße wahrnehmen</B>.</Li>
            <Li><B>Die Folge</B>: Bei häufigem Konsum verlangt der Körper nach immer süßeren Lebensmitteln, wir konsumieren letztlich immer mehr Süßes.</Li>
            <P><B>Tipp zum Umgang mit Süßem</B>: Lebensmittel, die von Natur aus süß sind (z.B. <B>Obst</B>) enthalten Zucker in einer Form, die vom Körper gesund verstoffwechselt werden kann. Solche Lebensmittel sind Lebensmitteln mit künstlichen Süßstoffen vorzuziehen.</P>
            <div className="mt-8"><Num n={2}><B>Transfette</B></Num></div>
            <P className="mt-8"><B>Was sind Transfettsäuren?</B></P>
            <TP>Transfettsäuren sind Fettsäuren, die durch das <B>Härten pflanzlicher Öle</B> entstehen. Transfettsäuren sind für den menschlichen Körper <B>besonders ungesund</B>.</TP>
            <P className="mt-8"><B>Wie entstehen Transfettsäuren?</B></P>
            <Li>Transfettsäuren entstehen natürlicherweise z.B. im Magen von Wiederkäuern (z.B. von Kühen) durch bestimmte Mikroorganismen.</Li>
            <Li><B>Problematisch</B> ist die <B>industrielle Härtung</B>, z.B. bei der Herstellung von Margarine aus flüssigen Pflanzenölen.</Li>
            <P className="mt-8"><B>Vorgang:</B></P>
            <Li>Die ursprünglich gesunden ungesättigten Fettsäuren der Pflanzenöle werden nicht ganz durchgehärtet, es bilden sich ungesättigte Fettsäuren mit einer speziellen chemischen Struktur: Transfettsäuren.</Li>
            <P className="mt-8"><B>Wo kommen Transfettsäuren vor?</B></P>
            <TP><B>Typische Lebensmittel</B>, die Transfettsäuren enthalten:</TP>
            <Li>Backwaren (z.B. Croissants, Berliner/Krapfen, Kekse)</Li>
            <Li>Süßigkeiten und Snacks (z.B. Chips)</Li>
            <Li>Fertigprodukte (z.B. Fertigpizza, Fertigsuppen)</Li>
            <Li>Fast Food und Frittiertes (z.B. Hamburger, Pommes)</Li>
            <P className="mt-8"><B>Wie erkenne ich Transfettsäuren?</B></P>
            <Li>Lebensmittel, auf deren Verpackung „<B>teilweise gehärtete Fette</B>“ angegeben sind, enthalten Transfettsäuren.</Li>
            <div className="mt-8"><Num n={3}><B>Protein-Produkte: Shakes, Riegel etc.</B></Num></div>
            <P>Müssen wir unserem Körper <B>zusätzliches Protein</B> zuführen?</P>
            <Li>Über eine <B>ausgewogene Ernährung</B> kann der Körper <B>ausreichend mit Protein</B> versorgt werden. Eine <B>Ergänzung</B> durch künstliche Protein-Produkte ist <B>nicht notwendig</B>.</Li>
            <P>Die <B>unnatürliche Zusammensetzung</B> künstlicher Protein-Produkte:</P>
            <Li>Künstliche Protein-Produkte enthalten oft viele <B>Zusatzstoffe</B>. Bei vielen dieser Stoffe wissen wir nichts über die Effekte auf unseren Körper.</Li>
            <Li>In <B>natürlichen Lebensmitteln</B> kommt Protein immer <B>gepaart mit anderen Nährstoffen</B> vor, die der Körper ebenfalls benötigt.</Li>
            <Arr>Nahrungsergänzungsmittel sollten <B>nie reguläre Mahlzeiten ersetzen</B>.</Arr>
            <P>Für <B>Sportler:innen</B>: Proteine für den <B>Muskelaufbau</B></P>
            <Li>Proteine spielen beim Muskelaufbau eine <B>wichtige Rolle</B>.</Li>
            <Li>Auch für Sportler:innen gilt: Der Körper kann seinen Bedarf, auch für den Muskelaufbau, über das <B>in natürlichen Lebensmitteln vorkommende Protein</B> decken.</Li>
            <Li>Auch Sportler:innen benötigen <B>alle Nährstoffe</B> in ausreichender Menge – nicht nur Protein. Dies kann nur über eine ausgewogene Ernährung erreicht werden.</Li>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-600 font-semibold text-sm leading-none">?</span></div>} title="Vertiefende Fragen">
            <Num n={1}>Was verspricht man sich von zuckerfreien Süßstoffen? Aus welchen Gründen sind sie dennoch problematisch? Auf welche Produkte sollte man lieber ganz verzichten?</Num>
            <Num n={2}>Worum handelt es sich bei Transfetten chemisch gesehen? Wie entstehen sie – in der Natur und in der Lebensmittelindustrie? Worin befinden sich Transfette und wie erkennt man entsprechende Produkte im Supermarkt?</Num>
            <Num n={3}>Warum werden Proteinshakes zum Muskelaufbau nicht wirklich benötigt? Wozu sollte man sportlichen Menschen stattdessen raten?</Num>
            <Num n={4}>Diskutiert: Ist es möglich, auf die Produkte aus der ‚Unterwelt‘ der Ernährung ganz zu verzichten? Sollte ihre Verwendung in der Lebensmittelindustrie von der Politik stärker eingeschränkt werden?</Num>
          </SubSection>

          <SubSection icon={<div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center"><Lightbulb className="text-purple-600" size={14} /></div>} title="Weiterführende Informationen">
            <Num n={1}><B>Süßstoffe</B></Num>
            <P className="mt-8"><B>Wie kommt es, dass wir uns an Süßes gewöhnen können?</B></P>
            <TP>Zentral ist hier unser körpereigenes Belohnungssystem. Eine Studie des Max-Planck-Instituts für Stoffwechselforschung hat gezeigt, dass unmittelbar nach dem Verzehr von zuckerreichen Lebensmitteln Dopamin (Begriffserklärung s.u.) ausgeschüttet wird, noch bevor die Nahrung den Magen erreicht (vgl. Thanarajah et al.). Je nach individuellem Verlangen wird sogar zu unterschiedlichen Zeitpunkten unterschiedlich viel Dopamin ausgeschüttet. Die Gehirne von Versuchsteilnehmer:innen mit einem starken Verlangen nach zuckerreicher Nahrung schütteten direkt nach dem Verzehr eine große Menge an Dopamin aus.</TP>
            <P className="mt-8"><B>Zucker (und Fett) programmieren unsere Synapsen um</B></P>
            <TP>Forschende maßen die Aktivität bestimmter Hirnregionen und stellten fest, dass das Dopamin-ausschüttende System besonders stark bei Teilnehmer:innen aktiviert wurde, die ein sehr fett- und zuckerreiches Gericht aßen. Der erhöhte Zuckerkonsum veränderte die neuronalen Schaltkreise so, dass zuckerreiche Nahrung bei den Proband:innen eine stärkere belohnende Wirkung hatte und sie nach dem Experiment zucker- und fettreiche Lebensmittel positiver bewerteten.</TP>
            <P className="mt-8"><B>Dopamin</B></P>
            <TP>Dopamin ist ein Botenstoff (sog. Neurotransmitter), der hauptsächlich im Gehirn vorkommt. Es wird umgangssprachlich auch als Wohlfühl- oder Glücks-Botenstoff bezeichnet.</TP>
            <P>Neueren Befunden zufolge spielt Dopamin eine wichtige Rolle im Belohnungs- und Motivationssystem des Gehirns (sog. mesolimbisches System). Dopamin vermittelt vor allem die Zuweisung von Begehren (wanting). Interessant: Das wanting, das beim Belohnungslernen eine zentrale Funktion ausübt, wird in der Psychologie als bedeutsam bei der Entstehung von Suchterkrankungen angesehen.</P>
            <P className="mt-8"><B>Die Wirkung von Süßstoffen</B></P>
            <TP>Zucker-Ersatzstoffe sollen eine Aktivierung des Belohnungssystems ohne die ‚Nebenwirkungen‘ von Zucker wie Übergewicht, Typ-2-Diabetes etc. ermöglichen. Zu beachten ist aber, dass viele langfristige Effekte von Zucker-Ersatzstoffen auf den Organismus bisher nicht eingeschätzt werden können.</TP>
            <P>Was bisher als gesichert gilt: Künstliche Süßstoffe wie Aspartam, Saccharin und Sucralose beeinflussen das Darmmikrobiom (d.h. die im Darm vorkommenden Mikroorganismen) negativ, so zeigt eine Studie (vgl. Suez et al.). Untersuchungen zeigen, dass bereits moderate Mengen der Süßstoffe die Zusammensetzung und Funktion der Darmbakterien verändern können. Dadurch verschlechtert sich die Glukosetoleranz, das Risiko für Erkrankungen wie Typ-2-Diabetes steigt. Außerdem fördern sie das Wachstum unerwünschter Bakterien, können die Darmbarriere schädigen („leaky gut“) und Entzündungen begünstigen. Überdies konnte eine weitere Studie zeigen, dass regelmäßiger Konsum künstlicher Süßstoffe wie Aspartam, Sucralose oder Saccharin mit einem beschleunigten kognitiven Abbau und Herz-Kreislauf-Erkrankungen verbunden sein kann (vgl. Gonçalves et al.).</P>
            <P>Weiterhin wird das Verlangen nach Süßem durch den Konsum von Süßstoffen nicht gestillt, sondern – im Gegenteil – verstärkt. Eine aktuelle Studie belegt z.B., dass der Zuckerersatzstoff Sucralose den Hypothalamus aktiviert, eine wichtige Schaltzentrale für Hunger und Sättigung (vgl. Chakravartti et al.). Daraufhin steigert sich das Hungergefühl, und zwar besonders bei Menschen mit Übergewicht (Adipositas). Wenn künstliche Süßstoffe dem Gehirn Zuckersignale senden, aber die vom Körper erwarteten Kalorien ausbleiben, führt genau dies zu einem größeren Hungergefühl.</P>
            <P>Die Weltgesundheitsorganisation (WHO: World Health Organization) gibt in ihren Richtlinien zum Gebrauch von Zucker-Ersatzstoffen einen Rat, den man einfach umsetzen kann: Statt diese Mittel zu konsumieren, sollte man bei Lust auf Süßes lieber Obst essen, denn dieses liefert wertvolle Ballaststoffe, Vitamine, Mineralien und Spurenelemente.</P>
            <div className="pl-8 mt-4">
              <p className="text-xs text-gray-600 mb-1"><B>Quellen „Süßstoffe“:</B></p>
              <p className="text-xs text-gray-600 mb-3">Chakravartti SP, Jann K, Veit R, Liu H, Yunker AG, Angelo B, Monterosso JR, Xiang AH, Kullmann S, Page KA. Non-caloric sweetener effects on brain appetite regulation in individuals across varying body weights. Nat Metab. 2025 Mar;7(3):574-585. doi: 10.1038/s42255-025-01227-8. Epub 2025 Mar 26. PMID: 40140714.</p>
              <p className="text-xs text-gray-600 mb-3">Gonçalves NG, Martinez-Steele E, Lotufo PA, Bensenor I, Goulart AC, Barreto SM, Giatti L, de Faria CP, Molina MDCB, Caramelli P, Marchioni DM, Suemoto CK. Association Between Consumption of Low- and No-Calorie Artificial Sweeteners and Cognitive Decline: An 8-Year Prospective Study. Neurology. 2025 Oct 7;105(7):e214023. doi: 10.1212/WNL.0000000000214023. Epub 2025 Sep 3. PMID: 40902134.</p>
              <p className="text-xs text-gray-600 mb-3">Suez J, Korem T, Zeevi D, Zilberman-Schapira G, Thaiss CA, Maza O, Israeli D, Zmora N, Gilad S, Weinberger A, Kuperman Y, Harmelin A, Kolodkin-Gal I, Shapiro H, Halpern Z, Segal E, Elinav E. Artificial sweeteners induce glucose intolerance by altering the gut microbiota. Nature. 2014 Oct 9;514(7521):181-6. doi: 10.1038/nature13793. Epub 2014 Sep 17. PMID: 25231862.</p>
              <p className="text-xs text-gray-600 mb-3">Thanarajah SE, Backes H, DiFeliceantonio AG, Albus K, Cremer AL, Hanssen R, Lippert RN, Cornely OA, Small DM, Brüning JC, Tittgemeyer M. Food Intake Recruits Orosensory and Post-ingestive Dopaminergic Circuits to Affect Eating Desire in Humans. Cell Metab. 2019 Mar 5;29(3):695-706.e4. doi: 10.1016/j.cmet.2018.12.006. Epub 2018 Dec 27. PMID: 30595479.</p>
            </div>
            <div className="mt-8"><Num n={2}><B>Transfette</B></Num></div>
            <P className="mt-8"><B>Wie entstehen Transfettsäuren?</B></P>
            <TP>Transfettsäuren entstehen vor allem durch lebensmitteltechnologische Prozesse wie die sog. Fetthärtung. Dies ist ein Verfahren, bei dem fette Öle in feste oder streichfähige Fette umgewandelt werden. Aus ursprünglich gesunden Pflanzenölen werden Produkte gewonnen, die bessere technische Eigenschaften als natürliche (feste) Fette wie Butter oder Schmalz aufweisen und sich gut lagern lassen. Solche industriell gehärteten Fette werden aufgrund ihres z.T. hohen Gehaltes an Transfettsäuren auch als Transfette bezeichnet.</TP>
            <P className="mt-8"><B>Was sind Transfettsäuren?</B></P>
            <TP>Ungesättigte Fettsäuren liegen in der Natur hauptsächlich in sogenannter cis-Konfiguration vor. Durch die Härtung kann es zu einer Veränderung der Konfiguration der Doppelbindungen kommen: Es entstehen Transfettsäuren, in denen sich die Wasserstoffatome an den durch Doppelbindungen verknüpften Kohlenstoffatomen auf entgegengesetzten Seiten befinden.</TP>
            <DocImage src="/manual-images/image_transfett.png" caption="Chemische Struktur der Ölsäure im Vergleich mit den beiden trans-C18:1-Fettsäuren" maxHeight="206px" />
            <P className="mt-8"><B>Die Wirkung von Transfettsäuren</B></P>
            <TP>Transfettsäuren besitzen keine bekannte positive Funktion im Organismus, aber negative Auswirkungen auf den Stoffwechsel sind eindeutig belegt. Eine hohe Zufuhr von Transfettsäuren birgt das Risiko für eine Fettstoffwechselstörung, die zu einer Erhöhung des Triglycerid-Spiegels führt. Auch wird das Verhältnis zwischen LDL-Cholesterol und HDL-Cholesterol im Blut nachteilig verändert. Die Auswirkungen auf die Gesundheit können erheblich sein und sowohl die Entstehung von Arteriosklerose als auch einer koronaren Herzkrankheit begünstigen sowie das Herzinfarktrisiko erhöhen.</TP>
            <div className="mt-8"><Num n={3}><B>Protein-Produkte: Shakes, Riegel etc.</B></Num></div>
            <P className="mt-8"><B>Braucht unser Körper Protein-Produkte?</B></P>
            <TP>Die benötigte Proteinzufuhr kann für einen Menschen in der Regel über den Verzehr proteinreicher Lebensmittel mühelos sichergestellt werden.</TP>
            <P>Gerade bei jüngeren Menschen, die viel Sport treiben, hat sich die Meinung verbreitet, man müsse den Körper durch eine hohe Proteinaufnahme bei Erhalt und Aufbau der Muskulatur unterstützen. Das ist in einem gewissen Rahmen sinnvoll, kann aber schon durch Anpassungen im persönlichen Speiseplan erreicht werden.</P>
            <P className="mt-8"><B>Kann man zu viel Protein zu sich nehmen?</B></P>
            <TP>In der Wissenschaft wird überdies diskutiert, ob ein Zuviel an Protein schädlich sein könnte. Die Befunde sind bislang nicht eindeutig, aber es gibt Hinweise darauf, dass ein Übermaß an Protein die Niere belastet. Zudem ist eine mögliche Erhöhung des Risikos für Typ 2-Diabetes durch übermäßig hohen Proteinkonsum in der wissenschaftlichen Diskussion. Teure ‚High Protein‘-Produkte oder zusätzliche Eiweißshakes sind für gesunde Menschen nicht notwendig. Der vermutete Nutzen wird in der Regel überschätzt, während potenzielle Risiken nicht ausgeschlossen werden können.</TP>
          </SubSection>
        </AccordionSection>

      </div>
    </div>
  );
}
