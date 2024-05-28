import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import joblib
import os

app = Flask(__name__)
model_path = os.path.join(os.getcwd(), 'backend', 'gb.pkl')
model = joblib.load(model_path)
# Enable CORS for all routes
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        features = [
            data['bedrooms'],
            data['bathrooms'],
            data['sqft_living'],
            data['floors'],
            data['zipcode'],
            data['age'],
            data['price_per_sqft'],
            data['renovated']
        ]
        prediction = model.predict([features]).tolist()
        return jsonify(prediction=prediction)
    except Exception as e:
        print("Error occurred:", e)
        print(traceback.format_exc())
        return jsonify(error=str(e)), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
