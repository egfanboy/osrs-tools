import React from 'react';

import { getLevelByExp } from '../../utils/runescape';

import { getLevelByExp } from '../../utils/runescape';

import { SkillIcon, Text, GPIcon, ResultMain, LevelsGained } from './ensouled-heads.styled';

const getRunesMessage = runes =>
    Object.keys(runes).reduce((acc, rune, index, list) => {
        let separator = ',';
        if (index === list.length - 2) separator = ' and';
        if (index === list.length - 1) separator = '';

        return (acc = `${acc} ${runes[rune]} ${rune} runes${separator}`);
    }, '');

const Result = ({ stats, prayerExpGained, runes, prices, magicExpGained }) => {
    const cost = Object.keys(runes).reduce((acc, key) => {
        return (acc += runes[key] * prices[key]);
    }, 0);

    const newPrayerLevel = getLevelByExp(stats.prayer.xp + prayerExpGained);
    const newMagicLevel = getLevelByExp(stats.magic.xp + magicExpGained);

    return (
        <ResultMain data-testid="ensouled-head-result-container">
            <Text>Using all the ensouled heads above will give you {prayerExpGained}</Text>
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
            <Text>
                You need {getRunesMessage(runes)}, which should cost you {cost}
            </Text>
            <GPIcon src="/images/3/30/Coins_10000.png?66565" />
        </ResultMain>
    );
};

export default Result;
