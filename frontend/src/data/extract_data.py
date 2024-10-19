from flask import Flask, jsonify
import csv

app = Flask('extract_data')

def read_csv(file_path):
    data = []
    with open(file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append(row)
    return data

@app.route('/data', methods=['GET'])
def get_data():
    file_path = 'data.csv'
    data = read_csv(file_path)
    return jsonify(data)

# if _name_ == '_main_':
app.run(debug=True)