import os
from flask import Blueprint, jsonify, request
import openai
import json
import random

openai.api_key = os.getenv("OPENAI_API_KEY")

def generateText(prompt, engine, maxTokens, temperature, topP, frequencyPen, presencePen, bestOf, n):
    response = openai.Completion.create(
        engine=engine,
        prompt=prompt,
        max_tokens=maxTokens,
        temperature=temperature,
        top_p=topP,
        frequency_penalty=frequencyPen,
        presence_penalty=presencePen,
        best_of=bestOf,
        n=n
    )
    generations = [ response.choices[i].text for i in range(len(response.choices)) ]
    return generations

def create_api() -> Blueprint:
    api = Blueprint('api', __name__)

    @api.route('/api/generate', methods=['POST'])
    def generate():
        try:
            generations = generateText(
                request.json['prompt'],
                request.json['engine'] if 'engine' in request.json else "text-davinci-003",
                request.json['maxTokens'] if 'maxTokens' in request.json else 256,
                request.json['temperature'] if 'temperature' in request.json else 0.7,
                request.json['topP'] if 'topP' in request.json else 1,
                request.json['frequencyPen'] if 'frequencyPen' in request.json else 0.0,
                request.json['presencePen'] if 'presencePen' in request.json else 0.0,
                request.json['bestOf'] if 'bestOf' in request.json else 1,
                request.json['n'] if 'n' in request.json else 1
            )
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

        return jsonify({'success': True, 'generations': generations})
                
    return api