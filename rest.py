from flask import *
from demo import *
#from embeddedsql import *
app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home():
	return '''
    Available methods are :

    GET Requests:
    /
    /feed
    /:user
    /:tweet_id

    POST Requests:
    /new_user
    /new_tweet
    /new_comment
    /new_follow
    /new_like
    '''

@app.route('/feed/<user>', methods = ['GET'])
def feed(user):
    data = "Feed page goes here"
    return jsonify({"data":data})

@app.route('/user/<user>', methods = ['GET'])
def user(user):
    data = ["User {} page goes here".format(user)]
    return jsonify({"data":data})

@app.route('/tweet/<int:tweetid>', methods = ['GET'])
def tweet(tweet_id):
    data = ["Tweet of id {} goes here".format(tweet_id)]
    return jsonify({"data":data})

@app.route('/new_user', methods = ['POST'])
def new_user():
    data = request.form
    files = request.files
    image = binaryFromPhotoObject(dict(files)["image"])
    # print(binaryFromPhotoObject(dict(files)["image"])[:20])
    # username, loc, bio, mailid, website, fname, lname, photo, dob
    out = data.copy()
    out['image'] = image
    newUser(**out)
    return redirect(url_for('home'))

@app.route("/new_like", methods=['POST'])
def new_like():
    data = request.form
    tweet_id = data['tweet_id']
    user_id = data['user_id']
    return jsonify({"data":data})

@app.route("/new_comment", methods=['POST'])
def new_comment():
    data = request.form
    print(dict(data))
    tweet_id = data['tweet_id']
    user_id = data['user_id']
    content = data['content']
    return jsonify({"data":data})

@app.route('/new_follow', methods=['POST'])
def new_follow():
    data = request.form
    print(data)
    follower = data['follower']
    followee = data['followee']
    return jsonify({"data":data})

@app.route("/new_unlike", methods=['POST'])
def new_unlike():
    data = request.form
    tweet_id = data['tweet_id']
    user_id = data['user_id']
    return jsonify({"data":data})

@app.route("/delete_comment", methods=['POST'])
def delete_comment():
    data = request.form
    print(dict(data))
    tweet_id = data['tweet_id']
    user_id = data['user_id']
    content = data['content']
    return jsonify({"data":data})

@app.route('/new_unfollow', methods=['POST'])
def new_unfollow():
    data = request.form
    print(data)
    follower = data['follower']
    follows = data['follows']
    return jsonify({"data":data})

@app.route('/change_photo', methods=['GET'])
def change_photo():
    data = request.form
    files = request.files
    user = data['username']
    image = dict(files)['image']
    out = {
        'user':user,
        'image':image
    }
    return jsonify({"data":out})

@app.route('/new_tweet', methods=['GET'])
def new_tweet():
    data = request.form
    files = request.files
    image = dict(files)['image']
    out = {
        'data':data,
        'image':image
    }
    return jsonify({"data":out})

if __name__ == '__main__':
	app.run()
