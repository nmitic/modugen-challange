import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {CheckoutForm} from './checkout-form';
import {TEST_ID as CHECKOUT_TEST_ID} from "./checkout-form.enums";
import {TEST_ID as CHECKOUT_STEPS_NAV_ID} from "../checkout-steps-nav/checkout-steps-nav.enums";
import * as Yup from "yup";
import cardValidator from "card-validator";

const mockData = [
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

test('Renders checkout form with 3 steps', () => {
    render(<CheckoutForm checkoutFormData={mockData} />);
    const stepElement = screen.getAllByTestId(CHECKOUT_TEST_ID.STEP);
    expect(stepElement.length).toBe(3);
});

test('Renders checkout form with 2 steps', () => {
    render(<CheckoutForm checkoutFormData={[mockData[0], mockData[1]]} />);
    const stepElement = screen.getAllByTestId(CHECKOUT_TEST_ID.STEP);
    expect(stepElement.length).toBe(2);
});

test('Successfully navigate between the steps', () => {
    render(<CheckoutForm checkoutFormData={mockData} />);
    const firstStepElement = screen.getAllByTestId(CHECKOUT_TEST_ID.STEP)[0];
    const secondStepElement = screen.getAllByTestId(CHECKOUT_TEST_ID.STEP)[1];
    const thirdStepElement = screen.getAllByTestId(CHECKOUT_TEST_ID.STEP)[2];

    const secondNavItemElement = screen.getAllByTestId(CHECKOUT_STEPS_NAV_ID.NAV_ITEM)[1];
    const thirdNavItemElement = screen.getAllByTestId(CHECKOUT_STEPS_NAV_ID.NAV_ITEM)[2];

    expect(firstStepElement).toBeVisible();

    fireEvent.click(secondNavItemElement)
    expect(secondStepElement).toBeVisible();

    fireEvent.click(thirdNavItemElement)
    expect(thirdStepElement).toBeVisible();

});

test('Show indicator that step data is not valid on submit', async () => {
    render(<CheckoutForm checkoutFormData={mockData} />);
    const firstNavIconItemElement = screen.getAllByTestId(CHECKOUT_STEPS_NAV_ID.ICON_NAV_ITEM)[0];
    const secondNavIconItemElement = screen.getAllByTestId(CHECKOUT_STEPS_NAV_ID.ICON_NAV_ITEM)[1];
    const thirdNavIconItemElement = screen.getAllByTestId(CHECKOUT_STEPS_NAV_ID.ICON_NAV_ITEM)[2];

    const formSubmitElement = screen.getByTestId(CHECKOUT_TEST_ID.FORM_SUBMIT)

    fireEvent.click(formSubmitElement)

    await waitFor(() => expect(firstNavIconItemElement).toHaveStyle('color: #d32f2f'))
    await waitFor(() => expect(secondNavIconItemElement).toHaveStyle('color: #d32f2f'))
    await waitFor(() => expect(thirdNavIconItemElement).toHaveStyle('color: #d32f2f'))
});