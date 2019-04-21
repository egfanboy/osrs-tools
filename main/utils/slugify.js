export const slugify = str => {
    let slug = str.toLowerCase();

    slug = slug.replace(/\(|\)|\'/g, '');
    slug = slug.replace(/\s/g, '-');

    return slug.trim();
};

export const unslugify = slug =>
    slug
        .split('-')
        .map((part, index) => {
            if (index === 0) return part;
            else return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
        })
        .join('');
