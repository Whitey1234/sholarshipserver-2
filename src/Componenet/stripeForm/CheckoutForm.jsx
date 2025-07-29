import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const CheckoutForm = ({  onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
 const amount = 25; // USD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Create payment intent on server
      const { data } = await axios.post('https://student-scholarship-ass-12.vercel.app/create-payment-intent', {
        amount: amount * 100, // Convert to cents
      });

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Scholarship Applicant',
          },
        },
      });

      // 3. Handle results
      if (result.error) {
        toast.error(result.error.message || 'Payment error occurred');
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success(' Payment successful!');
        onSuccess(); // Call parent success callback
      }
    } catch (error) {
      console.error(error);
      toast.error(' Payment failed. Try again later.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded p-6 space-y-4 border max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-center mb-2 text-blue-600">Complete Payment</h3>

      <div className="p-3 border rounded">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#333',
                '::placeholder': { color: '#888' },
              },
              invalid: { color: '#e63946' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>

      <ToastContainer/>
    </form>
  );
};

export default CheckoutForm;
