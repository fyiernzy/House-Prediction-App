from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd

app = Flask(__name__)

# Load the trained model
with open('gradient_boosting_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the form
    data = request.form.to_dict()
    data = {key: [float(value)] for key, value in data.items()}
    df = pd.DataFrame.from_dict(data)

    # Make prediction
    prediction = model.predict(df)
    output = round(prediction[0], 2)

    return render_template('index.html', prediction_text=f'Predicted House Price: ${output}')

if __name__ == "__main__":
    app.run(debug=True)