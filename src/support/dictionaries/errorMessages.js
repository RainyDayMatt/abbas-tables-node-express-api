module.exports = {
    getUserCreationErrorMessages() {
        return {
            emailIsNull: "Email cannot be null.",
            emailIsInvalid: "Email must be a valid address.",
            emailIsNotUnique: "Account with that email already exists.",
            passwordIsNull: "Password cannot be null.",
            passwordLengthIsInvalid: "Password must be between six and 20 characters.",
            passwordIsNotAlphanumeric: "Password must be alphanumeric.",
            confirmationPasswordIsNull: "Confirmation password cannot be null.",
            confirmationPasswordDoesNotMatch: "Confirmation password must match provided password.",
            firstNameIsNull: "First name cannot be null.",
            firstNameLengthIsInvalid: "First name must be between two and 20 characters.",
            firstNameIsNotAlphabetic: "First name must consist only of letters.",
            lastNameIsNull: "Last name cannot be null.",
            lastNameLengthIsInvalid: "Last name must be between two and 20 characters.",
            lastNameIsNotAlphabetic: "Last name must consist only of letters.",
            mobilePhoneIsNull: "Mobile phone cannot be null.",
            mobilePhoneLengthIsInvalid: "Mobile phone must be 10 digits long.",
            mobilePhoneIsNotNumeric: "Mobile phone must consist only of numbers.",
            homePhoneLengthIsInvalid: "Home phone must be 10 digits long.",
            homePhoneIsNotNumeric: "Home phone must consist only of numbers.",
            workPhoneLengthIsInvalid: "Work phone must be 10 digits long.",
            workPhoneIsNotNumeric: "Work phone must consist only of numbers.",
            otherPhoneLengthIsInvalid: "Other phone must be 10 digits long.",
            otherPhoneIsNotNumeric: "Other phone must consist only of numbers.",
            canEnterMealCountIsNotBoolean: "Role (canEnterMealCount) must be a boolean.",
            canChangePropsIsNotBoolean: "Role (canChangeProps) must be a boolean.",
            canCreateNewsItemsIsNotBoolean: "Role (canCreateNewsItems) must be a boolean.",
            canEditNewsItemsIsNotBoolean: "Role (canEditNewsItems) must be a boolean.",
            canDeleteNewsItemsIsNotBoolean: "Role (canDeleteNewsItems) must be a boolean.",
            canCreateNewsItemCommentsIsNotBoolean: "Role (canCreateNewsItemComments) must be a boolean.",
            canEditNewsItemCommentsIsNotBoolean: "Role (canEditNewsItemComments) must be a boolean.",
            canDeleteNewsItemCommentsIsNotBoolean: "Role (canDeleteNewsItemComments) must be a boolean.",
            canChangeRolesIsNotBoolean: "Role (canChangeRoles) must be a boolean."
        };
    },
    getUserSignInErrorMessages() {
        return {
            emailIsNotRegistered: "Account with that email doesn't exist.",
            passwordIsIncorrect: "Incorrect password."
        };
    },
    getPropertyCreationErrorMessages() {
        return {
            keyIsNull: "Key cannot be null.",
            keyIsNotUnique: "Property with that key already exists.",
            valueIsNull: "Value cannot be null.",
            whichUserCreatedEmailIsNull: "Email signifying creating user cannot be null.",
            whichUserCreatedEmailIsInvalid: "Email signifying creating user must be a valid address.",
            whichUserLastChangedEmailIsNull: "Email signifying changing user cannot be null.",
            whichUserLastChangedEmailIsInvalid: "Email signifying changing user must be a valid address."
        }
    },
    getPropertyUpdateErrorMessages() {
        return {
            keyDoesNotExist: "Property with that key doesn't exist.",
            userDoesNotExist: "User with that email doesn't exist.",
            userCannotChangeProperties: "User with that email lacks permission to change properties."
        }
    },
    getServingSummaryCreationErrorMessages() {
        return {
            dateIsNotUnique: "Summary date already exists.",
            yearIsNull: "Year cannot be null.",
            yearIsNotNumeric: "Year must consist only of numbers.",
            monthIsNull: "Month cannot be null.",
            monthIsNotNumeric: "Month must consist only of numbers.",
            dayIsNull: "Day cannot be null.",
            dayIsNotNumeric: "Day must consist only of numbers.",
            totalMealsIsNull: "Total meals cannot be null.",
            totalMealsIsNotNumeric: "Total meals must consist only of numbers.",
            adultGuestMealsIsNull: "Adult guest meals cannot be null.",
            adultGuestMealsIsNotNumeric: "Adult guest meals must consist only of numbers.",
            childGuestMealsIsNull: "Child guest meals cannot be null.",
            childGuestMealsIsNotNumeric: "Child guest meals must consist only of numbers.",
            volunteerMealsIsNull: "Volunteer meals cannot be null.",
            volunteerMealsIsNotNumeric: "Volunteer meals must consist only of numbers.",
            userDoesNotExist: "User with that email doesn't exist.",
            userCannotEnterMealCounts: "User with that email lacks permission to enter meal counts.",
            whichUserCreatedEmailIsNull: "Email signifying creating user cannot be null.",
            whichUserCreatedEmailIsInvalid: "Email signifying creating user must be a valid address.",
            whichUserLastChangedEmailIsNull: "Email signifying changing user cannot be null.",
            whichUserLastChangedEmailIsInvalid: "Email signifying changing user must be a valid address.",
            hadIncidentIsNull: "Incident flag cannot be null.",
            hadIncidentIsNotBoolean: "Incident flag must be boolean."
        }
    },
    getServingSummaryUpdateErrorMessages() {
        return {
            dateDoesNotExist: "ServingSummary with that date doesn't exist.",
            userDoesNotExist: "User with that email doesn't exist.",
            userCannotEnterMealCounts: "User with that email lacks permission to change properties."
        }
    }
};
