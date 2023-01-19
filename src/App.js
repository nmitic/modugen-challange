import cardValidator from 'card-validator'
import * as Yup from 'yup';
import styles from './App.module.css';
import {CheckoutForm} from "./components/checkout-form/checkout-form";

const CHECKOUT_FORM_DATA = [
    {
        title: 'Personal information',
        id: 'personal-information-id',
        icon: 'BADGE',
        fields: [
            {
                id: 'firstName',
                name: 'firstName',
                label: 'First name',
                validationSchema: Yup.string().required('Required')
            },
            {
                id: 'lastName',
                name: 'lastName',
                label: 'Last name',
                validationSchema: Yup.string().required('Required')
            },
            {
                id: 'email',
                name: 'email',
                label: 'Email',
                validationSchema: Yup.string().email('Invalid email address').required('Required'),
            }
        ]
    },
    {
        title: 'Address',
        id: 'address-id',
        icon: 'HOME',
        fields: [
            {
                id: 'streetName',
                name: 'streetName',
                label: 'Street name',
                validationSchema: Yup.string().required('Required')
            },
            {
                id: 'streetNumber',
                name: 'streetNumber',
                label: 'Street Number',
                validationSchema: Yup.string().required('Required')
            },
            {
                id: 'zipcode',
                name: 'zipcode',
                label: 'Zip code',
                validationSchema: Yup.string().required('Required')
            },
            {
                id: 'city',
                name: 'city',
                label: 'City',
                validationSchema: Yup.string().required('Required')
            },
            {
                id: 'country',
                name: 'country',
                label: 'Country',
                validationSchema: Yup.string().required('Required')
            },
        ]
    },
    {
        title: 'Payment data',
        id: 'payment-data',
        icon: 'ACCOUNT_BALANCE',
        fields: [
            {
                id: 'creditCardName',
                name: 'creditCardName',
                label: 'Holder name',
                validationSchema: Yup.string().test('test-name',
                    'Card holder name is invalid',
                    value => cardValidator.cardholderName(value).isValid)
                    .required('Required')
            },
            {
                id: 'creditCardNumber',
                name: 'creditCardNumber',
                label: 'Card Number',
                validationSchema: Yup.string().test('test-number',
                    'Card number is invalid',
                    value => cardValidator.number(value).isValid)
                    .required('Required')
            },
            {
                id: 'creditCardExpiryDate',
                name: 'creditCardExpiryDate',
                label: 'Expiration date',
                validationSchema: Yup.string().test('test-date',
                    'Card expiration date is invalid',
                    value => cardValidator.expirationDate(value).isValid)
                    .required('Required'),
            },
            {
                id: 'creditCardSecurityCode',
                name: 'creditCardSecurityCode',
                label: 'Security code',
                validationSchema: Yup.string().test('test-code',
                    'Security code is invalid',
                    value => cardValidator.cvv(value).isValid)
                    .required('Required')
            },
        ]
    }
]

function App() {
    return (
        <div className={styles.App}>
            <CheckoutForm checkoutFormData={CHECKOUT_FORM_DATA} />
        </div>
    );
}

export default App;
