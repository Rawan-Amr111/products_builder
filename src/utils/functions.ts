/**
 *
 * @param {string}text  -the input text to be sliced
 * @param {number}[limit=50]  -the max length before truncation
 * @returns {string} the sliced text
 */
export function txtSlicer(text: string, limit: number = 50) {
  if (text.length >= limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
}

export function formatPrice(priceStr: string) {
  const cleanStr = priceStr.toString().replace(/\s/g, "");
  const formatted = cleanStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${formatted}`;
}
