const products = [
    {
        id:'redshoe',
        description:' Red Shoe',
        price: 42.12,
        reviews:[]
    },
    {
        id:'bluejean',
        description:'Blue Jeans',
        price: 45.16,
        reviews:[]
    }
]
function getAllProducts(){
    return products;
}

function getProductsByPrice(min,max){
    return products.filter((product) =>{
        return product.price >= min && product.price <= max
    })
}

function addNewProduct(id, description, price){
    const newProduct = {
        id,
        description,
        price,
        reviews:[]
    }

    products.push(newProduct);
    return newProduct;
}

function addNewProductReview(id,rating,comment){
    const selectedProduct = products.find((product) =>{
        return product.id === id
    })
    if(selectedProduct){
        const newReview = {
            rating,
            comment
        }
        selectedProduct.reviews.push(newReview)
        return newReview
    }
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    addNewProduct,
    addNewProductReview
}