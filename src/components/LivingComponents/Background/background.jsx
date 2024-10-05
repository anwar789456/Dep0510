'use client';
import { React, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Products from '../Products/Products';
import { fetchProducts } from '../../../api/fetchProducts';

export default function Background() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Step 1: Add loading state

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // Start loading
        const fetchedData = await fetchProducts();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background_container}>
        {loading ? ( // Step 2: Show loading animation
          <div className={styles.loader}></div> 
        ) : ( 
          <Products products={Data} />
        )}
      </div>
    </div>
  );
}
