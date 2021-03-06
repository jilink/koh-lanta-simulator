import Candidate from './Candidate'
import Statics from './Statics'
export default class Team {

  static CAMP = {
    NORMAL: "normal",
    VICTOIRE_CONFORT: "victoire confort",
    ECHEC_CONFORT: "echec confort",
    VICTOIRE_IMMUNITE: "victoire immunite",
    ECHEC_IMMUNITE: "echec immunite",
  }
 
  constructor({name=undefined, number=5, candidates=undefined, color="blue"}) {
    this.name = name || this.getRandomTeamName();
    if (candidates && candidates.length >= parseInt(number, 10)) {
      this.number =candidates.length
      this.candidates = candidates
    }
    else {
      this.number = parseInt(number, 10);
      this.candidates = this.getRandomCandidates(this.number, candidates)
    }
    this.color=color
    this.items = []
    this.singleTimeEvents = [Statics.EVENT.FOUND_WATER, Statics.EVENT.FOUND_ALCOHOL, Statics.EVENT.MANIOK, Statics.EVENT.CABANE]
    this.rareSingleTimeEvents = [Statics.EVENT.MADE_FIRE, Statics.EVENT.COLLIER, Statics.EVENT.COLLIER]
    this.multipleTimesEvents = [Statics.EVENT.DISPUTE, Statics.EVENT.AMITIE, Statics.EVENT.DROLE,Statics.EVENT.COMPLOT, Statics.EVENT.TRISTE]
    this.rareMultipleTimesEvents = [Statics.EVENT.PLUIE] // reflechir pour INJURED
    this.lastEliminated = undefined
  }

  presentation(){
    // console.log(`Bonjour nous somme l'équipe ${this.name}, actuellement nous sommes ${this.number}`)
  }

  getRandomCandidates(number, candidates=undefined){
    let names = [
      {name:"Claude", genre:"H"},
      {name:"Roger", genre:"H"},
      {name: "Sarah", genre:"F"},
      {name: "Philip", genre:"H"},
      {name: "Moundir", genre:"H"},
      {name: "Cindy", genre:"F"},
      {name: "Lisa", genre:"F"},
      {name: "Jean", genre:"H"},
      {name: "Fabrice", genre:"H"},
      {name: "Alexandre", genre:"H"},
      {name: "Mathilde", genre:"F"},
      {name: "Loic", genre:"H"},
      {name: "Amandine", genre:"F"},
      {name: "Antoine", genre:"H"},
      {name: "Tara", genre:"F"},
      {name: "Carole", genre:"F"},
      {name: "Maurice", genre:"H"},
      {name: "Didier", genre:"H"},
      {name: "Nathalie", genre:"F"},
      {name: "Joseph", genre:"H"},
      {name: "Ahmad", genre:"H"},
      {name: "Pascal", genre:"H"},
      {name: "Lola", genre:"F"},
      {name: "Alexandra", genre:"F"},
      {name: "Thomas", genre:"H"},
      {name: "Patricia", genre:"F"},
      {name: "Gertrude", genre:"F"},
      {name: "Antony", genre:"H"},
      {name: "Anne", genre:"F"} 
    ]

    let addCandidates=[]
    if (candidates){
      addCandidates = addCandidates.concat(candidates)
    }

    for (let i=addCandidates.length; i<number; i++){
      const randomIndex = Math.floor(Math.random() * names.length)
      const randomName = names[randomIndex];
      names.splice(randomIndex, 1);
      addCandidates.push(new Candidate(randomName.name, this.getRandomType(), randomName.genre))
    }
    return addCandidates
  }
  
  getRandomTeamName(){ // à deplacer dans Game principal pour éviter les doublons
    let names = ["Takéo", "Bolosses", "Bokor", "Sokka", "Lankawaï", "Do", "Vang", "BG"]
    return names[Math.floor(Math.random() * names.length)];
  }

  getRandomType(){
    let keys = Object.keys(Candidate.TYPE);
    return Candidate.TYPE[keys[ keys.length * Math.random() << 0]];
  }

  eliminate(candidate) {
    if (this.candidates.includes(candidate)) {
      let eliminatedCandidateIndex = this.candidates.indexOf(candidate)
      this.candidates.splice(eliminatedCandidateIndex, 1)
      this.lastEliminated = candidate
    }
    this.number = this.candidates.length;
  }
  
  injured(index, candidate) {
    // console.log(`Denis: Bonjour tribu ${this.name}, j'ai une mauvaise nouvelle à vous annoncer,  ${this.candidates[index].name}, doit abandonner pour raisons médicales c'est donc le ou la dernière éliminé qui prend sa place, c'est à dire ${candidate.name}.`)
    this.candidates.splice(index, 1);
    this.candidates.push(candidate)
  }

  events(semaine, camp){
    let texts = []
    if (camp === Team.CAMP.NORMAL && semaine === 1)
    {
      texts.push({text: `Denis: C'est le début de l'aventure et l'heure des présentations chez les ${this.name}`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
      texts.push({text:"Présentations", color: Statics.COLORS.INFO, key: Statics.uniqueKey()})
      texts = texts.concat(this.presentations())
      return texts;
    }
    if (camp === Team.CAMP.VICTOIRE_CONFORT) {
      texts.push({text: `Denis: De retour sur le camp après que la tribu ${this.name} ai pu profiter de sa récompense`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    }
    else if (camp === Team.CAMP.ECHEC_CONFORT) {
      texts.push({text: `Denis: Allons maintenant voir du côté des ${this.name} qui reviennent perdant de la dernière épreuve de confort`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    }
    else if (camp === Team.CAMP.VICTOIRE_IMMUNITE) {
      texts.push({text: `Denis: La tribu ${this.name} a gagné l'épreuve d'immunité, voyons ce qu'il se passe sur leur camps !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    }
    else if (camp === Team.CAMP.ECHEC_IMMUNITE) {
      texts.push({text: `Denis: Les ${this.name} reviennent sur le camps et vont devoir affronter le conseil allons faire un tour chez eux !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    }
    texts = texts.concat(this.randomCampEvent())
    texts = texts.concat(this.randomCampEvent())
    if (camp === Team.CAMP.ECHEC_IMMUNITE) {
      texts.push({text:"Conseil", color: Statics.COLORS.INFO, key: Statics.uniqueKey()})
      texts.push({text: `Denis: C'est l'heure du conseil, les ${this.name} vont devoir décider de l'aventurier dont ils doivent se séparer !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
      texts = texts.concat(this.conseil(false))
    }
    return texts;
  }

  conseil(solo) {
    let texts = []
    let votesNames =[]
    let votes =[]
    for (let candidate of this.candidates)
    {
      let vote = candidate.vote(this.candidates.slice(), this.getImmunedCandidates(), this.color)
      if (vote.text){
        texts.push(vote.text)
      }
      votes.push(vote.vote)
      votesNames.push(vote.vote.name)
    }
    let depouille = Statics.countOccurrences(votesNames)
    for(let [key, val] of Object.entries(depouille)) {
      texts.push({text: `Denis: ${val} votes contre vous ${key}`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    }

    let eliminatedCandidate = this.mostVoteCandidate(votes)
    texts.push({text: `Denis: ${eliminatedCandidate.name} prenez votre flambeau, venez me rejoindre`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    texts.push({text: `${eliminatedCandidate.name}: Peut être ai-je joué un jeu un peu trop ${eliminatedCandidate.type.typeName}`, color: this.color, key: Statics.uniqueKey()})
    texts.push({text: `Denis: ${eliminatedCandidate.name} les aventuriers de la tribu ${this.name} ont décidé de vous éliminer, et leur sentence est irrévocable !!!`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
    this.eliminate(eliminatedCandidate)
    return texts
  }

  getLastEliminated() {
    return this.lastEliminated
  }

  mostVoteCandidate(array) {
    if(array.length === 0)
      return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for(let el of array)
    {
      if(modeMap[el.name] === undefined)
        modeMap[el.name] = 1;
      else
        modeMap[el.name]++;  
      if(modeMap[el.name] > maxCount)
      {
        maxEl = el;
        maxCount = modeMap[el.name];
      }
    }
    return maxEl;
  }
  
  randomCampEvent() {
    let texts = []
    let random = Math.random();
    let event
    if (random < 0.4) {
      let index = Math.floor(Math.random() * this.multipleTimesEvents.length)
      event = this.multipleTimesEvents[index]
    }
    else if (random < 0.7) {
      let index = Math.floor(Math.random() * this.singleTimeEvents.length)
      event = this.singleTimeEvents[index]
      this.singleTimeEvents.splice(index, 1);
    }
    else if (random < 0.9) {
      let index = Math.floor(Math.random() * this.rareMultipleTimesEvents.length)
      event = this.rareMultipleTimesEvents[index]
    }
    else {
      let index = Math.floor(Math.random() * this.rareSingleTimeEvents.length)
      event = this.rareSingleTimeEvents[index]
      this.rareSingleTimeEvents.splice(index, 1);
    }

    texts = texts.concat(this.happening(event))
    return texts
  }

  happening(event) {
    let texts = []
    const EVENT = Statics.EVENT
    let candidate = Statics.randomArray(this.candidates)
    switch (event) {
      case EVENT.INJURED:
        break;
      case EVENT.FOUND_WATER:
        texts.push({text: `${candidate.name}: J'ai trouvé l'eau !!!!!!`, color: this.color, key: Statics.uniqueKey()})
        texts.push({text: `Denis: AH ! ${candidate.name} a trouvé l'eau chez les ${this.name} voilà qui va leur faire du bien !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
        break;
      case EVENT.FOUND_ALCOHOL:
        texts.push({text: `${candidate.name}: J'ai trouvé l'eau !!!!!! Enfin j'ai trouvé des bières mais l'alcohol c'est de l'eau pas vrai !`, color: this.color, key: Statics.uniqueKey()})
        if (!this.singleTimeEvents.includes(EVENT.FOUND_WATER)) {
          texts.push({text: `Denis: AH ! Visiblement ${candidate.name} est amnésique en plus d'être alcoolique car l'eau avait déjà été trouvé ...`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
          texts.push({text: `${candidate.name}: Je vais enfin pouvoir arrêter de boire mon urine !`, color: this.color, key: Statics.uniqueKey()})
          texts.push({text: `Denis: ... ah  ...`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
        }
        break;
      case EVENT.MADE_FIRE:
        texts.push({text: `${candidate.name}: J'ai fait le feu !!! Je savais que ça servirait d'être ${candidate.type.typeName}`, color: this.color, key: Statics.uniqueKey()})
        texts.push({text: `Denis: ${candidate.name} a réussi a faire le feu, prouesse remarquable chez les ${this.name} voilà qui va réchauffer leur coeurs !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
        this.rareSingleTimeEvents.push(EVENT.STOP_FIRE)
        this.lovedByEverybody(candidate)
        break;
      case EVENT.STOP_FIRE:
        texts.push({text: `${candidate.name}: POUR JOSEEEEEEEEPPHHHHHHHHHHHHHHHH !!!!!!!!`, color: this.color, key: Statics.uniqueKey()})
        texts.push({text: `Denis: Impossible ! ${candidate.name} vient tout juste d'éteindre le précieux feu dans la tribu ${this.name} du presque jamais vu dans Koh-Lantah !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
        this.rareSingleTimeEvents.push(EVENT.MADE_FIRE)
        this.hatedByEverybody(candidate)
        break;
      case EVENT.COLLIER:
        texts.push({text: `${candidate.name}: shhhhhhshhshhshshhhh ... je viens de trouver un collier d'immunité ...!!  Ok je vais devoir le cacher avant de rentrer au camps`, color: this.color, key: Statics.uniqueKey()})
        texts.push({text: `Denis: Grâce aux zooms de notre caméraman sur l'arbre ou il était caché, ${candidate.name}, qu'on qualifie souvent de ${candidate.type.typeName} a trouvé un collier !`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
        candidate.addItem("collier")
        break;
      case EVENT.DISPUTE:
        texts.push({text: `${candidate.name}: Vas y je sais pas pourquoi mais je suis enervé là`, color: this.color, key: Statics.uniqueKey()})
        break;
      case EVENT.AMITIE:
        texts.push({text: `${candidate.name}: Je me sens de bonne humeur aujourd'hui`, color: this.color, key: Statics.uniqueKey()})
        break;
      case EVENT.DROLE:
        texts.push({text: `${candidate.name}: Les gars j'ai une blague !`, color: this.color, key: Statics.uniqueKey()})
        texts.push({text: Statics.replaceDialogueSolo(candidate, Statics.randomArray(Statics.JOKES)), color: this.color, key: Statics.uniqueKey()})
        break;
      case EVENT.MANIOK:
        texts.push({text: `${candidate.name}: J'ai trouvé le maniok mes amis, grâce à Jésus nous n'auront plus jamais faim !`, color: this.color, key: Statics.uniqueKey()})
        this.updateFaims(-2)
        break;
      case EVENT.PECHE:
        texts.push({text: `${candidate.name}: LES GARS !! J'ai réussi j'ai un poisson ! Ce soir on va se faire un festin de ouf.`, color: this.color, key: Statics.uniqueKey()})
        this.updateFaims(-5)
        break;
      case EVENT.PLUIE:
        texts.push({text: `${candidate.name}: Attention il arrête pas de pleuvoir je sais pas si vous avez remarqué !`, color: this.color, key: Statics.uniqueKey()})
        break;
      case EVENT.CABANE:
        texts.push({text: `${candidate.name}: Et voilà j'ai fait la cabane yes !`, color: this.color, key: Statics.uniqueKey()})
        this.rareSingleTimeEvents.push(EVENT.CABANE_DESTRUCTED)
        break;
      case EVENT.CABANE_DESTRUCTED:
        texts.push({text: `${candidate.name}: Et voilà j'ai détruit la cabane yes !`, color: this.color, key: Statics.uniqueKey()})
        this.singleTimeEvents.push(EVENT.CABANE)
        this.hatedByEverybody(candidate)
        break;
      case EVENT.COMPLOT:
        texts.push({text: `${candidate.name}: Ouais je vais tenter de monter un petit complot là faut commencer à faire des alliances !`, color: this.color, key: Statics.uniqueKey()})
        break;
      case EVENT.TRISTE:
        texts.push({text: `${candidate.name}: Je suis triste ma famille me manque ça fait tellement longtemps que je les ai pas vu !`, color: this.color, key: Statics.uniqueKey()})
        break;
      default:
        break;
    }
  
    return texts
  }

  presentations(){
    let tmpCandidates = this.candidates.slice(); // avoid referencing, it just copy the list
    let texts = []
    while (tmpCandidates.length) {
      if (tmpCandidates.length === 1) {
        texts.push({text: Statics.replaceDialogueSolo(tmpCandidates[0], Statics.randomArray(Statics.PRESENTATION3[tmpCandidates[0].genre])), color: this.color, key: Statics.uniqueKey()})
        texts.push({text: `Denis: Début d'aventure compliqué pour ${tmpCandidates[0].name} qui se fait bolosser par son équipe`, color: Statics.COLORS.DENIS, key: Statics.uniqueKey()})
        tmpCandidates=[]
      }
      else {
        let randomIndex = Math.floor(Math.random() * tmpCandidates.length)
        let randomCandidate = tmpCandidates[randomIndex];
        tmpCandidates.splice(randomIndex, 1);

        randomIndex = Math.floor(Math.random() * tmpCandidates.length)
        let randomCandidate2 = tmpCandidates[randomIndex];
        tmpCandidates.splice(randomIndex, 1);

        texts.push({text: Statics.replaceDialogue(randomCandidate, randomCandidate2, Statics.randomArray(Statics.PRESENTATION1[randomCandidate.genre])), color: this.color, key: Statics.uniqueKey()})
        texts.push({text: Statics.replaceDialogue(randomCandidate, randomCandidate2, Statics.randomArray(Statics.PRESENTATION2[randomCandidate.genre])), color: this.color, key: Statics.uniqueKey()})

        randomCandidate.addFriend(randomCandidate2)
        randomCandidate2.addFriend(randomCandidate)

        texts.push({text:"Dialogue", color: Statics.COLORS.INFO, key: Statics.uniqueKey()})
      }
    }
    return texts;
  }

  getTotalOfCompetence(competence, nb_participants){
    let total = 0
    for (let candidate of this.candidates){
      total += candidate.getCompetence(competence)
    }
    total = total / this.candidates.length * nb_participants
    return total
  }

  getWeakestFromCompetence(competence){
    let weakest = this.candidates[0]
    for (let candidate of this.candidates) {
      if (candidate.getCompetence(competence) < weakest.getCompetence(competence)) {
        weakest = candidate
      }
    }
    return weakest
  }

  getStrongestFromCompetence(competence){
    let strongest = this.candidates[0]
    for (let candidate of this.candidates) {
      if (candidate.getCompetence(competence) > strongest.getCompetence(competence)) {
        strongest = candidate
      }
    }
    return strongest
  }

  getStrongestFromFatigue(){
    let strongest = this.candidates[0]
    for (let candidate of this.candidates) {
      if (candidate.getFatigue() < strongest.getFatigue()) {
        strongest = candidate
      }
    }
    return strongest
  }

  getWeakestFromFatigue(){
    let weakest = this.candidates[0]
    for (let candidate of this.candidates) {
      if (candidate.getFatigue() < weakest.getFatigue()) {
        weakest = candidate
      }
    }
    return weakest
  }

  congrats(competence) {
    let candidate = Statics.randomArray(this.candidates)
    let congratulatedCandidate = this.getStrongestFromCompetence(competence)
    let texts = []
    if (congratulatedCandidate === candidate){
        texts.push({text: Statics.replaceDialogueSolo(candidate, Statics.randomArray(Statics.TEAM_CONGRATS_SOLO[candidate.genre]), competence), color: this.color, key: Statics.uniqueKey()})
    }
    else {
        texts.push({text: Statics.replaceDialogue(candidate, congratulatedCandidate, Statics.randomArray(Statics.TEAM_CONGRATS[candidate.genre]), competence), color: this.color, key: Statics.uniqueKey()})
        candidate.addFriend(congratulatedCandidate)
    }

    return texts
  }

  shame(competence) {
    let candidate = Statics.randomArray(this.candidates)
    let shamedCandidate = this.getWeakestFromCompetence(competence)
    let texts = []
    if (shamedCandidate === candidate){
        texts.push({text: Statics.replaceDialogueSolo(candidate, Statics.randomArray(Statics.TEAM_SHAME_SOLO[candidate.genre]), competence), color: this.color, key: Statics.uniqueKey()})
    }
    else {
        texts.push({text: Statics.replaceDialogue(candidate, shamedCandidate, Statics.randomArray(Statics.TEAM_SHAME[candidate.genre]), competence), color: this.color, key: Statics.uniqueKey()})
        candidate.addEnnemy(shamedCandidate)
    }

    return texts
  }

  updateFatigues(unite) {
    for (let candidate of this.candidates) {
      candidate.updateFatigue(unite)
    }
  }

  updateFaims(unite) {
    for (let candidate of this.candidates) {
      candidate.updateFaim(unite)
    }
  }

  hatedByEverybody(hatedCandidate){
    for (let candidate of this.candidates){
      if (candidate !== hatedCandidate)
        candidate.addEnnemy(hatedCandidate)
    }
  }

  lovedByEverybody(lovedCandidate){
    for (let candidate of this.candidates){
      if (candidate !== lovedCandidate)
        candidate.addFriend(lovedCandidate)
    }
  }
  getImmunedCandidates() {
    let candidates = []
    for (let candidate of this.candidates) {
      if (candidate.immunity) {
        candidates.push(candidate)
      }
    }
    return candidates
  }
}
 
