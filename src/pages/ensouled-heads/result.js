import React from 'react';

import {
    SkillIcon,
    Text,
    GPIcon,
    ResultMain,
    LevelsGained,
} from './ensouled-heads.styled';

const expForLevel = level => {
    return Math.floor(
        Math.floor(level + 300 * Math.pow(2, level / 7)) / 4
    );
};
const expForLevels = Array.from({ length: 126 }).reduce(
    (acc, _, i) => {
        const expForNextlevel = expForLevel(i + 1);

        if (i === 0)
            return (acc = [...acc, expForNextlevel]);

        return (acc = [
            ...acc,
            acc[i - 1] + expForNextlevel,
        ]);
    },
    []
);

const getLevelByExp = (exp = 0) => {
    // The +2 offsets the 0 based index and that you start at level 1
    return (
        expForLevels.findIndex((_, index, list) => {
            return (
                exp >= list[index - 1] &&
                exp <= list[index + 1]
            );
        }) + 2
    );
};

const Result = ({
    stats,
    prayerExpGained,
    costs,
    magicExpGained,
}) => {
    const cost = Object.keys(costs).reduce((acc, key) => {
        return (acc += costs[key]);
    }, 0);

    const newPrayerLevel = getLevelByExp(
        stats.prayer.xp + prayerExpGained
    );
    const newMagicLevel = getLevelByExp(
        stats.magic.xp + magicExpGained
    );

    return (
        <ResultMain>
            <Text>
                Using all the ensouled heads above will give
                you {prayerExpGained}
            </Text>
            <SkillIcon src="/images/f/f2/Prayer_icon.png?3a18b" />
            <Text>exp and level {newPrayerLevel}</Text>
            <LevelsGained>
                +(
                {newPrayerLevel - stats.prayer.level}){' '}
            </LevelsGained>
            <Text> , {magicExpGained}</Text>
            <SkillIcon src="/images/5/5c/Magic_icon.png?d0e72" />
            <Text>exp and level {newMagicLevel} </Text>
            <LevelsGained>
                +(
                {newMagicLevel - stats.magic.level})
            </LevelsGained>
            <Text>. It will also cost you {cost}</Text>
            <GPIcon src="/images/3/30/Coins_10000.png?66565" />
            <Text>in runes.</Text>
        </ResultMain>
    );
};

export default Result;
