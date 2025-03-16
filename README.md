Postgres:

psql -U admin -d users_db
INSERT INTO users (name, email, city) VALUES ('Bob', 'bob@example.com', 'Stuttgart);

MongoDB

db.auth("admin", "password")
admin> db.users.insertOne({ name: "Alice", email: "alice@example.com" })