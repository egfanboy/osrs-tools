export default potions =>
    Object.entries(potions).reduce(
        (acc, [potionName, potion]) => {
            const { isSpecial, herb, exp, secondary, isDefault } = potion;
            if (isSpecial) {
                acc.specialPotions = [...acc.specialPotions, { exp, name: potionName, secondary, isDefault }];
            } else {
                if (!acc.normalPotions[herb]) {
                    acc.normalPotions[herb] = [{ exp, name: potionName, secondary, isDefault }];
                } else {
                    acc.normalPotions[herb] = [
                        ...acc.normalPotions[herb],
                        { exp, name: potionName, secondary, isDefault },
                    ];
                }
            }
            return acc;
        },
        { specialPotions: [], normalPotions: {} }
    );
