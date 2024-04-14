import React, { useState, useEffect } from "react";
import axios from "../../context/axiosConfig";
import "./EditProductForm.css"

const EditProduct = ({ productId }) => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState(1);
    const [productImages, setProductImages] = useState(Array.from({ length: 4 }, () => null));
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("Sofas");
    const [originalCost, setOriginalCost] = useState("");
    const [id, setID] = useState(null);
    const [imagePreviews, setImagePreviews] = useState(Array.from({ length: 4 }, () => null)); // Add this line

    useEffect(() => {
        axios.get(`/products/${productId}`)
            .then(response => {
                
                const productData = response.data;
                console.log(productData);
                setProductName(productData.name);
                setProductPrice(productData.price);
                setProductQuantity(productData.quantity);
                setProductDescription(productData.description);
                setProductCategory(productData.category);
                setOriginalCost(productData.cost);
                setID(productData.id);
                // Assuming productImages and imagePreviews are stored in productData
                setProductImages(productData.image);
            })
            .catch(error => {
                console.error("Error fetching product data:", error);
            });
    }, [productId]);

    // console.log(productImages);

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

    const handleOriginalCostChange = (e) => {
        setOriginalCost(e.target.value);
    };

    const handleImageChange = (e, index) => {
        const imageFile = e.target.files[0];
        console.log(imageFile);

        // Update the productImages state with the new image file at the specified index
        console.log(index);
        
        setProductImages(prevImages => {
            console.log(prevImages);
            const newImages = [...prevImages];
            newImages[index] = imageFile;
            console.log(newImages);
            return newImages;
            
        });
        

        // Optionally, you can also update the image preview for immediate feedback
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
    
        // Check if any of the file input fields are empty
        const hasEmptyImages = productImages.some(image => !image);
    
        if (hasEmptyImages) {
            // Display an error message or handle the empty images case accordingly
            console.error("Please upload all images");
            return; // Prevent form submission
        }
    
        // Send updated product details to the backend
        const updatedProduct = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            description: productDescription,
            category: productCategory,
            cost: originalCost,
            images: productImages,
        };
    
        axios.put(`/products/updateproduct/${id}`, updatedProduct)
            .then(response => {
                console.log("Product updated successfully:", response.data);
                // Optionally, redirect to product details page or show a success message
            })
            .catch(error => {
                console.error("Error updating product:", error);
            });
    };
    
    

    return (
        <div className="EditProductContainer">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="ProductName">
                <div className="ProductName">
                    <span>Product Name</span>
                </div>
                    <input
                    id="short"
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                        required
                    />
                </div>
                <div className="ProductPrice">
                <div className="ProductPrice">
                    <span>Product Price</span>
                </div>
                    <input
                    id="short"
                        type="number"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        required
                    />
                </div>
                <div className="OriginalCost">
                <div className="ProductPrice">
                    <span>Product Price</span>
                </div>
                    <input
                    id="short"
                        type="number"
                        value={originalCost}
                        onChange={handleOriginalCostChange}
                        required
                    />
                </div>
                
                <div className="ProductDescription">
                <div className="ProductPrice">
                    <span>Product Price</span>
                </div>
                    <textarea
                    id="ProductDescription"
                        value={productDescription}
                        onChange={handleProductDescriptionChange}
                        required
                    ></textarea>
                </div>
                <div className="ProductCategory">
                    <label>Product Category</label>
                    <select value={productCategory} onChange={handleProductCategoryChange}>
                        <option value="Sofas">Sofas</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Beds">Beds</option>
                        <option value="Tables">Tables</option>
                    </select>
                </div>
                <div className="ProductQuantity">
                    <label>Product Quantity</label>
                    <input
                        type="number"
                        value={productQuantity}
                        onChange={handleProductQuantityChange}
                        required
                        min="1"
                    />
                </div>
                <div className="ImageUploads">
                    {productImages && productImages.map((image, index) => (
                        <div key={index} className="preview-container">
                            {image ? (
                                <img src={image} alt={`Product Image ${index + 1}`} />
                            ) : (
                                <div className="empty-box">No Image</div>
                            )}
                            <div className="image-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                    required
                                />
                                <label>Upload Image {index + 1}</label>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProduct;
