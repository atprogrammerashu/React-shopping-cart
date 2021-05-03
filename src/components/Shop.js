import React from "react";

const items = [
  {
    id: 1,
    name: "Indian watch",
    price: 25,
  },
  {
    id: 2,
    name: "USA watch",
    price: 20,
  },
  {
    id: 3,
    name: "China watch",
    price: 10,
  },
];

const Shop = () => {
  const [cart, setCart] = React.useState([]);
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);
  /* The reduce() method reduces the array to a single value.

The reduce() method executes a provided function for each value of the array (from left-to-right).

The return value of the function is stored in an accumulator (result/total).

Note: reduce() does not execute the function for array elements without values.

Note: This method does not change the original array.*/

  const addToCart = (item) => setCart((currentCart) => [...currentCart, item]); // setcart me ek duplicate array banya work karne ke liye ..

  //To remove element of item element
  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (indexOfItemToRemove === -1) {
        // minus me na chalejaye elements uss case ko handle kiya h ...
        return currentCart;
      }

      return [
        // spread operator ke through element alag kiya h jise original array ko effect na padhe ..
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  // yaha hamare pass kitne element item array me h..
  const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

  // yaha array ke sare element show kiya purcahse karne ke liye ..
  const listItemsToBuy = () =>
    items.map((item) => (
      <div key={item.id}>
        {`${item.name}: $${item.price}`}
        <button type="submit" onClick={() => addToCart(item)}>
          Add
        </button>
      </div>
    ));
  // calculation of items..
  const listItemsInCart = () =>
    items.map((item) => (
      <div key={item.id}>
        ({amountOfItems(item.id)} x ${item.price}) {`${item.name}`}
        <button type="submit" onClick={() => removeFromCart(item)}>
          Remove
        </button>
      </div>
    ));

  return (
    <div>
      STORE
      <div>{listItemsToBuy()}</div>
      <div>CART</div>
      <div>{listItemsInCart()}</div>
      <div>Total: ${cartTotal}</div>
      <div>
        <button onClick={() => setCart([])}>Clear</button>
        {/* yaha hamne blank
        araay bhej diya elemnt 0 karne ke liye lekin original array me koi
        effect nhi hoga kyoki yeh state manage ki h.. */}
      </div>
    </div>
  );
};

export default Shop;
