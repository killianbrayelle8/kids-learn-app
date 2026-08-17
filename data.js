// ===================================================================
// KidLearn — contenu par ÂGE (0-13 ans) puis MATIÈRE
// Vidéos FR sauf matière "Anglais". Système freemium : gratuit:true => libre,
// gratuit:false => verrouillé tant qu'il n'y a pas d'abonnement.
// Pour ajouter une vidéo : YouTube -> watch?v=XXXXXXXX -> prends l'ID.
//   { id, titre, duree, age, gratuit:true|false, quiz? }
// Un "quiz" = [{ question, options:[...], reponse: indexBonneReponse }]
// ===================================================================

const AGES_DATA = [
  {
    key: "0-2", label: "0-2 ans", emoji: "👶",
    couleur: "#ffd6e7", couleurFoncee: "#f06595",
    description: "Éveil : comptines, couleurs et formes",
    matieres: [
      {
        key: "maths", nom: "Mathématiques", emoji: "🔢",
        videos: [
          { id: "myHHPyUcHOs", titre: "Les formes — comptine (rond, triangle, carré)", duree: "3 min", age: "0-2 ans", gratuit: true,
            quiz: [ { question: "Combien de côtés a un triangle ?", options: ["3", "4", "5"], reponse: 0 } ] },
          { id: "H84ZdsW57xA", titre: "Les formes en couleurs — chanson", duree: "3 min", age: "0-2 ans", gratuit: true,
            quiz: [ { question: "Le ciel est de quelle couleur ?", options: ["Bleu", "Vert", "Noir"], reponse: 0 } ] },
          { id: "PLpQgJ9uN6anHcflLb_FqbuzbfXKAQiqzk", titre: "Couleurs et formes (playlist complète)", duree: "25 min", age: "0-2 ans", gratuit: false,
            quiz: [ { question: "La pomme est de quelle couleur ?", options: ["Rouge", "Bleu", "Vert"], reponse: 0 } ] },
          { id: "NpHmm5Gly_E", titre: "Apprendre les formes & couleurs — Titounis", duree: "4 min", age: "0-2 ans", gratuit: false,
            quiz: [ { question: "Le soleil est de quelle couleur ?", options: ["Jaune", "Bleu", "Rose"], reponse: 0 } ] }
        ]
      },
      {
        key: "francais", nom: "Français", emoji: "📚",
        videos: [
          { id: "NpHmm5Gly_E", titre: "Formes & couleurs — Titounis", duree: "4 min", age: "0-2 ans", gratuit: true,
            quiz: [ { question: "La pomme est de quelle couleur ?", options: ["Rouge", "Bleu", "Vert"], reponse: 0 } ] },
          { id: "PL8Mfzkj8FPJuaSxo0mUOow729aJsXASDW", titre: "Chansons des couleurs — Titounis", duree: "20 min", age: "0-2 ans", gratuit: false,
            quiz: [ { question: "Le soleil est de quelle couleur ?", options: ["Jaune", "Bleu", "Rose"], reponse: 0 } ] }
        ]
      }
    ]
  },
  {
    key: "3-5", label: "3-5 ans", emoji: "🧒",
    couleur: "#d0ebff", couleurFoncee: "#4dabf7",
    description: "Maternelle : alphabet, compter, chansons",
    matieres: [
      {
        key: "maths", nom: "Mathématiques", emoji: "🔢",
        videos: [
          { id: "NmCize5EwbU", titre: "Compter jusqu'à 100 (chanson des nombres)", duree: "4 min", age: "3-5 ans", gratuit: true,
            quiz: [ { question: "Combien font 2 + 3 ?", options: ["4", "5", "6"], reponse: 1 } ] },
          { id: "VYR20RmHook", titre: "La Chanson des Chiffres — Bébefinn (FR)", duree: "3 min", age: "3-5 ans", gratuit: true,
            quiz: [ { question: "Combien font 3 + 1 ?", options: ["3", "4", "5"], reponse: 1 } ] },
          { id: "UsEz58BblMY", titre: "Les chiffres et nombres de 1 à 20 — Alain le Lait", duree: "3 min", age: "3-5 ans", gratuit: false,
            quiz: [ { question: "Quel nombre vient après 10 ?", options: ["9", "11", "12"], reponse: 1 } ] }
        ]
      },
      {
        key: "francais", nom: "Français", emoji: "📚",
        videos: [
          { id: "x9z6soxOkao", titre: "ABC en image pour les maternelles — Tidoon", duree: "6 min", age: "3-5 ans", gratuit: true,
            quiz: [ { question: "Quelle lettre fait le son 'a' ?", options: ["A", "B", "C"], reponse: 0 } ] },
          { id: "tywHA5Qys-Y", titre: "Apprendre l'alphabet en s'amusant (FR) — Titounis", duree: "4 min", age: "3-5 ans", gratuit: true,
            quiz: [ { question: "Quelle lettre vient après A ?", options: ["B", "C", "D"], reponse: 0 } ] },
          { id: "GVzXC7M6r_U", titre: "L'alphabet et 95 mots de vocabulaire — Tidoon", duree: "8 min", age: "3-5 ans", gratuit: false,
            quiz: [ { question: "Combien de lettres dans l'alphabet FR ?", options: ["20", "26", "30"], reponse: 1 } ] }
        ]
      },
      {
        key: "anglais", nom: "Anglais", emoji: "🔤",
        videos: [
          { id: "ccEpTTZW34g", titre: "The Alphabet Song — Finny The Shark", duree: "2 min", age: "3-5 ans", gratuit: true,
            quiz: [ { question: "Quelle est la 1re lettre de l'alphabet ?", options: ["A", "B", "Z"], reponse: 0 } ] },
          { id: "hBr3K_i-3gc", titre: "Apprendre l'anglais en chantant (débutant)", duree: "15 min", age: "3-5 ans", gratuit: false,
            quiz: [ { question: "Comment dit-on 'chat' en anglais ?", options: ["Cat", "Chien", "Bird"], reponse: 0 } ] }
        ]
      }
    ]
  },
  {
    key: "6-8", label: "6-8 ans", emoji: "🧑",
    couleur: "#d3f9d8", couleurFoncee: "#51cf66",
    description: "CP / CE1 : lire, calculer, anglais débutant",
    matieres: [
      {
        key: "maths", nom: "Mathématiques", emoji: "🔢",
        videos: [
          { id: "OJBlk9J8gd4", titre: "Lire et compter jusqu'à 10 (CP/GS)", duree: "10 min", age: "6-8 ans", gratuit: true,
            quiz: [ { question: "Combien font 1 + 1 ?", options: ["1", "2", "3"], reponse: 1 } ] },
          { id: "UsEz58BblMY", titre: "Les chiffres et nombres de 1 à 20 — Alain le Lait", duree: "3 min", age: "6-8 ans", gratuit: true,
            quiz: [ { question: "Quel nombre vient après 10 ?", options: ["9", "11", "12"], reponse: 1 } ] },
          { id: "PPdtiHns39M", titre: "Tous les sons du CP — méthode syllabique", duree: "12 min", age: "6-8 ans", gratuit: false,
            quiz: [ { question: "On apprend à lire avec les... ?", options: ["Sons", "Couleurs", "Formes"], reponse: 0 } ] }
        ]
      },
      {
        key: "francais", nom: "Français", emoji: "📚",
        videos: [
          { id: "GVzXC7M6r_U", titre: "L'alphabet et 95 mots de vocabulaire — Tidoon", duree: "8 min", age: "6-8 ans", gratuit: true,
            quiz: [ { question: "Combien de lettres dans l'alphabet FR ?", options: ["20", "26", "30"], reponse: 1 } ] },
          { id: "n5sAIbmhMjM", titre: "Foufou — Les syllabes pour les enfants", duree: "4 min", age: "6-8 ans", gratuit: true,
            quiz: [ { question: "Combien de syllabes dans 'chat' ?", options: ["1", "2", "3"], reponse: 0 } ] },
          { id: "ZtfSvJcgNqU", titre: "Lettre, son et syllabe — CP/CE1", duree: "9 min", age: "6-8 ans", gratuit: false,
            quiz: [ { question: "Un mot est composé de... ?", options: ["Syllabes", "Couleurs", "Chiffres"], reponse: 0 } ] }
        ]
      },
      {
        key: "anglais", nom: "Anglais", emoji: "🔤",
        videos: [
          { id: "_UR-l3QI2nE", titre: "Chanson de l'alphabet (ABC Song)", duree: "50 min", age: "6-8 ans", gratuit: true,
            quiz: [ { question: "Comment dit-on 'pomme' en anglais ?", options: ["Apple", "Banana", "Cat"], reponse: 0 } ] },
          { id: "tKsIi1MH4lw", titre: "ABC Phonics — sons des lettres", duree: "5 min", age: "6-8 ans", gratuit: true,
            quiz: [ { question: "Comment dit-on 'chat' en anglais ?", options: ["Dog", "Cat", "Bird"], reponse: 1 } ] },
          { id: "c6pqaA9gmEE", titre: "Anglais pour enfants — Cours Ami Mumu", duree: "20 min", age: "6-8 ans", gratuit: false,
            quiz: [ { question: "Comment dit-on 'bonjour' en anglais ?", options: ["Hello", "Bye", "Red"], reponse: 0 } ] }
        ]
      }
    ]
  },
  {
    key: "9-11", label: "9-11 ans", emoji: "📚",
    couleur: "#fff3bf", couleurFoncee: "#fcc419",
    description: "CM1 / CM2 : grammaire, calcul, anglais",
    matieres: [
      {
        key: "maths", nom: "Mathématiques", emoji: "🔢",
        videos: [
          { id: "IWcz-se9Pj0", titre: "Tables de multiplication CE2-CM1-CM2-6e", duree: "8 min", age: "9-11 ans", gratuit: true,
            quiz: [ { question: "Combien font 3 × 2 ?", options: ["5", "6", "9"], reponse: 1 } ] },
          { id: "j5fu47VjQhw", titre: "La Table de 7 (apprendre les tables)", duree: "4 min", age: "9-11 ans", gratuit: true,
            quiz: [ { question: "Combien font 7 × 1 ?", options: ["7", "14", "1"], reponse: 0 } ] },
          { id: "0h9bZZoQfJM", titre: "Tracer un cercle circonscrit — 6e/5e", duree: "6 min", age: "9-11 ans", gratuit: false,
            quiz: [ { question: "Un cercle a-t-il des coins ?", options: ["Oui", "Non", "Parfois"], reponse: 1 } ] }
        ]
      },
      {
        key: "francais", nom: "Français", emoji: "📚",
        videos: [
          { id: "KmWZZ1V0UV0", titre: "Le présent 1er/2e groupe — CM1/CM2", duree: "9 min", age: "9-11 ans", gratuit: true,
            quiz: [ { question: "Le verbe 'chanter' au présent, 1re pers. ?", options: ["chante", "chantons", "chantait"], reponse: 0 } ] },
          { id: "RgJOQwMqRgs", titre: "Conjuguer un verbe — CM1/CM2", duree: "8 min", age: "9-11 ans", gratuit: true,
            quiz: [ { question: "Qu'est-ce que la conjugaison ?", options: ["Accorder le verbe", "Compter", "Lire"], reponse: 0 } ] },
          { id: "IrQBW_XJQ9c", titre: "Le passé simple — CM1/CM2", duree: "9 min", age: "9-11 ans", gratuit: false,
            quiz: [ { question: "Le passé simple sert pour... ?", options: ["Hier", "Demain", "Maintenant"], reponse: 0 } ] }
        ]
      },
      {
        key: "anglais", nom: "Anglais", emoji: "🔤",
        videos: [
          { id: "_R0xRT2y7Uo", titre: "Apprendre l'alphabet — Ms Rachel", duree: "1 h", age: "9-11 ans", gratuit: true,
            quiz: [ { question: "Quelle couleur est le soleil ?", options: ["Red", "Yellow", "Blue"], reponse: 1 } ] },
          { id: "PLk8iw50loetckdZ119Cqlul9e__GZdc60", titre: "Comptines anglais avec paroles", duree: "30 min", age: "9-11 ans", gratuit: false,
            quiz: [ { question: "Comment dit-on 'rouge' ?", options: ["Red", "Blue", "Green"], reponse: 0 } ] }
        ]
      }
    ]
  },
  {
    key: "12-13", label: "12-13 ans", emoji: "🎓",
    couleur: "#e5dbff", couleurFoncee: "#9775fa",
    description: "Collège : fractions, géométrie, français renforcé",
    matieres: [
      {
        key: "maths", nom: "Mathématiques", emoji: "🔢",
        videos: [
          { id: "_xZkeQM8tm4", titre: "Représenter les fractions — 6e", duree: "7 min", age: "12-13 ans", gratuit: true,
            quiz: [ { question: "1/2 + 1/2 = ?", options: ["1", "2", "1/4"], reponse: 0 } ] },
          { id: "WPmB1mJ3HO0", titre: "Reconnaître les triangles — 6e", duree: "6 min", age: "12-13 ans", gratuit: true,
            quiz: [ { question: "Combien de côtés a un triangle ?", options: ["3", "4", "5"], reponse: 0 } ] },
          { id: "z0olRGs7kPk", titre: "Le cours des triangles — 6e", duree: "10 min", age: "12-13 ans", gratuit: false,
            quiz: [ { question: "Un triangle équilatéral a ses côtés... ?", options: ["Égaux", "Différents", "Courbes"], reponse: 0 } ] }
        ]
      },
      {
        key: "francais", nom: "Français", emoji: "📚",
        videos: [
          { id: "PL21QjdeQG6a7glgPWLzw44Pzywr-76urk", titre: "Grammaire CM1-CM2-6e (playlist)", duree: "40 min", age: "12-13 ans", gratuit: true,
            quiz: [ { question: "Que désigne un adjectif ?", options: ["Le nom", "Le verbe", "Une qualité"], reponse: 2 } ] },
          { id: "PLdWGoUnycmL4hiDghLJO5LH5VHXPijqQT", titre: "Apprendre à lire — sons (playlist)", duree: "45 min", age: "12-13 ans", gratuit: false,
            quiz: [ { question: "La lecture utilise la méthode... ?", options: ["Syllabique", "Des couleurs", "Des chiffres"], reponse: 0 } ] }
        ]
      },
      {
        key: "anglais", nom: "Anglais", emoji: "🔤",
        videos: [
          { id: "tKsIi1MH4lw", titre: "ABC Phonics — sons des lettres", duree: "5 min", age: "12-13 ans", gratuit: true,
            quiz: [ { question: "Comment dit-on 'chat' en anglais ?", options: ["Dog", "Cat", "Bird"], reponse: 1 } ] },
          { id: "c6pqaA9gmEE", titre: "Anglais pour enfants — Cours Ami Mumu", duree: "20 min", age: "12-13 ans", gratuit: false,
            quiz: [ { question: "Comment dit-on 'merci' ?", options: ["Thanks", "Hello", "Red"], reponse: 0 } ] }
        ]
      }
    ]
  }
];

window.APP_DATA = { AGES: AGES_DATA };
