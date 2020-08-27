import time
from flask import Flask, request
import psycopg2
import os
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

conn = None
cur = None


if __name__ == "__main__":
    commands = (

        """
        CREATE TYPE STATUS AS ENUM ('TODO','IN_PROGRESS','COMPLETED');
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(800) NOT NULL,
            dateCreated TIMESTAMP,
            status STATUS NOT NULL
        );
        """,
        f"""INSERT INTO todos(name,description,dateCreated,status) VALUES ('Fix the bugs', 'its broken', '{datetime.now()}', 'TODO') ON CONFLICT DO NOTHING;"""
        f"""INSERT INTO todos(name,description,dateCreated, status) VALUES ('Fix duplicates', 'its annoying', '{datetime.now()}', 'TODO') ON CONFLICT DO NOTHING;"""

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
