import PropTypes from 'prop-types';
import styles from './checkout-steps-nav.module.css'
import {ICON_TO_COMPONENT_MAP, TEST_ID} from "./checkout-steps-nav.enums";

export const CheckoutStepsNav = ({steps, setStep}) => {
    return (
        <div className={styles.checkoutStepNav}>
            {
                steps.map((step, index) => {
                    const Icon = ICON_TO_COMPONENT_MAP[step.icon]

                    return (
                        <button
                            type="button"
                            onClick={() => setStep(index)}
                            key={step.id}
                            className={styles.icon}
                            data-testid={TEST_ID.NAV_ITEM}
                        >
                            <Icon
                                color={ !step.valid ? 'error' : 'primary' }
                                data-testid={TEST_ID.ICON_NAV_ITEM}
                            />
                            {step.title}
                        </button>
                    )
                })
            }
        </div>
    )
}

CheckoutStepsNav.propTypes = {
    setStep: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        valid: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        icon: PropTypes.oneOf(Object.keys(ICON_TO_COMPONENT_MAP)),
    })).isRequired
}