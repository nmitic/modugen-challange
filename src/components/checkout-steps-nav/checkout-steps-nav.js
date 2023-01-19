import styles from './checkout-steps-nav.module.css'
import {ICON_TO_COMPONENT_MAP} from "./checkout-steps-nav.enums";

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
                        >
                            <Icon color={ !step.valid ? 'error' : 'primary' } />
                            {step.title}
                        </button>
                    )
                })
            }
        </div>
    )
}