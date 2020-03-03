module.exports = {
    get() {
        return {
            year: 2020,
            month: 1,
            day: 1,
            totalMeals: 50,
            adultGuestMeals: 20,
            childGuestMeals: 20,
            volunteerMeals: 10,
            whichUserCreated: "artorias@anor.gov",
            whichUserLastChanged: "ggwsif@anor.gov",
            notes: "Supervisor fell to Abyss.",
            hadIncident: true
        };
    },
    getDetailed(year, month, day, totalMeals, adultGuestMeals, childGuestMeals, volunteerMeals) {
        return {
            year: year,
            month: month,
            day: day,
            totalMeals: totalMeals,
            adultGuestMeals: adultGuestMeals,
            childGuestMeals: childGuestMeals,
            volunteerMeals: volunteerMeals,
            whichUserCreated: "artorias@anor.gov",
            whichUserLastChanged: "ggwsif@anor.gov",
            notes: "Supervisor fell to Abyss.",
            hadIncident: true
        }
    }
};
