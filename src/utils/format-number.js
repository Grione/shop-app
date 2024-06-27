function formatPrice(num) {
  const totalFixed = new Intl.NumberFormat('en-US',
    {
      style: "currency",
      currency: "EUR"
    }
  ).format((+num).toFixed(2));

  return totalFixed;
}

export default formatPrice; 