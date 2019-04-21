import fetch from 'node-fetch';

import { slugify, unslugify } from '../utils/slugify';

let _itemService;

export class ItemService {
    OSBUDDY_ENDPOINT = 'https://storage.googleapis.com/osbuddy-exchange/summary.json';
    prices = null;

    async getItemPrices(items) {
        const itemSlugs = (Array.isArray(items) ? items : [items]).map(slugify);

        if (!this.prices) {
            await this.updateItemPrices();
        }

        return itemSlugs.reduce((acc, itemSlug) => {
            const { sellAverage } = this.prices[itemSlug];
            acc[unslugify(itemSlug)] = sellAverage;

            return acc;
        }, {});
    }

    async updateItemPrices() {
        const osbuddyPrices = await fetch(this.OSBUDDY_ENDPOINT, { method: 'GET' }).then(res => res.json());

        this.prices = Object.values(osbuddyPrices).reduce((acc, item) => {
            const {
                name,
                buy_average,
                buy_quantity,
                sell_average,
                sell_quantity,
                overall_average,
                overall_quantity,
            } = item;

            acc[slugify(name)] = {
                buyAverage: buy_average,
                buyQuantity: buy_quantity,
                sellAverage: sell_average,
                sellQuantity: sell_quantity,
                overallAverage: overall_average,
                overallQuantity: overall_quantity,
            };

            return acc;
        }, {});
    }
}

const getItemService = () => {
    if (!_itemService) {
        _itemService = new ItemService();
    }

    return _itemService;
};

export default getItemService;
