from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import json
import random
from CF_Analyzer.Analyzer import Analyzer
from Problem_Recommender.Recommender import Recommender

app = Flask(__name__)
CORS(app)
recommender = Recommender('Problem_Recommender/data.json')

@app.route('/', methods=['GET', 'POST'])
def home():
    return jsonify(message="Hello, World!")

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    data = request.json
    codeforces_id = data.get('codeforces_id')
    num_recommendations = data.get('num_recommendations', 5)
    try:
        recommendations = recommender.recommend_problems(codeforces_id, num_recommendations)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
