import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51PQiqhRwgWJ2o9JJ7n8KqeTgZSJjZpSKsyHLEjNl8ArQtTq2AcxCQx6mCXZyGW5APKb7EwqrPxErGFnc3pVGPfhH00iTrqxN0G");

const Payment = () => {

    const {amount} = useParams();

    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm amount={amount}/>
        </Elements>
    );
};

export default Payment;