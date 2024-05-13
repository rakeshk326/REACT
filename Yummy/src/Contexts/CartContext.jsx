import { createContext, useEffect, useState } from 'react';

export const cartContext = createContext();

const CartContextProvider = (props) => {
    const [count, setCount] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [confirmedItems, setConfirmedItems] = useState([]);

    const addCart = (item) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((prevItem) => prevItem.id === item.id);

            if (existingItem) {
                const updatedCartItems = prevCartItems.map((prevItem) =>
                    prevItem.id === item.id
                        ? { ...prevItem, quantity: prevItem.quantity + 1 }
                        : prevItem
                );
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            } else {
                const newCartItems = [...prevCartItems, { ...item, quantity: 1 }];
                localStorage.setItem('cart', JSON.stringify(newCartItems));
                return newCartItems;
            }
        });
    };

    const removeCart = (item) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((prevItem) => prevItem.id === item.id);

            if (existingItem && existingItem.quantity > 1) {
                const updatedCartItems = prevCartItems.map((prevItem) =>
                    prevItem.id === item.id
                        ? { ...prevItem, quantity: prevItem.quantity - 1 }
                        : prevItem
                );
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            } else {
                const updatedCartItems = prevCartItems.filter((prevItem) => prevItem.id !== item.id);
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            }
        });
    };

    const totalAmount = (item) => {
        const priceWithoutDollar = Number(item.price.replace('$', ''));
        const amount = item.quantity * priceWithoutDollar;
        return amount;
    };

    const confirmOrder = () => {
        const cartItemsCopy = [...cartItems];
        localStorage.setItem('confirmedItems', JSON.stringify(cartItemsCopy));
        setCartItems([]);
        setConfirmedItems(cartItemsCopy);
        localStorage.removeItem('cart');
    };
    
    useEffect(() => {
        const storedConfirmedItems = JSON.parse(localStorage.getItem('confirmedItems')) || [];
        setConfirmedItems(storedConfirmedItems);
    }, []);      
    

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        const details = JSON.parse(localStorage.getItem('userData')) || {};
        setUserDetails(details);
    }, []);

    useEffect(() => {
        const uniqueItems = new Set();

        cartItems.forEach((item) => {
            if (item.quantity > 0) {
                uniqueItems.add(item.id);
            }
        });

        setCount(uniqueItems.size);
    }, [cartItems]);

    return (
        <cartContext.Provider value={{ count, cartItems, confirmedItems, addCart, removeCart, totalAmount, userDetails, confirmOrder }}>
            {props.children}
        </cartContext.Provider>
    );
};

export default CartContextProvider;