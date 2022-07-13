from pymongo import MongoClient
import jwt
import datetime
import hashlib
from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta


app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

SECRET_KEY = 'RANUNCULUS'

# client = MongoClient('mongodb+srv://test:abcabc@cluster0.rwxzu.mongodb.net/Cluster0?retryWrites=true&w=majority')
# db = client.dbsparta
client = MongoClient('mongodb+srv://frago:G8JQhmTgex80D5NV@cluster0.3pkyv7h.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbRanunculus


@app.route('/')
def main():
    if request.cookies.get('mytoken') is not None:
        token_receive = request.cookies.get('mytoken')
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        return render_template('index.html', user_info=user_info)
    else:
        return render_template('index.html')

# 테스트를 위한 임시 route 앞으론 사용하지 않음
# @app.route('/test')
# def test_main():
#     return render_template('index.html')


@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)


@app.route('/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'username': username_receive, 'password': pw_hash})

    if result is not None:
        payload = {
         'id': username_receive,
         'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token, 'msg' : f'{username_receive}님 반갑습니다.'})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/review')
def review():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        return render_template('review.html', user_info=user_info)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    number_receive = request.form['number_give']
    doc = {
        "username": username_receive,                               # 아이디
        "password": password_hash,                                  # 비밀번호
        "number": number_receive                                    # 전화번호
    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})


@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"username": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})


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



# reservation
@app.route('/reservation')
def showreservation():
    return render_template('reservation.html')

@app.route("/reservation", methods=["POST"])
def web_reservation_post():
    name_receive = request.form['name_give']
    date_receive = request.form['date_give']
    time_receive = request.form['time_give']
    comment_receive = request.form['comment_give']
    doc = {
        'name': name_receive,
        'date': date_receive,
        'time': time_receive,
        'comment': comment_receive
    }
    db.ranunculus.insert_one(doc)

    return jsonify({'msg': '예약 완료되었습니다.'})


@app.route("/reservation", methods=["GET"])
def web_reservation_get():
    return jsonify({'msg': 'GET 연결 완료!'})

#
# @app.route("/reservation", methods=["GET"])
# def web_reservation_get():
#     reservation_list = list(db.ranunculus.find({}, {'_id': False}))
#     return jsonify({'reservations':reservation_list})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)