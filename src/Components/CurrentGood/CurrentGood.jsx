import React from 'react';
import '../CurrentGood/currentGood.scss';
import PropTypes from 'prop-types';

export const CurrentGood = ({good, setIsOpen, setData}) => {

  return (
    <div className="good">
      <p className="good__category">{good.category}</p>
      <h3 className="good__name">{good.name}</h3>

      <div className="good__container">
        <p className="good__price">
          <span className="good__icon">$</span>
          {good.price}
        </p>
        <button
          type="button"
          className="good__button"
          onClick={() => {
            setIsOpen(true)
            setData(good)
          }}
        >
          buy
        </button>
      </div>
    </div>
  );
}

CurrentGood.propTypes = {
  good: PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
}
