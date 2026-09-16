from flask import Flask, render_template, request
from groq import Groq
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_recipe(ingredients):
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": "You are an expert chef who creates creative and easy recipes."
            },
            {
                "role": "user",
                "content": f"""
Create a recipe using these ingredients:
{ingredients}

Please provide:
1. Recipe Name
2. Funny Recipe Name
3. Ingredients List
4. Step-by-step Instructions
5. Cooking Time
6. Fun Fact
"""
            }
        ]
    )

    return response.choices[0].message.content


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    ingredients = request.form.get("components")

    if not ingredients:
        return "Please enter some ingredients."

    recipe = generate_recipe(ingredients)
    return recipe


if __name__ == "__main__":
    app.run(debug=True)