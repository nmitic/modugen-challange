import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import cn from 'classnames'
import styles from './App.module.css';
import {CheckoutStepsNav} from "./components/checkout-steps-nav/checkout-steps-nav";

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',

    streetName: '',
    streetNumber: '',
    zipcode: '',
    city: '',
    country: '',

    creditCardName: '',
    creditCardNumber: '',
    creditCardExpiryDate: '',
    creditCardSecurityCode: ''
}

const isFieldValid = (fieldName, formik) => {
    return formik.touched[fieldName] && Boolean(formik.errors[fieldName])
}

const isSetOfFieldsValid = (arrayOfFieldsName, formik) => {
    return !arrayOfFieldsName.some(fieldName => isFieldValid(fieldName, formik))
}

function App() {
    const [step, setStep] = useState(0)
  return (
    <div className={styles.App}>
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                lastName: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                streetName: Yup.string().required('Required'),
                streetNumber: Yup.number().required('Required'),
                zipcode: Yup.string().required('Required'),
                city: Yup.number().required('Required'),
                country: Yup.string().required('Required'),
                creditCardName: Yup.string().required('Required'),
                creditCardNumber: Yup.number().required('Required'),
                creditCardExpiryDate: Yup.date().required('Required'),
                creditCardSecurityCode: Yup.number().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => {
                return (
                    <Form>
                        <CheckoutStepsNav
                            setStep={setStep}
                            steps={[
                                {
                                    title: 'Personal Information',
                                    valid: isSetOfFieldsValid([
                                        'lastName',
                                        'first',
                                        'email'
                                    ], formik)
                                },
                                {
                                    title: 'Address',
                                    valid: isSetOfFieldsValid([
                                        'streetName',
                                        'streetNumber',
                                        'zipcode',
                                        'city',
                                        'country'
                                    ], formik)
                                },
                                {
                                    title: 'Payment',
                                    valid: isSetOfFieldsValid([
                                        'creditCardName',
                                        'creditCardNumber',
                                        'creditCardExpiryDate',
                                        'creditCardSecurityCode'
                                    ], formik)
                                }
                            ]}
                        />
                        <div className={cn(styles.Step, {[styles.StepShown]: step === 0})}>

                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={isFieldValid('firstName', formik)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />

                            <br/>

                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={isFieldValid('lastName', formik)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />

                            <br/>

                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={isFieldValid('email', formik)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                        </div>

                        <div className={cn(styles.Step, {[styles.StepShown]: step === 1})}>

                            <TextField
                                id="streetName"
                                name="streetName"
                                label="Street name"
                                value={formik.values.streetName}
                                onChange={formik.handleChange}
                                error={formik.touched.streetName && Boolean(formik.errors.streetName)}
                                helperText={formik.touched.streetName && formik.errors.streetName}
                            />

                            <br/>

                            <TextField
                                id="streetNumber"
                                name="streetNumber"
                                type="number"
                                label="Street number"
                                value={formik.values.streetNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
                                helperText={formik.touched.streetNumber && formik.errors.streetNumber}
                            />

                            <br/>

                            <TextField
                                id="zipcode"
                                name="zipcode"
                                label="Zipcode"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                                helperText={formik.touched.zipcode && formik.errors.zipcode}
                            />

                            <br/>

                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />

                            <br/>

                            <TextField
                                id="country"
                                name="country"
                                label="Country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                            />

                        </div>

                        <div className={cn(styles.Step, {[styles.StepShown]: step === 2})}>

                            <TextField
                                id="creditCardName"
                                name="creditCardName"
                                label="Holder Name"
                                value={formik.values.creditCardName}
                                onChange={formik.handleChange}
                                error={formik.touched.creditCardName && Boolean(formik.errors.creditCardName)}
                                helperText={formik.touched.creditCardName && formik.errors.creditCardName}
                            />

                            <br/>

                            <TextField
                                id="creditCardNumber"
                                name="creditCardNumber"
                                type="number"
                                label="Card number"
                                value={formik.values.creditCardNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.creditCardNumber && Boolean(formik.errors.creditCardNumber)}
                                helperText={formik.touched.creditCardNumber && formik.errors.creditCardNumber}
                            />

                            <br/>

                            <TextField
                                id="creditCardExpiryDate"
                                name="creditCardExpiryDate"
                                label="Expiry Date"
                                value={formik.values.creditCardExpiryDate}
                                onChange={formik.handleChange}
                                error={formik.touched.creditCardExpiryDate && Boolean(formik.errors.creditCardExpiryDate)}
                                helperText={formik.touched.creditCardExpiryDate && formik.errors.creditCardExpiryDate}
                            />

                            <br/>

                            <TextField
                                id="creditCardSecurityCode"
                                name="creditCardSecurityCode"
                                type="password"
                                label="Security code"
                                value={formik.values.creditCardSecurityCode}
                                onChange={formik.handleChange}
                                error={formik.touched.creditCardSecurityCode && Boolean(formik.errors.creditCardSecurityCode)}
                                helperText={formik.touched.creditCardSecurityCode && formik.errors.creditCardSecurityCode}
                            />

                        </div>

                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    </div>
  );
}

export default App;
