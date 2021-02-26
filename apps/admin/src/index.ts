require('dotenv-safe').config({allowEmptyValues: true})
import { bootstrap } from '@vendure/core';
import { config } from './vendure-config';

bootstrap(config).catch(err => {
    console.log(err);
});
