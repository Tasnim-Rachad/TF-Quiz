//Définir les variables pour boutons
const boutonbtnQuiz = document.getElementById("btnQuiz");
const boutonCorriger = document.getElementById("corriger");
const boutonNouveau = document.getElementById("nouveauQuiz");

//Définir les variables pour les éléments du quiz
const entete = document.getElementById("entete");
const accueil = document.getElementById("accueil");
const quiz = document.getElementById("quiz");
const conteneurQuestions = document.getElementById("questions");
const affichageNote = document.getElementById("affichageNote");
const formQuiz = document.getElementById("formQuiz");

//Définir les variables pour le quiz
let questionsActuelles = [];
let quizCorrige = false;

//Dix questions possibles
const banqueQuestions = [
    {
        question: "Quelle instruction permet de déclarer une variable en JavaScript ?",
        reponse: "let"
    },
    {
        question: "Quelle fonction affiche un message dans la console ?",
        reponse: "console.log"
    },
    {
        question: "Quel mot-clé permet de déclarer une constante ?",
        reponse: "const"
    },
    {
        question: "Quel symbole permet de vérifier l'égalité stricte ?",
        reponse: "==="
    },
    {
        question: "Quelle propriété permet de lire le contenu d'un champ input ?",
        reponse: "value"
    },
    {
        question: "Quelle instruction permet de répéter du code tant qu'une condition est vraie ?",
        reponse: "while"
    },
    {
        question: "Quelle touche du clavier ouvre la console ?",
        reponse: "F12"
    },
    {
        question: "Quel événement JavaScript se déclenche lors d'un clic ?",
        reponse: "click"
    },
    {
        question: "Quelle méthode sélectionne un élément HTML grâce à son identifiant ?",
        reponse: "getElementById"
    },
    {
        question: "Quel mot-clé permet de créer une fonction classique ?",
        reponse: "function"
    }
];



// Sélectionne cinq questions différentes
function choisirQuestions(questions) {
    // Copie de la banque pour ne pas la modifier
    const copie = questions.slice();
    const choisies = [];

    for (let i = 0; i < 5; i++) {
        // On retire une question au hasard de la copie, donc pas de répétition
        const j = Math.floor(Math.random() * copie.length);
        choisies.push(copie.splice(j, 1)[0]);
        console.log("Choix i = " + i + ", j = " + j + " : " + choisies[i].question);
    }

    return choisies;
}

// Démarrer un nouveau quiz
function demarrerQuiz() {
    // Créer le quiz
    questionsActuelles = choisirQuestions(banqueQuestions);

    // Affiche les questions sélectionnées
    for (let i = 0; i < questionsActuelles.length; i++) {
        const texte = document.getElementById("q" + (i + 1));
        const champ = document.getElementById("rep" + (i + 1));

        texte.textContent = questionsActuelles[i].question;
        console.log("Question " + i + " : " + texte.textContent);

        // Vide le form du quiz précédent
        champ.value = "";
        champ.disabled = false;
        champ.style.borderColor = "";
        champ.style.borderWidth = "";
    }

    quizCorrige = false;

    affichageNote.textContent = "";
    boutonCorriger.classList.remove("cache");
    boutonNouveau.classList.add("cache");

    accueil.classList.add("cache")
    quiz.classList.remove("cache")
    document.body.classList.add("quizActif");
}

// Corrige les cinq réponses
formQuiz.addEventListener("submit", function(event) {
    event.preventDefault();

    if (quizCorrige) {
        return;
    }

    // Vérifie que les cinq réponses sont remplies
    for (let i = 0; i < questionsActuelles.length; i++) {
        const champ = document.getElementById("rep" + (i + 1));
        console.log("Vérification i = " + i + " : \"" + champ.value + "\"");

        if (champ.value.trim() === "") {
            alert("Mais, c'est un quiz! Tu dois répondre aux 5 questions avant de calculer ta note!");
            champ.focus();
            return;
        }
    }

    let score = 0;

    for (let i = 0; i < questionsActuelles.length; i++) {
        const champ = document.getElementById("rep" + (i + 1));

        // trim enleve les espaces autour de la réponse et toLowerCase permet de comparer des mots en minuscule
        const reponseUtilisateur = champ.value.trim().toLowerCase();

        const bonneReponse = questionsActuelles[i].reponse.trim().toLowerCase();
        console.log("Correction i = " + i + " : " + reponseUtilisateur + " / " + bonneReponse);

        //Pour voir où est l'erreur et les bonnes réponses
        console.log(champ.style.borderColor)
        if (reponseUtilisateur === bonneReponse) {
            score++;
            champ.style.borderColor = "#18864b";
            champ.style.borderWidth = "5px";
            console.log("VRAIE")
        } else {
            champ.style.borderColor = "#c62828";
            champ.style.borderWidth = "5px";
            console.log("FAUX BOIING BOIING");
        }
        console.log(champ.style.borderColor)

        champ.disabled = true;
    }

    quizCorrige = true;

    affichageNote.textContent = "Votre note finale est de : " + score + " / 5";

    if (score === 5) {
        alert("Hourrah!!!");
    }

    boutonCorriger.classList.add("cache");
    boutonNouveau.classList.remove("cache");
});

// Boutons
boutonbtnQuiz.addEventListener("click", demarrerQuiz);
boutonNouveau.addEventListener("click", demarrerQuiz);
