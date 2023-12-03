import psycopg2
import psycopg2.extras
import base64
import binascii
from datetime import datetime
import codecs
import smtplib
import ssl
port = 587  # For starttls
smtp_server = "smtp.gmail.com"
sender_email = "sender_mail"
password = "sender_mail_password"

USER = "postgres"
PASSWORD = "root"

# conn = psycopg2.connect(
#     database = "postgres",
#     user = USER,
#     password = "root",
#     host = "localhost",
#     port = "5432"
# )
# cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)


def getPhoto(url):
    with open(url, 'rb') as file:
        binary_data = file.read()
    return binascii.hexlify(binary_data).decode("utf-8")


def hexToBase64(hex):
    b64 = codecs.encode(codecs.decode(hex, 'hex'), 'base64').decode()
    return b64


def binaryFromPhotoObject(obj):
    return binascii.hexlify(obj.read()).decode("utf-8")


def newUser(username, location, bio, mailid, website, firstname, lastname, photo, dateofbirth):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    joined_from = datetime.today().strftime('%Y-%m-%d')
    try:
        cur.execute("insert into users values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}' , '{}', '{}')".format(
            username, location, bio, mailid, website, firstname, lastname, photo, dateofbirth, joined_from))
    except:
        print("Check for correct details. Username may already exist")
    conn.commit()
    conn.close()
    # message = "Subject:Tweeter User Created\n\nusername : {}\npassword : {}".format(username, mailid)
    # context = ssl.create_default_context()
    # with smtplib.SMTP(smtp_server, port) as server:
    #     server.starttls(context=context)
    #     server.login(sender_email, password)
    #     server.sendmail(sender_email, mailid, message)
    #     print("mail send to {}".format(mailid))


def changePhoto(username, photo):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "update users set photo = '{}' where username = '{}'".format(
        photo, username)
    cur.execute(query)
    conn.commit()
    conn.close()


def changeGroupPhoto(groupname, photo):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "update group_ set photo = '{}' where grpname = '{}'".format(
        photo, groupname)
    cur.execute(query)
    conn.commit()
    conn.close()


def deleteUser(username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from users where username = {username}".format()
    cur.execute(query)
    conn.commit()
    conn.close()


def newLike(tweet_id, user_id):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "insert into like_ (username, tweetid) values ('{}', {})".format(
        user_id, tweet_id)
    cur.execute(query)
    conn.commit()
    conn.close()


def newComment(tweet_id, username, content):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "insert into comment_ (time_, tweetid, username, content_) values (current_timestamp, {}, '{}', '{}')".format(
        tweet_id, username, content.replace("'", "\'"))
    print(query)
    cur.execute(query)
    conn.commit()
    conn.close()


def newUnlike(tweet_id, user_id):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from like_ where tweetid = {} and username = '{}'".format(
        tweet_id, user_id)
    cur.execute(query)
    conn.commit()
    conn.close()


def tweetFeed(username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = '''
    select users.username, (users.fname || ' ' || users.lname) as author, 
    users.photo as userphoto, tweet.tweetid, tweet.content_, tweet.photo
    from tweet inner join users on
    tweet.author = users.username  where (users.username in 
	(select follows from follows where follower = '{}') or users.username = '{}')
	order by tweet.time_ desc
    '''.format(username, username)

    cur.execute(query)
    data = cur.fetchall()
    conn.commit()
    conn.close()
    return data


def single_tweet(tweetid):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = '''
    select users.username, (users.fname || ' ' || users.lname) as author, users.photo as userphoto, tweet.tweetid, tweet.content_, tweet.photo, tweet.time_
    from tweet inner join users on
    tweet.author = users.username and tweet.tweetid = {}
    '''.format(tweetid)
    cur.execute(query)
    data = cur.fetchall()
    conn.commit()
    conn.close()
    return data


def likesByTweeterId(tweetid):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = '''
    select users.username, users.photo as userphoto
    from users inner join like_ on
    users.username = like_.username and like_.tweetid = {}
    '''.format(tweetid)
    cur.execute(query)
    data = cur.fetchall()
    conn.commit()
    conn.close()
    return data


def Auth(username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select mailid from users where username = '{}'".format(username)
    cur.execute(query)
    data = cur.fetchall()
    conn.commit()
    conn.close()
    return data


def commentsByTweetId(tweetid):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = '''
    select comment_.time_, comment_._id, comment_.tweetid, comment_.content_, users.username, (users.fname || ' ' || users.lname) as author, users.photo as userphoto 
    from comment_ inner join users on
    comment_.username = users.username and comment_.tweetid = {}
	order by comment_.time_;
    '''.format(tweetid)
    cur.execute(query)
    data = cur.fetchall()
    conn.commit()
    conn.close()
    #print(*([i['username'], i['content_']] for i in data), sep="\n")
    return data


def newPoll(data):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query1 = "select nextval('poll_id_seq')"
    cur.execute(query1)
    id_ = dict(cur.fetchone())['nextval']
    query2 = "insert into poll values ({}, '{}', '{}', current_timestamp)".format(
        id_, data['Question'], data['username'])
    cur.execute(query2)
    query3 = "insert into poll_option values ({}, '{}')".format(
        id_, data['optiona'])
    print(query3)
    cur.execute(query3)
    query4 = "insert into poll_option values ({}, '{}')".format(
        id_, data['optionb'])
    cur.execute(query4)
    if data['optionc'] != '':
        query5 = "insert into poll_option values ({}, '{}')".format(
            id_, data['optionc'])
        cur.execute(query5)
    conn.commit()
    conn.close()
    return data


def getPollDetails(pollid):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select poll_id, content_, poll_by, option_ from poll_option inner join poll on poll_id = id_ where poll_id = {}".format(
        pollid)
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    query2 = "select poll_option_, count(poll_option_), poll_id from vote group by poll_id, poll_option_ having poll_id = {}".format(
        pollid)
    cur.execute(query2)
    data2 = [dict(i) for i in cur.fetchall()]
    data3 = [(i['poll_option_'], i['count']) for i in data2]
    query4 = "select * from vote where poll_id = {}".format(pollid)
    cur.execute(query4)
    data4 = [dict(i)['username'] for i in cur.fetchall()]
    print(data4)
    question = data[0]['content_']
    user = data[0]['poll_by']
    options = [i['option_'] for i in data]
    res = {
        'question': question,
        'author': user,
        'options': options,
        'count': data3,
        'voted': data4
    }
    # print(res)
    conn.commit()
    conn.close()
    return res


def isFollowing(curuser, user):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select * from follows where follower = '{}' and follows = '{}'".format(
        curuser, user)
    # print(query)
    cur.execute(query)
    data = cur.fetchall()
    conn.commit()
    conn.close()
    return (True if len(data) != 0 else False)


def newFollow(curuser, user):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "insert into follows (follower, follows) values ('{}', '{}')".format(
        curuser, user)
    cur.execute(query)
    conn.commit()
    conn.close()


def newUnfollow(curuser, user):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from follows where follower = '{}' and follows = '{}'".format(
        curuser, user)
    cur.execute(query)
    conn.commit()
    conn.close()


def castVote(username, pollid, option):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "insert into vote values ('{}', {}, '{}')".format(
        username, pollid, option)
    print(query)
    try:
        cur.execute(query)
        conn.commit()
        conn.close()
    except:
        pass
    return


def getPollFeed():
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = '''
    select poll.id_, poll.content_, poll.poll_by, users.photo, (users.fname || ' ' || users.lname) as name, users.username from poll
    inner join users on users.username = poll.poll_by
    order by poll.time_ desc
    ;
    '''
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    conn.commit()
    conn.close()
    return data


def newTweet(username, content, photo):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query1 = "select nextval('tweet_id_seq')"
    cur.execute(query1)
    tweetid = dict(cur.fetchone())['nextval']
    query2 = '''
    insert into tweet values({},'{}','{}',current_timestamp,'{}');
    '''.format(tweetid, content, photo if photo else 'None', username)
    cur.execute(query2)
    conn.commit()
    conn.close()
    return


def getAllUsers():
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select users.username, (users.fname || ' ' || users.lname) as author, users.photo as userphoto from users"
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    conn.commit()
    conn.close()
    return data


def getAllGroups():
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select grpname, photo from group_"
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    conn.commit()
    conn.close()
    return data


def getGroupDetail(grpname, username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select * from group_ where grpname = '{}'".format(grpname)
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    conn.commit()
    conn.close()
    return data


def isMemberOfGroup(grpname, username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "select * from group_members where grp_name = '{}' and grpmem = '{}'".format(
        grpname, username)
    cur.execute(query)
    res = True if len(cur.fetchall()) else False
    conn.commit()
    conn.close()
    return res


def joinGroup(grpname, username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "insert into group_members values ('{}', '{}')".format(
        grpname, username)
    cur.execute(query)
    conn.commit()
    conn.close()
    return


def leaveGroup(grpname, username):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from group_members where grp_name = '{}' and grpmem =  '{}'".format(
        grpname, username)
    cur.execute(query)
    conn.commit()
    conn.close()
    return


def getAllGroupMembers(grpname):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = '''
    select group_members.grp_name, users.username, users.photo from group_members inner join users on users.username = grpmem
    where grp_name = '{}'
    '''.format(grpname)
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    conn.commit()
    conn.close()
    return data


def newGroup(photo, admin, groupname, groupbio):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "insert into group_ values ('{}', '{}', '{}', '{}')".format(
        groupname, admin, photo, groupbio)
    cur.execute(query)
    conn.commit()
    conn.close()
    return


def getFollowersOf(user):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "SELECT users.username, users.photo FROM follows INNER JOIN users ON follows.follower = users.username where follows.follows = '{}'".format(
        user)
    cur.execute(query)
    data = [dict(i) for i in cur.fetchall()]
    conn.commit()
    conn.close()
    return data


def deleteTweetById(tweet_id):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from tweet where tweetid = {}".format(tweet_id)
    cur.execute(query)
    conn.commit()
    conn.close()
    return


def deleteCommentById(comment_id):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from comment_ where _id = {}".format(comment_id)
    cur.execute(query)
    conn.commit()
    conn.close()
    return


def deletePollById(poll_id):
    conn = psycopg2.connect(
        database="postgres",
        user = USER,
        password = PASSWORD,
        host="localhost",
        port="5432"
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    query = "delete from poll where id_ = {}".format(poll_id)
    cur.execute(query)
    conn.commit()
    conn.close()
    return

# if __name__ == '__main__':
#     print(getPollFeed())
