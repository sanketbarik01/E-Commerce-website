import React, { useState } from 'react'
import "./App.css";
const products = [
  {
  id:1,
  name:'MacBook Pro',
  price:250000,
  stock: 5,
  image:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-select-202410_FMT_WHH?wid=892&hei=820&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3YnRLQTZRakorT3p3YTRUbVA0N3dnbm9kcmNoRkhVQjllNW44R3VXNVFLNm5EL1p1ZmpNaCtMcDhOa3lIZDhWbWhhU2ZYeWJNaHI5aXZSOWk3dEhoQkx6STlJSlZ4M0pKaFh6c2piamliR2k'
  },
  {
  id:2,
  name:'Iphone 16 Pro',
  price:90000,
  stock: 10,
  image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrAPkJr-A83pgKDpNBrRatIXniBLXptZhmZQ&s'
},{
  id:3,
  name:'Iphone Pro Max',
  price:120000,
  stock: 7,
  image:'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309744_0_ht3s5b.png'
},{
  id:4,
  name:'Apple Headphones',
  price:60000,
  stock: 15,
  image:'https://static-01.daraz.com.bd/p/993a45d6be8bb03ee323d2468296f192.jpg'
},
]

const App = () => {
let [cart,setCart] = useState([]);
const addToCart = (product)=>{
  const existing = cart.find(item => item.id === product.id);
  if(existing){
    const updateCart = cart.map(item=>(
      item.id === product.id ? {...item,qty:item.qty+1}:item
    ));
    setCart(updateCart);
  }else{
    setCart([...cart,{...product,qty:1}])
  }
}
const removeOneFromCart = (productId)=>{
  const existing = cart.find(item => item.id === productId);
  if(existing.qty === 1){
    setCart(cart.filter(item=>item.id !== productId))
  }else{
    const updateCart = cart.map(item=>(
      item.id === productId ? {...item,qty:item.qty-1}:item
    ));
    setCart(updateCart);
  }
}
const removeallfromCart = (productId)=>{
  setCart(cart.filter(item=> item.id!== productId));
}

const getTotal = ()=>{
  return cart.reduce((total,item)=>total + item.price * item.qty,0);
}
  return (
    <>
    <h1>Add To Cart</h1>
    <div className='container'>
      <h2><img src="" alt="" />Products</h2>
      <div className='Products'>
        {
          products.map((product)=>{
            return <div
            key={product.id} className='product-card'>
              <img src={product.image} alt={product.name} />
            
            <div>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Available: {product.stock}</p>
              <button onClick={()=>addToCart(product)}>
                Add To Cart
              </button>
            </div>
            </div>
          }
        )
        }
      </div>
      <h2>🛒 Cart</h2>
      {
        cart.length === 0 ? (
          <p className='empty-cart'>Cart is Empty</p>
        ):(
          <div className='cart'>{
            cart.map(item => (
              <div key={item.id} className='cart-item'>
                <span>
                  {item.name} | ₹{item.price} × {item.qty} =
                  <b> ₹{item.price * item.qty}</b>
                </span>
                <div className='cart-buttons'>
                  <button onClick={()=>addToCart(item)}>+</button>
                  <button onClick={()=>removeOneFromCart(item.id)}>-</button>
                  <button onClick={()=>removeallfromCart(item.id)}>x</button>
                </div>
              </div>
            ))
          }
          <h3 className='Total'>Total: ₹{getTotal()}</h3>
          <div className='checkout-container' >
          <button
            onClick={handleCheckout}
            className='checkout-button'
            >Checkout</button>
          </div>

        </div>
        )
      }

    </div>
    </>
  )
}

export default App