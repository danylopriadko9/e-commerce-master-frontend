import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UpdateCategory.module.scss';

const UpdateCategory = () => {
  const [updateCategoryFile, setUpdateCategoryFile] = React.useState(null);
  const [addSubcategoryFile, setAddSubcategoryFile] = React.useState(null);

  const [actualCategory, setActualCategory] = React.useState({});
  const [actualCategoryToAddSub, setActualCategoryToAddSub] =
    React.useState(null);
  const [actualSubcategory, setActualSubcategory] = React.useState(null);

  const [newCategory, setNewCategory] = React.useState({
    name: '',
    url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    file: null,
  });

  const handleChangeNewCategoryInformation = (e) => {
    setNewCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmiNewCategory = async (el) => {
    const { data } = await axios.post('/category/create', el);
    console.log(data);
  };

  const [newSubcategory, setNewSubcategory] = React.useState({
    name: '',
    url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    file: null,
    parent_id: null,
  });

  const handleChangeNewSubcategoryInformation = (e) => {
    setNewSubcategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { categories } = useSelector((state) => state.category);

  const handleChangeActualCategory = (e) => {
    setActualCategory(() =>
      categories.find((el) => el.id === Number(e.target.value))
    );
  };

  const handleChangeActualCategoryToAddSub = (e) => {
    setActualCategoryToAddSub(() =>
      categories.find((el) => el.id === Number(e.target.value))
    );
  };

  React.useEffect(() => {
    if (actualCategoryToAddSub) {
      setNewSubcategory((prev) => ({
        ...prev,
        parent_id: actualCategoryToAddSub.id,
      }));
    }
  }, [actualCategoryToAddSub]);

  const handleChangeCategoryInformation = (e) => {
    setActualCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeActualSubcategoryInfo = (e) => {
    setActualSubcategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateCategory = async (el, photo) => {
    try {
      await axios.put(`/category/${el.id}`, el);

      if (photo) {
        const image = new FormData();
        image.append('avatar', photo);

        await axios.post(`/upload/category/${el.id}`, image, {
          headers: {
            'content-type': 'mulpipart/form-data',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Categories</h1>
      <div className={styles.content_container}>
        <div className={styles.create_inputs}>
          <h2>Create new category</h2>

          <div className={styles.inputs_block}>
            <div className={styles.input_label}>
              <label>Name: </label>
              <input
                name='name'
                onChange={handleChangeNewCategoryInformation}
                type='text'
                id='username'
              />
            </div>
            <div className={styles.input_label}>
              <label>Url: </label>
              <input
                name='url'
                onChange={handleChangeNewCategoryInformation}
                type='text'
                id='username'
              />
            </div>
            <div className={styles.input_label}>
              <label>meta_title: </label>
              <input
                name='meta_title'
                onChange={handleChangeNewCategoryInformation}
                type='text'
                id='username'
              />
            </div>
            <div className={styles.input_label}>
              <label>meta_keywords: </label>
              <input
                name='meta_keywords'
                onChange={handleChangeNewCategoryInformation}
                type='text'
                id='username'
              />
            </div>
            <div className={styles.input_label}>
              <label>meta_description: </label>
              <input
                name='meta_description'
                onChange={handleChangeNewCategoryInformation}
                type='text'
                id='username'
              />
            </div>
          </div>

          <div className={styles.photo_block}>
            <label className={styles.photo_button} htmlFor='newCategoryFile'>
              Add image
            </label>
            <input
              id='newCategoryFile'
              style={{ display: 'none' }}
              type='file'
              onChange={(e) =>
                setNewCategory((prev) => ({ ...prev, file: e.target.files[0] }))
              }
            />
            <span>{newCategory.file?.name}</span>
          </div>
          <button onClick={() => handleSubmiNewCategory(newCategory)}>
            Create
          </button>
        </div>
        <div className={styles.update_ategory}>
          <h2>Update category</h2>
          <select
            name='category'
            id='category'
            onChange={handleChangeActualCategory}
          >
            {categories &&
              categories
                .filter((el) => el.parent_id === 0)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
          </select>
          <div className={styles.inputs_block}>
            <div className={styles.input_label}>
              <label>Name: </label>
              <input
                value={actualCategory?.name}
                type='text'
                id='name'
                name='name'
                onChange={handleChangeCategoryInformation}
              />
            </div>
            <div className={styles.input_label}>
              <label>Url: </label>
              <input
                onChange={handleChangeCategoryInformation}
                value={actualCategory?.url}
                type='text'
                name='url'
                id='url'
              />
            </div>
            <div className={styles.input_label}>
              <label>meta_title: </label>
              <input
                value={actualCategory?.meta_title}
                onChange={handleChangeActualCategory}
                name='meta_title'
                type='text'
                id='username'
              />
            </div>
            <div className={styles.input_label}>
              <label>meta_keywords: </label>
              <input
                value={actualCategory?.meta_keywords}
                onChange={handleChangeActualCategory}
                name='meta_keywords'
                type='text'
                id='username'
              />
            </div>
            <div className={styles.input_label}>
              <label>meta_description: </label>
              <input
                name='meta_description'
                value={actualCategory?.meta_description}
                onChange={handleChangeActualCategory}
                type='text'
                id='username'
              />
            </div>
            <div className={styles.photo_block}>
              <label
                className={styles.photo_button}
                htmlFor='updateCategoryFile'
              >
                Add image
              </label>
              <input
                id='updateCategoryFile'
                style={{ display: 'none' }}
                type='file'
                onChange={(e) => setUpdateCategoryFile(e.target.files[0])}
              />
              <span>{updateCategoryFile?.name}</span>
            </div>
            <button
              onClick={() =>
                handleUpdateCategory(actualCategory, updateCategoryFile)
              }
            >
              Create
            </button>
          </div>
        </div>
        <div className={styles.addSubcategory}>
          <h2>Update subcategory in category</h2>
          <select
            name='category'
            id='category'
            onChange={handleChangeActualCategoryToAddSub}
          >
            <option value=''>None</option>
            {categories &&
              categories
                .filter((el) => el.parent_id === 0)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
          </select>
          <br />
          <div className={styles.subcategory_container}>
            {categories
              .filter((el) => el.parent_id === actualCategoryToAddSub?.id)
              .map((el) => (
                <span onClick={() => setActualSubcategory(el)} key={el.id}>
                  {el.name}
                </span>
              ))}
          </div>
          {actualSubcategory && (
            <div className={styles.inputs_block}>
              <div className={styles.input_label}>
                <label>Name: </label>
                <input
                  value={actualSubcategory?.name}
                  onChange={handleChangeActualSubcategoryInfo}
                  name='name'
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>Url: </label>
                <input
                  value={actualSubcategory?.url}
                  onChange={handleChangeActualSubcategoryInfo}
                  type='text'
                  id='username'
                  name='url'
                />
              </div>
              <div className={styles.input_label}>
                <label>meta_title: </label>
                <input
                  name='meta_title'
                  value={actualSubcategory?.meta_title}
                  onChange={handleChangeActualSubcategoryInfo}
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>meta_keywords: </label>
                <input
                  value={actualSubcategory?.meta_keywords}
                  name='meta_keywords'
                  onChange={handleChangeActualSubcategoryInfo}
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>meta_description: </label>
                <input
                  value={actualSubcategory?.meta_description}
                  name='meta_description'
                  onChange={handleChangeActualSubcategoryInfo}
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.photo_block}>
                <label
                  className={styles.photo_button}
                  htmlFor='addSubcategoryFile'
                >
                  Add image
                </label>
                <input
                  id='addSubcategoryFile'
                  style={{ display: 'none' }}
                  type='file'
                  onChange={(e) => setAddSubcategoryFile(e.target.files[0])}
                />
                <span>{addSubcategoryFile?.name}</span>
              </div>
              <button
                onClick={() =>
                  handleUpdateCategory(actualSubcategory, addSubcategoryFile)
                }
              >
                Update
              </button>
            </div>
          )}
        </div>
        {actualCategoryToAddSub && (
          <div>
            <h2>Create subcategory for {actualCategoryToAddSub?.name} </h2>
            <div className={styles.inputs_block}>
              <div className={styles.input_label}>
                <label>Name: </label>
                <input
                  onChange={handleChangeNewSubcategoryInformation}
                  name='name'
                  value={newSubcategory.name}
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>Url: </label>
                <input
                  onChange={handleChangeNewSubcategoryInformation}
                  value={newSubcategory.url}
                  name='url'
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>meta_title: </label>
                <input
                  onChange={handleChangeNewSubcategoryInformation}
                  name='meta_title'
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>meta_keywords: </label>
                <input
                  onChange={handleChangeNewSubcategoryInformation}
                  name='meta_keywords'
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.input_label}>
                <label>meta_description: </label>
                <input
                  onChange={handleChangeNewSubcategoryInformation}
                  name='meta_description'
                  type='text'
                  id='username'
                />
              </div>
              <div className={styles.photo_block}>
                <label
                  className={styles.photo_button}
                  htmlFor='updateSubcategoryFile'
                >
                  Add image
                </label>
                <input
                  id='updateSubcategoryFile'
                  style={{ display: 'none' }}
                  type='file'
                  onChange={(e) =>
                    setNewSubcategory((prev) => ({
                      ...prev,
                      file: e.target.files[0],
                    }))
                  }
                />
                <span>{newSubcategory.file?.name}</span>
              </div>
              <button onClick={() => handleSubmiNewCategory(newSubcategory)}>
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCategory;
