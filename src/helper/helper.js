
export const convertArrayToSelectOption = (array) => {
    return array.map( element => ({value: element, label: element}))
}