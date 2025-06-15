import Razorpay from "razorpay";

export const createRazorpayInstance = () => {
  console.log(process.env.RAZORPAY_KEY_ID);
  console.log(process.env.RAZORPAY_KEY_SECRET)
  return new Razorpay({
    key_id: 'rzp_test_MpGrtlaxeLEZye',
    key_secret: 'jrpUTvlr89LOBySa9OTDP18I',
  });
};
