import { LanguageCode, CustomFields } from '@vendure/core';
import {CustomFieldConfig} from "@vendure/core/dist/config/custom-field/custom-field-types";

export const ProductCustomFields: CustomFieldConfig[] = [
    {
        name: "weight",
        type: 'float',
        label: [{languageCode: LanguageCode.en, value: 'Weight (gram)'}]
    },
    {
        name: "length",
        type: 'float',
        label: [{languageCode: LanguageCode.en, value: 'Length (cm)'}]
    },
    {
        name: "height",
        type: 'float',
        label: [{languageCode: LanguageCode.en, value: 'Height (cm)'}]
    },
    {
        name: "width",
        type: 'float',
        label: [{languageCode: LanguageCode.en, value: 'Width (cm)'}]
    }
];