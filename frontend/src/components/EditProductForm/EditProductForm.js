import React, { useState, useEffect } from "react";
import axios from "../../context/axiosConfig";
import "../AddProducts/AddProducts.css"

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
                setProductName(productData.name);
                setProductPrice(productData.price);
                setProductQuantity(productData.stock);
                setProductDescription(productData.description);
                setProductCategory(productData.category);
                setOriginalCost(productData.cost);
                setID(productData.id);
                // Assuming productImages and imagePreviews are stored in productData
                setProductImages(productData.image);
                setImagePreviews(productData.image);
            })
            .catch(error => {
                console.error("Error fetching product data:", error);
            });
    }, [productId]);

    // console.log(productImages);
    // setImagePreviews(productImages);

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

    const handleEditProduct = async () => {

        let imageUrls = [...productImages];

        for (let i = 0; i < productImages.length; i++) {
            const image = productImages[i];

            if (image && typeof image === 'object') { // Check if it's a File object, which indicates a new image.
                try {
                    const formData = new FormData();
                    formData.append('product', image);

                    const response = await axios.post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    const imageUrl = response.data.image_url;
                    imageUrls[i] = imageUrl; // Replace or add new image URL at the correct index.
                } catch (error) {
                    console.error("Error uploading image:", error.response ? error.response.data : error);
                }
            }
        }

        console.log("All images handled. Image URLs:", imageUrls);

        try {
            console.log(id);
            const response = await axios.put(`/products/updateproduct/${id}`, {
                name: productName,
                price: productPrice,
                description: productDescription,
                image: imageUrls,
                cost: originalCost,
                category: productCategory,
                stock: productQuantity
            });

            alert("Product updated!");
            // Optionally, redirect to product details page or list
        } catch (error) {
            console.error("Error updating product:", error.response ? error.response.data : error);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

    };



    return (
        <div className="AddProductContainer">
            <h2>Edit Product Details</h2>
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
                    <button className="AddProductsButton" type="submit" onClick={handleEditProduct}>Save Changes</button>
                </div>

            </form>
        </div>
    );
};

export default EditProduct;
