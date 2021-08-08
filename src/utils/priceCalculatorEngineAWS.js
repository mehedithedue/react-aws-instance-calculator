import getAWSData from "./pricingApiAWS";
import {extractPriceFromJsonAPI} from "./extractFromJson";

function storagePriceCalculationWithFormula(ratePerMonthGB, amountGB){
    const hourInDay = 24;
    const dayInMonth = 30;
    ratePerMonthGB = parseFloat(ratePerMonthGB);
    const amountMB = parseFloat(amountGB) *  1000;;
    console.log( `${ratePerMonthGB} * ${amountMB} / (${hourInDay} * ${dayInMonth}`, ratePerMonthGB * amountMB / (hourInDay * dayInMonth ))
    console.log(ratePerMonthGB * amountMB * 12 / (hourInDay * dayInMonth ));
    return parseFloat(ratePerMonthGB * amountMB / (hourInDay * dayInMonth ));
}


export async function priceCalculationAWS(props) {

    let price = 0;
    let description = '';

    const filterParams = {
        instanceType: props.instanceType,
        vcpu: props.cpu,
        memory: props.memory,
    };

    let data = await getAWSData(filterParams);

    const priceObject = (data && extractPriceFromJsonAPI(data)) || 0;
    price = (priceObject && priceObject.USD && parseFloat(priceObject.USD)) || 0
    description = priceObject.description || 'No Price Found'

    let storagePrice = storagePriceCalculationWithFormula(props.storagePriceGBPerMonth, props.storage);
    price = parseFloat(price + storagePrice).toFixed(4);

    let storageDescription = parseFloat(storagePrice) !== parseFloat(0) ? " and for storage additional $" + storagePrice.toFixed(4) : '';
    description = description + storageDescription;

    return { price, description};

}