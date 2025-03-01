/**
 * A pure function.
 * @param object - the object you wish to omit properties from.
 * @param properties - the keys in `object` you wish to omit.
 * @returns - a **shallow copy** of `object` without the keys specified in `properties`.
 */
export function omitProperties<T extends object, U extends (keyof T)[]>(object: T, ...properties: U): Omit<T, U[number]> {
    const newObject = Object.assign({}, object);

    for (let i = 0, n = properties.length; i < n; i++) {
        delete newObject[properties[i]];
    }

    return newObject;
}


/**
 * A pure function.
 * @param object - the object you wish to pick properties from.
 * @param properties - the keys in `object` you wish to pick.
 * @returns - a **shallow copy** of `object` with only the keys specified in `properties`.
 */
export function pickProperties<T extends object, U extends (keyof T)[]>(object: T, ...properties: U): Pick<T, U[number]> {
    const newObject: Pick<T, U[number]> = {} as Pick<T, U[number]>;

    for (let i = 0, n = properties.length; i < n; i++) {
        newObject[properties[i]] = object[properties[i]];
    }

    return newObject;
}
