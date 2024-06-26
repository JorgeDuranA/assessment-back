export const formatCurrency = (
  amount: number,
  withoutCurrency = true,
  locale = 'en-US',
  currency = 'USD',
): string => {
  if (withoutCurrency) {
    const newAmount = truncateNumberDecimals(amount, 2);
    return newAmount
      .toLocaleString(locale, { style: 'currency', currency })
      .replace('$', '');
  } else {
    return amount.toLocaleString(locale, { style: 'currency', currency });
  }
};

export const truncateNumberDecimals = (
  num: number,
  decimals: number,
): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.floor(num * multiplier) / multiplier;
};
