import psycopg2
import base64
import binascii
from datetime import datetime

conn = psycopg2.connect(
    database = "postgres", 
    user = "postgres", 
    password = "root", 
    host = "localhost", 
    port = "5432"
)
cur = conn.cursor()

def getPhoto(url):
    with open(url, 'rb') as file:
        binary_data = file.read()
    return binascii.hexlify(binary_data).decode("utf-8")


def binaryFromPhotoObject(obj):
    return binascii.hexlify(obj.read()).decode("utf-8")

def newUser(username, loc, bio, mailid, website, fname, lname, photo, dob):
    joined_from = datetime.today().strftime('%Y-%m-%d')
    cur.execute("insert into users values ('{username}', '{loc}', '{bio}', '{mailid}', '{website}', '{fname}', '{lname}', decode('{photo}', 'hex') , '{dob}', '{joined_from}')".format())
    conn.commit()

def deleteUser(username):
    query = "delete from users where username = {username}".format()
    cur.execute(query)
    conn.commit()

def newLike(tweet_id, user_id):
    query = "insert into like (tweet_id, user_id) values ({}, {})".format(tweet_id, user_id)
    cur.execute(query)
    conn.commit()

def newComment(tweet_id, user_id, content):
    query = "insert into comments (tweet_id, user_id, content) values ({}, {}, {})".format(tweet_id, user_id, content)
    cur.execute(query)
    conn.commit()


def newFollow(follower, followee):
    query = "insert into followers (follower, followee) values ({}, {})".format(follower, followee)
    cur.execute(query)
    conn.commit()

def newUnlike(tweet_id, user_id):
    query = "delete from like where tweet_id = {} and user_id = {}".format(tweet_id, user_id)
    cur.execute(query)
    conn.commit()


if __name__ == "__main__":

    values = {
        "username" : "actorvijay2",
        "loc" : "Chennai",
        "bio" : "Actor, Singer, Dancer",
        "mailid" : "actorvijay@tweeter.com",
        "website" : "www.actorvijay.com",
        "fname" : "Joseph",
        "lname" : "Vijay",
        "photo" : getPhoto("C:\\Users\\akash\\OneDrive\\Pictures\\akash.jpg"),
        "dob" : "2022-05-02",
        "joined_from" : datetime.today().strftime('%Y-%m-%d')
    }

    cur.execute("insert into users values ('{username}', '{loc}', '{bio}', '{mailid}', '{website}', '{fname}', '{lname}', decode('{photo}', 'hex') , '{dob}', '{joined_from}')".format(**values))

    conn.commit()
    conn.close()