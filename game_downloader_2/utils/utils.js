export const cleanMap = (obj) => Object.keys(obj)
    .forEach(k =>
        (obj[k] === null ||
            obj[k] === undefined)
        && delete obj[k]
    );
