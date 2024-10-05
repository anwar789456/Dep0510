"use client";
import SelectBox from '@/components/SelectBox';
import Footer from '@/components/NewFooter/Footer';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleVariants } from './anim.js'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './ProductPage.module.scss';
import Accordion from '@/components/ProductPageComponents/Accordion';
//import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Use react-icons
import { fetchProducts } from '../../../api/fetchProducts';
import RecentProductsClicked from '@/components/LivingComponents/RecentProductsClicked';
import RecommendedProducts from '@/components/RecommendationSystem';
import Link from 'next/link';
const ProductPage = ({ params }) => {
  const [recommendedProductsCategory, setRecommendedProductsCategory] = useState('');
  const [data, setData] = useState([]);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showTooltips, setShowTooltips] = useState(false);
  const [selectedImageIndexCarousel, setSelectedImageIndexCarousel] = useState(0);

  useEffect(() => {
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

  useEffect(() => {
    if (params.id) {
      const productData = data.find((item) => item.idProd === params.id);
      if (productData) {
        setProduct(productData);
        setRecommendedProductsCategory(productData.categorie.trim());
        setMainImage(productData.images[0].img);
        setSelectedImageIndex(0);
      }
    }
  }, [params.id, data]);

  const handleAddToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = existingCartItems.findIndex(item => item.id === params.id);
    if (existingProductIndex !== -1) {
      existingCartItems[existingProductIndex].quantity += quantity;
    } else {
      existingCartItems.push({ id: params.id, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    // Emit custom event to notify that cart has been updated
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };




  const handlePrev = () => {
    setSelectedImageIndexCarousel((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndexCarousel((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setSelectedImageIndexCarousel(index);
  };
  
  

  const handleImageClick = (img, index) => {
    setMainImage(img);
    setSelectedImageIndex(index);
  };
  const handlePrevImage = () => {
    if (selectedImageIndex > 0) { 
      const prevIndex = selectedImageIndex - 1;
      setMainImage(product.images[prevIndex].img);
      setSelectedImageIndex(prevIndex);
    }
  };
  const handleNextImage = () => {
    if (selectedImageIndex < product.images.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setMainImage(product.images[nextIndex].img);
      setSelectedImageIndex(nextIndex);
    }
  };
  const handleMainImageClick = () => {
    setShowTooltips((prevState) => !prevState);
  };
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  if (!product) return <div>Loading...</div>;

  const renderTooltips = (hyperPoints, showTooltips) => {
    return (
      <AnimatePresence>
        {showTooltips &&
          hyperPoints.map((point, index) => (
            <motion.div
              key={index}
              className={styles.tooltipBox}
              style={{
                top: `calc(${point.posY}% + 10px)`,
                left: `calc(${point.posX}% - 20px)`,
              }}
              variants={scaleVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className={styles.tooltipContent}>
                <Link href={`/ProductPage/${point.produitID}`}>
                  <p className={styles.productName}>
                    {data.find((item) => item.idProd === point.produitID)?.nom}
                  </p>
                </Link>
              </div>
              <div className={styles.tooltipTriangle}></div>
            </motion.div>
          ))}
      </AnimatePresence>
    );
  };

  return (
    <>
      <Header sticky={true} />
      <div className={styles.productPage}>
        <div className={styles.imageGallery}>
          {/*<button className={styles.arrowButtonUp} 
                  onClick={handlePrevImage} 
                  disabled={selectedImageIndex === 0}>
            <FaChevronUp />
          </button>*/}
          <div className={styles.scrollImages} style={{ position: 'relative' }}>
            {product.images.map((img, index) => (
              <div key={index} 
                className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.selected : ''}`}
                onClick={() => handleImageClick(img.img, index)} 
                style={{ position: 'relative' }}
              >
                <Image 
                  className={styles.image} 
                  src={img.img} 
                  alt={`${product.nom} image ${index + 1}`} 
                  width={100} 
                  height={100} 
                  layout="responsive"
                />
              </div>
            ))}
          </div>
          {/*<button 
              className={styles.arrowButtonDown} 
              onClick={handleNextImage} 
              disabled={selectedImageIndex === product.images.length - 1}
            >
                <FaChevronDown />
          </button>*/}
        </div>

        <motion.div
          key={mainImage}
          className={styles.mainImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleMainImageClick}
        >
          <div className={styles.mainImageWrapper} style={{ position: 'relative' }}>
            <Image
              src={mainImage}
              alt={product.nom}
              width={500}
              height={500}
              layout="responsive"
            />
            
              {renderTooltips(product.images[selectedImageIndex].hyperPoints, showTooltips)}
          </div>
        </motion.div>




        <div className={styles.carouselContainer}>
          <div className={styles.barClick}>
            <p className={styles.barClicktext}>clicker sur la photo</p>
          </div>
          <div className={styles.imageCarousel} onClick={handleMainImageClick}>
            <Carousel 
              selectedItem={selectedImageIndexCarousel} 
              showArrows={false} 
              showIndicators={false} 
              showStatus={false}
              swipeable={true}
              emulateTouch={true}
              onChange={(index) => setSelectedImageIndexCarousel(index)}
            >
              {product.images.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <Image
                    src={img.img}
                    alt={`${product.nom} image ${index + 1}`} 
                    width={500} 
                    height={500} 
                    layout="responsive"
                  />
                  {renderTooltips(product.images[selectedImageIndexCarousel].hyperPoints, showTooltips)}
                </div>
              ))}
            </Carousel>

            <div className={styles.controlsContainer}>
            <button className={styles.arrow} onClick={handlePrev}>
              <span className={styles.leftArrow}></span>
            </button>
              {/* Pagination Dots */}
              <div className={styles.paginationDots}>
                {product.images.map((_, index) => (
                  <span 
                    key={index} 
                    className={`${styles.dot} ${index === selectedImageIndexCarousel ? styles.active : ''}`} 
                    onClick={() => handleDotClick(index)} // Dot click handler
                  />
                ))}
              </div>
              <button className={styles.arrow} onClick={handleNext}>
                <span className={styles.rightArrow}></span>
              </button>

            </div>

          </div>
        </div>

        <div className={styles.productDetails}>
          <div className={styles.Productinfos}>
            <div className={styles.titleDiv}>
              <h1 className={styles.titleInfo}>{product.nom}</h1>
            </div>
            
            <div className={styles.priceDiv}>{product.minPrice === product.maxPrice ? (
              <p className={styles.priceInfo}><span className={styles.fromPrice}>from</span><span className={styles.minmaxPrice}>{product.minPrice}</span><span className={styles.tnworddesign}>TND</span>{/*<span className={styles.tndsign}></span>*/}</p>) : (
                <p className={styles.priceInfo}>
                  <span className={styles.fromPrice}>From</span>
                  <span className={styles.minmaxPrice}>{product.minPrice}</span><span className={styles.tnworddesign}>TND</span>{/*<span className={styles.tndsign}></span>*/}
                  {/*<span className={styles.minmaxPrice}>{product.maxPrice}</span><span className={styles.tnworddesign}>TN</span><span className={styles.tndsign}></span>*/}
                </p>
              )}
            </div>
          </div>

          <div className={styles.Description}>
            <p className={styles.DescriptionP}>{product.description}</p>
          </div>

          <SelectBox />

          <div className={styles.FullquantityDiv}>
            <div className={styles.quantityController}>
              <div className={styles.minusDiv} onClick={decreaseQuantity}>
                <button className={styles.quantityBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.minusIcon}
                      width="18" 
                      height="18" 
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
              </div>
              <div className={styles.quantityDiv}>
                <span className={styles.quantityDisplay}>{quantity}</span>
              </div>
              <div className={styles.plusDiv} onClick={increaseQuantity}>
                <button className={styles.quantityBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.plusIcon}
                      width="18" 
                      height="18" 
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
            </div>
          </div>
          <div className={styles.addToCart}>
            <button className={styles.addToCartBTN} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
          <div className={styles.AccordionDiv}>
            <Accordion />
          </div>
        </div>
      </div>
      <RecentProductsClicked />
      <RecommendedProducts productCategorie={recommendedProductsCategory} allProducts={data} />
      <Footer />
    </>
  );
};
export default ProductPage;