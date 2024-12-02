import streamlit as st
import pandas as pd
from pymongo import MongoClient


# Connexion à MongoDB
def connect_to_mongo():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["ytg"]
    return db


# Fonctions pour récupérer des données distinctes
def get_distinct_medals():
    db = connect_to_mongo()
    athletes = db["athletes"]
    medals = athletes.distinct("medaille.type")
    return ["Aucun"] + medals


def get_distinct_countries():
    db = connect_to_mongo()
    athletes = db["athletes"]
    countries = athletes.distinct("pays")
    return ["Aucun"] + countries


def get_distinct_olympic_games():
    db = connect_to_mongo()
    athletes = db["athletes"]
    games = athletes.distinct("jeux")
    return ["Aucun"] + games


def get_distinct_competitions():
    db = connect_to_mongo()
    athletes = db["athletes"]
    competitions = athletes.distinct("medaille.competition")
    return ["Aucun"] + competitions


# Pagination et recherche des athlètes
def count_athletes(query):
    db = connect_to_mongo()
    athletes = db["athletes"]
    return athletes.count_documents(query)


def get_paginated_athletes(page_number, page_size, query):
    db = connect_to_mongo()
    athletes = db["athletes"]
    skip = max(0, (page_number - 1) * page_size)

    cursor = athletes.aggregate(
        [
            {"$match": query},
            {"$skip": skip},
            {"$limit": page_size},
            {
                "$project": {
                    "_id": 0,
                    "noAthlete": 1,
                    "nom": 1,
                    "prenom": 1,
                    "pays": 1,
                    "age": 1,
                    "jeux": 1,
                    "photo": 1,
                    "medaille": {
                        "$reduce": {
                            "input": "$medaille",
                            "initialValue": "",
                            "in": {
                                "$concat": [
                                    "$$value",
                                    {"$cond": [{"$eq": ["$$value", ""]}, "", ", "]},
                                    "$$this.type",
                                    " (",
                                    "$$this.competition",
                                    ")",
                                ]
                            },
                        }
                    },
                }
            },
        ]
    )

    df = pd.DataFrame(list(cursor))
    return renamed_columns(df)


def renamed_columns(df):
    return df.rename(
        columns={
            "noAthlete": "Numéro de l'athlète",
            "nom": "Nom",
            "prenom": "Prénom",
            "pays": "Pays",
            "age": "Âge",
            "jeux": "Jeux olympiques",
            "photo": "Photo",
            "medaille": "Médailles",
        }
    )


def get_query(name, country, game, medal, competition):
    query = {}
    if name:
        query["nom"] = {"$regex": name, "$options": "i"}
        query["prenom"] = {"$regex": name, "$options": "i"}
    if country != "Aucun":
        query["pays"] = country
    if game != "Aucun":
        query["jeux"] = game
    if medal != "Aucun":
        query["medaille.type"] = medal
    if competition != "Aucun":
        query["medaille.competition"] = competition
    return query


# Interface utilisateur avec Streamlit
st.title("Liste des athlètes")

# Initialisation de l'état de session
if "filters" not in st.session_state:
    st.session_state.filters = {
        "name": "",
        "country": "Aucun",
        "game": "Aucun",
        "medal": "Aucun",
        "competition": "Aucun",
    }

if "page" not in st.session_state:
    st.session_state.page = 1

if "per_page" not in st.session_state:
    st.session_state.per_page = 5

# Section des filtres et pagination dans la barre latérale
with st.sidebar:
    st.header("Filtres et navigation")

    st.session_state.filters["name"] = st.text_input(
        "Nom", value=st.session_state.filters["name"]
    )

    country_options = get_distinct_countries()
    st.session_state.filters["country"] = st.selectbox(
        "Pays",
        country_options,
        index=country_options.index(st.session_state.filters["country"]),
    )

    game_options = get_distinct_olympic_games()
    st.session_state.filters["game"] = st.selectbox(
        "Jeux olympiques",
        game_options,
        index=game_options.index(st.session_state.filters["game"]),
    )

    medal_options = get_distinct_medals()
    st.session_state.filters["medal"] = st.selectbox(
        "Médaille",
        medal_options,
        index=medal_options.index(st.session_state.filters["medal"]),
    )

    competition_options = get_distinct_competitions()
    st.session_state.filters["competition"] = st.selectbox(
        "Compétition",
        competition_options,
        index=competition_options.index(st.session_state.filters["competition"]),
    )

    # Bouton pour réinitialiser les filtres
    if st.button("Réinitialiser les filtres"):
        st.session_state.filters = {
            "name": "",
            "country": "Aucun",
            "game": "Aucun",
            "medal": "Aucun",
            "competition": "Aucun",
        }
        st.session_state.page = 1
        st.session_state.per_page = 5
        st.rerun()

    # Définir la pagination
    per_page_level = [2, 5, 10]
    per_page_index = per_page_level.index(st.session_state.per_page)
    st.session_state.per_page = st.selectbox("Athlètes par page", per_page_level, index=per_page_index)
    total_athletes = count_athletes(get_query(**st.session_state.filters))
    max_pages = max(
        1, (total_athletes // st.session_state.per_page) + (1 if total_athletes % st.session_state.per_page > 0 else 0)
    )
    

    min_pages = 0 if max_pages == 1 else 1
    st.session_state.page = st.slider("Page", min_pages, max_pages, st.session_state.page)

    # Bouton Rechercher
    if st.button("Rechercher"):
        st.rerun()

# Charger les athlètes au démarrage
query = get_query(**st.session_state.filters)
athletes_df = get_paginated_athletes(st.session_state.page, st.session_state.per_page, query)

# Affichage des données
if athletes_df.empty:
    st.warning("Aucun athlète trouvé pour les filtres sélectionnés.")
else:
    st.dataframe(athletes_df)
