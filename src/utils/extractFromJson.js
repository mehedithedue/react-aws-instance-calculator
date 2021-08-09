/*
* To formate and extract the price from large API response of AWS
* */
const extractPriceFromJsonAPI = ( response => {
    let data = response && response.OnDemand;

    if(!data) return 0;
    let priceDimentions = {};
    let priceObject = {};

    for (let key in data) {
        priceDimentions = (data[key] && data[key]['priceDimensions']) || [];
        break;
    }

    for (let key in priceDimentions) {
        let description = priceDimentions && priceDimentions[key] && priceDimentions[key]['description'];
        let price = priceDimentions && priceDimentions[key] && priceDimentions[key]['pricePerUnit'];
        let unit = priceDimentions && priceDimentions[key] && priceDimentions[key]['unit'];
        priceObject = {...price, description, unit}
        break;
    }
    return priceObject ;
})

const extractNameFromJsonAPI = ( response => {
    let data = response && response.attributes;

    if(!data) return '';

    let product = data && `${data.tenancy} ${data.instanceType} instance`

    return product || 'No Product found'
})

const extractNameFromConfiguration = ( configuration => {

    if(!configuration) return {};

    let names = [];

    for (let key in configuration) {
        names.push(key)
    }
    return names;
})

export {extractPriceFromJsonAPI, extractNameFromJsonAPI,  extractNameFromConfiguration} ;