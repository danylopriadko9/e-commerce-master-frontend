import React from 'react';
import styles from './UpdateProduct.module.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import axios from 'axios';
import {
  addRelationProduct,
  changeProductCharacteristicsValues,
  changeProductDescription,
  changeProductInformtion,
  deletePhoto,
  deleteRelationProduct,
  fetchCategoryCharacteristics,
  fetchManufacturers,
  fetchProduct,
  fetchProductCharacteristicsValues,
  fetchProductPhotos,
  fetchReationProductsIds,
  productClear,
} from '../../redux/slices/adminSlice';

const UpdateProduct = () => {
  const { categories } = useSelector((state) => state.category);
  const { currentUser } = React.useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);

  const [files, setFiles] = React.useState(null);

  const {
    relationProducts,
    productPhotos,
    manufacturers,
    product,
    categoryCharacteristics,
    productCharacteristicsValues,
  } = useSelector((state) => state.admin);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      dispatch(fetchProductPhotos(id));
      dispatch(fetchReationProductsIds(id));
      dispatch(fetchProductCharacteristicsValues(id));
    } else {
      dispatch(productClear());
    }
    dispatch(fetchManufacturers());
  }, [id]);

  const hangleChangeDescription = (e) => {
    dispatch(changeProductDescription({ value: e }));
  };

  const handleChange = (e) => {
    dispatch(
      changeProductInformtion({ key: e.target.name, value: e.target.value })
    );
  };

  const filteredCategories = categories
    .filter((el) => el.parent_id !== 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  React.useEffect(() => {
    if (product.category_id) {
      dispatch(fetchCategoryCharacteristics(product.category_id));
    }
  }, [product?.category_id]);

  const handleProductUpdate = async () => {
    if (id) {
      axios.put(`/product/${id}`, {
        product,
      });
      navigate(`/tovar_${product.url}`);
    } else {
      await axios.post('/product/create', product);
    }
  };

  const changeCharacteristicsValues = (e) => {
    dispatch(
      changeProductCharacteristicsValues({
        property_id: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleAddRelation = () => {
    dispatch(addRelationProduct({ product_id: inputRef.current.value }));
    inputRef.current.value = '';
  };

  const handleUploadPhotos = async () => {
    try {
      await axios.post(`/product/photos-delete/${id}`, productPhotos);

      const formData = new FormData();
      Object.values(files).forEach((file) => {
        console.log(file);
        formData.append('files', file);
      });

      await axios.post(`/product/photos-upload/product/${id}`, formData, {
        headers: {
          'content-type': 'mulpipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
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
      <h1>
        {id ? `Update product #${id}` : `Create product`}{' '}
        <span>Украинский / Русский</span>
      </h1>

      <div className={styles.content_container}>
        <div className={styles.main}>
          <div className={styles.inputs}>
            <div className={styles.preference}>
              <label>Product name: </label>
              <input
                type='text'
                name='product_name'
                onChange={handleChange}
                value={product?.product_name || ''}
              />
            </div>

            <div className={styles.preference}>
              <label>Product url: </label>

              <input
                type='text'
                onChange={handleChange}
                name='url'
                value={product?.url || ''}
              />
            </div>

            <div className={styles.preference}>
              <label htmlFor='currency'>Price: </label>
              <div className={styles.priceContainer}>
                <input
                  type='number'
                  value={product?.base_price || ''}
                  name='base_price'
                  onChange={handleChange}
                />
                <select
                  onChange={handleChange}
                  name='currency_id'
                  id='currency_id'
                >
                  <option value={product?.currency_id}>
                    {product?.iso || 'None'}
                  </option>
                  <option value='3'>UAH</option>
                  <option value='1'>USD</option>
                  <option value='6'>EUR</option>
                  <option value='2'>RUB</option>
                </select>
              </div>
            </div>

            <div className={styles.preference}>
              <label>Discount (%): </label>
              <input
                type='number'
                onChange={handleChange}
                name='discount_percent'
                value={product?.discount_percent || ''}
              />
            </div>

            <div className={styles.preference}>
              <label>Meta title: </label>
              <input
                type='text'
                onChange={handleChange}
                name='meta_title'
                value={product?.meta_title || ''}
              />
            </div>

            <div className={styles.preference}>
              <label>Meta description: </label>
              <textarea
                onChange={handleChange}
                name='meta_description'
                value={product?.meta_description || ''}
              />
            </div>

            <div className={styles.preference}>
              <label>Meta keywords: </label>
              <input
                type='text'
                onChange={handleChange}
                name='meta_keywords'
                value={product?.meta_keywords || ''}
              />
            </div>

            <div className={styles.preference}>
              <label>Category: </label>
              <select
                value={product?.category_id}
                onChange={handleChange}
                name='category_id'
                id='category'
              >
                <option value=''>{product?.category_name || 'None'}</option>
                {filteredCategories.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.preference}>
              <label>Guarantee (month): </label>
              <input
                type='number'
                onChange={handleChange}
                name='guarantee'
                value={product?.guarantee || ''}
              />
            </div>

            <div className={styles.preference}>
              <label>Manufacturer: </label>
              <select
                name='manufacturer_id'
                onChange={handleChange}
                value={product?.manufacturer_id}
              >
                {manufacturers?.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            <h3>Product characteristics</h3>

            {categoryCharacteristics.length > 0 &&
              categoryCharacteristics.map((el) => (
                <div key={el.property_id} className={styles.preference}>
                  <label>{el.characteristic}: </label>
                  <input
                    type='text'
                    onChange={changeCharacteristicsValues}
                    name={
                      (categoryCharacteristics &&
                        categoryCharacteristics.find(
                          (e) => e.property_id === el.property_id
                        )?.property_id) ||
                      ''
                    }
                    value={
                      (productCharacteristicsValues.length > 0 &&
                        productCharacteristicsValues.find(
                          (e) => e.property_id === el.property_id
                        )?.value) ||
                      ''
                    }
                  />
                </div>
              ))}

            <div className={styles.relation_block}>
              <h3>Product relation products:</h3>
              <div className={styles.relation_container}>
                {!relationProducts.length && (
                  <h4>This product has not any relations</h4>
                )}
                {relationProducts.map((el) => (
                  <div
                    onClick={() =>
                      dispatch(deleteRelationProduct(el.product_id))
                    }
                    className={styles.relation_id}
                    key={el.key}
                  >
                    {el.product_id}
                  </div>
                ))}
              </div>
              <br />
              <input
                ref={inputRef}
                type='number'
                placeholder='Type id of product'
              />
              <button onClick={handleAddRelation}>Add</button>
            </div>
          </div>
          <div className={styles.photos}>
            {productPhotos.length > 0 &&
              productPhotos.map((el) => (
                <div className={styles.photo_block} key={el.filename}>
                  <div
                    className={styles.delete_button}
                    onClick={() => dispatch(deletePhoto(el.filename))}
                  >
                    <BsFillTrashFill />
                  </div>
                  <div className={styles.photo_container}>
                    <img src={`/static/product/${id}/${el.filename}`} alt='' />
                  </div>
                </div>
              ))}

            <input
              multiple
              type='file'
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
            <button onClick={handleUploadPhotos}>Upload photos</button>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <label htmlFor=''>Product description: </label>
        <div className={styles.editorContainer}>
          <ReactQuill
            className={styles.editor}
            theme='snow'
            name='description'
            value={product?.description || ''}
            onChange={(e) => hangleChangeDescription(e)}
          />
        </div>
      </div>
      <div className={styles.submit_buttons}>
        <button>
          {' '}
          <BsFillTrashFill />
          Delete product
        </button>
        <button onClick={handleProductUpdate}>
          {' '}
          <BiSave />
          {id ? 'Update' : 'Public'}
        </button>
        <button>
          {' '}
          <AiOutlineClear />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
