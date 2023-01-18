import cn from "classnames";
import styles from './checkout-steps-nav.module.css'

export const CheckoutStepsNav = ({steps, setStep}) => {
    return (
        <>
            {
                steps.map((step, index) => {
                    return (
                        <button
                            className={cn({
                                [styles.InvalidStep]: !step.valid
                            })}
                            type="button"
                            onClick={() => setStep(index)}
                        >
                            {step.title}
                        </button>
                    )
                })
            }
        </>
    )
}