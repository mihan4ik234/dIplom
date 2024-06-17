import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WrittenOff() {
  const [writtenOffProducts, setWrittenOffProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const productsPerPageOptions = [5, 10, 15, 20];

  useEffect(() => {
    const fetchWrittenOffProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?status=Списано');
        setWrittenOffProducts(response.data);
      } catch (error) {
        console.error('Error fetching written off products', error);
      }
    };
    fetchWrittenOffProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setWrittenOffProducts(writtenOffProducts.filter((product) => product.id !== id));
      console.log('Product deleted');
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleReturnProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, { status: 'Принято' });
      setWrittenOffProducts(writtenOffProducts.filter((product) => product.id !== id));
      console.log('Product returned:', response.data);
    } catch (error) {
      console.error('Error returning product', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = writtenOffProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleProductsPerPageChange = (event) => setProductsPerPage(Number(event.target.value));

  return (
    <div>
      <h1>Списанные товары</h1>
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
          {currentProducts.map((product) => (
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
                <button className="return-button" onClick={() => handleReturnProduct(product.id)}>Вернуть</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(writtenOffProducts.length / productsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <div className="products-per-page-selector">
        <select onChange={handleProductsPerPageChange} value={productsPerPage}>
          {productsPerPageOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default WrittenOff;
