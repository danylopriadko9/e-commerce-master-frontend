import axios from 'axios';
import React from 'react';
import styles from './styles.module.scss';

const Index = (props) => {
  const { cb, data } = props;

  // переделать чтобы cb принимал два параметра: обьект информации и файл
  // перенести последний блок инпутов на этот компонент
  // обновление данных при отправке какой либо формы
  // редактирование различных языков для категорий
  // обновление dropdown при изменении языка
  // сделать адаптив для страницы продукта, главной страницы под мобилки

  const [file, setFile] = React.useState(null);
  const [category, setCategory] = React.useState({});

  const handleChangeCategoryInfo = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    if (data) {
      setCategory(data);
    } else {
      setCategory({
        name: '',
        url: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      await cb(category, file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.inputs_block}>
      <div className={styles.input_label}>
        <label>name: </label>
        <input
          value={category?.name}
          onChange={handleChangeCategoryInfo}
          name='name'
          type='text'
          id='username'
        />
      </div>
      <div className={styles.input_label}>
        <label>url: </label>
        <input
          value={category?.url}
          onChange={handleChangeCategoryInfo}
          type='text'
          id='username'
          name='url'
        />
      </div>
      <div className={styles.input_label}>
        <label>meta_title: </label>
        <input
          name='meta_title'
          value={category?.meta_title}
          onChange={handleChangeCategoryInfo}
          type='text'
          id='username'
        />
      </div>
      <div className={styles.input_label}>
        <label>meta_keywords: </label>
        <input
          value={category?.meta_keywords}
          name='meta_keywords'
          onChange={handleChangeCategoryInfo}
          type='text'
          id='username'
        />
      </div>
      <div className={styles.input_label}>
        <label>meta_description: </label>
        <input
          value={category?.meta_description}
          name='meta_description'
          onChange={handleChangeCategoryInfo}
          type='text'
          id='username'
        />
      </div>
      <div className={styles.photo_block}>
        <label className={styles.photo_button} htmlFor='addSubcategoryFile'>
          Add image
        </label>
        <input
          id='addSubcategoryFile'
          //style={{ display: 'none' }}
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span>{file?.name}</span>
      </div>
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default Index;
