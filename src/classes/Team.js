import Candidate from './Candidate'
export default class Team {
 
  constructor(name=undefined, number=5, candidates=undefined) {
    this.name = name || this.getRandomTeamName();
    this.number = number;
    this.candidates = candidates || this.getRandomCandidates(number)
    this.items = []
    this.presentation()
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
    this.candidates.splice(index, 1);
    this.number = this.candidates.length;
  }
}
 
