import getLevelByExp from '../get-level-by-exp';

describe('getLevelByExp', () => {
    it('should be able to properly determine a level by exp amount', () => {
        const level1Exp = 70;
        const level50Exp = 101333;
        const level99Exp = 13034431;

        expect(getLevelByExp(level1Exp)).toEqual(1);
        expect(getLevelByExp(level50Exp - 1)).toEqual(49);
        expect(getLevelByExp(level50Exp)).toEqual(50);
        expect(getLevelByExp(level99Exp - 1)).toEqual(98);
        expect(getLevelByExp(level99Exp)).toEqual(99);
    });
});
