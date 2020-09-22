import Candidate from './Candidate'
export default class Statics {
  static EPREUVE = {
    PARCOURS_COMBATANT: {
      name: "parcours du combattant",
      type: "vitesse"
    },
    INSECTES: {
      name: "degustation d'insectes",
      type: "survie"
    },
    RADEAUX: {
      name: "radeaux",
      type: "inteligence"
    },
    POUTRE: {
      name: "les poutres",
      type: "chance"
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
      "NAME: Bizarre, dans la vie je suis pourtant très apprecié de mon cactus de compagnie et la personne ne vient me parler",
      "NAME: Je suis quelqu'un de simple, on dit aussi de moi que je suis TYPE, mais sans amis c'est la première fois de ma vie ...",
      "NAME: Je suis allé dire bonjour à tout le monde on m'a ignoré mais pas grave chacun fait sa vie y a pas de soucis, le jour ou je trouve l'eau je la garde pour moi, si je fais le feu il sera que pour moi et j'irais aux toilettes tout seul aussi pas de problèmes j'ai compris !!"
    ],
    "F" :[
      "NAME: On dirait que y a que moi qui me suis pas fait de pote ça se fait pas moi qui suis si TYPE",
      "NAME: Okok personne vient me parler à moi je retiens t'façon j'ai toujours su que c'était QU'UNE BANDE D...",
      "NAME: Bizarre, dans la vie je suis pourtant très appreciée de mon cactus de compagnie et la personne ne vient me parler",
      "NAME: Je suis une fille simple, on dit aussi de moi que je suis TYPE, mais sans amis c'est la première fois de ma vie ...",
      "NAME: Je suis allée dire bonjour à tout le monde on m'a ignorée mais pas grave chacun fait sa vie y a pas de soucis, le jour ou je trouve l'eau je la garde pour moi, si je fais le feu il sera que pour moi et j'irais aux toilettes tout seul aussi pas de problèmes j'ai compris !!"
    ],
  }

  static randomEpreuve(){
    let keys = Object.keys(Statics.EPREUVE);
    return Statics.EPREUVE[keys[ keys.length * Math.random() << 0]];
  }

  static randomArray(array){
    return array[Math.floor(Math.random() * array.length)];
  }

  static randomDic(dic){
    return 0;
  }

  static replaceDialogue(candidate1, candidate2, text){
    text = text.replace(/NAME1/g, candidate1.name)
    text = text.replace(/NAME2/g, candidate2.name)
    text = text.replace(/TYPE1/g, candidate1.type.typeName)
    text = text.replace(/TYPE2/g, candidate2.type.typeName)
    return text;
  }

  static replaceDialogueSolo(candidate, text){
    text = text.replace(/NAME/g, candidate.name)
    text = text.replace(/TYPE/g, candidate.type.typeName)
    return text;
  }
}
