module.exports = {
    getValidationMessages() {
        return {
            emailIsInvalid: "Email must be a valid address.",
            emailIsNotUnique: "Account with that email already exists.",
            passwordLengthIsInvalid: "Password must be between six and 20 characters.",
            passwordIsNotAlphanumeric: "Password must be alphanumeric.",
            confirmationPasswordDoesNotMatch: "Confirmation must match provided password.",
            firstNameLengthIsInvalid: "First name must be between two and 20 characters.",
            firstNameIsNotAlphabetic: "First name must consist only of letters.",
            lastNameLengthIsInvalid: "Last name must be between two and 20 characters.",
            lastNameIsNotAlphabetic: "Last name must consist only of letters.",
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
    }
};