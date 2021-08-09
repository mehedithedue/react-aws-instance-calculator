import * as AWS from "@aws-sdk/client-pricing";

const client = new AWS.Pricing({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAV36HOPULKRBKKRSX",
        secretAccessKey: "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",
    },
});

const params = {
    "Filters": [
        {
            "Type": "TERM_MATCH",
            "Field": "ServiceCode",
            "Value": "AmazonEC2"
        },
        // {
        //     'Type': 'TERM_MATCH',
        //     'Field': 'tenancy',
        //     'Value': 'Shared'
        // },
        {
            'Type': 'TERM_MATCH',
            'Field': 'preInstalledSw',
            'Value': 'NA'
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'location',
            'Value': 'US East (N. Virginia)'
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'operatingSystem',
            'Value': 'Linux'
        },
    ],
    "FormatVersion": "aws_v1",
    "NextToken": null,
    "ServiceCode": 'AmazonEC2'
};

function structuredFilteredParam(filterParam){

    let filter = [
        {
            'Type': 'TERM_MATCH',
            'Field': 'vcpu',
            'Value': filterParam.vcpu.toString()
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'instanceFamily',
            'Value': filterParam.instanceFamily
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'memory',
            'Value': filterParam.memory + ' GiB'
        },
    ]

    return {...params, Filters: [...params.Filters, ...filter]};

}

async function getAWSPrice(filterParam) {

    try {
        let filterObject = structuredFilteredParam(filterParam);
        let response =  await client.getProducts({...filterObject, "MaxResults": 1});

        return (response && response.PriceList && response.PriceList[0] && JSON.parse(response.PriceList[0])) || {}

    } catch (error) {
        return error;
    }
}


async function getAWSPriceObjectList(filterParam) {

    try {
        let filterObject = structuredFilteredParam(filterParam);
        let response =  await client.getProducts(filterObject);

        return (response && response.PriceList) || {}

    } catch (error) {
        return error;
    }
}

export {getAWSPrice, getAWSPriceObjectList};