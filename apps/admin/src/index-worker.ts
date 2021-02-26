require('dotenv-safe').config({allowEmptyValues: true});
import { bootstrapWorker } from '@vendure/core';
import { config } from './vendure-config';

bootstrapWorker(config).catch(err => {
    console.log(err);
});
