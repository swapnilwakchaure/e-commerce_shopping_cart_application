import ProductList from "@/components/ProductList";

export default function Products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-2">
      <div className="md:col-span-1 bg-gray-100 p-4"> {/* Sidebar */}
        <div className="sticky top-0">
          Sidebar
        </div>
      </div>
      <div className="md:col-span-4 bg-white p-4"> {/* Product List */}
        <ProductList />
      </div>
    </div>
  )
}
