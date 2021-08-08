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
        {
            'Type': 'TERM_MATCH',
            'Field': 'tenancy',
            'Value': 'Shared'
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'preInstalledSw',
            'Value': 'NA'
        },
    ],
    "FormatVersion": "aws_v1",
    "NextToken": null,
    "MaxResults": 1,
    "ServiceCode": 'AmazonEC2'
};


async function getAWSData(filterParam) {

    let filter = [
        {
            'Type': 'TERM_MATCH',
            'Field': 'vcpu',
            'Value': filterParam.vcpu.toString()
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'instanceType',
            'Value': filterParam.instanceType.toLowerCase()
        },
        {
            'Type': 'TERM_MATCH',
            'Field': 'memory',
            'Value': filterParam.memory + ' GiB'
        },
    ]
    filterParam = {...params, Filters: [...params.Filters, ...filter]};

    try {
        let response =  await client.getProducts(filterParam);

        return (response && response.PriceList && response.PriceList[0] && JSON.parse(response.PriceList[0])) || {}

    } catch (error) {
        return error;
    }
}

export default getAWSData;