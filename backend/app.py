from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import json
import random
from CF_Analyzer import Analyzer
from Problem_Recommender import Recommender
import numpy as np

app = Flask(__name__)
CORS(app)

#recommender = Recommender('Problem_Recommender/data.json')

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



@app.route('/api/analyzer', methods=['GET'])
def analyzer():
    handle = request.args.get('handle')  
    if not handle:
        return jsonify({"error": "Handle parameter is required"}), 400
    try:
        analyzer = Analyzer.Analyzer(handle)
        data=dict(analyzer.get_info())
        data['stalk_hard'],data['stalk_contest'],data['stalk_fast']=analyzer.stalk_hardest()
        data['ratings'],data['date']=analyzer.rating_timeline()
        data['delta'], data['date'] = analyzer.perf()
        data.update(analyzer.basic_graphs())

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/percentile',methods=['GET'])
def precentile():
    try:
        ranks=requests.get('https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false').json()
        ratings=np.array(sorted(item['rating'] for item in ranks['result']))
        n = len(ratings)
        sorted_ratings=list(set(ratings.tolist()))
        perc_dict=dict()
        perc = 100*np.arange(n)/n
        for rating in sorted_ratings:
            index=np.where(ratings==rating)[0]
            perc_dict[rating]=perc[index][-1]
        return jsonify(perc_dict)
    except Exception as e:
        return jsonify({"error":str(e)}),500


if __name__ == '__main__':
    app.run(debug=True)
