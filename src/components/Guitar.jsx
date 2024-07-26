export default function Guitar({ guitar }) {
  const { id, name, image, description, price } = guitar;

  // TODO: COMENZAR CON EL CARRITO

  const handleClick = (guitar) => {
    console.log("Hola", guitar);
  };

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
          onClick={() => handleClick(guitar)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
