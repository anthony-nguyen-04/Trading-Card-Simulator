from flask import Flask
from flask import request

#from randomCards import setup
from randomCards import createUser
from randomCards import openPack
from randomCards import viewUserCards

app = Flask(__name__)

@app.route('/user', methods=['GET', 'POST'])
def makeUser():
    if request.method == 'POST':

        user_id = request.headers.get('id')
        createUser(user_id)


@app.route('/user/open', methods=['GET', 'POST'])
def makeUser():
    if request.method == 'POST':
        user_id = request.headers.get('id')
        output = openPack(user_id)

        return output


@app.route('/user/view', methods=['GET', 'POST'])
def makeUser():
    if request.method == 'POST':
        user_id = request.headers.get('id')
        cards = viewUserCards(user_id)

        return cards