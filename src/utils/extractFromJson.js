/*
* To formate and extract the price from large API response of AWS
* */
const extractPriceFromJsonAPI = ( response => {
    let data = response.terms && response.terms.OnDemand;
    delete response.PriceList;

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
        priceObject = {...price, description}
        break;
    }
    return priceObject ;
})

const extractNameFromConfiguration = ( configuration => {

    if(!configuration) return {};

    let names = [];

    for (let key in configuration) {
        names.push(key)
    }
    return names;
})

export {extractPriceFromJsonAPI, extractNameFromConfiguration} ;