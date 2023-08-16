import { paymentsType, menu } from "./data";

export function validateRules(metodoDePagamento, itens) {
  if (!paymentsType.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
  }

  if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
  }

  for (const itemInfo of itens) {
      const [itemName, quantity] = itemInfo.split(',');
      const item = menu[itemName];

      if (!item) {
          return "Item inválido!"
      };
      
      if (parseInt(quantity) <= 0) {
        return "Quantidade inválida!"
      };
      
      if (!item.principal && (itemName === "chantily" || itemName === "queijo")) {
          const requiredPrincipal = 
              itemName === "chantily" 
                  ? "cafe" 
                  : "sanduiche";

          const hasPrincipal = itens.some(item => item.startsWith(requiredPrincipal));

          if (!hasPrincipal) {
              return `Item extra não pode ser pedido sem o principal`
          };
      }
  }

  return null;
};