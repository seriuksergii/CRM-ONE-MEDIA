import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Dropdown.module.scss';

const menuItems = [
  { id: 'ad-spend', label: 'Ad Spend', icon: 'icon-wallet' },
  { id: 'impressions', label: 'Impressions', icon: 'icon-impressions' },
  { id: 'ctr', label: 'CTR', icon: 'icon-ctr' },
  { id: 'cpc', label: 'CPC', icon: 'icon-cpc' },
  { id: 'cpm', label: 'CPM', icon: 'icon-cpm' },
  { id: 'profit', label: 'Profit', icon: 'icon-profit' },
];

const Dropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const menuRef = useRef();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleSelect = useCallback(
    (item) => {
      setSelectedItem(item);
      onSelect?.(item);
      setIsOpen(false);
      console.log('Selected:', item.label);
    },
    [onSelect]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={styles.dropdown__button}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className={styles.dropdown__icon} width="16" height="17">
          <use href="/sprite.svg#icon-timeline" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown__menu} role="menu">
          <ul className={styles.dropdown__list}>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`${styles.dropdown__item} ${
                  selectedItem?.id === item.id
                    ? styles['dropdown__item--selected']
                    : ''
                }`}
                onClick={() => handleSelect(item)}
                role="menuitem"
              >
                <svg
                  className={styles.dropdown__itemIcon}
                  width="16"
                  height="16"
                >
                  <use href={`/sprite.svg#${item.icon}`} />
                </svg>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
