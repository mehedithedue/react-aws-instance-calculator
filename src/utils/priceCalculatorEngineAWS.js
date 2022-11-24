import {getAWSPrice, getAWSPriceObjectList} from "./pricingApiAWS";
import {extractNameFromJsonAPI, extractPriceFromJsonAPI} from "./extractFromJson";

function storagePriceCalculationWithFormula(ratePerMonthGB, amountGB) {
    const hourInDay = 24;
    const dayInMonth = 30;
    ratePerMonthGB = parseFloat(ratePerMonthGB);
    const amountMB = parseFloat(amountGB) * 1000;
    ;
    return parseFloat(ratePerMonthGB * amountMB / (hourInDay * dayInMonth));
}

function restructureFilteredParam(param) {
    return {
        instanceFamily: param.instanceFamily,
        vcpu: param.vcpu,
        memory: param.memory,
    };
}

function getPriceFromTermsObject(response) {
    const priceObject = (response && extractPriceFromJsonAPI(response)) || {};
    let price = (priceObject && priceObject.USD && parseFloat(priceObject.USD)) || 0
    let description = priceObject.description || 'No Price Found'
    let unit = priceObject.unit || '';
    return {price, unit, description};
}

function getNameFromProductObject(response) {
    return (response && extractNameFromJsonAPI(response)) || {}
}

function calculateStoragePrice(props, priceObject) {
    let storagePrice = storagePriceCalculationWithFormula(props.storagePriceGBPerMonth, props.storage);
    let finalPrice = parseFloat(priceObject.price + storagePrice).toFixed(4);

    let storageDescription = parseFloat(storagePrice) !== parseFloat(0) ? " and for storage additional $" + storagePrice.toFixed(4) : '';
    let finalDescription = priceObject.description + storageDescription;

    let unit = priceObject.unit;

    return {finalPrice, unit, finalDescription};

}

export async function priceCalculationAWS(props) {

    const filterParams = restructureFilteredParam(props);
    let data = await getAWSPrice(filterParams);
    let priceObject = getPriceFromTermsObject(data.terms)

    return calculateStoragePrice(props, priceObject);
}

export async function getPriceInstanceListFromAWS(props) {

    const filterParams = restructureFilteredParam(props);

    let responseObject = await getAWSPriceObjectList(filterParams);
    if (!responseObject) return {};
    let result = [];
    let prices = [0];
    for (const responseData of (responseObject || [])) {
        let response = JSON.parse(responseData);
        let resultPrice = (response.terms && getPriceFromTermsObject(response.terms)) || {}
        let resultProduct = (response.product && getNameFromProductObject(response.product)) || {}

        result.push({...resultPrice, name: resultProduct})
        prices.push(resultPrice.price);
    }

    return {result, prices};
}

