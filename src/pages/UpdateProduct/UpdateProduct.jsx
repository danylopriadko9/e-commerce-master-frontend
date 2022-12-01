import React from 'react';
import styles from './UpdateProduct.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../../context/authContext';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';

const UpdateProduct = () => {
  const { currentUser } = React.useContext(AuthContext);
  const { categories } = useSelector((state) => state.category);
  const [file, setFile] = React.useState(null);

  const filteredCategories = categories
    .filter((el) => el.parent_id !== 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const { id } = useParams();

  if (currentUser?.role !== 'admin' || !currentUser) {
    return (
      <div className={styles.container}>
        <h1>Access denied</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>
        Update product #{id} <span>Украинский / Русский</span>
      </h1>

      <div className={styles.content_container}>
        <div className={styles.main}>
          <div className={styles.inputs}>
            <div className={styles.preference}>
              <label>Product name: </label>
              <input type='text' placeholder='' />
            </div>

            <div className={styles.preference}>
              <label>Product url: </label>
              <input type='text' placeholder='' />
            </div>

            <div className={styles.preference}>
              <label for='currency'>Price: </label>
              <div className={styles.priceContainer}>
                <input type='number' placeholder='' />
                <select name='currency' id='currency'>
                  <option value=''>Currency</option>
                  <option value='UAH'>UAH</option>
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='RUB'>RUB</option>
                </select>
              </div>
            </div>

            <div className={styles.preference}>
              <label>Discount (%): </label>
              <input type='number' placeholder='' />
            </div>

            <div className={styles.preference}>
              <label>Meta title: </label>
              <input type='text' placeholder='' />
            </div>

            <div className={styles.preference}>
              <label>Meta description: </label>
              <textarea placeholder='' />
            </div>

            <div className={styles.preference}>
              <label>Meta keywords: </label>
              <input type='text' placeholder='' />
            </div>

            <div className={styles.preference}>
              <label>Category: </label>
              <select name='currency' id='currency'>
                <option value=''>None</option>
                {filteredCategories.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.photos}>
            <div className={styles.photo_block}>
              <div className={styles.delete_button}>
                <BsFillTrashFill />
              </div>
              <div className={styles.photo_container}>
                <img
                  src='https://www.file-extension.info/images/resource/formats/img.png'
                  alt=''
                />
              </div>
            </div>

            <input
              style={{ display: 'none' }}
              type='file'
              id='file'
              name=''
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className='file' htmlFor='file'>
              Upload Image
            </label>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <label htmlFor=''>Product description: </label>
        <div className={styles.editorContainer}>
          <ReactQuill
            className={styles.editor}
            theme='snow'
            // value={value}
            // onChange={setValue}
          />
        </div>
      </div>
      <div className={styles.submit_buttons}>
        <button>
          {' '}
          <BsFillTrashFill />
          Delete
        </button>
        <button>
          {' '}
          <BiSave />
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
