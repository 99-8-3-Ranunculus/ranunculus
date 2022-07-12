from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient(
    'mongodb+srv://frago:G8JQhmTgex80D5NV@cluster0.3pkyv7h.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbRanunculus


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/review')
def review():
    return render_template('review.html')


@app.route('/review/show', methods=["POST"])
def save_review():
    nickNameReceive = request.form['nickNameGive']
    contentReceive = request.form['contentGive']

    doc = {
        'nickName': nickNameReceive,
        'content': contentReceive
    }
    db.class_reviews.insert_one(doc)
    print('리뷰글 POST 요청!')
    return jsonify({'msg': '리뷰글을 작성했습니다!'})


@app.route("/review/show", methods=["GET"])
def get_review():
    review_list = list(db.class_reviews.find({}, {'_id': False}))
    return jsonify({'reviews': review_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
