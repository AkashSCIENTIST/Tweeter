from flask import *
from demo import *
#from embeddedsql import *
app = Flask(__name__)

'''Prelims''' 

@app.route('/', methods=['GET'])
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

@app.route('/feed/<user>', methods=['GET'])
def feed(user):
    data = "Feed page goes here"
    return jsonify({"data":data})

'''User Table'''

@app.route('/user/<user>', methods=['GET'])
def user(user):
    data = ["User {} page goes here".format(user)]
    return jsonify({"data":data})

@app.route('/new_user', methods=['POST'])
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

@app.route('/delete_user', methods=['POST'])
def delete_user():
    data = request.form
    username = data['username']
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

'''Follower Table'''

@app.route('/new_follow', methods=['POST'])
def new_follow():
    data = request.form
    print(data)
    follower = data['follower']
    followee = data['follows']
    return jsonify({"data":data})

@app.route('/new_unfollow', methods=['POST'])
def new_unfollow():
    data = request.form
    print(data)
    follower = data['follower']
    follows = data['follows']
    return jsonify({"data":data})

'''Like Table'''

@app.route("/new_like", methods=['POST'])
def new_like():
    data = request.form
    tweet_id = data['tweet_id']
    user_id = data['user_id']
    #time = time
    return jsonify({"data":data})

@app.route("/new_unlike", methods=['POST'])
def new_unlike():
    data = request.form
    tweet_id = data['tweet_id']
    user_id = data['user_id']
    #time = time
    return jsonify({"data":data})

'''Message Table'''

@app.route("/new_message", methods=['POST'])
def new_message():
    data = request.form
    sender = data['sender']
    receiver = data['receiver']
    content = data['message']
    data['time'] = 10
    return jsonify({"data":data})

@app.route("/delete_message", methods=['POST'])
def new_message():
    data = request.form
    sender = data['sender']
    receiver = data['receiver']
    time = data['time']
    return jsonify({"data":data})

'''Group Member Table'''

@app.route('/new_group_member', methods=['POST'])
def new_group_member():
    data = request.form
    group_name = data['group_name']
    username = data['username']
    return jsonify({"data":data})

@app.route('/delete_group_member', methods=['POST'])
def delete_group_member():
    data = request.form
    group_name = data['group_name']
    username = data['username']
    return jsonify({"data":data})

'''Vote Table'''

@app.route('/cast_vote', methods=['POST'])
def cast_vote():
    data = request.form
    username = data['username']
    poll_id = data['poll_id']
    return jsonify({"data":data})

'''Poll Option Table'''

@app.route('/new_poll_option', methods=['POST'])
def new_poll_option():
    data = request.form
    poll_id = data['poll_id']
    option = data['option']
    return jsonify({"data":data})

'''Poll Posted By Table'''

@app.route('/poll_posted_by', methods=['POST'])
def new_poll():
    data = request.form
    return jsonify({"data":data})
