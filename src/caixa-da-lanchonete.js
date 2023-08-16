import { menu, } from './data'
import { validateRules } from './services.js';

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const itemQuantities = {};
        let total = 0;
        
        const validationResult = validateRules(metodoDePagamento, itens);

        if (validationResult) return validationResult;

        for (const itemInfo of itens) {
            const [itemName, quantity] = itemInfo.split(',');
            const item = menu[itemName];
            const itemValue = item.valor * parseInt(quantity);
            total += itemValue;
            itemQuantities[itemName] = (itemQuantities[itemName] || 0) + parseInt(quantity);
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
