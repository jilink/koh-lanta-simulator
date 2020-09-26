import Team from './Team'
import Statics from './Statics'
export default class Game {
  constructor(name="spéciale", team1=undefined, team2=undefined){
    let color
    this.name = name
    this.team1 = team1 || new Team({color: "#fa4e65"})
    this.team2 = team2 || new Team({color: "#d7c490"})
    this.semaine = 1
    this.solo=false
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
    texts = texts.concat(this.team1.events(this.semaine, Team.CAMP.NORMAL))
    texts = texts.concat(this.team2.events(this.semaine, Team.CAMP.NORMAL))
    if (!this.solo) {
      texts = texts.concat(this.epreuveEquipes("confort"))
    }
    if (!this.solo) {
      texts = texts.concat(this.epreuveEquipes("immunité"))
    }
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

    return texts
  
  }

  winnerEquipes(team1, team2, epreuve) {
    if (this.team1.getTotalOfCompetence(epreuve.type) > this.team2.getTotalOfCompetence(epreuve.type)){
      return team1;
    }
    return team2;
  }
}
