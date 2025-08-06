export const formatNumber = (number,digitos) => {
  const localeDefault = 'en-US'

  const options = {
    minimumFractionDigits: digitos || 2,
  }

  //if (typeof number !== 'number' || isNaN(number)) return '0.00';
  return new Intl.NumberFormat(localeDefault, options).format(number)
}