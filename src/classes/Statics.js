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

  static PRESENTATION1 =[
    "NAME1: Bonjour je me présente moi c'est NAME1, je cherche un allié dans l'aventure quelqu'un comme toi de TYPE2",
    "NAME1: Wesh, toi + moi = poto?",
    "NAME1: Excuse j'ai oublié ton nom c'est Amandine ou NAME2 ?",
  ]

  static PRESENTATION2 =[
    "NAME2: Euh... salut NAME1 si tu veux qu'on fasse connaissance je te préviens directe je suis TYPE2",
    "NAME2: Tout ce que j'ai toujours voulu toute ma vie c'est qu'on soit amis NAME1 même si on s'est rencontré y a 5 minutes je sais ...",
    "NAME2: Toi t'es TYPE1 et moi je suis TYPE2 on ferait une bonne équipe en vrai NAME1",
  ]

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
    console.log(candidate1)
    text = text.replace(/NAME1/g, candidate1.name)
    text = text.replace(/NAME2/g, candidate2.name)
    text = text.replace(/TYPE1/g, candidate1.type.typeName)
    text = text.replace(/TYPE2/g, candidate2.type.typeName)
    return text;
  }
}
