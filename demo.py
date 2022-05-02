import psycopg2
import base64
import binascii
from datetime import datetime

conn = psycopg2.connect(database = "postgres", user = "postgres", password = "root", host = "localhost", port = "5432")
cur = conn.cursor()

def getPhoto(url):
    with open(url, 'rb') as file:
        binary_data = file.read()
    return binascii.hexlify(binary_data).decode("utf-8")
    with open(url, "rb") as f:
        data = base64.b64encode(f.read())
        print(data[:50])
        return data

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