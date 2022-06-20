import psycopg2
import psycopg2.extras
import base64
import binascii
from datetime import datetime
import codecs

conn = psycopg2.connect(
    database = "postgres", 
    user = "postgres", 
    password = "root", 
    host = "localhost", 
    port = "5432"
)
cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

def getChat(user1,user2):
    query="select sender,receiver,msg from chat where (sender='{}' and receiver='{}') or (sender='{}' and receiver='{}') order by time_ asc".format(user1,user2,user2,user1)
    cur.execute(query)
    return [dict(i) for i in cur.fetchall()]

def putMsg(sender,receiver,msg):
    query="insert into chat values('{}','{}','{}',current_timestamp)".format(sender,receiver,msg)
    print(query)
    cur.execute(query)
    conn.commit()


if __name__=="__main__":
    # print(*getChat("harshan_21","loki"),sep="\n")
    putMsg("akash_06","archana_08","hey we have finally completed the Project, Hurray!")
    