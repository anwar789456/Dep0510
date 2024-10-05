import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import MultiRangeSlider from '../SliderRange/MultiRangeSlider';
const iconAnimation = {
  initial: { opacity: 0, scale: 0.5, rotate: 0 },
  animate: { opacity: 1, scale: 1, rotate: 360 },
  exit: { opacity: 0, scale: 0.5, rotate: 0 },
};
export default function SideNavbar() {
  const [selected, setSelected] = useState(null);
  const [sortingSelected, setSortingSelected] = useState(null);
  const [ascDescSelected, setAscDescSelected] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortbarOpen, setisSortbarOpen] = useState(false);
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    // Implement your search logic here
  };
  const handleRadioChange = (value, group) => {
    if (group === 'availability') {
      setSelected(selected === value ? null : value);
    } else if (group === 'sorting') {
      setSortingSelected(sortingSelected === value ? null : value);
    } else if (group === 'ascdesc') {
      setAscDescSelected(ascDescSelected === value ? null : value);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setisSortbarOpen(false);
  };
  const toggleSortbar = () => {
    setisSortbarOpen(!isSortbarOpen);
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className={styles.filterBar}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isSidebarOpen ? 'times' : 'search'}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={iconAnimation}
            >
              {isSidebarOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width={15} 
                height={15} 
                fill={"none"}
              >
                  <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" 
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" 
                    strokeLinejoin="round" />
              </svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                width={15} 
                height={15} 
                color={"#000000"} 
                fill={"none"}
              >
                <path d="M3 7H6" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 17H9" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 17L21 17" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 7L21 7" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" 
                      stroke="currentColor" strokeWidth=".8" />
                <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" 
                      stroke="currentColor" strokeWidth=".8" />
              </svg>}
            </motion.div>
          </AnimatePresence>
        </button>
        <div className={styles.filterOptions}>
          <div className={styles.filterDiv}>
            <span onClick={toggleSidebar} className={styles.filterText}>Filter</span>
          </div>
          <div className={styles.sortDiv} onClick={toggleSortbar} >
            <svg xmlns="http://www.w3.org/2000/svg" 
              className={styles.sortIcon}
              viewBox="0 0 24 24" 
              width={15} 
              height={16}
              fill="currentColor">
              <path stroke="currentColor" strokeWidth=".3" strokeLinecap="round" strokeLinejoin="round"
                  d="M6 21l4-4H7V3H5v14H2l4 4zM18 3l-4 4h3v14h2V7h3l-4-4z"/>
            </svg>
            <span className={styles.sortText}>Sort</span>
          </div>
        </div>
      </div>
      <div className={`${styles.container} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebar}>
          <div className={styles.listContainer}>
            <div className={styles.headTitle}>
              <h1 className={styles.h1}>Availability</h1>
            </div>
            <div>
              <label className={styles.sidebarLabelContainer}>
                <input type="radio" name="availability" checked={selected === 'all'}
                  onClick={() => handleRadioChange('all', 'availability')} readOnly />
                <span className={styles.checkmark}></span>
                <h1 className={styles.h1Label}>All</h1>
              </label>
              <label className={styles.sidebarLabelContainer}>
                <input type="radio" name="availability" checked={selected === 'inStock'}
                  onClick={() => handleRadioChange('inStock', 'availability')} readOnly />
                <span className={styles.checkmark}></span>
                <h1 className={styles.h1Label}>In Stock</h1>
                <h3 className={styles.inparanthases}>(16)</h3>
              </label>
              <label className={styles.sidebarLabelContainer}>
                <input type="radio" name="availability" checked={selected === 'outOfStock'}
                  onClick={() => handleRadioChange('outOfStock', 'availability')} readOnly />
                <span className={styles.checkmark}></span>
                <h1 className={styles.h1Label}>Out Of Stock</h1>
                (<h3 className={styles.inparanthases}>10</h3>)
              </label>
            </div>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.headTitle}>
              <h1 className={styles.h1}>Price</h1>
            </div>
            <div className={styles.priceRangeContainer}>
              <MultiRangeSlider
                min={0}
                max={3200}
                onChange={({ min, max }) => console.log(`min = ${min}$, max = ${max}$`)}
              />
            </div>
          </div>
          <div className={styles.hiddenSortPart}>
            <div className={styles.listContainer}>
              <div className={styles.headTitle}>
                <h1 className={styles.h1}>Sort</h1>
              </div>
              <div>
                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="sorting" checked={sortingSelected === 'newest'}
                    onClick={() => handleRadioChange('newest', 'sorting')} readOnly />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Newest</h1>
                </label>
                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="sorting" checked={sortingSelected === 'oldest'}
                    onClick={() => handleRadioChange('oldest', 'sorting')} readOnly />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Oldest</h1>
                </label>
                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="ascdesc" checked={ascDescSelected === 'ascending'}
                    onClick={() => handleRadioChange('ascending', 'ascdesc')} readOnly />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Price Ascending ↑</h1>
                </label>
                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="ascdesc" checked={ascDescSelected === 'descending'}
                    onClick={() => handleRadioChange('descending', 'ascdesc')} readOnly />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Price Descending ↓</h1>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.sortbarContainer} ${isSortbarOpen ? styles.open : ''}`}>
        <div className={styles.sortbar}>
          <div className={styles.listContainer}>
              <div className={styles.headTitleSort}>
                <h1 className={styles.h1}>Sort</h1>
                <div className={styles.closeButtonSort} onClick={toggleSortbar}>
                  <svg xmlns="http://www.w3.org/2000/svg"
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
                </div>
              </div>
              <div className={styles.buttonsContainer}>
                <button className={`${styles.sortButton} ${sortingSelected === 'newest' ? styles.active : ''}`}
                  onClick={() => handleRadioChange('newest', 'sorting')}>Newest</button>
                <button className={`${styles.sortButton} ${sortingSelected === 'oldest' ? styles.active : ''}`}
                  onClick={() => handleRadioChange('oldest', 'sorting')}>Oldest</button>
                <button className={`${styles.sortButton} ${ascDescSelected === 'ascending' ? styles.active : ''}`}
                  onClick={() => handleRadioChange('ascending', 'ascdesc')}>Price Ascending ↑</button>
                <button className={`${styles.sortButton} ${ascDescSelected === 'descending' ? styles.active : ''}`}
                  onClick={() => handleRadioChange('descending', 'ascdesc')}>Price Descending ↓</button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}