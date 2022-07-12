from flask import Flask, render_template, jsonify, request, redirect, url_for
app = Flask(__name__)

# from pymongo import MongoClient
# client = MongoClient('mongodb+srv://frago:G8JQhmTgex80D5NV@cluster0.3pkyv7h.mongodb.net/Cluster0?retryWrites=true&w=majority')
# db = client.dbRanunculus


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/review')
def showReview():
    return render_template('review.html')

@app.route('/sign_in')
def sign_in():
    return render_template('sign_in.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)