from flask import Flask, render_template
from flask_cors import CORS
from app.api import create_api
# from pyngrok import ngrok


def start():
    ## Deployment
    # app = Flask(__name__, static_folder='../build/static', template_folder='../build')

    ## Development
    app = Flask(__name__)

    CORS(app)

    ## Deployment
    # @app.route('/')
    # def index_redir():
    #     # Reached if the user hits example.com/ instead of example.com/index.html
    #     return render_template('index.html')

    app.register_blueprint(create_api(), url_prefix='/')

    app.run(host='0.0.0.0', port=8080)

if __name__ == '__main__':
    # tunnel = ngrok.connect(8080)
    # print(tunnel)
    start()