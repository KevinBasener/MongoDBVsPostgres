# Project Setup

This project consists of a **MongoDB** and **PostgreSQL** setup with a backend and frontend using Docker Compose. Below are the credentials, instructions to add a PostgreSQL server in **pgAdmin**, and the **users** table definition.

---

## Credentials

### **Mongo Express (Web UI):**[http://localhost:8081](http://localhost:8081)
- **Username:** `admin`
- **Password:** `password`

### **PostgreSQL**
- **Host:** `postgres`
- **Port:** `5432`
- **Database:** `users_db`
- **Username:** `admin`
- **Password:** `password`

pgAdmin (Web UI): [http://localhost:5050](http://localhost:5050)
- **Email:** `admin@example.com`
- **Password:** `admin`

---

## How to Add PostgreSQL Server in pgAdmin

1. Open pgAdmin at [http://localhost:5050](http://localhost:5050).
2. Log in using:
    - Email: `admin@example.com`
    - Password: `admin`
3. In the pgAdmin interface, right-click on **Servers** → Click **Create** → **Server**.
4. Under the **General** tab, enter:
    - **Name:** `Postgres Server`
5. Go to the **Connection** tab and enter:
    - **Host name/address:** `postgres`
    - **Port:** `5432`
    - **Username:** `admin`
    - **Password:** `password`
6. Click **Save**. PostgreSQL is now connected.

---

## PostgreSQL Users Table Definition

To create the `users` table, run the following SQL command in **pgAdmin** or connect via a PostgreSQL client:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    city VARCHAR(100) NOT NULL
);
```

This will create a table with three columns: `name`, `age`, and `city`.

---

## Running the Project

1. Ensure **Docker** and **Docker Compose** are installed.
2. Navigate to the project directory.
3. Run the following command to start all services:
   ```sh
   docker-compose up --build
   ```
4. Access the services:
    - **Frontend:** [http://localhost:5173](http://localhost:5173)
    - **Backend:** [http://localhost:3000](http://localhost:3000)
    - **Mongo Express:** [http://localhost:8081](http://localhost:8081)
    - **pgAdmin:** [http://localhost:5050](http://localhost:5050)

To stop the services, press `CTRL + C` or run:
```sh
docker-compose down
```

---

## Notes
- Ensure ports **27017**, **5432**, **3000**, **5173**, **8081**, and **5050** are available.
- If `docker-compose up` fails, try removing old containers:
  ```sh
  docker-compose down -v
  ```

