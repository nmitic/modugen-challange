export const isFieldValid = (fieldName, formik) => {
    return formik.touched[fieldName] && Boolean(formik.errors[fieldName])
}

export const isSetOfFieldsValid = (fields, formik) => {
    return !fields.some(field => isFieldValid(field.name, formik))
}

export const getFlattenFields = (steps) => {
    return steps.reduce((prevStep, currentStep) => ([
        ...prevStep,
        ...currentStep.fields
    ]), [])
}