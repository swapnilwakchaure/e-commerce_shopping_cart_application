"use client";

import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

export default function ProductList() {
    const { products, fetchProducts, loading, error, success } = useProductStore();

    useEffect(() => {
        if (fetchProducts) {
            fetchProducts();
        }
    }, [fetchProducts]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.length && products?.map((el) => (
                <ProductCard key={el._id} brand={el.brand} highprice={el.highprice} img1={el.img1} img2={el.img2} img3={el.img3} img4={el.img4} lowprice={el.lowprice} name={el.name} rating={el.rating} />
            ))}
        </div>
    )
}