export function generateShopList(shops) {
    return shops.map(shop => `
  🏍 <b>${shop.name}</b>  
  📍 <i>${shop.address}</i>  
  🔗 <a href="${shop.link}">Перейти</a>  
  ${shop.note ? `💡 <i>${shop.note}</i>` : ''}
  `).join("\n\n");
}
