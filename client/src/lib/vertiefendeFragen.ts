export interface VertiefendeFrage {
  lessonTitle: string;
  lessonOrder: number;
  gruppen: {
    gruppe: number;
    fragen: string;
  }[];
}

export const vertiefendeFragen: VertiefendeFrage[] = [
  {
    lessonTitle: "Kohlenhydrate",
    lessonOrder: 2,
    gruppen: [
      {
        gruppe: 1,
        fragen: "Wie wird die Energie aus den Makronährstoffen im Körper gespeichert? Warum sind Kohlenhydrate wichtig für unser Gehirn?"
      },
      {
        gruppe: 2,
        fragen: "Worin unterscheiden sich komplexe Kohlenhydrate von Einfachzuckern (chemisch gesehen) und welche Folgen hat das für die Verdauung? Wie funktioniert die Verwertung von Kohlenhydraten?"
      },
      {
        gruppe: 3,
        fragen: "Welche Kohlenhydrate können als \u2018gut\u2019 gelten und warum? In welchen Lebensmitteln befinden sie sich? Welche Kohlenhydrate müssen als \u2018schlecht\u2019 gelten und warum? In welchen Lebensmitteln befinden sie sich?"
      },
      {
        gruppe: 4,
        fragen: "Welche Folgen hat der Konsum von Einfachzuckern für unser Körpergefühl und unsere Leistungsfähigkeit, welche der Konsum von komplexen Kohlenhydraten? Warum ist es möglich, durch Essen einer Banane vor Prüfungen die Effekte beider Arten von Kohlenhydraten optimal auszunutzen?"
      }
    ]
  },
  {
    lessonTitle: "Fette",
    lessonOrder: 3,
    gruppen: [
      {
        gruppe: 1,
        fragen: "Welche Funktionen erfüllen Fette im Körper? Warum ist es bei Fetten besonders wichtig, nicht zu viel zu konsumieren? Was sind die Obergrenzen?"
      },
      {
        gruppe: 2,
        fragen: "Wie sind Fette chemisch aufgebaut und welche Rolle spielen die Fettsäuren? Was sind die wichtigsten Unterschiede zwischen den Fettsäuren hinsichtlich ihrer Funktion/Wirkung und Herstellung?"
      },
      {
        gruppe: 3,
        fragen: "Was ist der Unterschied zwischen gesättigten Fettsäuren und einfach ungesättigten Fettsäuren (chemisch gesehen)? Warum gelten erstere als \u2018schlecht\u2019 und letztere als relativ \u2018gut\u2019? In welchen Lebensmitteln findet man sie jeweils?"
      },
      {
        gruppe: 4,
        fragen: "Was sind mehrfach ungesättigte Fettsäuren (chemisch gesehen) und in welchen Lebensmitteln befinden sie sich? Inwiefern haben sie eine Sonderstellung unter den Fettsäuren und warum sind sie so gesund?"
      }
    ]
  },
  {
    lessonTitle: "Proteine",
    lessonOrder: 4,
    gruppen: [
      {
        gruppe: 1,
        fragen: "Wie sind Proteine chemisch aufgebaut und was macht sie so kompliziert, aber auch faszinierend? Welche Funktionen erfüllen sie in unserem Körper? Welchen Beitrag leisten sie zum Muskelaufbau?"
      },
      {
        gruppe: 2,
        fragen: "Was ist der wesentliche Unterschied zwischen tierischem und pflanzlichem Protein im Hinblick auf den Menschen? Was sind jeweils die Vorteile und Nachteile von pflanzlichem und tierischem Protein?"
      },
      {
        gruppe: 3,
        fragen: "Wie lassen sich die Nachteile von pflanzlichem Protein ausgleichen, um seine Vorteile nutzen zu können? Welche Lebensmittel werden dazu benötigt?"
      },
      {
        gruppe: 4,
        fragen: "Diskutiert: Inwieweit führen die Ernährungsempfehlungen zum Thema Protein zu einer veganen Lebensweise?"
      }
    ]
  },
  {
    lessonTitle: "Mikronährstoffe",
    lessonOrder: 5,
    gruppen: [
      {
        gruppe: 1,
        fragen: "Was ist der Hauptunterschied zwischen Makro- und Mikronährstoffen? Welche Gruppen von Mikronährstoffen gibt es? Welchen Einfluss haben Mikronährstoffe auf die Verwertung der Makronährstoffe?"
      },
      {
        gruppe: 2,
        fragen: "Welche Rolle spielen Vitamine für das Immunsystem, welche Mineralstoffe für das Nervensystem?"
      },
      {
        gruppe: 3,
        fragen: "Wie lässt sich der Bedarf an Mikronährstoffen decken und was ist von Nahrungsergänzungsmitteln zu halten?"
      },
      {
        gruppe: 4,
        fragen: "Was passiert im Körper bei der Aufnahme von Salz und warum kann das gefährlich werden? Wie lässt sich ein hoher Salzkonsum auf 5 Gramm am Tag reduzieren?"
      }
    ]
  },
  {
    lessonTitle: "Unterwelt",
    lessonOrder: 6,
    gruppen: [
      {
        gruppe: 1,
        fragen: "Was verspricht man sich von zuckerfreien Süßstoffen? Aus welchen Gründen sind sie dennoch problematisch? Auf welche Produkte sollte man lieber ganz verzichten?"
      },
      {
        gruppe: 2,
        fragen: "Worum handelt es sich bei Transfetten chemisch gesehen? Wie entstehen sie, in der Natur und in der Lebensmittelindustrie? Worin befinden sich Transfette und wie erkennt man entsprechende Produkte im Supermarkt?"
      },
      {
        gruppe: 3,
        fragen: "Warum werden Proteinshakes zum Muskelaufbau nicht wirklich benötigt? Wozu sollte man sportlichen Menschen stattdessen raten?"
      },
      {
        gruppe: 4,
        fragen: "Diskutiert: Ist es möglich, auf die Produkte aus der \u2018Unterwelt\u2019 der Ernährung ganz zu verzichten? Sollte ihre Verwendung in der Lebensmittelindustrie von der Politik stärker reguliert werden?"
      }
    ]
  }
];

export function getVertiefendeFragenForLesson(lessonOrder: number): VertiefendeFrage | undefined {
  return vertiefendeFragen.find(vf => vf.lessonOrder === lessonOrder);
}
