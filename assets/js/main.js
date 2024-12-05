console.log("Sajt");

// const dogadjajiNiz = ["Koncerti", "Festivali", "Stand up"];

// const padajuciMeni = document.querySelector("#izaberiDogadjaj");

// dogadjajiNiz.forEach(function(tip){
//     const meniDDl = document.createElement("li");
//     meniDDl.innerHTML = `<li><a href='${tip.toLocaleLowerCase}.html'/>${tip}</li>`;
//     padajuciMeni.appendChild(meniDDl);
// })



//dodavanje dogadjaja iz forme
document.getElementById("dogadjajForma").addEventListener("submit", (e) => {
    e.preventDefault();

    const naziv = document.getElementById("naziv").value;
    const datum = document.getElementById("datum").value;
    const lokacija = document.getElementById("lokacija").value;
    const opis = document.getElementById("opis").value;
    const tip = document.getElementById("tip").value;
    // const slika = document.getElementById("slika").value;

    const noviDogadjaji = {naziv, datum, lokacija, opis, tip, slika};

    //regularni izrai deo

    const sviDogadjaji = JSON.parse(localStorage.getItem("dogadjaji")) || [];
    sviDogadjaji.push(noviDogadjaji);
    localStorage.setItem("dogadjaji", JSON.stringify(sviDogadjaji));

    prikaziDogadjaj(noviDogadjaji);

})

function prikaziDogadjaj(dogadjaj){
    const {naziv, datum, lokacija, opis, tip, slika} = dogadjaj;

    const dogadjajiKartica = document.createElement("div");

    dogadjajiKartica.className = "dogadjaji-kartica";
    dogadjajiKartica.innerHTML = `
    <img src="assets/img/ExoticaEvent-1baner-800-800x579.png" alt="" style="width: 100%; height: auto;">
    <p>${tip}</p>
    <h3>${naziv}</h3>
    <p>Datum pocetka: ${datum}</p>
    <p>Lokacija: ${lokacija}</p>
    <p>${opis}</p>
    <button class="detalji-dugme">Detalji</button>`;

    const targetSection = document.getElementById(tip);
    if(targetSection){
        targetSection.appendChild(dogadjajiKartica);
    }
    else{
        // console.error(`Sekcija za ${tip} ne postoji.`);
    }

    document.getElementById("dogadjajForma").reset();
}

function ucitajDogadjaje() {
    const sviDogadjaji = JSON.parse(localStorage.getItem("dogadjaji")) || [];
    sviDogadjaji.forEach(prikaziDogadjaj);
}


document.addEventListener("DOMContentLoaded", ucitajDogadjaje);



//-----------festival deo za prikaz festivala iz localstorage------------
document.addEventListener("DOMContentLoaded", () => {
    var trenutnaStrana = window.location.pathname;
    if (trenutnaStrana.includes("festival.html") || trenutnaStrana.includes("koncert.html")) {
        prikaziFestivale();
    }
});

function prikaziFestivale(){
    var sviDogadjaji = JSON.parse(localStorage.getItem("dogadjaji")) || [];
    var festivali = sviDogadjaji.filter(dogadjaj => dogadjaj.tip === "festival");
    var koncerti = sviDogadjaji.filter(dogadjaj => dogadjaj.tip === "koncert")
    var festivalSekcija = document.getElementById("festival-sekcija");
    var koncertSekcija = document.getElementById("koncert-sekcija");

    if(festivalSekcija){
        if(festivali.length === 0){
            festivalSekcija.innerHTML = "<p>Trenutno nema dostupnih festivala. Ovde mozete dodati dogadjaj: <a href='index.html'>Dodaj dogadjaj</a></p>";
        }
        else{
            festivali.forEach((festival)=>{
                const festivalKartica = document.createElement("div");
                festivalKartica.className = "festival-kartica";
                festivalKartica.innerHTML = `
                <img src="assets/img/ExoticaEvent-1baner-800-800x579.png" alt="" style="width: 100%; height: auto;">
                <h3>${festival.naziv}</h3>
                <p>${festival.tip}</p>
                <p><strong>Datum:</strong> ${festival.datum}</p>
                <p><strong>Lokacija:</strong> ${festival.lokacija}</p>
                <p>${festival.opis}</p>
                <button class="detalji-dugme">Detalji</button>
                `;
                festivalSekcija.appendChild(festivalKartica);
            })
        }
    }


    if(koncertSekcija){
        if(koncerti.length === 0){
            koncertSekcija.innerHTML = "<p>Trenutno nema dostupnih koncerta. Ovde mozete dodati dogadjaj: <a href='index.html'>Dodaj dogadjaj</a></p>";
        }
        else{
            koncerti.forEach((koncert)=>{
                const koncertKartica = document.createElement("div");
                koncertKartica.className = "koncert-kartica";
                koncertKartica.innerHTML = `
                <img src="assets/img/ExoticaEvent-1baner-800-800x579.png" alt="" style="width: 100%; height: auto;">
                <h3>${koncert.naziv}</h3>
                <p>${koncert.tip}</p>
                <p><strong>Datum:</strong> ${koncert.datum}</p>
                <p><strong>Lokacija:</strong> ${koncert.lokacija}</p>
                <p>${koncert.opis}</p>
                <button class="detalji-dugme">Detalji</button>
                `;
                koncertSekcija.appendChild(koncertKartica);
            })
        }
    }
}