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
### Backend
     cd utils
     virtualenv venv
     source venv/bin/activate
     pip install -r requirements.txt
     python3 api.py

#### To run the database with Docker

To stop docker : `docker stop todo-postgres`

Remove the postgres instance : `docker rm todo-postgres`

Remove the database : `sudo rm -rf data`

Rerun the following command:

```bash
    docker run -d \        
        --name todo-postgres \
        -e POSTGRES_PASSWORD="YOUR SECRET PASSWORD" \
        -e PGDATA=/var/lib/postgresql/data/pgdata \
        -v $PWD/data:/var/lib/postgresql/data \
        -p "5432:5432" \
        postgres  
```        
#### Frontend
    cd src
    npm install
    npm start   


    


