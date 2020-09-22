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
    // console.log("textss", texts)
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
    texts.push({text:"-------------------", color: "black"})
    texts.push({text:"-------------------", color: "black"})
    this.team1.getTotalOfCompetence(epreuve.type)

    return texts
  
  }
}
