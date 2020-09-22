import Candidate from './Candidate'
import Statics from './Statics'
export default class Team {

  static CAMP = {
    NORMAL: "normal",
    VICTOIRE_CONFORT: "victoire confort",
    ECHEC_CONFORT: "echec confort",
    VICTOIRE_IMMUNITE: "victoire immunite",
    ECHEC_IMUNITE: "echec immunite",
  }
 
  constructor(name=undefined, number=5, candidates=undefined) {
    this.name = name || this.getRandomTeamName();
    this.number = number;
    this.candidates = candidates || this.getRandomCandidates(number)
    this.items = []
  }

  presentation(){
    console.log(`Bonjour nous somme l'équipe ${this.name}, actuellement nous sommes ${this.number}`)
  }

  getRandomCandidates(number){
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
      {name: "Josheph", genre:"H"},
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

    let candidates=[]

    for (let i=0; i<number; i++){
      const randomName = names[Math.floor(Math.random() * names.length)];
      names.splice(i, 1);
      candidates.push(new Candidate(randomName.name, this.getRandomType(), randomName.genre))
    }
    return candidates
  }
  
  getRandomTeamName(){ // à deplacer dans Game principal pour éviter les doublons
    let names = ["Takéo", "Bolosses", "Bokor", "Sokka", "Lankawaï", "Do", "Vang", "BG"]
    return names[Math.floor(Math.random() * names.length)];
  }

  getRandomType(){
    let keys = Object.keys(Candidate.TYPE);
    return Candidate.TYPE[keys[ keys.length * Math.random() << 0]];
  }

  eliminate(index) {
    console.log(`Denis: ${this.candidates[index].name}, prenez votre flambeau, les aventuriers de la tribu ${this.name} on décidé de vous éliminer et leur sentence est irrévocable.`)
    let eliminatedCandidate = this.candidates[index]
    this.candidates.splice(index, 1);
    this.number = this.candidates.length;
    return eliminatedCandidate
  }
  
  injured(index, candidate) {
    console.log(`Denis: Bonjour tribu ${this.name}, j'ai une mauvaise nouvelle à vous annoncer,  ${this.candidates[index].name}, doit abandonner pour raisons médicales c'est donc le ou la dernière éliminé qui prend sa place, c'est à dire ${candidate.name}.`)
    this.candidates.splice(index, 1);
    this.candidates.push(candidate)
  }

  events(semaine, camp){
    let texts = []
    if (camp === Team.CAMP.NORMAL && semaine === 1)
    {
      texts.push({text: `Denis: C'est le début de l'aventure et l'heure des présentations chez les ${this.name}`, color: "gray"})
      texts = texts.concat(this.presentations())
    }
    return texts;
  }

  presentations(){
    let tmpCandidates = this.candidates
    let texts = []
    while (tmpCandidates.length) {
      if (tmpCandidates.length === 1) {
        texts.push({text: `${tmpCandidates[0].name}: Ah bah tout le monde s'est présenté sauf moi ... coucou je suis ${tmpCandidates[0].name}`, color: "blue"})
        texts.push({text: `Denis: Début d'aventure compliqué pour ${tmpCandidates[0].name} qui se fait bolosser par son équipe`, color: "gray"})
        tmpCandidates=[]
      }
      else {
        let randomIndex = Math.floor(Math.random() * tmpCandidates.length)
        let randomCandidate = tmpCandidates[randomIndex];
        tmpCandidates.splice(randomIndex, 1);
        randomIndex = Math.floor(Math.random() * tmpCandidates.length)
        let randomCandidate2 = tmpCandidates[randomIndex];
        tmpCandidates.splice(randomIndex, 1);
        texts.push({text: Statics.replaceDialogue(randomCandidate, randomCandidate2, Statics.randomArray(Statics.PRESENTATION1)), color: "blue"})
        texts.push({text: Statics.replaceDialogue(randomCandidate, randomCandidate2, Statics.randomArray(Statics.PRESENTATION2)), color: "blue"})
        // texts.push({text: `${randomCandidate.name}: Hey salut toi tu es ${randomCandidate2.name} c'est ça ? Tu as l'air ${randomCandidate2.type.typeName} et j'aime ça`, color: "blue"})
        // texts.push({text: `${randomCandidate2.name}: Coucou ${randomCandidate.name} tu veux être mon ami j'ai pas d'amis soit mon ami coucou tu m'entends`, color: "blue"})
        randomCandidate.addFriend(randomCandidate2)
      }
    }
    return texts;
  }

}
 
