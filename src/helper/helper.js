
export const convertArrayToSelectOption = (array) => {
    return array.map( element => ({value: element, label: element}))
}

export const getSortAndUniqueArray = (array) => {
    return array
        .sort(function (a, b) { return a*1 - b*1; })
        .filter( (el,i,a) => i===a.indexOf(el))
}
