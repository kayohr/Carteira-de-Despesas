const ECONOMY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getEconomy = async () => {
  const response = await fetch(ECONOMY_BASE_API);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
// console.log(ECONOMY_BASE_API);

export default getEconomy;
