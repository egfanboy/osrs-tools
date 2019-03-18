import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';

import { getLevelByExp } from '../../../utils/runescape';

import headData from '../head-data';

const EVENTS = {
    setPrices: 'rune-prices',
    setStats: 'user-stats',
};

const prices = {
    nature: 200,
    blood: 350,
    soul: 250,
    body: 4,
};

const stats = {
    magic: { xp: 0, level: 1 },
    prayer: { xp: 0, level: 1 },
};

mockOnce.mockImplementation((eventName, cb) => {
    if (eventName === EVENTS.setPrices) {
        cb(undefined, prices);
    } else if (eventName === EVENTS.setStats) {
        cb(undefined, false, stats);
    }
});

import EnsouledHeads from '../ensouled-heads';

describe('Ensouled head page', () => {
    beforeEach(() =>
        mockOnce.mockImplementationOnce((eventName, cb) => {
            if (eventName === EVENTS.setPrices) {
                cb(undefined, prices);
            } else if (eventName === EVENTS.setStats) {
                cb(undefined, false, {
                    magic: { xp: 0, lvl: 0 },
                    prayer: { xp: 0, level: 0 },
                });
            }
        })
    );
    describe('snapshots', () => {
        it('should match the default snapshot', async () => {
            const { container, getByText } = render(<EnsouledHeads />);

            await waitForElement(() => getByText('Get Stats'));

            expect(container).toMatchSnapshot();
        });

        it('should match the snapshot when a users stats have been fetched', async () => {
            const { container, getByText } = render(<EnsouledHeads />);

            const usernameInput = container.querySelector('input[name="Username"]');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'runescape player',
                },
            });

            fireEvent.click(getByText('Get Stats'));

            expect(container).toMatchSnapshot();
        });

        it('should match the snapshot when a username error occured', () => {
            mockOnce.mockImplementationOnce((eventName, cb) => {
                if (eventName === EVENTS.setPrices) {
                    cb(undefined, prices);
                } else if (eventName === EVENTS.setStats) {
                    cb(undefined, true);
                }
            });

            const { container, getByText } = render(<EnsouledHeads />);

            const usernameInput = container.querySelector('input[name="Username"]');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'runescape player',
                },
            });

            fireEvent.click(getByText('Get Stats'));

            expect(container).toMatchSnapshot();
        });
    });

    describe('Calculations', () => {
        it('should properly calculate exp and level gains and costs based on ensouled heads added and removed', () => {
            const head = 'demon';

            const { prayExp, magicExp, bodyRune, soulRune, natureRune, bloodRune } = headData[head];

            const headAmount = 10;

            const calculateGainsBasedOnAmount = headAmount => {
                const expectedRunes = {
                    body: bodyRune * headAmount,
                    nature: natureRune * headAmount,
                    soul: soulRune * headAmount,
                    blood: bloodRune * headAmount,
                };
                const expectedCost =
                    expectedRunes.body * prices.body +
                    expectedRunes.nature * prices.nature +
                    expectedRunes.soul * prices.soul +
                    expectedRunes.blood * prices.blood;

                //These assume a base level of 0 with 0 exp
                const expectedPrayerXpGain = headAmount * prayExp;

                const expectedMagicXpGain = headAmount * magicExp;

                const expectedPrayerLevelsGained = getLevelByExp(expectedPrayerXpGain) - stats.prayer.level;

                const expectedMagicLevelsGained = getLevelByExp(expectedMagicXpGain) - stats.magic.level;

                return {
                    expectedCost,
                    expectedMagicLevelsGained,
                    expectedMagicXpGain,
                    expectedPrayerLevelsGained,
                    expectedPrayerXpGain,
                    expectedRunes,
                };
            };

            const {
                expectedCost,
                expectedMagicLevelsGained,
                expectedMagicXpGain,
                expectedPrayerLevelsGained,
                expectedPrayerXpGain,
                expectedRunes,
            } = calculateGainsBasedOnAmount(headAmount);

            const { container, getByText, getByTestId } = render(<EnsouledHeads />);

            const usernameInput = container.querySelector('input[name="Username"]');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'runescape player',
                },
            });

            fireEvent.click(getByText('Get Stats'));

            const demonHeadInput = container.querySelector(`input[name="${head}-amount"]`);

            fireEvent.change(demonHeadInput, {
                target: { value: headAmount },
            });

            const resultContainer = getByTestId('ensouled-head-result-container');

            expect(resultContainer).toHaveTextContent(`${expectedCost}`);
            expect(resultContainer).toHaveTextContent(`+(${expectedPrayerLevelsGained})`);
            expect(resultContainer).toHaveTextContent(`+(${expectedMagicLevelsGained})`);
            expect(resultContainer).toHaveTextContent(`${expectedPrayerXpGain}exp`);
            expect(resultContainer).toHaveTextContent(`${expectedMagicXpGain}exp`);
            Object.keys(expectedRunes).forEach(rune =>
                expect(resultContainer).toHaveTextContent(`${expectedRunes[rune]} ${rune} runes`)
            );

            //Remove heads to ensure it can properly remove heads
            const removedHeadAmount = 3;
            const {
                expectedCost: removedCost,
                expectedMagicLevelsGained: removedMagicLevelsGained,
                expectedMagicXpGain: removedMagicXpGain,
                expectedPrayerLevelsGained: removedPrayerLevelsGained,
                expectedPrayerXpGain: removedPrayerXpGain,
                expectedRunes: removedRunes,
            } = calculateGainsBasedOnAmount(removedHeadAmount);

            fireEvent.change(demonHeadInput, {
                target: { value: removedHeadAmount },
            });

            expect(resultContainer).toHaveTextContent(`${removedCost}`);
            expect(resultContainer).toHaveTextContent(`+(${removedPrayerLevelsGained})`);
            expect(resultContainer).toHaveTextContent(`+(${removedMagicLevelsGained})`);
            expect(resultContainer).toHaveTextContent(`${removedPrayerXpGain}exp`);
            expect(resultContainer).toHaveTextContent(`${removedMagicXpGain}exp`);
            Object.keys(removedRunes).forEach(rune =>
                expect(resultContainer).toHaveTextContent(`${removedRunes[rune]} ${rune} runes`)
            );
        });
    });
});
