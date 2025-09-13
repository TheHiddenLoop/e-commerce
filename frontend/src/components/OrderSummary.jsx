import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


export const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  onContinueShopping,
  orderDetails
}) => {

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-border bg-bgPrimary p-4 shadow-skin sm:p-6">
        <p className="text-xl font-semibold text-textPrimary">Order Summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-textSecondary">Original price</dt>
              <dd className="text-base font-medium text-textPrimary">₹{subtotal.toLocaleString()}</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-textSecondary">Shipping</dt>
              <dd className="text-base font-medium text-textPrimary">
                {shipping === 0 ? (
                  <span className="text-success font-semibold">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-textSecondary">Tax</dt>
              <dd className="text-base font-medium text-textPrimary">₹{tax}</dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-border pt-2">
            <dt className="text-base font-bold text-textPrimary">Total</dt>
            <dd className="text-base font-bold text-textPrimary">₹{total.toLocaleString()}</dd>
          </dl>
        </div>

        <Link to={"/order"} state={{ orderDetails }}>
          <button
            className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-skin"
          >
            Proceed to Checkout
          </button>
        </Link>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-textSecondary">or</span>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-skin"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
};