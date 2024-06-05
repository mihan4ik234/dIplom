import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductButton from '../components/AddProductButton';
import './Actual.css';

function Actual() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    status: '',
    purchase_article: '',
    quantity: '',
    amount: '',
    purchase_date: '',
    receipt_date: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    console.log('Adding product:', newProduct);
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        ...newProduct,
        quantity: parseInt(newProduct.quantity, 10),
        amount: parseFloat(newProduct.amount),
      });
      setProducts([...products, response.data]);
      setShowModal(false);
      setNewProduct({
        name: '',
        status: '',
        purchase_article: '',
        quantity: '',
        amount: '',
        purchase_date: '',
        receipt_date: '',
      });
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleWriteOffProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, { status: 'Списано' });
      setProducts(products.filter((product) => product.id !== id));
      console.log('Product written off:', response.data);
    } catch (error) {
      console.error('Error writing off product', error);
    }
  };

  const handleSendToRepair = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, { status: 'На ремонте' });
      setProducts(products.filter((product) => product.id !== id));
      console.log('Product sent to repair:', response.data);
    } catch (error) {
      console.error('Error sending product to repair', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      console.log('Product deleted');
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="actual-container">
      <AddProductButton onClick={() => setShowModal(true)} />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <div className="add-product-form">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Название"
                maxLength={255}
              />
              <select name="status" value={newProduct.status} onChange={handleChange}>
                <option value="">Статус</option>
                <option value="Принято">Принято</option>
                <option value="Списано">Списано</option>
              </select>
              <select name="purchase_article" value={newProduct.purchase_article} onChange={handleChange}>
                <option value="">Статья закупки</option>
                <option value="213">213</option>
                <option value="211">211</option>
                <option value="210">210</option>
                <option value="312">312</option>
                <option value="513">513</option>
                <option value="245">245</option>
              </select>
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                placeholder="Количество"
                min="0"
              />
              <input
                type="number"
                name="amount"
                value={newProduct.amount}
                onChange={handleChange}
                placeholder="Сумма"
                min="0"
                step="0.01"
              />
              <input
                type="date"
                name="purchase_date"
                value={newProduct.purchase_date}
                onChange={handleChange}
              />
              <input
                type="date"
                name="receipt_date"
                value={newProduct.receipt_date}
                onChange={handleChange}
              />
              <button onClick={handleAddProduct}>Добавить</button>
            </div>
          </div>
        </div>
      )}
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Статья закупки</th>
            <th>Количество</th>
            <th>Сумма</th>
            <th>Дата закупки</th>
            <th>Дата приёмки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.status}</td>
              <td>{product.purchase_article}</td>
              <td>{product.quantity}</td>
              <td>{product.amount}</td>
              <td>{product.purchase_date}</td>
              <td>{product.receipt_date}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                <button className="write-off-button" onClick={() => handleWriteOffProduct(product.id)}>Списать</button>
                <button className="repair-button" onClick={() => handleSendToRepair(product.id)}>Отправить на ремонт</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Actual;
