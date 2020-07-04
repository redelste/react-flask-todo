import time
from flask import Flask, request
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()



app = Flask(__name__)
conn = None
cur = None



@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/postgres')
def hello():
    cur.execute("SELECT * FROM friends;")
    return {k:v for k,v in cur.fetchall()}

@app.route('/api/add', methods=['POST'])
def addData():
    content = request.get_json()
    print("content", content)
    print("DO WE HIT HHERE STILL?")
    sqlQuery = f"INSERT INTO friends VALUES ('{content['name']}', {content['age']}) ON CONFLICT DO NOTHING;"
    cur.execute(sqlQuery)
    conn.commit()
    return content


@app.route('/api/delete', methods=['DELETE'])
def deleteData():
    content = request.get_json()
    print("Content", content)
    sqlQuery = f"DELETE FROM friends WHERE name='{content['title']}';"
    cur.execute(sqlQuery)
    conn.commit()
    return {"success": True, "name":content["title"]}

@app.route('/api/update/<name>', methods=['PUT'])
def updateData(name):
    print("NAME", name)
    content  = request.get_json()
    print("CONTENT CONTENT", content)
    newInfo = content["newName"] # store the new name in a var
    if name == ' ':
        print("ITS EMPTY")
    sqlQuery = f"UPDATE friends SET name = '{newInfo}' WHERE name='{name}';"
    cur.execute(sqlQuery)
    conn.commit()
    return {"newName" : newInfo}



# only executes if someone says python api.py
if __name__ == "__main__":
    commands = (
        """
        CREATE TABLE IF NOT EXISTS friends (
            name VARCHAR(255) PRIMARY KEY,
            age INTEGER NOT NULL

        );
        """,
        """INSERT INTO friends VALUES ('Khayyam', 22) ON CONFLICT DO NOTHING;""",
        """INSERT INTO friends VALUES ('Zach', 23) ON CONFLICT DO NOTHING;""",
        """INSERT INTO friends VALUES ('Chris', 22) ON CONFLICT DO NOTHING;"""
    )
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password=os.getenv('PG_PASS'),
        host="localhost",
        port=int(os.getenv("PG_PORT"))
    )
    cur = conn.cursor()
    for command in commands:
        cur.execute(command)
    conn.commit()
    app.run(port=5000)
