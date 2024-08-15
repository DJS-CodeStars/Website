import requests

def test_api_recommend(base_url, codeforces_id, num_recommendations=5):
    url = f"{base_url}/api/recommend"
    payload = {
        "codeforces_id": codeforces_id,
        "num_recommendations": num_recommendations
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()

        if 'error' in data:
            print(f"Error: {data['error']}")
        else:
            print(f"Recommendations for Codeforces ID '{codeforces_id}':")
            for i, problem in enumerate(data, 1):
                print(f"{i}. {problem['name']} (Contest {problem['contestId']} {problem['index']}) - Rating: {problem['rating']}, Tags: {', '.join(problem['tags'])}")
    
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")

def main():
    base_url = "http://127.0.0.1:5000"
    codeforces_id = "brash_ketchup"
    print(test_api_recommend(base_url, codeforces_id))

if __name__ == "__main__":
    main()
