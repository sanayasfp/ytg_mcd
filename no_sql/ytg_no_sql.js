// MongoDB Playground use ytg database

use("ytg");

const WORKING_COLLECTIONS = [
  "evenementsOlympiques",
  "competitions",
  "stades",
  "athletes",
  "officiers",
  "jeux",
  "restaurants",
];

// Création des collections

for (const collection of WORKING_COLLECTIONS) {
  db.getCollection(collection)
    ? db.getCollection(collection).drop()
    : db.createCollection(collection);
}

// Insertion des documents dans les collections
db.getCollection("evenementsOlympiques").insertMany([
  {
    noEvenement: "JO2024",
    annee: 2024,
    dateDebut: new Date("2024-07-26"),
    dateFin: new Date("2024-08-11"),
    pays: "France",
  },
]);

db.getCollection("competitions").insertMany([
  {
    noStade: "STADE1",
    nomCompetition: "Volley-ball",
    dateHeureDebut: new Date("2024-07-26T08:00:00"),
    dateHeureFin: new Date("2024-07-26T10:00:00"),
    evenementOlympique: "JO2024",
    ville: "Paris",
    images: ["https://example.com/image1.jpg"],
    videos: ["https://example.com/video1.mp4"],
    athletes: ["ATH1", "ATH2"],
    officiers: ["OFF1", "OFF2"],
  },
  {
    noStade: "STADE2",
    nomCompetition: "Cyclisme",
    dateHeureDebut: new Date("2024-07-26T08:00:00"),
    dateHeureFin: new Date("2024-07-26T10:00:00"),
    evenementOlympique: "JO2024",
    ville: "Marseille",
    images: ["https://example.com/image2.jpg"],
    videos: ["https://example.com/video2.mp4"],
    athletes: ["ATH3", "ATH4"],
    officiers: ["OFF5", "OFF1"],
  },
  {
    noStade: "STADE3",
    nomCompetition: "Football",
    dateHeureDebut: new Date("2024-07-26T08:00:00"),
    dateHeureFin: new Date("2024-07-26T10:00:00"),
    evenementOlympique: "JO2024",
    ville: "Lyon",
    images: ["https://example.com/image3.jpg"],
    videos: ["https://example.com/video3.mp4"],
    athletes: ["ATH5", "ATH2"],
    officiers: ["OFF1", "OFF4"],
  },
  {
    noStade: "STADE4",
    nomCompetition: "Handball",
    dateHeureDebut: new Date("2024-07-26T08:00:00"),
    dateHeureFin: new Date("2024-07-26T10:00:00"),
    evenementOlympique: "JO2024",
    ville: "Nice",
    images: ["https://example.com/image4.jpg"],
    videos: ["https://example.com/video4.mp4"],
    athletes: ["ATH5", "ATH3"],
    officiers: ["OFF3", "OFF2"],
  },
  {
    noStade: "STADE5",
    nomCompetition: "Tennis",
    dateHeureDebut: new Date("2024-07-26T08:00:00"),
    dateHeureFin: new Date("2024-07-26T10:00:00"),
    evenementOlympique: "JO2024",
    ville: "Bordeaux",
    images: ["https://example.com/image5.jpg"],
    videos: ["https://example.com/video5.mp4"],
    athletes: ["ATH1", "ATH4"],
    officiers: ["OFF1", "OFF2"],
  },
]);

db.getCollection("stades").insertMany([
  {
    noStade: "STADE1",
    nomStade: "Stade de France",
    pays: "France",
    province: "Île-de-France",
    ville: "Saint-Denis",
    adresse: "93216 Saint-Denis",
    telephone: "+33 1 55 93 00 00",
  },
  {
    noStade: "STADE2",
    nomStade: "Vélodrome",
    pays: "France",
    province: "Provence-Alpes-Côte d'Azur",
    ville: "Marseille",
    adresse: "3 Boulevard Michelet, 13008 Marseille",
    telephone: "+33 4 91 13 20 00",
  },
  {
    noStade: "STADE3",
    nomStade: "Groupama Stadium",
    pays: "France",
    province: "Auvergne-Rhône-Alpes",
    ville: "Décines-Charpieu",
    adresse: "10 Avenue Simone Veil, 69150 Décines-Charpieu",
    telephone: "+33 4 72 10 00 00",
  },
  {
    noStade: "STADE4",
    nomStade: "Allianz Riviera",
    pays: "France",
    province: "Provence-Alpes-Côte d'Azur",
    ville: "Nice",
    adresse: "Boulevard des Jardiniers, 06200 Nice",
    telephone: "+33 4 97 07 00 00",
  },
  {
    noStade: "STADE5",
    nomStade: "Matmut Atlantique",
    pays: "France",
    province: "Nouvelle-Aquitaine",
    ville: "Bordeaux",
    adresse: "Cours Jules Ladoumègue, 33300 Bordeaux",
    telephone: "+33 5 56 16 20 20",
  },
]);

db.getCollection("athletes").insertMany([
  {
    noAthlete: "ATH1",
    nom: "Doe",
    prenom: "John",
    pays: "USA",
    age: 25,
    jeux: ["JO2024"],
    photo: "https://example.com/johndoe.jpg",
    medaille: [{ type: "Or", competition: "Volley-ball" }],
  },
  {
    noAthlete: "ATH2",
    nom: "Smith",
    prenom: "Jane",
    pays: "USA",
    age: 22,
    jeux: ["JO2024"],
    photo: "https://example.com/janesmith.jpg",
    medaille: [{ type: "Argent", competition: "Volley-ball" }],
  },
  {
    noAthlete: "ATH3",
    nom: "Johnson",
    prenom: "Alice",
    pays: "USA",
    age: 28,
    jeux: ["JO2024"],
    photo: "https://example.com/alicejohnson.jpg",
    medaille: [{ type: "Bronze", competition: "Cyclisme" }],
  },
  {
    noAthlete: "ATH4",
    nom: "Brown",
    prenom: "Bob",
    pays: "USA",
    age: 30,
    jeux: ["JO2024"],
    photo: "https://example.com/bobbrown.jpg",
    medaille: [{ type: "Or", competition: "Tennis" }],
  },
  {
    noAthlete: "ATH5",
    nom: "Williams",
    prenom: "Will",
    pays: "USA",
    age: 26,
    jeux: ["JO2024"],
    photo: "https://example.com/willwilliams.jpg",
    medaille: [{ type: "Argent", competition: "Handball" }],
  },
]);

db.getCollection("officiers").insertMany([
  {
    noOfficier: "OFF1",
    nom: "Doe",
    prenom: "John",
    pays: "USA",
    age: 35,
    jeux: ["JO2024"],
    telephone: "+1 555 555 5555",
  },
  {
    noOfficier: "OFF2",
    nom: "Smith",
    prenom: "Jane",
    pays: "USA",
    age: 32,
    jeux: ["JO2024"],
    telephone: "+1 555 555 5556",
  },
  {
    noOfficier: "OFF3",
    nom: "Johnson",
    prenom: "Alice",
    pays: "USA",
    age: 38,
    jeux: ["JO2024"],
    telephone: "+1 555 555 5557",
  },
  {
    noOfficier: "OFF4",
    nom: "Brown",
    prenom: "Bob",
    pays: "USA",
    age: 40,
    jeux: ["JO2024"],
    telephone: "+1 555 555 5558",
  },
  {
    noOfficier: "OFF5",
    nom: "Williams",
    prenom: "Will",
    pays: "USA",
    age: 36,
    jeux: ["JO2024"],
    telephone: "+1 555 555 5559",
  },
]);

db.getCollection("jeux").insertMany([
  {
    noJeux: "JO2024",
    nomJeux: "Jeux Olympiques 2024",
    competitions: ["Volley-ball", "Cyclisme", "Football", "Handball", "Tennis"],
    athletes: ["ATH1", "ATH2", "ATH3", "ATH4", "ATH5"],
    officiers: ["OFF1", "OFF2", "OFF3", "OFF4", "OFF5"],
  },
]);

db.getCollection("restaurants").insertMany([
  {
    nom: "Restaurant 1",
    adresse: "1 Rue de Paris, 75001 Paris",
    borough: "Paris",
    grade: "A",
    score: 90,
    type: "restaurant",
  },
  {
    nom: "Restaurant 2",
    adresse: "2 Rue de Marseille, 13001 Marseille",
    borough: "Marseille",
    grade: "B",
    score: 80,
    type: "restaurant",
  },
  {
    nom: "Restaurant 3",
    adresse: "3 Rue de Lyon, 69001 Lyon",
    borough: "Lyon",
    grade: "C",
    score: 70,
    type: "restaurant",
  },
  {
    nom: "Restaurant 4",
    adresse: "4 Rue de Nice, 06001 Nice",
    borough: "Nice",
    grade: "D",
    score: 60,
    type: "restaurant",
  },
  {
    nom: "Restaurant 5",
    adresse: "5 Rue de Bordeaux, 33001 Bordeaux",
    borough: "Bordeaux",
    grade: "F",
    score: 50,
    type: "restaurant",
  },
  {
    nom: "Restaurant Brooklyn 1",
    adresse: "1 Rue de Brooklyn, 11201 Brooklyn",
    borough: "Brooklyn",
    grade: "A",
    score: 90,
    type: "restaurant",
  },
  {
    nom: "Restaurant Brooklyn 2",
    adresse: "2 Rue de Brooklyn, 11202 Brooklyn",
    borough: "Brooklyn",
    grade: "C",
    score: 39,
    type: "restaurant",
  },
  {
    nom: "Restaurant Brooklyn 3",
    adresse: "3 Rue de Brooklyn, 11203 Brooklyn",
    borough: "Brooklyn",
    grade: "C",
    score: 70,
    type: "restaurant",
  },
  {
    nom: "Restaurant Brooklyn 4",
    adresse: "4 Rue de Brooklyn, 11204 Brooklyn",
    borough: "Brooklyn",
    grade: "D",
    score: 60,
    type: "restaurant",
  },
  {
    nom: "Restaurant Brooklyn 5",
    adresse: "5 Rue de Brooklyn, 11205 Brooklyn",
    borough: "Brooklyn",
    grade: "C",
    score: 26,
    type: "restaurant",
  },
]);

let results;

function showResults(results, title) {
  console.log("=====================================");
  console.log(title);
  const count = results.count ? results.count() : results.length;
  console.log(count + " documents trouvés");
  if (results) {
    if (Array.isArray(results)) {
      console.log(results);
    } else {
      results.forEach((doc) => console.log(doc));
    }
  }
  console.log("=====================================");
}

// 3-a) Afficher le nom, prénom des athlètes dont l’Age est compris entre 20 et 30 ans
results = db
  .getCollection("athletes")
  .find({ age: { $gte: 20, $lte: 30 } }, { nom: 1, prenom: 1, _id: 0 });
showResults(results, "Athletes dont l'âge est compris entre 20 et 30 ans");

// 3-b) Afficher la liste des compétitions qui ont lieu à Paris.
results = db.getCollection("competitions").find({ ville: "Paris" }, { _id: 0 });
showResults(results, "Compétitions qui ont lieu à Paris");

// 4) Ils existaient des restaurants aux Jeux olympiques et les collections de données sont
// cumulées dans le fichier (restaurants.json). Et votre patron vous demande les choses
// suivantes: (20 points)

// 4 - a)  Importer les données restaurants.json dans votre base de données de Jeux
// Olympique dans une collection nommée resto à l’aide de MongoDB Shell.

/** bash
 * mongoimport --db ytg --collection restaurants --file ytg.restaurants.json
 */

// 4 - b) Écrire les requêtes MongoDB qui permettent d’afficher tous les restaurants dont la
// clé est "borough" et la valeur "Brooklyn". Quel est nombre total de documents
// affichés.
results = db.getCollection("restaurants").find({ borough: "Brooklyn" });
showResults(results, "Restaurants de Brooklyn");

// 4 - c) Écrire la requête qui affiche les restaurants qui ont un grade ‘C’ avec un score
// inférieur à 40.
results = db
  .getCollection("restaurants")
  .find({ grade: "C", score: { $lt: 40 } });
showResults(
  results,
  "Restaurants avec un grade 'C' et un score inférieur à 40"
);

// 4 - d) Écrire une requête qui permet d’afficher la liste des valeurs distinctes de grade
results = db.getCollection("restaurants").distinct("grade");
showResults(results, "Valeurs distinctes de grade");
