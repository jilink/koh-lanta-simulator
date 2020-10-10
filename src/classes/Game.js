import Team from './Team'
import Statics from './Statics'
export default class Game {

  static numberDisplay = 10
  constructor({name="spéciale", team1=undefined, team2=undefined}){
    this.name = name
    this.team1 = team1 || new Team({color: "#fa4e65"})
    this.team2 = team2 || new Team({color: "#d7c490"})
    this.team3 = undefined
    this.semaine = 1
    this.solo = false
    this.continue = true
    this.eliminates = []
    this.currentText = []
    this.currentTextIndex = Game.numberDisplay
    this.weekText = []
    this.team1DisplayCandidates = this.team1.candidates.slice()
    this.team2DisplayCandidates = this.team2.candidates.slice()
    this.team3DisplayCandidates = []
    this.displaySolo = false
  }

  presentation(){
    console.log(`Bonjour et bienvenue dans cette nouvelle édition ${this.name} de Koh-Lanta qui oposera la tribu ${this.team1.name} à la tribu ${this.team2.name}`)
  }

  week() {
    let texts = []
    if (this.solo && (this.team3.candidates.length) < 5) {
      texts = texts.concat(this.final(this.team3))
      for (let text of texts) {
        // console.log(`%c ${text.text}`, `color: ${text.color}`);
      }
      return texts 
    }

    texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
    texts.push({text: `Denis:  Allons voir comment se porte la vie sur le camps pour nos candidats qui commencent leur semaine ${this.semaine}`, color: "gray", key: Statics.uniqueKey()})
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
      texts.push({text: `Denis: AH ! L'heure de la réunification est venue ! Nos deux tribus n'en formeront qu'une seule, la tribu blanche !`, color: "gray"})
      let team3Candidates = this.team1.candidates.concat(this.team2.candidates)
      this.team3 = new Team({name: "Réunifiés", candidates: team3Candidates, color: "#000000"})    }
    for (let text of texts) {
      // console.log(`%c ${text.text}`, `color: ${text.color}`);
    }
    return texts;
  }

  epreuveEquipes(type){
    let texts = []
    let epreuve = Statics.randomEpreuve()

    if (type === "confort"){
      texts.push({text: "Epreuve de confort", color: "green", key: Statics.uniqueKey()})
      texts.push({text: `Denis: L'épreuve de confort d'aujourd'hui est : ${epreuve.name} ! Pour gagner fiez vous à votre ${epreuve.type} !`, color: "gray", key: Statics.uniqueKey()})
    }
    if (type === "immunité"){
      texts.push({text: "Epreuve d'immunité", color: "green", key: Statics.uniqueKey()})
      texts.push({text: `Denis: Nous y voici, c'est l'heure de l'épreuve d'immunité : ${epreuve.name} ! Votre seul chance de gagner aujourd'hui, faire preuve de ${epreuve.type} ! GO !`, color: "gray", key: Statics.uniqueKey()})
    }
    let winnerTeam = this.winnerEquipes(this.team1, this.team2, epreuve)
    let loserTeam; 
    texts.push({text: `Denis: AH ! L'équipe des ${winnerTeam.name} remporte l'épreuve ${epreuve.name} !`, color: "gray", key: Statics.uniqueKey()})
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
      texts.push({text: `Denis: Bravo les ${winnerTeam.name} vous allez pouvoir profiter de la récompense pendant que les autres auront grave le seum`, color: "gray", key: Statics.uniqueKey()})
      texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
      texts = texts.concat(winnerTeam.events(this.semaine, Team.CAMP.VICTOIRE_CONFORT))
      texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
      texts = texts.concat(loserTeam.events(this.semaine, Team.CAMP.ECHEC_CONFORT))
    }
    if (type === "immunité") {
      texts.push({text: `Denis: Bravo les ${winnerTeam.name} vous allez pouvoir rentrer sur le camps serein je vous remets le totem`, color: "gray", key: Statics.uniqueKey()})
      texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
      texts = texts.concat(winnerTeam.events(this.semaine, Team.CAMP.VICTOIRE_IMMUNITE))
      texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
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
      texts.push({text: "Epreuve de confort", color: "green", key: Statics.uniqueKey()})
      texts.push({text: `Denis: L'épreuve de confort d'aujourd'hui est : ${epreuve.name} ! Pour gagner fiez vous à votre ${epreuve.type} !`, color: "gray", key: Statics.uniqueKey()})
    }
    if (type === "immunité"){
      texts.push({text: "Epreuve d'immunité", color: "green", key: Statics.uniqueKey()})
      texts.push({text: `Denis: Nous y voici, c'est l'heure de l'épreuve d'immunité : ${epreuve.name} ! Votre seul chance de gagner aujourd'hui, faire preuve de ${epreuve.type} ! GO !`, color: "gray", key: Statics.uniqueKey()})
    }
    let winner = this.team3.getStrongestFromCompetence(epreuve.type)
    texts.push({text: `Denis: AH ! ${winner.name} remporte l'épreuve ${epreuve.name} !`, color: "gray", key: Statics.uniqueKey()})

    if (type === "confort"){
      this.team3.updateFaims(5) // exclure le gagnant
      texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
      texts = texts.concat(this.team3.events(this.semaine, Team.CAMP.CAMP_NORMAL))
    }
    if (type === "immunité") {
      texts.push({text: "Vie sur le camps", color: "green", key: Statics.uniqueKey()})
      texts.push({text: `Denis: ${winner.name} vous êtes immunisé pour le conseil de ce soir, je vous remets le totem !`, color: "gray", key: Statics.uniqueKey()})
      winner.immune()
      texts = texts.concat(this.team3.events(this.semaine, Team.CAMP.ECHEC_IMMUNITE))
      winner.notImmune()
      this.eliminates.push(this.team3.getLastEliminated())
      console.log("le dernier eliminé est", this.eliminates.pop())
    }

    return texts
  
  }

  final(team) {
    let texts = []
    texts.push({text: "Finale", color: "green", key: Statics.uniqueKey()})
    texts.push({text: "AH! C'est l'heure de la grand finale !!", color: "green", key: Statics.uniqueKey()})
    texts = texts.concat(this.orientation(team))
    texts = texts.concat(this.poteaux(team))
    this.continue = false
    return texts
  }

  orientation(team) {
    let texts = []
    texts.push({text: "Commençons par l'épreuve d'orientation !!", color: "green", key: Statics.uniqueKey()})
    let loser = team.getWeakestFromFatigue()
    texts.push({text: `${loser.name} perd`, color: "green", key: Statics.uniqueKey()})
    team.eliminate(loser)
    return texts
  }

  poteaux(team) {
    let texts = []
    texts.push({text: "C'est l'heure des poteaux", color: "green", key: Statics.uniqueKey()})
    let winner = team.getStrongestFromFatigue()
    texts.push({text: `${winner.name} gagne KOH LANTAH !!!!!!`, color: "green", key: Statics.uniqueKey()})
    team.candidates = [winner]
    return texts
  }

  getCurrentText() {
    if (!this.continue) {
      this.currentText = this.weekText.slice(this.weekText.length - Game.numberDisplay, this.weekText.length)
      return this.currentText
    }
    if (this.currentText.length < Game.numberDisplay) {
      this.displaySolo = this.solo
      if (this.solo && this.team3) {
        this.team3DisplayCandidates = this.team3.candidates.slice()
      }
      else {
        this.team1DisplayCandidates = this.team1.candidates.slice()
        this.team2DisplayCandidates = this.team2.candidates.slice()
      }
      this.weekText = this.currentText.concat(this.week())
      this.currentTextIndex = Game.numberDisplay
    }
    this.currentText = this.weekText.slice(this.currentTextIndex - Game.numberDisplay, this.currentTextIndex)
    this.currentTextIndex+=4
    console.log(this.currentText)
    return this.currentText
  }

  getTeam1DisplayCandidates () {
    return this.team1DisplayCandidates
  }

  getTeam2DisplayCandidates () {
    return this.team2DisplayCandidates
  }

  getTeam3DisplayCandidates () {
    return this.team3DisplayCandidates
  }

  getDisplaySolo () {
    return this.displaySolo
  }
}
