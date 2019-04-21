import getItemService, { ItemService } from '../item-price';
import { slugify } from '../../utils/slugify';
import mockOsbuddyResponse from './__fixtures__/osbuddy-response.json';

jest.mock('node-fetch', () =>
    jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockOsbuddyResponse),
        })
    )
);
import fetch from 'node-fetch';

describe('item price service', () => {
    beforeEach(fetch.mockClear);

    describe('getItemService', () => {
        it('should return an instance of the ItemService', () => {
            expect(getItemService()).toBeInstanceOf(ItemService);
        });

        it('should return the same instance of the service if called twice', () => {
            const service = getItemService();

            expect(getItemService()).toEqual(service);
        });
    });

    describe('ItemService', () => {
        describe('.getItemPrices', () => {
            it('should call updateItemPrices only if no prices are present', async () => {
                const service = new ItemService();
                const updateSpy = jest.spyOn(service, 'updateItemPrices');

                await service.getItemPrices('Dragon hunter lance');

                expect(updateSpy).toHaveBeenCalledTimes(1);

                await service.getItemPrices('Dragon hunter lance');

                expect(updateSpy).toHaveBeenCalledTimes(1);
            });

            it('should be able to get the sell average for a single item', async () => {
                const service = new ItemService();

                const expectedResult = mockOsbuddyResponse['22978'].sell_average;

                const result = await service.getItemPrices('Dragon hunter lance');

                expect(result).toHaveProperty('dragonHunterLance', expectedResult);
            });

            it('should be able to get the sell average for an array of items', async () => {
                const service = new ItemService();

                const expectedResultLance = mockOsbuddyResponse['22978'].sell_average;
                const expectedResultLeather = mockOsbuddyResponse['22983'].sell_average;

                const result = await service.getItemPrices(['Dragon hunter lance', 'Hydra leather']);

                expect(result).toHaveProperty('dragonHunterLance', expectedResultLance);
                expect(result).toHaveProperty('hydraLeather', expectedResultLeather);
            });
        });

        describe('.updateItemPrices', () => {
            it('should set the prices from formatted osbuddy response', async () => {
                const service = new ItemService();

                const item = mockOsbuddyResponse['22978'];

                await service.updateItemPrices();

                const expectedPriceItem = expect.objectContaining({
                    buyAverage: expect.any(Number),
                    buyQuantity: expect.any(Number),
                    sellAverage: expect.any(Number),
                    sellQuantity: expect.any(Number),
                    overallAverage: expect.any(Number),
                    overallQuantity: expect.any(Number),
                });

                expect(fetch).toHaveBeenCalledTimes(1);
                expect(fetch).toHaveBeenCalledWith(service.OSBUDDY_ENDPOINT, { method: 'GET' });

                expect(service.prices).toBeInstanceOf(Object);
                expect(service.prices[slugify(item.name)]).toEqual(expectedPriceItem);
            });
        });
    });
});
