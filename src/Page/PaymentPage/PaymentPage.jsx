import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../Componenet/stripeForm/CheckoutForm';
import { useLoaderData } from 'react-router';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Add in .env
  
 
const PaymentPage = () => {
  const handlePaymentSuccess = () => {
    // Redirect or open scholarship application form here
  };
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Pay Scholarship Fee</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm  onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
