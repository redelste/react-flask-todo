# Todo List 
    A simple todo using Postgres, Flask, and React
---
## Summary
--- 
### Requirements
- Postgres
- React
- Python3 

### Run Instructions
- In two separate terminals
---
#### To run the database with Docker

    To stop docker : `docker stop todo-postgres`

    Remove the postgres instance : `docker rm todo-postgres`

    Remove the database : `sudo rm -rf data`

Rerun the following command:

```bash
    docker run -d \
        --name todo-postgres \
        -e POSTGRES_PASSWORD=newEnvPass \
        -e PGDATA=/var/lib/postgresql/data/pgdata \
        -v $PWD/data:/var/lib/postgresql/data \
        -p "5432:5432" \
        postgres

```        
#### Backend
     cd api
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     python3 api.py


#### Frontend
    npm install
    npm start   

### .Env
    Create a .env file with the following parameters in the API Folder:
    PG_PASS=<ENVIRONMENT PASSWORD>
    PG_PORT=<POSTGRES PORT>



