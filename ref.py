from flask import Flask, jsonify, request
from embeddedsql import *
app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home():
	return '''
    Available methods are :

    GET Requests:
    /master
    /movies
    /movies/:id
    /actors
    /actors/:id
    /movies_by_actor/:actor_id
    /actors_by_movie/:movie_id

    POST Requests:
    /insert_movie
    /insert_actor
    /insert_movie_actor
    '''

@app.route('/movies', methods = ['GET'])
def movies():
    data = allMovies()
    return jsonify({"data":data})

@app.route('/movies/<int:id>', methods = ['GET'])
def movies_id(id):
    data = movieById(id)
    return jsonify({"data":data})


@app.route('/actors', methods = ['GET'])
def actors():
    data = allActors()
    return jsonify({"data":data})

@app.route('/actors/<int:id>', methods = ['GET'])
def actors_id(id):
    data = actorById(id)
    return jsonify({"data":data})

@app.route('/movies_by_actor/<int:actor_id>', methods = ['GET'])
def movies_actor(actor_id):
    data = moviesByActor(actor_id)
    return jsonify({"data":data})

@app.route('/movie_actor', methods=['GET'])
def movie_actor():
    data = allMovieActor()
    return jsonify({"data":data})

@app.route('/actors_by_movie/<int:movie_id>', methods = ['GET'])
def actor_movies(movie_id):
    data = actorsByMovie(movie_id)
    return jsonify({"data":data})

@app.route('/insert_movie', methods = ['POST'])
def insert_movie():
    data = request.form
    insertMovie(data['id'], data['name'], data['year'])
    return jsonify(data)

@app.route('/insert_actor', methods = ['POST'])
def insert_actor():
    data = request.form
    insertActor(data['id'], data['name'], data['age'], data['country'])
    return jsonify(data)

@app.route('/insert_movie_actor', methods = ['POST'])
def insert_movie_actor():
    data = request.form
    insertMovieActor(data['movie_id'], data['actor_id'])
    return jsonify(data)

@app.route('/master', methods = ["GET"])
def master():
    data = getMasterTable()
    return jsonify(data)
    


if __name__ == '__main__':
	app.run()