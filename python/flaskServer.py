from flask import Flask
from flask import request
from flask import redirect, url_for, render_template, jsonify
from flask import after_this_request #For adding steps after a request
from flask import make_response #For adding custom headers
from flask_cors import CORS #This package makes Cross Origins Resource Sharing a not nightmare

#from randomCards import setup
from randomCards import createUser
from randomCards import openPack
from randomCards import viewUserCards


def create_app():
    app = Flask(__name__)

    CORS(app) #By default, this enables CORS across all routes
    #This is a security hazard and should probably be changed at some point

    @app.route('/user')
    def makeUser():
        #if request.method == 'GET':

        # was ...post('id')
        user_id = request.headers.get('id')
        print(user_id)
        createUser(user_id)

        return user_id


    @app.route('/user/open', methods = ["POST", "GET"])
    def open():
        # if request.method == 'POST':
        #     user_id = request.headers.post('id')
        #     output = openPack(user_id)
        #
        #     return output

        user_id = request.headers.get('id')
        pack_data = openPack(user_id)
        #return render_template("view_cards.html", card_data = json.dumps(pack_data))
        #print((pack_data))
        return (pack_data)


        # if request.method == "GET":
        #     user_id = request.headers.get('id')
        #     pack_data = openPack(user_id)
        #
        #     print("DATA SENT")
        #     return render_template("view_cards.html")
        # else:
        #     return redirect(url_for("home"))

        #return user_id


    @app.route('/user/view')
    def view():
        #if request.method == 'POST':
        #user_id = request.headers.get('id')
        user_id = "anthony"
        cards = viewUserCards(user_id)

        return cards

    @app.route("/test") #An open card request test
    def test():    
        pack = request.headers.get('pack') #Headers are passed and accessed like this. We will use this to pass variables from the front.
        print(pack)
        response = make_response("is it working") #Send out plaintext or Json like this
        response.headers["test"] = "working?" #Add new headers like this
        return response #Output like this
    return app

if __name__ == "__main__":
    app = create_app()
    app.run()