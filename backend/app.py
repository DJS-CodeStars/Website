from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import json
import random

class CodeforcesRecommender:
    def __init__(self, problem_dataset):
        with open(problem_dataset, 'r') as file:
            self.problem_data = json.load(file)

    def get_user_data(self, codeforces_id):
        user_info = requests.get(f"https://codeforces.com/api/user.info?handles={codeforces_id}").json()
        if user_info['status'] != 'OK':
            raise Exception("Failed to retrieve user data")
        
        rank = user_info['result'][0]['rank'].capitalize()
        
        submissions = requests.get(f"https://codeforces.com/api/user.status?handle={codeforces_id}").json()
        if submissions['status'] != 'OK':
            raise Exception("Failed to retrieve user submissions")
        
        solved_problems = set()
        for submission in submissions['result']:
            if submission['verdict'] == 'OK':
                problem_key = f"{submission['problem']['contestId']}{submission['problem']['index']}"
                solved_problems.add(problem_key)
        
        return rank, solved_problems

    def recommend_problems(self, codeforces_id, num_recommendations=5, rating_tolerance=200):
        rank, solved_problems = self.get_user_data(codeforces_id)
        
        if rank not in self.problem_data:
            raise Exception(f"No problems found for rank {rank}")

        rank_data = requests.get(f"https://codeforces.com/api/user.info?handles={codeforces_id}").json()
        if rank_data['status'] != 'OK':
            raise Exception("Failed to retrieve user rating")
        user_rating = rank_data['result'][0]['rating']
        
        unsolved_problems = []
        problems = self.problem_data[rank]['problem']
        for problem in problems:
            if 'contestId' not in problem or 'rating' not in problem:
                continue
            problem_key = f"{problem['contestId']}{problem['index']}"
            if problem_key not in solved_problems and abs(problem['rating'] - user_rating) <= rating_tolerance:
                unsolved_problems.append(problem)

        if len(unsolved_problems) < num_recommendations:
            num_recommendations = len(unsolved_problems)
        random_recommendations = random.sample(unsolved_problems, num_recommendations)

        return random_recommendations

app = Flask(__name__)
CORS(app)
recommender = CodeforcesRecommender('Problem Recommender/data.json')

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
