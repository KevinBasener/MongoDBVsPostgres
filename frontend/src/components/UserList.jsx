import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState({ mongoDB: [], postgreSQL: [] });

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* MongoDB Users */}
        <div>
          <h2 className="text-lg font-semibold">MongoDB Users</h2>
          <ul className="list-disc pl-5">
            {users.mongoDB.map((user, index) => (
              <li key={index}>{user.name} ({user.age}, {user.city})</li>
            ))}
          </ul>
        </div>

        {/* PostgreSQL Users */}
        <div>
          <h2 className="text-lg font-semibold">PostgreSQL Users</h2>
          <ul className="list-disc pl-5">
            {users.postgreSQL.map((user, index) => (
              <li key={index}>{user.name} ({user.age}, {user.city})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
