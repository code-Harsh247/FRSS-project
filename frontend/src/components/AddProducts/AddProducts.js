import React, { useState } from "react";
import axios from '../../context/axiosConfig';
import "./AddProducts.css";

const AddProducts = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState(20);
    const [productImages, setProductImages] = useState(Array.from({ length: 4 }, () => null));
    const [imagePreviews, setImagePreviews] = useState(Array.from({ length: 4 }, () => null));
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("Sofas");
    const [originalCost, setOriginalCost] = useState("");
    const imageUrls = [];

    const handelAddProduct = async () => {
        
        for (let i = 0; i < productImages.length; i++) {
            const image = productImages[i];
    
            if (image) {
                try {
                    const formData = new FormData();
                    formData.append('product', image);
    
                    const response = await axios.post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
    
                    const imageUrl = response.data.image_url;
                    imageUrls.push(imageUrl);
                } catch (error) {
                    console.error("Error uploading image:", error.response ? error.response.data : error);
                    // Handle error (e.g., display an error message to the user)
                }
            }
        }
    
        console.log("All images uploaded. Image URLs:", imageUrls);
        try {
            const response = await axios.post('/products/addproduct', {
                name: productName,
                price: productPrice,
                description: productDescription,
                image: imageUrls,
                cost: originalCost,
                category: productCategory,
                stock: productQuantity
            });
            alert("Product added!");
            // Optionally, you can redirect the user to another page or show a success message
        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error);
            // Handle error (e.g., display an error message to the user)
        }
    }

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

        // console.log({
        //     name: productName,
        //     price: productPrice,
        //     quantity: productQuantity,
        //     description: productDescription,
        //     category: productCategory,
        //     images: imageUrls,
        // });

        setProductName("");
        setProductPrice("");
        setProductQuantity(20);
        setProductDescription("");
        setOriginalCost("");
        setProductCategory("Sofas");
        setProductImages(Array.from({ length: 4 }, () => null));
        setImagePreviews(Array.from({ length: 4 }, () => null));
    };
    const handleOriginalCostChange = (e) => {
        setOriginalCost(e.target.value);
    };

    return (
        <div className="AddProductContainer">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="ProdctField">
                    <div>
                        <span>Product Name :</span>
                    </div>
                    <input
                        type="text"
                        id="short"
                        width={10}
                        value={productName}
                        onChange={handleProductNameChange}
                        required
                    />
                </div>
                <div className="ProdctField">
                    <div className="ProductPrice">
                        <span>Rent per month:</span>
                    </div>
                    <input
                        type="number"
                        id="short"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        required
                    />
                </div>
                <div className="ProdctField">
                    <div className="OriginalCost">
                        <span>Original Cost:</span>
                    </div>
                    <input
                        type="number"
                        id="short"
                        value={originalCost}
                        onChange={handleOriginalCostChange}
                        required
                    />
                </div>

                <div className="ProdctField">
                    <div className="ProdctDescription">
                        <span>Product Description:</span>
                    </div>
                    <textarea
                        id="ProductDescription"

                        value={productDescription}
                        onChange={handleProductDescriptionChange}
                        required
                    ></textarea>
                </div>

                <div className="ProdctField">
                    <div className="ProductCategory " >
                        <span>Product Category:</span>
                    </div>
                    <select value={productCategory} onChange={handleProductCategoryChange} id="short">
                        <option value="Sofa">Sofa</option>
                        <option value="Chair">Chair</option>
                        <option value="Bed">Bed</option>
                        <option value="Table">Table</option>
                    </select>
                </div>

                <div className="ProdctField">
                    <span>Product Count In Inventory:</span>
                    <div className="quantity-input">
                        <input

                            type="number"
                            min="20"
                            value={productQuantity}
                            onChange={handleProductQuantityChange}
                            required
                        />
                    </div>

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
                                <label className="uploadImgLabel" htmlFor={`image${index + 1}`}>Upload Image {index + 1}</label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="AddProductBTN">
                    <button className="AddProductsButton" type="submit" onClick={handelAddProduct}>Add Product</button>
                </div>

            </form>
        </div>
    );
};

export default AddProducts;
