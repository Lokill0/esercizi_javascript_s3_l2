/*
  REGOLE
  - Continua quello che hai iniziato stamani in classe.
  - Niente eventi (li vediamo domani): chiama le funzioni dalla console o all'avvio.
  - Solo const/let, mai var. Solo querySelector/querySelectorAll per il DOM.
*/

/* SCRIVI QUI LE TUE FUNZIONI:
   1. Modifica aggiungiTask per accettare priorita
   2. Aggiungi bottone Elimina su ogni task
   6. evidenzia(indice) / togliEvidenza(indice)
   7. data automatica nel task
   8. contaPerPriorita()
*/

// Selezione degli elementi HTML
const inputTask = document.querySelector("#nuovo-task");
const listaTask = document.querySelector("#lista-task");
const contatore = document.querySelector("#contatore");

// Funzione per ottenere la data e l'ora attuali
function ottieniDataOra() {
    const ora = new Date();

    const giorno = String(ora.getDate()).padStart(2, "0");
    const mese = String(ora.getMonth() + 1).padStart(2, "0");
    const anno = ora.getFullYear();

    const ore = String(ora.getHours()).padStart(2, "0");
    const minuti = String(ora.getMinutes()).padStart(2, "0");
    const secondi = String(ora.getSeconds()).padStart(2, "0");

    return `${giorno}/${mese}/${anno}, ${ore}:${minuti}:${secondi}`;
}

// Aggiorna il contatore totale
function aggiornaTotale() {
    const totale = listaTask.querySelectorAll("li").length;
    contatore.textContent = totale;
}

// 1. Aggiunge un task con una priorità
function aggiungiTask(testo, priorita = "media", dataOra = ottieniDataOra()) {

    // Se il testo non viene passato, leggo l'input
    if (testo === undefined) {
        testo = inputTask.value;
    }

    // Controllo che il testo non sia vuoto
    if (testo.trim() === "") {
        console.log("Inserisci un task!");
        return;
    }

    // Controllo che la priorità sia valida
    if (
        priorita !== "alta" &&
        priorita !== "media" &&
        priorita !== "bassa"
    ) {
        console.log("Priorità non valida!");
        return;
    }

    // Creo l'elemento li
    const nuovoLi = document.createElement("li");
    nuovoLi.classList.add("priorita-" + priorita);

    // Creo lo span del testo
    const testoTask = document.createElement("span");
    testoTask.textContent = testo;
    nuovoLi.appendChild(testoTask);

    // Creo il badge della priorità
    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = priorita;
    nuovoLi.appendChild(badge);

    // Creo il contenitore della data
    const divData = document.createElement("div");
    divData.classList.add("divData");

    // Creo la data e l'ora
    const data = document.createElement("span");
    data.classList.add("data");
    data.textContent = dataOra;
    divData.appendChild(data);

    // Creo il pulsante Elimina
    const bottoneElimina = document.createElement("button");
    bottoneElimina.textContent = "Elimina";
    divData.appendChild(bottoneElimina);

    // Inserisco il contenitore nel task
    nuovoLi.appendChild(divData);

    // Aggiungo il task alla lista
    listaTask.appendChild(nuovoLi);

    // Svuoto l'input e aggiorno il totale
    inputTask.value = "";
    aggiornaTotale();
}

// 2. Elimina un task usando il suo indice
function eliminaTask(indice) {
    const task = listaTask.querySelectorAll("li")[indice];

    if (task !== undefined) {
        task.remove();
        aggiornaTotale();
    } else {
        console.log("Indice non valido!");
    }
}

// 6. Evidenzia un task
function evidenzia(indice) {
    const task = listaTask.querySelectorAll("li")[indice];

    if (task !== undefined) {
        task.classList.add("evidenziato");
    } else {
        console.log("Indice non valido!");
    }
}

// 6. Rimuove l'evidenziazione
function togliEvidenza(indice) {
    const task = listaTask.querySelectorAll("li")[indice];

    if (task !== undefined) {
        task.classList.remove("evidenziato");
    } else {
        console.log("Indice non valido!");
    }
}

// 8. Conta i task per priorità
function contaPerPriorita() {
    const task = listaTask.querySelectorAll("li");

    let alta = 0;
    let media = 0;
    let bassa = 0;

    task.forEach(elemento => {
        if (elemento.classList.contains("priorita-alta")) {
            alta++;
        } else if (elemento.classList.contains("priorita-media")) {
            media++;
        } else if (elemento.classList.contains("priorita-bassa")) {
            bassa++;
        }
    });

    const risultato = {
        alta: alta,
        media: media,
        bassa: bassa
    };

    console.log(risultato);
    return risultato;
}

// Task iniziali mostrati nell'immagine
const dataIniziale = "20/10/2026, 13:15:17";

const taskIniziali = [
    { testo: "Pagare le bollette", priorita: "alta" },
    { testo: "Studiare JavaScript", priorita: "media" },
    { testo: "Comprare il pane", priorita: "bassa" },
    { testo: "Chiamare il dentista", priorita: "alta" },
    { testo: "Riposarsi", priorita: "bassa" }
];

// Creo i cinque task iniziali
taskIniziali.forEach(task => {
    aggiungiTask(task.testo, task.priorita, dataIniziale);
});

// Evidenzio il secondo task
evidenzia(1);

// Aggiorno il contatore all'avvio
aggiornaTotale();

