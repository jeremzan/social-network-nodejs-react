import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState(null);

  const handleDelete = (id) => {
    axios
      .delete(`/admin/${id}`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get("/admin")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="users">
      <h2>Users</h2>
      {users &&
        users.map((user) => (
          <div className="user-preview" key={user.id}>
            <ul>
              <li>{user.firstName}</li>
              <li>{user.lastName}</li>
              <li>{user.email}</li>
              <li>{user.lastLogOut}</li>
              <li>{user.posts}</li>
            </ul>
            <button onClick={() => handleDelete(user.id)}>
              Delete from database
            </button>
          </div>
        ))}
    </div>
  );
};

export default Admin;
