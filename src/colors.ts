// src/colors.ts
const colorSet = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D5BAFF', '#FFC4E1', '#FFCCB6',
    '#FAF4B7', '#B9FBC4', '#B5D6FF', '#E2BAFF', '#FFE1E7', '#FFD8BE', '#FFF5C3', '#C7FFDA',
    '#C4E5FF', '#F3C4FF', '#FFDEDE', '#FFE2C6', '#FFF9C4', '#DFFFD9', '#D9EEFF', '#F6D9FF',
    '#FFE6E8', '#FFECD5', '#FFFFE5', '#E6FFE6', '#E5F2FF', '#FBE5FF', '#FFF0F0', '#FFF9E5'
];

const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getUniqueColors = (count: number) => {
    const shuffledColors = shuffleArray([...colorSet]);
    const usedColors = new Set<string>();
    const uniqueColors = [];

    for (let i = 0; i < count; i++) {
        let color = shuffledColors[i % shuffledColors.length];
        while (usedColors.has(color)) {
            color = colorSet[Math.floor(Math.random() * colorSet.length)];
        }
        usedColors.add(color);
        uniqueColors.push(color);
    }

    return uniqueColors;
};

export { colorSet, getUniqueColors };
export default { colorSet, getUniqueColors };