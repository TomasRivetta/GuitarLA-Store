import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import { db } from "./data/db.js";

function App() {
  //State
  //   const [auth, setAuth] = useState([]);
  //   //   const [total, setTotal] = useState(0);
  //   //   const [carrito, setCarrito] = useState(0);

  //Effect
  //     useEffect(() => {
  //       if (auth) {
  //           console.log("Autenticado");
  //       }
  //       console.log("Componente Listo");

  //     }, [auth]);

  //     setTimeout( () => {
  //         setAuth(true)
  //     },3000)

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db);

  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;

  const MAX_ITEMS = 5;

  // CADA VEZ QUE CAMBIA EL CART QUIERO QUE PASE TAL COSA
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    // Verificar si el item existe
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      // Existe el elemento

      //PARA QUE NO SUPERE LA CANTIDAD, CUANDO PRECIONO AGREGAR AL CARRITO
      if (cart[itemExists].quantity >= MAX_ITEMS) return;

      //copia del carrito, ya que hay que respetar la regla d e inmutabilidad
      const updateCart = [...cart];

      //aumentamos la cantidad
      updateCart[itemExists].quantity++;

      // Seteamos la cantidad
      setCart(updateCart);
    } else {
      //No existe, inicializo su cantidad en 1
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        // retorno copia del elemento
        return {
          // PARA MANTENER TODO LO ANTERIOR DEL PRODUCTO NORMAL
          ...item,
          // MODIFICANDO CANTIDAD
          quantity: item.quantity - 1,
        };
      }
      // PARA QUE ME MANTENGA LOS OTROS ELEMENTOS DONDE NO DI CLICK
      return item;
    });

    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          // PARA MANTENER TODO LO ANTERIOR DEL PRODUCTO NORMAL
          ...item,
          // MODIFICANDO CANTIDAD
          quantity: item.quantity + 1,
        };
      }
      // PARA QUE ME MANTENGA LOS OTROS ELEMENTOS DONDE NO DI CLICK
      return item;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    // SETEAMOS UN NUEVO CARRITO VACIO
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              //cart={cart}
              //setCart={setCart}

              //PARA QUE CADA ELEMENTO TENGA LA FUNCION
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
