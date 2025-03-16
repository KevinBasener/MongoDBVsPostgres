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
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* MongoDB Users */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">MongoDB Users</h2>
                    <div className="grid gap-4">
                        {users.mongoDB.map((user, index) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                                <h3 className="text-lg font-bold">{user.name}</h3>
                                <p className="text-gray-600">Age: {user.age}</p>
                                <p className="text-gray-600">City: {user.city}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PostgreSQL Users */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">PostgreSQL Users</h2>
                    <div className="grid gap-4">
                        {users.postgreSQL.map((user, index) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                                <h3 className="text-lg font-bold">{user.name}</h3>
                                <p className="text-gray-600">Age: {user.age}</p>
                                <p className="text-gray-600">City: {user.city}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
