from flask import Flask, render_template, request, jsonify
import requests
import json
import random

app = Flask(__name__)

# Load the dataset only once when the app starts
with open('data.json', 'r') as file:
    problem_data = json.load(file)

def get_user_data(codeforces_id):
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

def recommend_problems(rank, solved_problems, codeforces_id, num_recommendations=5):
    if rank not in problem_data:
        raise Exception(f"No problems found for rank {rank}")
    
    # Retrieve user rating
    rank_data = requests.get(f"https://codeforces.com/api/user.info?handles={codeforces_id}").json()
    if rank_data['status'] != 'OK':
        raise Exception("Failed to retrieve user rating")
    user_rating = rank_data['result'][0]['rating']
    
    unsolved_problems = []
    problems = problem_data[rank]['problem']
    for problem in problems:
        if 'contestId' not in problem or 'rating' not in problem:
            continue
        problem_key = f"{problem['contestId']}{problem['index']}"
        if problem_key not in solved_problems and abs(problem['rating'] - user_rating) <= 200:
            unsolved_problems.append(problem)

    if len(unsolved_problems) < num_recommendations:
        num_recommendations = len(unsolved_problems) 
    random_recommendations = random.sample(unsolved_problems, num_recommendations)

    return random_recommendations

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        codeforces_id = request.form['codeforces_id']
        try:
            rank, solved_problems = get_user_data(codeforces_id)
            recommendations = recommend_problems(rank, solved_problems, codeforces_id)
            return render_template('recommendations.html', recommendations=recommendations, codeforces_id=codeforces_id)
        except Exception as e:
            return render_template('index.html', error=str(e))
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    data = request.json
    codeforces_id = data.get('codeforces_id')
    num_recommendations = data.get('num_recommendations', 5)
    
    try:
        rank, solved_problems = get_user_data(codeforces_id)
        recommendations = recommend_problems(rank, solved_problems, codeforces_id, num_recommendations)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
