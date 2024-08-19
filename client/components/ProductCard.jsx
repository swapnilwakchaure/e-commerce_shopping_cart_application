import ImageWrapper from "./ImageWrapper";

export default function ProductCard ({ brand, highprice, img1, img2, img3, img4, lowprice, name, rating }) {

    // async function handleCart () {
    //     console.log('cart');
    // }

    const handleCart = () => {
        console.log('cart page');
    }

    return (
        <div>
            <ImageWrapper img1={img1} img2={img2} img3={img3} img4={img4} />
            <p>{name}</p>
            <p>{lowprice}</p>
            <p>{rating}</p>
            <button onClick={handleCart}>Add to cart</button>
        </div>
    )
}