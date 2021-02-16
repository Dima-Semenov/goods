import React, { useEffect, useState } from 'react';
import { getInfo } from './api';
import './App.scss';
import { GoodsList } from './Components/GoodsList/GoodsList';

export function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInfo()
      .then(result => setData(
        result.map((item, index) => ({
            ...item,
            id: index + 1,
          })
        )
      ));

  }, [])

  return (
    <div className="App">
      <GoodsList data={data} />
    </div>
  );
}
