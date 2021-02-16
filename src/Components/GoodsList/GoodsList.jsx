import React, { useState } from 'react';
import { CurrentGood } from '../CurrentGood/CurrentGood';
import '../GoodsList/goodsList.scss';
import { Loader } from '../Loader/Loader';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import PropTypes from 'prop-types';

export const GoodsList = ({data}) => {
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const [windowData, setWindowData] = useState(null);

  const minValue = () => {
    let min = data[0].price;

    for (let i = 0; i < data.length; i++) {
      if (data[i].price < min) {
        min = data[i].price;
        setWindowData(data[i]);
      }
    }
    setIsOpenWindow(true);
  }

  if (data.length === 0) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {isOpenWindow && <ModalWindow data={windowData} reset={setIsOpenWindow} />}
      <div className="goods">
        {
          data.map(item => (
            <CurrentGood
              key={item.id}
              good={item}
              setIsOpen={setIsOpenWindow}
              setData={setWindowData}
            />
          ))
        }
      </div>
      <button
        type="button"
        className="goods__button"
        onClick={minValue}
      >
        Buy cheapest
      </button>
    </>
  );
}

GoodsList.propTypes = {
  data: PropTypes.array.isRequired,
}