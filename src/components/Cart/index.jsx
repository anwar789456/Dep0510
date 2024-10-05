import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { fetchProducts } from '@/api/fetchProducts';

export default function CartContainer({ isOpen, onClose, total }) {
  const cartRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);


  const updateCartTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => {
      const product = cartProducts.find(prod => prod.idProd === item.id);
      return product ? acc + (product.minPrice * item.quantity) : acc;
    }, 0);
    setCartTotal(total);
  };
  useEffect(() => {
    setCartTotal(total);
    const getProducts = async () => {
      try {

        // Fetch all products from your API
        const fetchedData = await fetchProducts(); 
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        // Find the matching products from fetched data based on the IDs in the cart
        const productsInCart = storedCartItems.map((cartItem) => {
          const product = fetchedData.find(prod => prod.idProd === cartItem.id);
          return product ? { ...product, quantity: cartItem.quantity } : null;
        }).filter(item => item !== null); // Remove null items
        setCartProducts(productsInCart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    if (isOpen) {
      getProducts();
    }
  }, [isOpen]);
  useEffect(() => {
    setCartTotal(total);
    if (isOpen) {
      cartRef.current.style.transform = 'translateX(0)';
    } else {
      cartRef.current.style.transform = 'translateX(100%)';
    }
  }, [isOpen]);
  const getProductName = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.nom : 'Unknown Product';
  };
  const getProductPrice = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.minPrice : 'Unknown Product';
  };
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartTotal(updatedCartItems);
  };
  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartTotal(updatedCartItems);
  };
    /*useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedData = await fetchProducts();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);
*/
  // Fetch cart items from localStorage when the cart opens
  /*useEffect(() => {
    if (isOpen) {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
      cartRef.current.style.transform = 'translateX(0)';
    } else {
      cartRef.current.style.transform = 'translateX(100%)';
    }
  }, [isOpen]);*/

  return (
    <div className={styles.cartContainer} ref={cartRef}>
      <div className={styles.headerContainer}>
        <div className={styles.cartTitle}>
          <h1 className={styles.cartH1}>Cart</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={26}
            height={26}
            fill="currentColor"
          >
            <path
              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
              stroke="currentColor"
              strokeWidth=".5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/*

            <div className={styles.cartItems}>
          {cartProducts.map((product) => (
            <div key={product.idProd} className={styles.cartItem}>
              <div className={styles.productDetails}>
                <p className={styles.productName}>{product.nom}</p> 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );*/}
      <div className={styles.cartItemsContainer}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}><p className={styles.emptyCartText}>Your cart is empty.</p></div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <p>{getProductName(item.id)}</p>
                <p>Prix: {getProductPrice(item.id)}</p>

                
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantityController}>
                    <button className={styles.minusButton} onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="12" 
                            height="15" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            >
                            <path d="M5 12h14" />
                        </svg>
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button className={styles.plusButton} onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </button>
                </div>
                <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className={styles.totalPrice}>
              <p className={styles.totalPriceText}>Total:</p>
              <p className={styles.totalPriceTextValue}>
              <span className={styles.tot}>{cartTotal}</span><span className={styles.tndSign}>TND</span>
              </p>
          </div>
        )}
      </div>
    </div>
  );
}