export const getWorkingHours = () => {
    let workingHours = [];
    for (let i = 0; i < 24; i++) {
        let minuteDis = "00";
        for (let j = 1; j <= 2; j++) {
            let timeString = "";
            if (i < 10) {
                timeString += "0" + i + ":" + minuteDis + " am";
            }
            else if (i >= 10 && i < 12) {
                timeString += i + ":" + minuteDis + " am";
            }
            else if (i > 12 && i < 24) {
                timeString += (i-12) + ":" + minuteDis + " pm";
            }
            else if (i == 12) {
                timeString += i + ":" + minuteDis + " am";
            }
            else if (i == 24) {
                timeString += "00:" + minuteDis + " am";
            }
            workingHours.push({
                value: timeString,
                label: timeString
            });
            minuteDis = "30";
        }
    }
    return workingHours;
}
export const getWorkingDay = () => {
    return [
        {
            value: "ALL",
            label: "All days"
        },
        {
            value: "MON",
            label: "Monday"
        },
        {
            value: "TUE",
            label: "Tuesday"
        },
        {
            value: "WED",
            label: "Wednesday"
        },
        {
            value: "THU",
            label: "Thursday"
        },
        {
            value: "FRI",
            label: "Friday"
        },
        {
            value: "SAT",
            label: "Saturday"
        },
        {
            value: "SUN",
            label: "Sunday"
        },
    ]
}
export const getPreferredPickupSlots = () => {
    let preferredPickupSlots = [];
    preferredPickupSlots.push({
        value: "01:00 pm - 04:00 pm",
        label: "01:00 pm - 04:00 pm"
    });
    preferredPickupSlots.push({
        value: "04:00 pm - 07:00 pm",
        label: "04:00 pm - 07:00 pm"
    });
    preferredPickupSlots.push({
        value: "07:00 pm - 10:00 pm",
        label: "07:00 pm - 10:00 pm"
    })
    return preferredPickupSlots;
}