import Team from './Team'
import Statics from './Statics'
export default class Game {
  constructor(name="spéciale", team1=undefined, team2=undefined){
    let color
    this.name = name
    this.team1 = team1 || new Team({color: "#fa4e65"})
    this.team2 = team2 || new Team({color: "#d7c490"})
    this.team3 = undefined
    this.semaine = 1
    this.solo = false
    this.eliminates = []
    this.week()
    this.week()
    this.week()
    this.week()
    this.week()
    this.week()
    this.week()
    this.week()
    this.week()
  }

  presentation(){
    console.log(`Bonjour et bienvenue dans cette nouvelle édition ${this.name} de Koh-Lanta qui oposera la tribu ${this.team1.name} à la tribu ${this.team2.name}`)
  }

  week() {
    let texts = []
    // let epreuveConfort = new Epreuve(this.solo, "confort")
    // let epreuveImmunite = new Epreuve(this.solo, "imunite")

    texts.push({text: "Vie sur le camps", color: "green"})
    texts.push({text: `Denis:  Allons voir comment se porte la vie sur le camps pour nos candidats qui commencent leur semaine ${this.semaine}`, color: "gray"})
    if (!this.solo) {
      texts = texts.concat(this.team1.events(this.semaine, Team.CAMP.NORMAL))
      texts = texts.concat(this.team2.events(this.semaine, Team.CAMP.NORMAL))
      texts = texts.concat(this.epreuveEquipes("confort"))
      texts = texts.concat(this.epreuveEquipes("immunité"))
    }
    else {
      texts = texts.concat(this.team3.events(this.semaine, Team.CAMP.NORMAL))
      texts = texts.concat(this.epreuveSolo("confort"))
      texts = texts.concat(this.epreuveSolo("immunité"))
    }
    this.semaine++
    if (!this.solo && (this.team1.candidates.length + this.team2.candidates.length) < 8) {
      this.solo = true;
      texts.push({text: `Denis: AH ! L'heure de la réunification est venue ! Nos 1 tribues n'en formeront qu'une seule, la tribu blanche !`, color: "gray"})
      let team3Candidates = this.team1.candidates.concat(this.team2.candidates)
      this.team3 = new Team({name: "blanche", candidates: team3Candidates, color: "#000000"})    }
    for (let text of texts) {
      console.log(`%c ${text.text}`, `color: ${text.color}`);
    }
    return texts;
  }

  epreuveEquipes(type){
    let texts = []
    let epreuve = Statics.randomEpreuve()

    if (type === "confort"){
      texts.push({text: `Denis: L'épreuve de confort d'aujourd'hui est : ${epreuve.name} ! Pour gagner fiez vous à votre ${epreuve.type} !`, color: "gray"})
    }
    if (type === "immunité"){
      texts.push({text: `Denis: Nous y voici, c'est l'heure de l'épreuve d'immunité : ${epreuve.name} ! Votre seul chance de gagner aujourd'hui, faire preuve de ${epreuve.type} ! GO !`, color: "gray"})
    }
    texts.push({text:"-------------------", color: "black"})
    texts.push({text:"-------------------", color: "black"})
    let winnerTeam = this.winnerEquipes(this.team1, this.team2, epreuve)
    let loserTeam; 
    texts.push({text: `Denis: AH ! L'équipe des ${winnerTeam.name} remporte l'épreuve ${epreuve.name} !`, color: "gray"})
    texts = texts.concat(winnerTeam.congrats(epreuve.type))
    this.team1.updateFatigues(epreuve.fatigue)
    this.team2.updateFatigues(epreuve.fatigue)
    if (this.team1 !== winnerTeam) {
      texts = texts.concat(this.team1.shame(epreuve.type))
      loserTeam = this.team1
    }
    else {
      texts = texts.concat(this.team2.shame(epreuve.type))
      loserTeam = this.team2
    }
    if (type === "confort"){
      loserTeam.updateFaims(5)
      texts.push({text: `Denis: Bravo les ${winnerTeam.name} vous allez pouvoir profiter de la récompense pendant que les autres auront grave le seum`, color: "gray"})
      texts.push({text:"-------------------", color: "black"})
      texts = texts.concat(winnerTeam.events(this.semaine, Team.CAMP.VICTOIRE_CONFORT))
      texts = texts.concat(loserTeam.events(this.semaine, Team.CAMP.ECHEC_CONFORT))
    }
    if (type === "immunité") {
      texts.push({text: `Denis: Bravo les ${winnerTeam.name} vous allez pouvoir rentrer sur le camps serein je vous remets le totem`, color: "gray"})
      texts.push({text:"-------------------", color: "black"})
      texts = texts.concat(winnerTeam.events(this.semaine, Team.CAMP.VICTOIRE_IMMUNITE))
      texts = texts.concat(loserTeam.events(this.semaine, Team.CAMP.ECHEC_IMMUNITE))
      this.eliminates.push(loserTeam.getLastEliminated())
      console.log("le dernier eliminé est", this.eliminates.pop())
    
    }

    return texts
  
  }

  winnerEquipes(team1, team2, epreuve) {
    // one day use boule noir to remove some members of the team
    let nb_participants = Math.min(team1.candidates.length, team2.candidates.length)
    if (team1.getTotalOfCompetence(epreuve.type, nb_participants) > team2.getTotalOfCompetence(epreuve.type, nb_participants)){
      return team1;
    }
    return team2;
  }

  epreuveSolo(type){
    let texts = []
    let epreuve = Statics.randomEpreuve()

    if (type === "confort"){
      texts.push({text: `Denis: L'épreuve de confort d'aujourd'hui est : ${epreuve.name} ! Pour gagner fiez vous à votre ${epreuve.type} !`, color: "gray"})
    }
    if (type === "immunité"){
      texts.push({text: `Denis: Nous y voici, c'est l'heure de l'épreuve d'immunité : ${epreuve.name} ! Votre seul chance de gagner aujourd'hui, faire preuve de ${epreuve.type} ! GO !`, color: "gray"})
    }
    texts.push({text:"-------------------", color: "black"})
    texts.push({text:"-------------------", color: "black"})
    let winner = this.team3.getStrongestFromCompetence(epreuve.type)
    texts.push({text: `Denis: AH ! ${winner.name} remporte l'épreuve ${epreuve.name} !`, color: "gray"})

    if (type === "confort"){
      this.team3.updateFaims(5) // exclure le gagnant
      texts = texts.concat(this.team3.events(this.semaine, Team.CAMP.CAMP_NORMAL))
    }
    if (type === "immunité") {
      texts = texts.concat(this.team3.events(this.semaine, Team.CAMP.ECHEC_IMMUNITE))
      this.eliminates.push(this.team3.getLastEliminated())
      console.log("le dernier eliminé est", this.eliminates.pop())
    }

    return texts
  
  }
}
