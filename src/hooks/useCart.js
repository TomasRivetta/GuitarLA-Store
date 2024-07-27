import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db.js";

export const useCart = () => {


    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);

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


    // State Derivado //UseMemo cada vez que cart cambie
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    //           un acumulado, cada item, el acumulado mas la cantidad multiplicada por el precio, y que el total inicialice en 0
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );


    return {
        data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal
    }

}
