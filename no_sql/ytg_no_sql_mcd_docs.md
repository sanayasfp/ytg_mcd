# EXAMEN DE BASE DE DONNÉES NON-RELATIONNELLES (NOSQL) - SESSION DE RATTRAPAGE

> **Université :** UPB – Université Polytechnique de Bingerville \
> **Professeur :** Robert Yavo \
> **Date :** 2 Décembre 2024 \
> **Durée :** 3 heures \
> **Langage :** MongoDB, JavaScript, Python, HTML \
> **Supports :** Cours de Base de Données Relationnelles (RY) \
> **Étudiant :** Abouho Sana Franklin Prince YAVO

## RÉPONSES AUX QUESTIONS

> **NB :** Les réponses aux questions posées dans le sujet données ci-dessus peuvenr être accompagnées de fichiers SQL ou PDF.

### 1) Diagramme de Modèle de Données NoSQL

#### Description des collections

##### 1. **Événements Olympiques (evenementsOlympiques)**

- **Champs** :
  - _id (ObjectId)
  - NoÉvénement (String)
  - Année (Number)
  - DateDébut (Date)
  - DateFin (Date)
  - Pays (String)

##### 2. **Compétitions (competitions)**

- **Champs** :
  - _id (ObjectId)
  - NomCompétition (String)
  - DateHeureDébut (Date)
  - DateHeureFin (Date)
  - ÉvénementOlympique (Référence à `evenementsOlympiques`)
  - NoStade (Référence à `stades`)
  - Athlètes (Array de Références à `athletes`)
  - Officiers (Array de Références à `officiers`)
  - Médaille (Array de {athlète, médaille})
  - Ville (String)
  - Images (Array de URLs)
  - Vidéos (Array de URLs)

##### 3. **Stades (stades)**

- **Champs** :
  - _id (ObjectId)
  - NomStade (String)
  - Pays (String)
  - Province (String)
  - Ville (String)
  - Adresse (String)
  - Téléphone (String)

##### 4. **Athlètes (athletes)**

- **Champs** :
  - _id (ObjectId)
  - Nom (String)
  - Prénom (String)
  - Pays (String)
  - Âge (Number)
  - Jeux (Array de Références à `jeux`)
  - Photo (URL)
  - Médaille (Array de {type de médaille, compétition})

##### 5. **Officiers (officiers)**

- **Champs** :
  - _id (ObjectId)
  - Nom (String)
  - Prénom (String)
  - Pays (String)
  - Âge (Number)
  - Jeux (Array de Références à `jeux`)
  - Téléphone (String)

##### 6. **Jeux (jeux)**

- **Champs** :
  - _id (ObjectId)
  - NoJeux (String)
  - NomJeux (String)
  - Compétitions (Array de Références à `competitions`)
  - Athlètes (Array de Références à `athletes`)

<!-- ##### 7. **Restaurants (restaurants)** 

- **Champs** :
  - _id (ObjectId)
  - Nom (String)
  - Adresse (String)
  - Borough (String)
  - Grade (String)
  - Score (Number)
  - Type (String, ex: restaurant, café, etc.) -->

#### Diagramme de Modèle de Données NoSQL

> Voir le fichier `ytg_no_sql_mcd.png` pour le diagramme de modèle de données NoSQL.

**Légende :**

- ![Evenements Olympiques (evenementsOlympiques, Or)](https://img.shields.io/badge/Evenements%20Olympiques-gold?style=for-the-badge)
- ![Compétitions (competitions, Argent)](https://img.shields.io/badge/Comp%C3%A9titions-silver?style=for-the-badge)
- ![Stades (stades, Vert)](https://img.shields.io/badge/Stades-green?style=for-the-badge)
- ![Athlètes (athletes, Bleu)](https://img.shields.io/badge/Athl%C3%A8tes-blue?style=for-the-badge)
- ![Officiers (officiers, Rouge)](https://img.shields.io/badge/Officiers-red?style=for-the-badge)
- ![Jeux (jeux, Violet)](https://img.shields.io/badge/Jeux-purple?style=for-the-badge)
<!-- - ![Restaurants (restaurants, Marron)](https://img.shields.io/badge/Restaurants-brown?style=for-the-badge) -->

### 2) Création de la base de données NoSQL

#### Création des collections

> Voir le fichier `ytg_no_sql.js` pour le script de création des collections.

```javascript
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
```

### 3) Requêtes MongoDB

#### a) Afficher le nom, prénom des athlètes dont l’Age est compris entre 20 et 30 ans

```javascript
// mongosh
use("ytg");
db.getCollection("athletes").find({ age: { $gte: 20, $lte: 30 } }, { nom: 1, prenom: 1, _id: 0 });
```

![Image Question 3-a](https://raw.githubusercontent.com/sanayasfp/ytg_mcd/refs/heads/main/no_sql/images/3-a.png)

#### 3-b) Afficher la liste des compétitions qui ont lieu à Paris

```javascript
// mongosh
use("ytg");
db.getCollection("competitions").find({ ville: "Paris" }, { _id: 0 });
```

![Image Question 3-b](https://raw.githubusercontent.com/sanayasfp/ytg_mcd/refs/heads/main/no_sql/images/3-b.png)

### 4) Importation des données des restaurants

#### a) Importer les données restaurants.json dans votre base de données de Jeux Olympique dans une collection nommée restaurants à l’aide de MongoDB Shell

```shell
# mongosh
mongoimport --db ytg --collection restaurants --file ytg.restaurants.json
```

![Image Question 4-a](https://raw.githubusercontent.com/sanayasfp/ytg_mcd/refs/heads/main/no_sql/images/4-a.png)

#### b) Écrire les requêtes MongoDB qui permettent d’afficher tous les restaurants dont la clé est "borough" et la valeur "Brooklyn". Quel est nombre total de documents affichés

```javascript
// mongosh
use("ytg");
db.getCollection("restaurants").find({ borough: "Brooklyn" });
```

#### c) Écrire la requête qui affiche les restaurants qui ont un grade ‘C’ avec un score inférieur à 40

```javascript
// mongosh
use("ytg");
db.getCollection("restaurants").find({ grade: "C", score: { $lt: 40 } });
```

#### d) Écrire une requête qui permet d’afficher la liste des valeurs distinctes de grade

```javascript
// mongosh
use("ytg");
db.getCollection("restaurants").distinct("grade");
```

### 5) Création d'un formulaire simple pour afficher la liste des Athlètes qui ont une médaille d’or

> Voir le dossier `ytg_no_sql_form` pour le formulaire simple en HTML et JavaScript.

#### Installations
  
```bash
cd ytg_no_sql_form
python server.py

# ou

cd ytg_no_sql_form
python -m venv venv
python -m pip install -r requirements.txt
python -m streamlit run app.py
```

### Ressources

- **ytg_no_sql_mcd_docs.md ->** Fichier Markdown contenant les réponses aux questions de l'examen.
- **ytg_no_sql_mcd_docs.pdf ->** Fichier PDF généré à partir du fichier Markdown.
- **[Visualisé sur app.iraser.io](https://app.eraser.io/workspace/cuDkXG3fL3Q4yqkOA5SC?origin=share)** -> Modèle Entité-Association et Modèle Relationnel de la base de données de la société YTG (Miro). <https://app.eraser.io/workspace/cuDkXG3fL3Q4yqkOA5SC?origin=share>
- **ytg_no_sql.js ->** Script de création des collections de la base de données de la société YTG.
- **ytg_no_sql.zip ->** Fichiers SQL, PDF et PNG.
