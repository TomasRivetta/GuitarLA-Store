export default function Guitar({ id, guitar,addToCart }) {
  const { name, image, description, price } = guitar;

  //PRIMER FORMA DE MODIIFICAR EL STATE
  // const handleClick = (guitar) => {
  //   setCart([...cart, guitar]);
  // };

  //AGREGAR GUITARRAS AL CARRITO

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center" id={`${id}`}>
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>

        <button
          type="button"
          className="btn btn-dark w-100"
          //AGREGAR GUITARRA AL CARRITO

          //PRIMER FORMA
          //onClick={() => handleClick(guitar)}

          //SEGUNDA FORMA
          //            has una copia de cart y insertale guitar
          //onClick={() => setCart([...cart, guitar])}

          //TERCER FORMA
          //onClick={() => setCart((prevCart) => [...prevCart, guitar])}

          //FORMA CORRECTA PARA AÑADIR ELEMENTO AL CARRITO
          onClick={() => addToCart(guitar)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
