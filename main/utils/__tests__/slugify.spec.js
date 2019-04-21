import { slugify, unslugify } from '../slugify';

describe('slugify', () => {
    it('should properly slugify items', () => {
        expect(slugify("Greenman's ale")).toEqual('greenmans-ale');
        expect(slugify('Black platebody (g)')).toEqual('black-platebody-g');
        expect(slugify('BODY RUNE')).toEqual('body-rune');
    });
});

describe('unslugify', () => {
    it('should properly unslugify items ', () => {
        expect(unslugify('black-platebody-g')).toEqual('blackPlatebodyG');
        expect(unslugify('body-rune')).toEqual('bodyRune');
    });
});
