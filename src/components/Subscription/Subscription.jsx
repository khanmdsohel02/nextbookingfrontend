import "./Subscription.css";

const Subscription = () => {
  return (
    <div className="subscription">
      <h1 className="subscriptionTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we will send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default Subscription;
