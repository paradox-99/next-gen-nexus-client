import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './styles.css';
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Title from "../shared/Title";

const CheckOutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [err, setErr] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        axiosSecure.post(`/create-payment-intent`, { price: amount })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [amount, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErr(error.message);
        } else {
            setErr('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            }
        })

        if (confirmError) {
            setErr(confirmError.message);
        } else {
            if (paymentIntent.status === "succeeded") {
                const payment_info = {
                    transactionId: paymentIntent.id,
                    paymentMethod: paymentIntent.payment_method_types[0],
                    userId: user.uid,
                    user_email: user.email,
                    amount: amount
                }

                await axiosSecure.post(`/savePaymentInfo`, payment_info)
                    .then( async(res) => {
                        if (res.data.insertedId) {
                                await axiosSecure.patch(`/updateUserSubscription/${user.uid}`)
                                    .then(res => {
                                        
                                        if (res.data.modifiedCount > 0) {
                                            toast.success("Payment successful.");
                                            navigate('/dashboard/userProfile');
                                        }
                                    })
                        } else {
                            toast.error("Something happened wrong")
                        }
                    })
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full">
            <Title title="Make Payment"></Title>
            <h3 className="text-xl my-5 font-medium">Amount to be paid: ${amount}</h3>
            <form onSubmit={handleSubmit} className="w-full px-28">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="bg-blue-400 px-3 py-2 rounded font-montserrat font-medium">
                    Pay
                </button>
                <p className="text-red-500 font-poppins font-medium mt-5">{err}</p>
            </form>
        </div>
    );
};

CheckOutForm.propTypes = {
    amount: PropTypes.string.isRequired
}

export default CheckOutForm;