import axios from 'axios';
import React from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './Users.module.scss';

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    axios.get('/users').then((res) => setUsers(res.data));
  }, []);

  const handleChangeRole = async (id, e) => {
    setUsers((prev) =>
      prev.map((el) => (el.id === id ? { ...el, role: e.target.value } : el))
    );

    const { data } = await axios.put(`/users/${id}`, { role: e.target.value });
    console.log(data);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`/users/${id}`);
    console.log(data);

    const users = await axios.get('/users');
    setUsers(users.data);
  };

  if (currentUser?.role !== 'admin' || !currentUser) {
    return (
      <div className={styles.container}>
        <h1>Access denied</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <div className={styles.users_container}>
        {users.map((el) => (
          <div key={el.id} className={styles.user}>
            <div className={styles.id}>{el.id}</div>
            <div className={styles.name}>
              <p>{el.username}</p>
            </div>
            <div className={styles.email}>{el.email}</div>
            <div className={styles.buttons}>
              <select
                onChange={(e) => handleChangeRole(el.id, e)}
                name='role'
                id='role'
              >
                <option value=''>{el.role}</option>
                <option value='admin'>admin</option>
                <option value='user'>user</option>
              </select>
              <button onClick={() => handleDelete(el.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.save_button}>
        <button>Save</button>
      </div>
    </div>
  );
};

export default Users;
