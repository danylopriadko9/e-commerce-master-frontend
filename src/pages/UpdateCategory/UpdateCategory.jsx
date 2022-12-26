import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UpdateCategory.module.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import {
  deleteSubcategoryCharacteristic,
  fetchSubcategoryCharacteristics,
  changeSubcategoryCharacteristic,
  createSubcategoryCharacteristic,
} from '../../redux/slices/adminSlice';

import Inputs from './inputs';

const UpdateCategory = () => {
  const dispatch = useDispatch();

  const { characteristicsSubcategory } = useSelector((state) => state.admin);

  const [addSubcategoryFile, setAddSubcategoryFile] = React.useState(null);
  const [newCharacteristic, setNewCharacteristic] = React.useState({
    characteristic: '',
  });

  const [actualCategory, setActualCategory] = React.useState({});
  const [actualCategoryToAddSub, setActualCategoryToAddSub] =
    React.useState(null);

  const [actualSubcategory, setActualSubcategory] = React.useState(null);

  const { language } = useSelector((state) => state.language);

  const handleSubmiNewCategory = async (el) => {
    const { data } = await axios.post(`/category/create?lan=${language}`, el);
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

  React.useEffect(() => {
    if (actualSubcategory) {
      dispatch(fetchSubcategoryCharacteristics(actualSubcategory.id));
    }
  }, [actualSubcategory]);

  const createNewCharacteristic = () => {
    dispatch(createSubcategoryCharacteristic(newCharacteristic));
    setNewCharacteristic({ characteristic: '' });
  };

  const submitCharacteristics = async () => {
    try {
      const { data } = await axios.post(
        `/category/characteristics/${actualSubcategory.id}?lan=${language}`,
        characteristicsSubcategory
      );
      console.log(data);
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
          <Inputs cb={handleSubmiNewCategory} />
        </div>
        <div className={styles.update_ategory}>
          <h2>Update category</h2>
          <select
            name='category'
            id='category'
            onChange={handleChangeActualCategory}
          >
            <option key={0} value={0}>
              none
            </option>
            {categories &&
              categories
                .filter((el) => el.parent_id === 0)
                .map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
          </select>
          <Inputs data={actualCategory} cb={handleUpdateCategory} />
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
              <h3>Update Characteristics</h3>
              {characteristicsSubcategory.map((el, i) => (
                <div key={i} className={styles.input_char}>
                  <input
                    value={el.characteristic}
                    onChange={(e) =>
                      dispatch(
                        changeSubcategoryCharacteristic({
                          name: i,
                          value: e.target.value,
                        })
                      )
                    }
                    type='text'
                  />
                  <button
                    onClick={() => dispatch(deleteSubcategoryCharacteristic(i))}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              ))}
              <div className={styles.add_characteristic}>
                <input
                  value={newCharacteristic.characteristic}
                  onChange={(e) =>
                    setNewCharacteristic((prev) => ({
                      ...prev,
                      characteristic: e.target.value,
                    }))
                  }
                  className={styles.add_chr}
                  type='text'
                />
                <button onClick={createNewCharacteristic}>
                  <BsPlusLg />
                </button>
              </div>
              <button onClick={submitCharacteristics}>Update</button>
            </div>
          )}
        </div>
        {actualCategoryToAddSub && (
          <>
            <h2>Create subcategory for {actualCategoryToAddSub?.name} </h2>
            <Inputs cb={handleSubmiNewCategory} />
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateCategory;
