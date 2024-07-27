import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import { useCart } from "./hooks/useCart.js";

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

  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              //OBJETO
              guitar={guitar}
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
