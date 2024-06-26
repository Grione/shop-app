export default function CheckoutForm() {
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <span>Total Amount: </span>
      <form id="form">
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" name="street" id="street" />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal">Postal Code</label>
            <input type="text" name="postal" id="postal" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
          </div>
        </div>
      </form>
    </div>
  )
}