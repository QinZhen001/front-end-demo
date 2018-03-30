/**
 * Define a property.
 */
export function def(obj: Object, key: string, val: any, enumerable
    ? : boolean
)
{
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}