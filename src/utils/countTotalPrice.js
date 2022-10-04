export const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => {
    return obj.discount_percent
      ? (obj.base_price -
          (obj.base_price * obj.discount_percent.slice(0, -3)) / 100) *
          obj.qty +
          sum
      : obj.base_price * obj.qty + sum;
  }, 0);
};
