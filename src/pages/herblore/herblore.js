import React, { useReducer } from 'react';

import herbs from './herbs';
import potions from './potions';
import { Input } from '../../components/input';
import { HerbImage, HerbItemWrapper, HerbItemSection, Main, ExpGained } from './herblore.styled';

import seperatePotions from './utils/seperate-potions';

const initalHerbValues = herbs.reduce((acc, head) => {
    acc[head] = { value: '', exp: 0 };
    return acc;
}, {});

const { specialPotions, normalPotions } = seperatePotions(potions);
const potionsToUse = herbs.reduce((acc, herb) => {
    const potionToUse = normalPotions[herb].find(({ isDefault }) => isDefault);
    acc[herb] = potionToUse;

    return acc;
}, {});

const reducer = (state, action) => {
    switch (action.type) {
        case 'HERB_CHANGE': {
            const { herb, value } = action;
            const potion = potionsToUse[herb];

            const herbState = state.herbs[herb];
            const { value: valueInState, exp: expInState } = herbState;

            const valueChange = value - valueInState;

            const expChange = valueChange * potion.exp;

            return {
                ...state,
                herbs: { ...state.herbs, [herb]: { value, exp: expInState + expChange } },
                totalExp: state.totalExp + expChange,
            };
        }
    }
};

const initialState = {
    herbs: initalHerbValues,
    totalExp: 0,
};

const HerbloreCalc = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Main>
            {herbs.map(herb => (
                <HerbItem
                    key={herb}
                    herb={herb}
                    potionToUse={potionsToUse[herb]}
                    handleChange={value => dispatch({ type: 'HERB_CHANGE', herb, value })}
                    herbValues={state.herbs[herb]}
                />
            ))}
            <ExpGained data-testid="totalExp">In total you will gain {state.totalExp} herblore exp.</ExpGained>
        </Main>
    );
};

function HerbItem({ herb, potionToUse, handleChange, herbValues: { value, exp } }) {
    const secondaries = Array.isArray(potionToUse.secondary) ? potionToUse.secondary : [potionToUse.secondary];
    return (
        <HerbItemWrapper>
            <HerbImage item={herb} title={herb} />
            <Input onChange={handleChange} value={value} name={herb} />

            <HerbItemSection>
                {secondaries.map((secondary, index, list) => {
                    return (
                        <React.Fragment key={secondary}>
                            {index === 0 && '+'}
                            {value || 0} <HerbImage item={secondary} title={secondary} />{' '}
                            {index + 1 < list.length && '+'}
                        </React.Fragment>
                    );
                })}
            </HerbItemSection>
            <HerbItemSection>
                = {exp} exp and {value || 0}
                <HerbImage item={potionToUse.name} title={potionToUse.name} />
            </HerbItemSection>
        </HerbItemWrapper>
    );
}

export default HerbloreCalc;
