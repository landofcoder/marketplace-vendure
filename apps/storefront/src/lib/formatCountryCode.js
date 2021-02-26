function formatCountryCode(data_input) {
    var data_output = [];
    data_input.map(data => {
        const countryObject = {
            value: data.code,
            label: data.name
        }
        data_output.push(countryObject)
    })
    return data_output;
}
export default formatCountryCode;