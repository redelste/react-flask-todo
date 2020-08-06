import time
from flask import Flask, request
import psycopg2
import os
import json
from datetime import datetime
from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)
conn = None
cur = None


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/todos')
def getAllTodos():
    cur.execute("SELECT row_to_json(todos) FROM todos;")
    records = cur.fetchall()
    response = {'todos': [rs[0] for rs in records]}
    # print(response, "response")
    return response


@app.route('/api/add', methods=['POST'])
def addData():
    now = datetime.now()
    content = request.get_json()
    currentTime = now.strftime("%m/%d/%Y %H:%M")
    insertVals = (content['name'], content['description'])
    sqlQuery = f"INSERT INTO todos(name,description,dateCreated) VALUES (%s,%s, '{currentTime}') ON CONFLICT DO NOTHING RETURNING id;"
    cur.execute(sqlQuery,insertVals)
    inserted_row = cur.fetchone()
    id_of_new_row = inserted_row[0]
    conn.commit()
    return { "id": id_of_new_row, "datecreated": currentTime, **content }


@app.route('/api/delete', methods=['DELETE'])
def deleteData():
    content = request.get_json()
    # print("Content", content)
    sqlQuery = f"DELETE FROM todos WHERE id='{content['id']}';"
    cur.execute(sqlQuery)
    conn.commit()
    return {"success": True, "id": content["id"]}


@app.route('/api/update/<id>', methods=['PUT'])
def updateData(id):
    content = request.get_json()    # sqlQuery = f"UPDATE todos SET name = %s WHERE id='{id}';"
    newName = (content["newName"])  # store the new name in a var
    newDescription = (content["newDescription"])
    # sqlQuery = f"UPDATE todos SET name = %s WHERE id='{id}';"
    # need to pass a tuple to curser.execute.
    if newName == "" and newDescription != "":
        sqlQuery = f"UPDATE todos SET description = (%s) WHERE id='{id}';"
        cur.execute(sqlQuery, (newDescription,))
    elif newName != "" and newDescription == "":
        sqlQuery = f"UPDATE todos SET name = (%s) WHERE id='{id}';"
        cur.execute(sqlQuery, (newName,))
    elif newName != "" and newDescription !="":
        sqlQuery = f"UPDATE todos SET name = (%s), description = (%s) WHERE id='{id}';"
        cur.execute(sqlQuery, (newName,newDescription,))
    elif newName == '' and newDescription == '':
        return {"failure": False}
    conn.commit()
    return {"success": True}

@app.route('/api/update/description/<id>', methods=['PUT'])
def updateDescription(id):
    content = request.get_json()
    newDescription = (content["newDescription"])
    sqlQuery = f"UPDATE todos SET description = %s WHERE id='{id}';"
    cur.execute(sqlQuery, (newDescription,))
    conn.commit()
    return {"success": True}

# only executes if someone says python api.py
if __name__ == "__main__":
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password=os.getenv('PG_PASS'),
        host="localhost",
        port=int(os.getenv("PG_PORT"))
    )
    cur = conn.cursor()

    app.run(port=5000)

