export default class Candidate {
  static TYPE = {
    NORMAL: {
      typeName : "normal",
    },
    MAUVAIS: {
      typeName: "mauvais",
      vitesseFaim: 1.8,
      vitesseFatigue: 1.8,
      chance: 0.5,
      force: 0.8,
      vitesse: 0.8,
      natation: 0.6,
      survie: 0.7,
    },
    GENTIL: {
      typeName: "gentil",
      chance: 0.8,
      inteligence: 0.6,
    },
    MECHANT: {
      typeName: "mechant",
      vitesseFaim: 0.9,
      force: 1.2,
    },
    FOU: {
      typeName: "fou",
      vitesseFaim: 0.8,
      vitesseFatigue: 0.6,
      chance: 1.6,
      force: 0.9,
      vitesse: 1.2,
      natation: 1.1,
      inteligence: 0.5,
    },
    PARFAIT: {
      typeName: "parfait",
      vitesseFaim: 0.3,
      vitesseFatigue: 0.3,
      force: 1.5,
      vitesse: 1.5,
      natation: 1.5,
      survie: 1.5,
      inteligence: 1.5,
    },
    FUN: {
      typeName: "fun",
      vitesseFaim: 1,
      vitesseFatigue: 0.7,
      vitesse: 0.8,
      survie: 0.9,
    },
    SPORTIF: {
      typeName: "sportif",
      vitesseFaim: 1.2,
      vitesseFatigue: 0.6,
      force: 1.8,
      vitesse: 1.8,
      natation: 1.6,
    },
    STRATEGE: {
      typeName: "stratege",
      vitesseFaim: 1.2,
      vitesseFatigue: 1.2,
      chance: 1.2,
      force: 0.6,
      vitesse: 0.7,
      natation: 0.7,
      survie: 0.8,
      inteligence: 2,
    },
    DOYEN: {
      typeName: "doyen",
      vitesseFaim: 0.8,
      vitesseFatigue: 1.2,
      chance: 1.1,
      force: 0.7,
      vitesse: 0.7,
      survie: 1.3,
      inteligence: 1.2,
    },
    FLEMMARD: {
      typeName: "flemmard",
      vitesseFatigue: 1.5,
      chance: 1.2,
      force: 0.8,
      vitesse: 0.8,
      survie: 0.5,
    },
    CHANCEUX: {
      typeName: "chanceux",
      chance: 2,
      force: 0.9,
      vitesse: 1.2,
      natation: 1.1,
    },
    MALCHANCEUX: {
      typeName: "malchanceux",
      vitesseFaim: 1.2,
      vitesseFatigue: 1.3,
      chance: 0.3,
      force: 1.1,
      vitesse: 1.3,
      survie: 1.1,
    },
    BAVARD: {
      typeName: "bavard",
      vitesseFaim: 1.5,
      vitesseFatigue: 0.5,
      chance: 1.3,
      force: 0.8,
      vitesse: 1.2,
      natation: 1.3,
      survie: 0.8,
      inteligence: 0.8,
    },
    GOURMAND: {
      typeName: "gourmand",
      vitesseFaim: 1.8,
      vitesseFatigue: 1.2,
      force: 1.3,
      vitesse: 0.8,
      natation: 0.8,
    },
    MUSCLE: {
      typeName: "musclé",
      vitesseFaim: 1.3,
      vitesseFatigue: 0.8,
      force: 2,
      vitesse: 1.6,
      natation: 1.2,
      survie: 0.7,
      inteligence: 0.6,
    },
    DEPRESSIF: {
      typeName: "dépressif",
      vitesseFatigue: 1.6,
      chance: 0.6,
      force: 0.6,
      vitesse: 0.6,
      survie: 0.8,
      inteligence: 1.2,
    },
    PLAINTIF: {
      typeName: "plaintif",
      vitesseFaim: 1,
      vitesseFatigue: 1,
      chance: 1,
      force: 1,
      vitesse: 1,
      natation: 1,
      survie: 1,
      inteligence: 1,
    },
    PEUREUX: {
      typeName: "peureux",
      vitesseFaim: 1,
      vitesseFatigue: 1,
      chance: 1,
      force: 1,
      vitesse: 1,
      natation: 1,
      survie: 1,
      inteligence: 1,
    },
    DEBROUILLARD: {
      typeName: "débrouillard",
      vitesseFaim: 1,
      vitesseFatigue: 1,
      chance: 1,
      force: 1,
      vitesse: 1,
      natation: 1,
      survie: 1,
      inteligence: 1,
    },
  };

  constructor(name, type, genre) {
    this.name = name;
    this.type = type;
    this.genre = genre;
    this.faim = 0; // pourcentage de faim
    this.fatigue = 0; // pourcentage de fatigue
    this.items = []
    this.presentation();
  }

  presentation() {
    console.log(`Bonjour je suis ${this.name}, de type ${this.type.typeName} et je suis de genre ${this.genre}`)
  }

  getType() {
    return this.type;
  }

  fatigueAugmente(unite) {
    let vitesseFatigue = this.type.vitesseFatigue || 1
    this.fatigue += unite * vitesseFatigue
  }

  faimAugmente(unite) {
    let vitesseFaim = this.type.vitesseFaim || 1
    this.faim += unite * vitesseFaim
  }

  dialogue() {
    return `${this.name} : je suis ${this.type.inteligence || 5}, ma fatigue est ${this.fatigue} , ma faim est de ${this.faim}`
  }

  action() {
    this.items.push("collier")
    console.log("itesme", this.items)
    return `${this.name} a trouvé un collier`
  }

}

