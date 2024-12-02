# EXAMEN DE BASE DE DONNÉES RELATIONNELLES - SESSION DE RATTRAPAGE

> **Université :** UPB – Université Polytechnique de Bingerville
> **Professeur :** Robert Yavo
> **Date :** 2 Décembre 2024
> **Durée :** 3 heures
> **Langage :** PostgreSQL, Algèbre Relationnelle
> **Supports :** Cours de Base de Données Relationnelles (RY)
> **Étudiant :** Abouho Sana Franklin Prince YAVO

## RÉPONSES AUX QUESTIONS

> **NB :** Les réponses aux questions posées dans le sujet données ci-dessus peuvenr être accompagnées de fichiers SQL ou PDF.

### 1) Modèle Entité-Association et Modèle Relationnel

#### Modèle Entité-Association

Le modèle entité-association de la base de données de la société YTG est le suivant :

- Produit (NoProduit, NoCategorie, NoMarque, NomProduit, Prix, NoSerie, Quantite, EstSupprime)
- Categorie (NoCategorie, NomCategorie, EstSupprime)
- Marque (NoMarque, NomMarque, EstSupprime)
- Client (NoClient, Nom, Prenom, Adresse, Telephone, Email, EstSupprime)
- Employe (NoEmploye, Nom, Prenom, CNI, Salaire, EstSupprime)
- Facture (NoClient, NoProduit, NoEmploye, DateVente, Quantite, MontantTotal, ModePaiement, EstSupprime)
- Fournisseur (NoFournisseur, NomSociete, Contact, Adresse, Tel, SiteWeb, Email, EstSupprime)
- Achat (NoAchat, NoProduit, NoFournisseur, PrixAchat, QuantiteAchete, DateAchat, EstSupprime)
- Formation (NoFormation, NoDomaine, NoSousDomaine, CoutEntreprise, CoutEtudiant, DureeSeance, EstSupprime)
- Domaine (NoDomaine, NomDomaine, EstSupprime)
- SousDomaine (NoSousDomaine, NomSousDomaine, NoDomaine, EstSupprime)
- Etudiant (NoEtudiant, Nom, Prenom, Matricule, Adresse, Email, Telephone, EstSupprime)
- Enseignant (NoEnseignant, Nom, Prenom, Matricule, Adresse, Email, Telephone, EstSupprime)
- Cours (NoCours, NoDomaine, NomCours, NbSeances, EstSupprime)
- Seance (NoSeance, NoCours, NoEnseignant, NoEtudiant, TypeEtudiant, DateSeance, HeureDebut, HeureFin, EstSupprime)
- Entreprise (NoEntreprise, NomSociete, Contact, Adresse, Tel, SiteWeb, Email, EstSupprime)
- FactureFormation (NoFacture, NoEtudiant, NoEntreprise, NoCours, Quantite, Date, EstSupprime)
- AuditFacture (NoFacture, NoEmploye, NomEmploye, DateSuppression, EstSupprime)

#### Modèle Relationnel

##### 1. Entités et Attributs

1. **Produit**
   - Attributs :
     - **NoProduit** *(clé primaire)*
     - NomProduit
     - Prix
     - NoSerie
     - Quantite
     - EstSupprime

2. **Categorie**
   - Attributs :
     - **NoCategorie** *(clé primaire)*
     - NomCategorie
     - EstSupprime

3. **Marque**
   - Attributs :
     - **NoMarque** *(clé primaire)*
     - NomMarque
     - EstSupprime

4. **Client**
   - Attributs :
     - **NoClient** *(clé primaire)*
     - Nom
     - Prenom
     - Adresse
     - Telephone
     - Email
     - EstSupprime

5. **Employe**
   - Attributs :
     - **NoEmploye** *(clé primaire)*
     - Nom
     - Prenom
     - CNI
     - Salaire
     - EstSupprime

6. **Facture**
   - Attributs :
     - **NoClient** *(clé étrangère vers Client)*
     - **NoProduit** *(clé étrangère vers Produit)*
     - **NoEmploye** *(clé étrangère vers Employe)*
     - DateVente
     - Quantite
     - MontantTotal
     - ModePaiement
     - EstSupprime

7. **Fournisseur**
   - Attributs :
     - **NoFournisseur** *(clé primaire)*
     - NomSociete
     - Contact
     - Adresse
     - Tel
     - SiteWeb
     - Email
     - EstSupprime

8. **Achat**
   - Attributs :
     - **NoAchat** *(clé primaire)*
     - NoProduit *(clé étrangère vers Produit)*
     - NoFournisseur *(clé étrangère vers Fournisseur)*
     - PrixAchat
     - QuantiteAchete
     - DateAchat
     - EstSupprime

9. **Formation**
   - Attributs :
     - **NoFormation** *(clé primaire)*
     - NoDomaine *(clé étrangère vers Domaine)*
     - NoSousDomaine *(clé étrangère vers SousDomaine)*
     - CoutEntreprise
     - CoutEtudiant
     - DureeSeance
     - EstSupprime

10. **Domaine**
    - Attributs :
      - **NoDomaine** *(clé primaire)*
      - NomDomaine
      - EstSupprime

11. **SousDomaine**
    - Attributs :
      - **NoSousDomaine** *(clé primaire)*
      - NomSousDomaine
      - NoDomaine *(clé étrangère vers Domaine)*
      - EstSupprime

12. **Etudiant**
    - Attributs :
      - **NoEtudiant** *(clé primaire)*
      - Nom
      - Prenom
      - Matricule *(unique)*
      - Adresse
      - Email
      - Telephone
      - EstSupprime

13. **Enseignant**
    - Attributs :
      - **NoEnseignant** *(clé primaire)*
      - Nom
      - Prenom
      - Matricule *(unique)*
      - Adresse
      - Email
      - Telephone
      - EstSupprime

14. **Cours**
    - Attributs :
      - **NoCours** *(clé primaire)*
      - NoDomaine *(clé étrangère vers Domaine)*
      - NomCours
      - NbSeances
      - EstSupprime

15. **Seance**
    - Attributs :
      - **NoSeance** *(clé primaire)*
      - NoCours *(clé étrangère vers Cours)*
      - NoEnseignant *(clé étrangère vers Enseignant)*
      - NoEtudiant *(clé étrangère vers Etudiant)*
      - TypeEtudiant *(indique si l'étudiant est indépendant ou envoyé par une entreprise)*
      - DateSeance
      - HeureDebut
      - HeureFin
      - EstSupprime

16. **Entreprise**
    - Attributs :
      - **NoEntreprise** *(clé primaire)*
      - NomSociete
      - Contact
      - Adresse
      - Tel
      - SiteWeb
      - Email
      - EstSupprime

17. **FactureFormation**
    - Attributs :
      - **NoFacture** *(clé primaire)*
      - NoEtudiant *(clé étrangère vers Etudiant, nullable si payé par une entreprise)*
      - NoEntreprise *(clé étrangère vers Entreprise, nullable si payé par un étudiant)*
      - NoCours *(clé étrangère vers Cours)*
      - Quantite
      - Date
      - EstSupprime

18. **AuditFacture**
    - Attributs :
      - **NoFacture** *(clé étrangère vers Facture)*
      - **NoEmploye** *(clé étrangère vers Employe)*
      - NomEmploye
      - DateSuppression
      - EstSupprime

19. **ProduitMarque**
    - Attributs :
      - **NoProduit** *(clé étrangère vers Produit)*
      - **NoMarque** *(clé étrangère vers Marque)*
      - EstSupprime

20. **ProduitCategorie**
    - Attributs :
      - **NoProduit** *(clé étrangère vers Produit)*
      - **NoCategorie** *(clé étrangère vers Categorie)*
      - EstSupprime

##### 2. Relations et Cardinalités

1. **Un produit** appartient à **plusieurs catégories** (*Produit → Categorie : N:M*).
2. **Un produit** appartient à **plusieurs marques** (*Produit → Marque : N:M*).
3. **Un produit** est acheté auprès de **plusieurs fournisseurs**, et **un fournisseur** fournit **plusieurs produits** (*Achat → Produit et Fournisseur : N:M*).
4. **Un client** peut acheter **plusieurs produits**, et **un produit** peut être acheté par **plusieurs clients** (*Facture → Produit et Client : N:M*).
5. **Un employé** peut gérer **plusieurs ventes** (*Facture → Employe : N:1*).
6. **Une formation** est classée dans **un domaine** et peut avoir **un sous-domaine** (*Formation → Domaine et SousDomaine : N:1*).
7. **Un cours** est classé dans **un domaine** (*Cours → Domaine : N:1*).
8. **Une séance** est liée à **un cours**, **un enseignant** et **un étudiant** (*Seance → Cours, Enseignant et Etudiant : N:1*).
9. **Un étudiant** peut suivre **plusieurs cours**, et **un cours** peut être suivi par **plusieurs étudiants** (*FactureFormation → Etudiant et Cours : N:M*).
10. **Une entreprise** peut payer pour **plusieurs formations**, et **une formation** peut être payée par **plusieurs entreprises** (*FactureFormation → Entreprise et Formation : N:M*).
11. **Un employé** peut supprimer **plusieurs factures** (*AuditFacture → Facture : N:1*).

### 2) Création des Tables et Insert

> Voir le fichier **ytg.sql** pour les commandes SQL de création des tables et d'insertion des données.

### 3) Algèbre Relationnelle et SQL

#### a) Liste des produits de marque IBM

```sql
-- Algèbre Relationnelle
π NomProduit, Prix, NoSerie, Quantite (σ NomMarque = 'IBM' (Produit))

-- SQL
SELECT NomProduit, Prix, NoSerie, Quantite FROM Produit WHERE NoMarque = (SELECT NoMarque FROM Marque WHERE NomMarque = 'IBM');
```

#### b) Fournisseurs dont l'adresse est ABIDJAN

```sql
-- Algèbre Relationnelle
π NomSociete, Contact (σ Adresse = 'ABIDJAN' (Fournisseur))

-- SQL
SELECT NomSociete, Contact FROM Fournisseur WHERE Adresse = 'ABIDJAN';
```

#### c) Vente totale par Produit

```sql
-- Algèbre Relationnelle
π NoProduit, (Prix * Quantite) (Facture ⨝ Produit)

-- SQL
SELECT NoProduit, (Prix * Quantite) AS VenteTotale FROM Facture JOIN Produit ON Facture.NoProduit = Produit.NoProduit;
```

#### d) Liste des cours dont le coût est inférieur ou égal à 1 000 000

```sql
-- Algèbre Relationnelle
π NomCours (σ CoutEntreprise <= 1000000 (Formation ⨝ Cours))

-- SQL
SELECT NomCours FROM Formation JOIN Cours ON Formation.NoCours = Cours.NoCours WHERE CoutEntreprise <= 1000000;
```

#### e) Moyenne du coût d'achat des produits

```sql
-- Algèbre Relationnelle
π AVG(PrixAchat) (Achat)

-- SQL
SELECT AVG(PrixAchat) AS MoyennePrixAchat FROM Achat;
```

### 4) Fonction ou Procédure Stockée

```sql
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
```

### 5) Trigger de Suppression de Facture

```sql
-- Création de la table d'audit
CREATE TABLE AuditFacture (
    NoFacture INT REFERENCES Facture(NoFacture),
    NoEmploye INT REFERENCES Employe(NoEmploye),
    NomEmploye VARCHAR(255),
    DateSuppression TIMESTAMP NOT NULL,
    EstSupprime BOOLEAN DEFAULT FALSE
);
```

```sql
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
```

```sql
-- Création du trigger qui appelle la fonction TracerSuppressionFacture
CREATE TRIGGER SuppressionFacture
AFTER DELETE ON Facture
FOR EACH ROW
EXECUTE FUNCTION TracerSuppressionFacture();
```

### Ressources

- **ytg_mcd_docs.md ->** Fichier Markdown contenant les réponses aux questions de l'examen.
- **ytg_mcd_docs.pdf ->** Fichier PDF généré à partir du fichier Markdown.
- **[Visualisé sur Miro](https://miro.com/app/board/uXjVL9Z1AsU=/?share_link_id=968354658995)** -> Modèle Entité-Association et Modèle Relationnel de la base de données de la société YTG (Miro). https://miro.com/app/board/uXjVL9Z1AsU=/?share_link_id=968354658995
- **ytg.sql ->** Code SQL pour la création des tables et des relations.
- **ytg.pdf ->** Modèle Entité-Association et Modèle Relationnel de la base de données de la société YTG.
- **ytg.jpg ->** Modèle Entité-Association et Modèle Relationnel de la base de données de la société YTG (image).
- **ytg.zip ->** Fichiers SQL, PDF et PNG.
