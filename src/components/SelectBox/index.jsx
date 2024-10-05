import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./style.module.scss";

const options = [
  { key: "100", label: "T1" },
  { key: "200", label: "T2" },
  { key: "300", label: "T3" },
  { key: "400", label: "T4" },
  { key: "500", label: "T5" },
  { key: "600", label: "T6" },
  { key: "700", label: "T7" },
  { key: "800", label: "T8" },
  { key: "900", label: "T9" },
];

export default function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0) {
        handleSelect(options[focusedIndex]);
      }
    }
  };

  // Define animation variants for the dropdown list
  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [1, 0.29, 0, 0.02],
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [1, 0.29, 0, 0.02],
      },
    }
  };

  return (
    <div className={styles.selectWrapper}>
      
      <div className={styles.selectContainer} ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className={`${styles.selectButton} ${isOpen ? styles.open : ""}`}
        >
          Tarification tissus: {selected ? selected.label : "T1"}
          <span className={styles.arrowIcon}></span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className={styles.selectList}
              onKeyDown={handleKeyDown}
              tabIndex="0"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              {options.map((option, index) => (
                <li
                  key={option.key}
                  className={`${styles.selectItem} ${focusedIndex === index ? styles.focused : ""}`}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
