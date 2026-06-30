from flask import Flask, render_template, request
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_tutorial(components):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role":"system",
                "content":"You are a helpful chef."
            },
            {
                "role":"user",
                "content":f"""
Suggest a recipe using:
{components}

Also give:
- Recipe name
- Funny recipe name
- Step-by-step instructions
- Fun fact
"""
            }
        ]
    )

    return response.choices[0].message.content


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/generate', methods=['POST'])
def generate():
    components = request.form['components']
    return generate_tutorial(components)


if __name__ == "__main__":
    app.run(debug=True)