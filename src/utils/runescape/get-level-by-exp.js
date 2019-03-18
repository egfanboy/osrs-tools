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

export default getLevelByExp;
