import { Fragment, useEffect, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";
import { getProduct } from "../services/product,service";

// rendering list

const email = localStorage.getItem("email");
const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState([0]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);
  useEffect(() => {
    getProduct((data) => {
      setProducts(data);
    });
  }, []);
  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);
  // event handler
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { id: item.id, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
        {email}
        <Button classname="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5">
        <div className="w-4/6 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <CardProduct key={product.id}>
                  <CardProduct.Header image={product.image} />
                  <CardProduct.Body name={product.title}>
                    {product.description}
                  </CardProduct.Body>
                  <CardProduct.Footer
                    price={product.price}
                    id={product.id}
                    handleAddToCart={handleAddToCart}
                  />
                </CardProduct>
              );
            })}
        </div>
        <div className="w-2/6">
          <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2 mr-5">
            Cart
          </h1>

          <table className="text-left table-auto border-slate-300 ">
            <thead>
              <tr>
                <th className="bg-blue-600 text-white px-5">Product</th>
                <th className="bg-blue-600 text-white px-5">Price</th>
                <th className="bg-blue-600 text-white px-5">Qty</th>
                <th className="bg-blue-600 text-white px-5 mr-3">Total</th>
              </tr>
            </thead>

            <tbody className="bg-slate-100">
              {products.length > 0 &&
                cart.map((item) => {
                  const newLocal = {
                    styles: "currency",
                    currency: "USD",
                  };
                  if (item.id > 0) {
                    const product = products.find((p) => p.id === item.id);
                    return (
                      <tr key={item.id}>
                        <td className="px-5">
                          {product.title.substring(0, 10)}...
                        </td>
                        <td className="px-7">
                          ${" "}
                          {product.price.toLocaleString("id-ID", {
                            newLocal,
                          })}
                        </td>
                        <td className="px-7">{item.qty}</td>
                        <td className="px-7">
                          ${" "}
                          {(item.qty * product.price).toLocaleString(
                            "id-ID",
                            newLocal
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              <tr>
                <td colSpan={3} className="px-5">
                  {" "}
                  <b>Total Price</b>
                </td>

                <td>
                  <b>
                    ${" "}
                    {totalPrice.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "USD",
                    })}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default ProductsPage;
