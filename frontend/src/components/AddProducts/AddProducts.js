import React, { useState } from "react";
import "./AddProducts.css";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [productImages, setProductImages] = useState(Array.from({ length: 4 }, () => null));
  const [imagePreviews, setImagePreviews] = useState(Array.from({ length: 4 }, () => null));
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Sofas");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleImageChange = (e, index) => {
    const imageFile = e.target.files[0];
    const newImages = [...productImages];
    newImages[index] = imageFile;
    setProductImages(newImages);

    const reader = new FileReader();
    reader.onload = () => {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = reader.result;
      setImagePreviews(newPreviews);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      description: productDescription,
      category: productCategory,
      images: productImages,
    });

    setProductName("");
    setProductPrice("");
    setProductQuantity(1);
    setProductDescription("");
    setProductCategory("Sofas");
    setProductImages(Array.from({ length: 4 }, () => null));
    setImagePreviews(Array.from({ length: 4 }, () => null));
  };

  return (
    <div className="AddProductContainer">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="ProdctName">
          <span>Product Name</span>
        </div>
        <input
          type="text"
          id="short"
          width={10}
          value={productName}
          onChange={handleProductNameChange}
          required
        />
        <div className="ProdctPrice">
          <span>Product Price</span>
        </div>
        <input
          type="number"
          id="short"
          value={productPrice}
          onChange={handleProductPriceChange}
          required
        />
        
        <div className="ProdctDescription">
          <span>Product Description</span>
        </div>
        <textarea
            id="ProductDescription"
          
          value={productDescription}
          onChange={handleProductDescriptionChange}
          required
        ></textarea>
        <div className="ProductCategory " >
          <span>Product Category</span>
        </div>
        <select value={productCategory} onChange={handleProductCategoryChange} id="short">
          <option value="Sofas">Sofas</option>
          <option value="Chairs">Chairs</option>
          <option value="Beds">Beds</option>
          <option value="Tables">Tables</option>
        </select>
        <div className="quantity-input">
          <label>Products Count In Inventory:</label>
          <input
            type="number"
            min="1"
            value={productQuantity}
            onChange={handleProductQuantityChange}
            required
          />
        </div>
        <div className="image-preview">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="preview-container">
              {preview ? (
                <img src={preview} alt={`Product Preview ${index + 1}`} />
              ) : (
                <div className="empty-box">Upload Image</div>
              )}
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  id={`image${index + 1}`}
                  onChange={(e) => handleImageChange(e, index)}
                  required
                />
                <label htmlFor={`image${index + 1}`}>Upload Image {index + 1}</label>
              </div>
            </div>
          ))}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
