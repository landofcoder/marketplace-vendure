export function DataDemo () {
    return [
        { label: 'January', totalOrders: 55 }, { label: 'February', totalOrders: 28 },
        { label: 'March', totalOrders: 80 }, { label: 'April', totalOrders: 0 },
        { label: 'May', totalOrders: 55 }, { label: 'June', totalOrders: 28 },
        { label: 'July', totalOrders: 80 }, { label: 'August', totalOrders: 32 },
        { label: 'September', totalOrders: 55 }, { label: 'October', totalOrders: 28 },
        { label: 'November', totalOrders: 80 }, { label: 'December', totalOrders: 32 },
    ]
}

export function formatData(items: Array<any>) {
    let formattedData: Array<any> = [];
    let flag: number = 0;
    if (items.length > 0) {
        if (items[0].day !== null) {
            for (let i = 0; i < 31; i++) {
                if (flag < items.length) {
                    if (i+1 == items[flag].day) {
                        formattedData.push({
                            label: items[flag].day,
                            totalOrders: items[flag].totalOrders,
                            month: items[flag].month
                        })
                        flag++;
                    }
                    else {
                        formattedData.push({
                            label: JSON.stringify(i+1),
                            totalOrders: 0,
                            month: items[flag].month
                        })
                    }
                }
                else {
                    formattedData.push({
                        label: JSON.stringify(i+1),
                        totalOrders: 0,
                        month: items[0].month
                    })
                }
            }
        }
        else {
            for(let i = 0; i < 12; i++) {
                if (flag < items.length) {
                    
                    if (i+1 == items[flag].month) {
                        formattedData.push({
                            label: items[flag].month,
                            totalOrders: items[flag].totalOrders,
                            day: items[flag].day
                        })
                        flag++;
                    }
                    else {
                        formattedData.push({
                            label: JSON.stringify(i+1),
                            totalOrders: 0,
                            day: items[flag].day
                        })
                    }
                }
                else {
                    formattedData.push({
                        label: JSON.stringify(i+1),
                        totalOrders: 0,
                        day: null
                    })
                }
            }
        }
    }
    return formattedData;
}