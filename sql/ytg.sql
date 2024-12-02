-- Création de la base de données
CREATE DATABASE ytg;

-- Définir la base de données ytg comme base de données active
\c ytg;

-- Table Produit
CREATE TABLE Produit (
    NoProduit SERIAL PRIMARY KEY,
    NomProduit VARCHAR(255) NOT NULL,
    Prix NUMERIC(10, 2) NOT NULL,
    NoSerie VARCHAR(255),
    Quantite INT NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Categorie
CREATE TABLE Categorie (
    NoCategorie SERIAL PRIMARY KEY,
    NomCategorie VARCHAR(255) NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Marque
CREATE TABLE Marque (
    NoMarque SERIAL PRIMARY KEY,
    NomMarque VARCHAR(255) NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Client
CREATE TABLE Client (
    NoClient SERIAL PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Adresse TEXT,
    Telephone VARCHAR(15),
    Email VARCHAR(255),
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Employe
CREATE TABLE Employe (
    NoEmploye SERIAL PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    CNI VARCHAR(20) UNIQUE NOT NULL,
    Salaire NUMERIC(10, 2) NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Facture
CREATE TABLE Facture (
    NoFacture SERIAL PRIMARY KEY,
    NoClient INT REFERENCES Client(NoClient),
    NoProduit INT REFERENCES Produit(NoProduit),
    NoEmploye INT REFERENCES Employe(NoEmploye),
    DateVente DATE NOT NULL,
    Quantite INT NOT NULL,
    MontantTotal NUMERIC(10, 2) NOT NULL,
    ModePaiement VARCHAR(50) NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Fournisseur
CREATE TABLE Fournisseur (
    NoFournisseur SERIAL PRIMARY KEY,
    NomSociete VARCHAR(255) NOT NULL,
    Contact VARCHAR(255),
    Adresse TEXT,
    Tel VARCHAR(15),
    SiteWeb VARCHAR(255),
    Email VARCHAR(255),
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Achat
CREATE TABLE Achat (
    NoAchat SERIAL PRIMARY KEY,
    NoProduit INT REFERENCES Produit(NoProduit),
    NoFournisseur INT REFERENCES Fournisseur(NoFournisseur),
    PrixAchat NUMERIC(10, 2) NOT NULL,
    QuantiteAchete INT NOT NULL,
    DateAchat DATE NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Domaine
CREATE TABLE Domaine (
    NoDomaine SERIAL PRIMARY KEY,
    NomDomaine VARCHAR(255) NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table SousDomaine
CREATE TABLE SousDomaine (
    NoSousDomaine SERIAL PRIMARY KEY,
    NomSousDomaine VARCHAR(255) NOT NULL,
    NoDomaine INT REFERENCES Domaine(NoDomaine),
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Formation
CREATE TABLE Formation (
    NoFormation SERIAL PRIMARY KEY,
    NoDomaine INT REFERENCES Domaine(NoDomaine),
    NoSousDomaine INT REFERENCES SousDomaine(NoSousDomaine),
    CoutEntreprise NUMERIC(10, 2),
    CoutEtudiant NUMERIC(10, 2),
    DureeSeance INT,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Etudiant
CREATE TABLE Etudiant (
    NoEtudiant SERIAL PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Matricule VARCHAR(20) UNIQUE NOT NULL,
    Adresse TEXT,
    Email VARCHAR(255),
    Telephone VARCHAR(15),
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Enseignant
CREATE TABLE Enseignant (
    NoEnseignant SERIAL PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    Matricule VARCHAR(20) UNIQUE NOT NULL,
    Adresse TEXT,
    Email VARCHAR(255),
    Telephone VARCHAR(15),
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Cours
CREATE TABLE Cours (
    NoCours SERIAL PRIMARY KEY,
    NoDomaine INT REFERENCES Domaine(NoDomaine),
    NomCours VARCHAR(255) NOT NULL,
    NbSeances INT,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Seance
CREATE TABLE Seance (
    NoSeance SERIAL PRIMARY KEY,
    NoCours INT REFERENCES Cours(NoCours),
    NoEnseignant INT REFERENCES Enseignant(NoEnseignant),
    NoEtudiant INT REFERENCES Etudiant(NoEtudiant),
    TypeEtudiant VARCHAR(50),
    DateSeance DATE NOT NULL,
    HeureDebut TIME NOT NULL,
    HeureFin TIME NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table Entreprise
CREATE TABLE Entreprise (
    NoEntreprise SERIAL PRIMARY KEY,
    NomSociete VARCHAR(255) NOT NULL,
    Contact VARCHAR(255),
    Adresse TEXT,
    Tel VARCHAR(15),
    SiteWeb VARCHAR(255),
    Email VARCHAR(255),
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table FactureFormation
CREATE TABLE FactureFormation (
    NoFacture SERIAL PRIMARY KEY,
    NoEtudiant INT REFERENCES Etudiant(NoEtudiant),
    NoEntreprise INT REFERENCES Entreprise(NoEntreprise),
    NoCours INT REFERENCES Cours(NoCours),
    Quantite INT NOT NULL,
    Date DATE NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table AuditFacture
CREATE TABLE AuditFacture (
    NoFacture INT REFERENCES Facture(NoFacture),
    NoEmploye INT REFERENCES Employe(NoEmploye),
    NomEmploye VARCHAR(255),
    DateSuppression TIMESTAMP NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);

-- Table ProduitMarque
CREATE TABLE ProduitMarque (
    NoProduit INT REFERENCES Produit(NoProduit),
    NoMarque INT REFERENCES Marque(NoMarque),
    EstSupprime BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (NoProduit, NoMarque)
);

-- Table ProduitCategorie
CREATE TABLE ProduitCategorie (
    NoProduit INT REFERENCES Produit(NoProduit),
    NoCategorie INT REFERENCES Categorie(NoCategorie),
    EstSupprime BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (NoProduit, NoCategorie)
);

-- Fonction CalculerSalaireEmploye
CREATE OR REPLACE FUNCTION CalculerSalaireEmploye()
RETURNS NUMERIC AS $$
DECLARE
    EmployeID INT;
    VenteTotal NUMERIC;
    Commission NUMERIC;
    SalaireEmploye NUMERIC;
BEGIN
    -- Trouver l'employé avec la vente totale la plus élevée
    SELECT NoEmploye, SUM(MontantTotal) AS TotalVente
    INTO EmployeID, VenteTotal
    FROM Facture
    GROUP BY NoEmploye
    ORDER BY SUM(MontantTotal) DESC
    LIMIT 1;

    -- Calculer la commission (10% de la vente totale)
    Commission := VenteTotal * 0.10;

    -- Récupérer le salaire de base de l'employé
    SELECT Salaire
    INTO SalaireEmploye
    FROM Employe
    WHERE NoEmploye = EmployeID;

    -- Retourner le salaire total (salaire de base + commission)
    RETURN SalaireEmploye + Commission;
END;
$$ LANGUAGE plpgsql;

-- Création de la fonction qui trace la suppression d'une facture
CREATE OR REPLACE FUNCTION TracerSuppressionFacture()
RETURNS TRIGGER AS $$
BEGIN
    -- Insérer les informations de suppression dans la table d'audit
    INSERT INTO AuditFacture (NoFacture, NoEmploye, NomEmploye, DateSuppression)
    SELECT OLD.NoFacture, OLD.NoEmploye, e.Nom, NOW()
    FROM Employe e
    WHERE e.NoEmploye = OLD.NoEmploye;
    
    -- Retourner OLD pour finaliser la suppression de la facture
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Création du trigger qui appelle la fonction TracerSuppressionFacture
CREATE TRIGGER SuppressionFacture
AFTER DELETE ON Facture
FOR EACH ROW
EXECUTE FUNCTION TracerSuppressionFacture();
