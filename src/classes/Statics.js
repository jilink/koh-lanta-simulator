import Candidate from './Candidate'
export default class Statics {
  static EPREUVE = {
    PARCOURS_COMBATANT: {
      name: "parcours du combattant",
      type: "vitesse",
      fatigue: 10,
    },
    INSECTES: {
      name: "degustation d'insectes",
      type: "survie",
      fatigue: 2,
    },
    RADEAUX: {
      name: "radeaux",
      type: "intelligence",
      fatigue: 7,
    },
    POUTRE: {
      name: "les poutres",
      type: "chance",
      fatigue: 5,
    },
    CORDE: {
      name: "la corde",
      type: "force",
      fatigue: 7,
    },
    RELAIS_NATATION: {
      name: "relais en mer",
      type: "natation",
      fatigue: 6,
    },
  }

  static PRESENTATION1 = {
    "H" : [
      "NAME1: Bonjour je me présente moi c'est NAME1, je cherche un allié dans l'aventure quelqu'un comme toi de TYPE2",
      "NAME1: Wesh, toi + moi = poto?",
      "NAME1: Excuse j'ai oublié ton nom c'est Amandine ou NAME2 ?",
    ],
    "F" : [
      "NAME1: Bonjour je me présente moi c'est NAME1, je cherche un allié dans l'aventure quelqu'un comme toi de TYPE2",
      "NAME1: Coucou, toi + moi = poto?",
      "NAME1: Excuse j'ai oublié ton nom c'est Amandine ou NAME2 ?",
    ]
  }

  static PRESENTATION2 = {
    "H" : [
      "NAME2: Euh... salut NAME1 si tu veux qu'on fasse connaissance je te préviens directe je suis TYPE2",
      "NAME2: Tout ce que j'ai toujours voulu toute ma vie c'est qu'on soit amis NAME1 même si on s'est rencontré y a 5 minutes je sais ...",
      "NAME2: Toi t'es TYPE1 et moi je suis TYPE2 on ferait une bonne équipe en vrai NAME1",
    ],
    "F" : [
      "NAME2: Euh... salut NAME1 si tu veux qu'on fasse connaissance je te préviens directe je suis TYPE2",
      "NAME2: Tout ce que j'ai toujours voulu toute ma vie c'est qu'on soit amis NAME1 même si on s'est rencontré y a 5 minutes je sais ...",
      "NAME2: Toi t'es TYPE1 et moi je suis TYPE2 on ferait une bonne équipe en vrai NAME1",
    ],
  }
  

  static PRESENTATION3 ={
    "H" :[
      "NAME: On dirait que y a que moi qui me suis pas fait de pote ça se fait pas moi qui suis si TYPE",
      "NAME: Okok personne vient me parler à moi je retiens t'façon j'ai toujours su que c'était QU'UNE BANDE D...",
      "NAME: Bizarre, dans la vie je suis pourtant très apprecié de mon cactus de compagnie et là personne ne vient me parler",
      "NAME: Je suis quelqu'un de simple, on dit aussi de moi que je suis TYPE, mais sans amis c'est la première fois de ma vie ...",
      "NAME: Je suis allé dire bonjour à tout le monde on m'a ignoré mais pas grave chacun fait sa vie y a pas de soucis, le jour ou je trouve l'eau je la garde pour moi, si je fais le feu il sera que pour moi et j'irais aux toilettes tout seul aussi pas de problèmes j'ai compris !!"
    ],
    "F" :[
      "NAME: On dirait que y a que moi qui me suis pas fait de pote ça se fait pas moi qui suis si TYPE",
      "NAME: Okok personne vient me parler à moi je retiens t'façon j'ai toujours su que c'était QU'UNE BANDE D...",
      "NAME: Bizarre, dans la vie je suis pourtant très appreciée de mon cactus de compagnie et là personne ne vient me parler",
      "NAME: Je suis une fille simple, on dit aussi de moi que je suis TYPE, mais sans amis c'est la première fois de ma vie ...",
      "NAME: Je suis allée dire bonjour à tout le monde on m'a ignorée mais pas grave chacun fait sa vie y a pas de soucis, le jour ou je trouve l'eau je la garde pour moi, si je fais le feu il sera que pour moi et j'irais aux toilettes tout seul aussi pas de problèmes j'ai compris !!"
    ],
  }

  static TEAM_CONGRATS = {
    "H": [
      "NAME1: Ok je vais dire un truc que tout le monde pense on aurait jamais réussi sans NAME2 qui est si TYPE2, c'est ce qu'il fallait pour une épreuve COMPETENCE", 
      "NAME1: OMG qui aurait cru quelqu'un de TYPE2 comme NAME2 nous aurait fait gagner une épreuve COMPETENCE, bravo", 
      "NAME1: J'ai toujours su que t'étais un bon NAME2 depuis le premier jour ou je t'ai rencontré j'ai vu ce côté TYPE2", 
      "NAME1: Ecoute NAME2 je suis un gars réglo, t'as tout fait tout seul t'es fort pour ce qui est COMPETENCE, car tu es TYPE2", 
    ],
    "F": [
      "NAME1: Ok je vais dire un truc que tout le monde pense on aurait jamais réussi sans NAME2 qui est si TYPE2, c'est ce qu'il fallait pour une épreuve COMPETENCE", 
      "NAME1: OMG qui aurait cru que quelqu'un de TYPE2 comme NAME2 nous aurait fait gagner une épreuve COMPETENCE, bravo", 
      "NAME1: J'ai toujours su que t'étais un bon NAME2 depuis le premier jour ou je t'ai rencontré j'ai vu ce côté TYPE2", 
      "NAME1: Je suis une meuf sincère et ce que tu as fait ici NAME2 c'était génial, tu gère en COMPETENCE tu es tellement TYPE2",
    ],
  }

  static TEAM_CONGRATS_SOLO = {
    "H": [
      "NAME: Oui je sais je suis un gars TYPE, je suis chaud en COMPETENCE, je vous ai tous sauvé",
      "NAME: BOUM eeeet ouais sans moi on aurait perdu je suis un dieu pour les épreuves COMPETENCE",
    ],
    "F": [
      "NAME: En plus d'être une femme TYPE je peux dire que je suis forte en COMPETENCE maintenant",
      "NAME: Je suis grave cool je nous ai fait gagner car je suis TYPE donc forte en COMPETENCE",
    ],
  }

  static TEAM_SHAME = {
    "H": [
      "NAME1: MAIS OMG NAME2 t'as tout gaché on était bien partit mais toi qui est TYPE2 t'es trop nul en COMPETENCE",
      "NAME1: t'inquiète c'est pas parce que t'es TYPE2 qu'on a perdu NAME2 ... Attends si en fait c'est ta faute",
    ],
    "F": [
      "NAME1: MAIS OMG NAME2 t'as tout gaché on était bien partit mais toi qui est TYPE2 t'es trop nul en COMPETENCE",
      "NAME1: t'inquiète c'est pas parce que t'es TYPE2 qu'on a perdu NAME2 ... Attends si en fait c'est ta faute",
    ],
  }

  static TEAM_SHAME_SOLO = {
    "H": [
      "NAME: Vous m'en voulez pas qu'on a perdu car je suis trop TYPE pas vrai ...?",
      "NAME: COMPETENCE c'est pas mon fort je vous l'avais dit ... Ah non je vous l'avez pas dit ? Ah bah je vous le dis ...",
    ],
    "F": [
      "NAME: Vous m'en voulez pas qu'on a perdu car je suis trop TYPE pas vrai ...?",
      "NAME: COMPETENCE c'est pas mon fort je vous l'avais dit ... Ah non je vous l'avez pas dit ? Ah bah je vous le dis ...",
    ],
  
  }

  static EVENT = {
    INJURED: "blessé",
    FOUND_WATER: "trouvé l'eau",
    FOUND_ALCOHOL: "trouvé l'alcohol",
    MADE_FIRE: "fait le feu",
    STOP_FIRE: "éteint le feu",
    COLLIER: "a trouvé un collier",
    DISPUTE: "dispute",
    AMITIE: "amitié",
    DROLE: "drole",
    MANIOK: "a trouvé le manioc",
    PECHE: "est partit pêcher",
    PLUIE: "grosse pluie",
    CABANE: "construction de la cabane",
    CABANE_DESTRUCTED: "destruction de la cabane",
    COMPLOT: "complot",
    TRISTE: "triste",
  }

  static randomEpreuve(){
    let keys = Object.keys(Statics.EPREUVE);
    return Statics.EPREUVE[keys[ keys.length * Math.random() << 0]];
  }

  static randomArray(array, exclude = undefined){
    if (exclude && array.includes(exclude)) {
      let excludeIndex = array.indexOf(exclude)
      array.splice(excludeIndex, 1)
    }
    return array[Math.floor(Math.random() * array.length)];
  }

  static randomDic(dic){
    return 0;
  }

  static replaceDialogue(candidate1, candidate2, text, competence=undefined){
    text = text.replace(/NAME1/g, candidate1.name)
    text = text.replace(/NAME2/g, candidate2.name)
    text = text.replace(/TYPE1/g, candidate1.type.typeName)
    text = text.replace(/TYPE2/g, candidate2.type.typeName)
    if (competence){
      text = text.replace(/COMPETENCE/g, competence)
    }
    return text;
  }

  static replaceDialogueSolo(candidate, text, competence=undefined){
    text = text.replace(/NAME/g, candidate.name)
    text = text.replace(/TYPE/g, candidate.type.typeName)
    if (competence){
      text = text.replace(/COMPETENCE/g, competence)
    }
    return text;
  }

  static countOccurrences(array){
    return array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
  }
  
  static diffArray(arr1, arr2) {
    return arr1
      .concat(arr2)
      .filter(item => !arr1.includes(item) || !arr2.includes(item));
  }
}
