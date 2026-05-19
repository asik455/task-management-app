# ==========================================
# AI Anime Recommendation System
# Using Embeddings + Semantic Search + ChromaDB
# ==========================================

# Install Required Libraries
# Run this first in Jupyter/Colab:
# !pip install chromadb sentence-transformers

from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

# ==========================================
# Step 1: Anime Dataset
# ==========================================

anime_data = [
    {
        "id": "1",
        "name": "Attack on Titan",
        "description": "Dark fantasy, action, titans, military, survival, intense battles"
    },
    {
        "id": "2",
        "name": "Naruto",
        "description": "Ninja, friendship, action, adventure, powerful abilities, emotional story"
    },
    {
        "id": "3",
        "name": "Death Note",
        "description": "Psychological thriller, mind games, intelligence, crime, mystery"
    },
    {
        "id": "4",
        "name": "Demon Slayer",
        "description": "Sword fighting, demons, action, emotional, fantasy, beautiful animation"
    },
    {
        "id": "5",
        "name": "One Piece",
        "description": "Pirates, adventure, friendship, comedy, world exploration, action"
    },
    {
        "id": "6",
        "name": "Solo Leveling",
        "description": "Overpowered protagonist, dungeons, hunters, leveling system, action fantasy"
    },
    {
        "id": "7",
        "name": "Jujutsu Kaisen",
        "description": "Curses, dark fantasy, action, powerful fights, supernatural"
    },
    {
        "id": "8",
        "name": "Classroom of the Elite",
        "description": "Psychological, smart protagonist, school competition, strategy, manipulation"
    }
]

# ==========================================
# Step 2: Load Embedding Model
# ==========================================

model = SentenceTransformer('all-MiniLM-L6-v2')

# ==========================================
# Step 3: Convert Descriptions into Embeddings
# ==========================================

documents = [anime["description"] for anime in anime_data]

embeddings = model.encode(documents).tolist()

# ==========================================
# Step 4: Create ChromaDB Vector Database
# ==========================================

client = chromadb.Client(Settings())

collection = client.create_collection(name="anime_recommendations")

# Store Data in Vector Database
collection.add(
    documents=documents,
    embeddings=embeddings,
    ids=[anime["id"] for anime in anime_data],
    metadatas=[{"name": anime["name"]} for anime in anime_data]
)

print("Anime data stored successfully!")

# ==========================================
# Step 5: User Input
# ==========================================

while True:
    user_query = input("\nEnter anime preference (or type 'exit' to quit): ")
    if user_query.lower() == 'exit':
        print("Exiting the application. Goodbye!")
        break

    # Convert Query into Embedding
    query_embedding = model.encode([user_query]).tolist()

    # Semantic Search
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=3
    )

    # Display Results
    print("\nTop Anime Recommendations:\n")
    for i in range(len(results['ids'][0])):
        name = results['metadatas'][0][i]['name']
        description = results['documents'][0][i]

        print(f"{i+1}. {name}")
        print(f"   Description: {description}\n")

# ==========================================
# Example Output
# ==========================================
#
# Input:
# smart protagonist
#
# Output:
#
# 1. Classroom of the Elite
# 2. Death Note
# 3. Solo Leveling
#
# Semantic search works based on meaning,
# not exact keyword matching.
# ==========================================