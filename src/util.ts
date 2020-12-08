export const cloneObject = (original: any) => {
    let clone = {...original}
    Object.keys(original).forEach( key => {
        clone[key] = original[key]
    })
    return clone
}