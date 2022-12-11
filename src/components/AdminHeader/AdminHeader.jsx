import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  return (
    <div className={styles.container}>
      <Link to='/admin/users'>Users</Link>
      <Link to='/admin/category'>Categories</Link>
      <Link to='/admin/product'>Create Product</Link>
    </div>
  );
};

export default AdminHeader;
