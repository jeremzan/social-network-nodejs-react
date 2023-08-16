import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = ({ userInfo }) => {
  const navigate = useNavigate();
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
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.email !== "admin") {
      navigate("/dashboard/feed"); // We'll want always to redirect to dashboard/feed
    }

    axios
      .get("/admin")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, [userInfo, navigate]);

  if (!userInfo || userInfo.email !== "admin") {
    return null;
  }
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
