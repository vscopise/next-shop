import { Product } from "@/interfaces";

export const getProductPrice = (product: Product) => {
  switch (product.type) {
    case "simple":
      if(product.on_sale) {
       // return 'simple oferta';
        return `<div>$${product.sale_price}</div>-<div class="text-gray-500 line-through">$${product.price}</div>`
      } else {
        return `<div class="font-bold">$${product.price}</div>`;
      }
    case "variable":
      return 'variable';
    case "grouped":
      return 'grouped';
    case "external":
      return 'external';
    default:
      return '';
  }
}