import React, { useState } from 'react';
import '../ModalWindow/modalWindow.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const ModalWindow = ({data, reset}) => {
  const [queryName, setQueryName] = useState('');
  const [queryNumber, setQueryNumber] = useState('');
  const [isNameCorrect, setIsNameCorrect] = useState(false);
  const [isNumberCorrect, setIsNumberCorrect] = useState(false);
  const [isLengthCorrect, setIsLengthCorrect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!isNameCorrect && !isNumberCorrect && !isLengthCorrect) {
      console.log({
        Name: queryName,
        Number: queryNumber,
      })
      setQueryName('');
      setQueryNumber('');
    }
  }

  const handleChangeName = (event) => {
    setQueryName(event.target.value);

    setIsNameCorrect(false);
  }

  const handleBlurName = () => {
    const regexString = /^[A-Za-z\s]+$/;

    if(!queryName.match(regexString)) {
      setIsNameCorrect(true);
    }
  }

  const handleChangeNumber = (event) => {
    setQueryNumber(event.target.value);

    setIsNumberCorrect(false);
    setIsLengthCorrect(false);
  }

  const handleBlurNumber = () => {
    const regexNumber = /^[0-9]*$/;

    if(!queryNumber.match(regexNumber)) {
      setIsNumberCorrect(true);
    }

    if(queryNumber.length !== 12) {
      setIsLengthCorrect(true)
    }
  }

  return (
    <div className="window">
      <div className="window__container">
        <button
          type="button"
          className="window__button"
          onClick={() => reset(false)}
        >
          X
        </button>

        <div className="window__info">
          <p className="window__category">{data.category}</p>
          <h3 className="window__name">{data.name}</h3>
          <p className="window__price">
            <span className="window__icon">$</span>
            {data.price}
          </p>
        </div>

        <div className="window__submit">
          <form
            onSubmit={handleSubmit}
            className="window__form"
          >
            <input
              type="text"
              className={classNames(
                'window__input',
                {
                  'window__input-error': isNameCorrect,
                  'window__input-correct': !isNameCorrect && queryName.length,
                }
              )}
              placeholder="Name"
              value={queryName}
              onChange={handleChangeName}
              onBlur={handleBlurName}
              required
            />
            {isNameCorrect && (
              <p className="window__error">Only letters allowed</p>
            )}
            <input
              type="tel"
              className={classNames(
                'window__input',
                {
                  'window__input-error': isNumberCorrect || isLengthCorrect,
                  'window__input-correct': !isNumberCorrect && !isLengthCorrect && queryNumber,
                }
              )}
              placeholder="Number"
              value={queryNumber}
              onChange={handleChangeNumber}
              onBlur={handleBlurNumber}
              maxLength='12'
              required
            />
            {isNumberCorrect && (
              <p className="window__error">Only numbers allowed</p>
            )}
            {isLengthCorrect && (
              <p className="window__error">
                Should contain 12 characters
                {' '}
                {queryNumber.length}/12
              </p>
            )
            }
            <button
              type="submit"
              className="window__order"
            >
              Order
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  data: PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    reset: PropTypes.func.isRequired,
}
