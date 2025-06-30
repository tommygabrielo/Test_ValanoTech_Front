import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, createProduct, updateProduct } from '../service/productService';
import '../assets/Admin.css';
import { motion } from 'framer-motion';
import { Product } from '../context/ProductContext';

const Admin: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const { products, refreshProducts } = useContext(ProductContext);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (window.confirm('Confirmer la suppression ?')) {
      await deleteProduct(id);
      refreshProducts();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      await updateProduct(editingId, formData);
    } else {
      await createProduct(formData);
    }
    setFormData({});
    setEditingId(null);
    refreshProducts();
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Interface Admin - Gestion des Produits</h2>
        <button className="exit-btn" onClick={handleLogout}>Déconnexion</button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          className="input"
          type="text"
          name="titre"
          placeholder="Titre"
          value={formData.titre || ''}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description || ''}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="prix"
          placeholder="Prix"
          value={formData.prix || ''}
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url || ''}
          onChange={handleChange}
        />
        <button className="submit-btn" type="submit">
          {editingId ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <table className="product-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Prix (€)</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.titre}</td>
                <td>{prod.description}</td>
                <td>{prod.prix}</td>
                <td>
                  <img src={prod.image_url} alt={prod.titre} className="table-image" />
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(prod)}>Modifier</button>
                  <button className="delete-btn" onClick={() => handleDelete(prod.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Admin;
