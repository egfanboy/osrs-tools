/**
 * Formula floor((SUM (1 to level - 1) -> floor(x + 300 *2^(x/7))/4)
 * credit to http://rsdo.net/RSDOnline/Guides/guide.aspx?file=Experience%20formula.html
 */

const _expForLevels = [];

const calculateExpForLevels = () => {
    let exp = 0;
    const maxLevel = 200;
    for (let level = 1; level <= maxLevel; level++) {
        exp = exp + Math.floor(level + 300 * 2 ** (level / 7));

        _expForLevels.push(Math.floor(exp / 4));
    }
};

const getLevelByExp = (exp = 0) => {
    if (!_expForLevels.length) calculateExpForLevels();

    // Case when exp is EXACTLY what you need for a level
    if (_expForLevels.includes(exp)) return _expForLevels.findIndex(xp => xp === exp) + 2;
    // The +2 offsets the 0 based index and that you start at level 1

    return (
        _expForLevels.findIndex((_, index, list) => {
            return exp >= list[index - 1] && exp <= list[index + 1];
        }) + 2
    );
};

export default getLevelByExp;
