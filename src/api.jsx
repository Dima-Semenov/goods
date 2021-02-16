const MAIN_URL = 'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e';

const request = () => {
  return fetch(`${MAIN_URL}`)
    .then(response => {
      if (response.ok) {

        return response.json();
      }

    // eslint-disable-next-line no-throw-literal
    throw `${response.status} - ${response.statusText}`
  });
};

export const getInfo = () => {
  return request();
}