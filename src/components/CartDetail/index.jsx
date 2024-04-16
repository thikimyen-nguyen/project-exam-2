// import { Link } from "react-router-dom";
// import { PrimaryButton, SecondaryButton } from "../Buttons";
// import useProductsStore from "../../store/products";

// function CartItem({
//   product: { id, title, discountedPrice, image, price, quantity },
// }) {
//   return (
//     <div className="flex m-3 ">
//       <div className="h-24 w-24 object-cover object-center p-2">
//         <img
//           src={image.url}
//           alt={title}
//           className="h-full w-full object-cover object-center"
//         />
//       </div>

//       <div className="flex grow justify-between p-2">
//         <p className="flex-1">{title}</p>
//         <div className="flex flex-1">
//           <p className="flex-1">x {quantity}</p>
//           <p className="flex-1 text-right">Nok {discountedPrice}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function CartDetail() {
//   const cart = JSON.parse(localStorage.getItem("cart"));
//   const { getTotalPrice, clearCart } = useProductsStore();
//   function handleCheckout() {
//     clearCart();
//   }
//   function handleClearCart() {
//     clearCart();
//   }
//   return (
//     <div className="w-full md:w-3/4 xl:w-1/2 m-auto">
//       <h1 className="text-center">Your Cart</h1>
//       <div className="text-end">
//         {cart && (
//           <button
//             onClick={handleClearCart}
//             className="border border-primary text-red bg-white text-sm rounded py-1 px-2"
//           >
//             Remove All
//           </button>
//         )}
//       </div>
//       <div className="flex-col divide-y divide-primary mb-5">
//         {cart?.map((product) => (
//           <CartItem product={product} key={product.id} />
//         ))}
//         <div className="flex items-center text-xl text-primary text-end my-5 ">
//           <p className="text-xl flex-1 my-5">Total:</p>
//           <p className="flex-1 my-5">Nok {getTotalPrice()}</p>
//         </div>
//       </div>
//       {cart && (
//         <div className="text-center">
//           <Link to="/">
//             <SecondaryButton label="Shop More" />
//           </Link>
//           <Link to="/checkoutSuccess">
//             <PrimaryButton label="Check Out" onClick={handleCheckout} />
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
