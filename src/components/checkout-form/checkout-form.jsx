import {Form, Formik} from "formik";
import {useState} from "react";
import cn from "classnames";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {CheckoutStepsNav} from "../checkout-steps-nav/checkout-steps-nav";
import styles from "./sheckout-form.module.css";
import {getFlattenFields, isFieldValid, isSetOfFieldsValid} from "./checkout-form.utils";

export const CheckoutForm = ({checkoutFormData}) => {
    const [step, setStep] = useState(0)

    const flattenFields = getFlattenFields(checkoutFormData)

    const validationSchema = Yup.object(
        flattenFields.reduce((prevField, currentField) => {
            return ({
                ...prevField,
                [currentField.name]: currentField.validationSchema
            })
        }, {})
    )

    const initialValues = flattenFields.reduce((prevField, currentField) => {
        return ({
            ...prevField,
            [currentField.name]: ''
        })
    }, {})

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <Form className={styles.checkoutForm}>
                    <CheckoutStepsNav
                        setStep={setStep}
                        steps={[...checkoutFormData.map(stepData => ({
                            title: stepData.title,
                            valid: isSetOfFieldsValid(stepData.fields, formik),
                            id: stepData.id,
                            icon: stepData.icon,
                        }))]}
                    />

                    {
                        checkoutFormData.map((stepData, index) => (
                            <div className={cn(styles.step, {[styles.stepShown]: step === index})} key={stepData.id}>
                                <h3>{stepData.title}</h3>
                                {
                                    stepData.fields.map(field => (
                                        <div className={styles.field}>
                                            <TextField
                                                fullWidth
                                                key={field.id}
                                                id={field.name}
                                                name={field.name}
                                                label={field.label}
                                                value={formik.values[field.name]}
                                                onChange={formik.handleChange}
                                                error={isFieldValid(field.name, formik)}
                                                helperText={formik.touched[field.name] && formik.errors[field.name]}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }

                    <Button color="primary" variant="contained" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}