import React, { useEffect, useState } from 'react';
import ProductCard from '../LivingComponents/Products/ProductCard';
import styles from './style.module.scss'
import Link from 'next/link';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

const RecommendedProducts = ({ productCategorie, allProducts }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    // i will find the products with the categorie and limit to 4 products
    const filteredProducts = allProducts.filter(product => product.categorie === productCategorie);
    setRecommendedProducts(filteredProducts);
  }, [productCategorie, allProducts]);

  return (
    <div className={styles.recommendedProductsContainer}>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>You may also like</h2> {/*You may also like */}
      </div>
      <Swiper
        className={styles.swiperContainer}
        centeredSlides={true}
        slidesPerView={2}
        spaceBetween={15}
        freeMode={true}

        modules={[FreeMode]}
        breakpoints={{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          '@0.75': {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          '@1.00': {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          '@1.50': {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        >
        {recommendedProducts.map(product => (
          <SwiperSlide key={product.idProd} className={styles.swiperSlide}>
            <div className={styles.productCard}>
              <Link href={`/ProductPage/${product.idProd}`} className={styles.linkContainer}>
                {/*<ProductCard
                  image={product.images[0]?.img}
                  title={product.nom}
                  description={product.description}
                  imageObject = {[]}
                  priceMin={product.minPrice}
                  priceMax={product.maxPrice}
                  categorie={product.categorie}
                />*/}

              <Image
                  src={product.images[0]?.img}  
                  alt={product.nom} width={600} height={600}
                  className={styles.productImage}
                />
                {/* Product name */}
                <h3 className={styles.productName}>{product.nom}</h3> 
                <p className={styles.productPrice}>
                  {/* Product price range */}
                  {product.minPrice === product.maxPrice
                    ? `$${product.minPrice}`
                    : `$${product.minPrice} - $${product.maxPrice}`}
                </p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedProducts;
