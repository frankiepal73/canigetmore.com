import api from './api';

export const createCheckoutSession = async (quantity: number) => {
  const { data } = await api.post('/payment/create-checkout-session', { quantity });
  return data;
};

export const getTokenPrices = async () => {
  const prices = [
    { tokens: 5, price: 9.99 },
    { tokens: 10, price: 18.99 },
    { tokens: 25, price: 39.99 },
  ];
  return prices;
};