/* eslint-disable @typescript-eslint/no-var-requires */
import { bootstrap, defaultConfig, mergeConfig, VendureConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { clearAllTables, populateCustomers, SimpleGraphQLClient } from '@vendure/testing';
import { config } from './src/vendure-config';
import path from 'path';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import gql from 'graphql-tag';
const fs = require('fs');

const initialData = require('@vendure/create/assets/initial-data.json');

const pincodesCsvFile = fs.readFileSync(
    require.resolve('@bavaan/vendure-domestic-shipping-plugin/src/assets/Pincodes.csv'),
    'utf8',
    function(err: any, data: any) {
        return data;
    },
);

// tslint:disable:no-console

/**
 * A CLI script which populates the database with some sample data
 */
if (require.main === module) {
    // Running from command line
    const populateConfig: any = mergeConfig(
        defaultConfig,
        mergeConfig(config, {
            authOptions: {
                tokenMethod: 'bearer',
                requireVerification: false,
            },
            importExportOptions: {
                importAssetsDir: resolveFromCreatePackage('assets/images'),
            },
            workerOptions: {
                runInMainProcess: true,
            },
            customFields: {},
            plugins: config.plugins!.filter(plugin => plugin !== AdminUiPlugin),
        }),
    );
    clearAllTables(populateConfig, true)
        .then(() =>
            populate(
                () => bootstrap(populateConfig),
                initialData,
                resolveFromCreatePackage('assets/products.csv'),
            ),
        )
        .then(async app => {
            console.log('Populating customers...');
            await populateCustomers(10, populateConfig, true);
            console.log('Populating pincodes...');
            await populatePincode(pincodesCsvFile, populateConfig);
            return app.close();
        })
        .then(
            () => process.exit(0),
            err => {
                console.log(err);
                process.exit(1);
            },
        );
}

async function populatePincode(
    listPincode: any,
    config: Required<VendureConfig>,
    simpleGraphQLClient = new SimpleGraphQLClient(
        config,
        `http://localhost:${config.apiOptions.port}/${config.apiOptions.adminApiPath}`,
    ),
) {
    //const result: any = [];
    const pincodeList = listPincode.split('\r\n');
    const headers = pincodeList[0].split(',');
    await simpleGraphQLClient.asSuperAdmin();

    for (let i = 1; i < pincodeList.length - 1; i++) {
        const obj: any = {};
        const currentline = pincodeList[i].split(',');
        obj[headers[0]] = parseInt(currentline[0]);
        for (let j = 1; j < headers.length - 5; j++) {
            obj[headers[j]] = currentline[j];
        }
        if (currentline[3] === 'Y') {
            obj[headers[3]] = true;
        } else if (currentline[3] === 'N') {
            obj[headers[3]] = false;
        }
        if (currentline[4] === 'Y') {
            obj[headers[4]] = true;
        } else if (currentline[4] === 'N') {
            obj[headers[4]] = false;
        }
        if (currentline[5] === 'Y') {
            obj[headers[5]] = true;
        } else if (currentline[5] === 'N') {
            obj[headers[5]] = false;
        }
        if (currentline[6] === 'Y') {
            obj[headers[6]] = true;
        } else if (currentline[6] === 'N') {
            obj[headers[6]] = false;
        }
        if (currentline[7] === 'Y') {
            obj[headers[7]] = true;
        } else if (currentline[7] === 'N') {
            obj[headers[7]] = false;
        }

        const variables1 = {
            input: obj,
        };

        const query1 = gql`
            mutation CreatePincode($input: CreatePincodeInput!) {
                createPincode(input: $input) {
                    ... on Pincode {
                        id
                        createdAt
                        updatedAt
                        pincode
                        state
                        district
                        prepaid
                        cod
                        pickup
                        cash
                        repl
                    }
                }
            }
        `;
        await simpleGraphQLClient.query(query1, variables1).then(
            (data: any) => data.createPincode,
            err => console.log('err', err),
        );
        //result.push(obj);
    }
}

function resolveFromCreatePackage(target: string): string {
    return path.join(path.dirname(require.resolve('@vendure/create')), target);
}
