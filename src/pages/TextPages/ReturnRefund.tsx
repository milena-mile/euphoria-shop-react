import { Link } from "react-router-dom"

const ReturnRefund = () => {
    return (
        <div className="b-text">
            <h1>Return and Refund Policy</h1>
            <p>Our Return and Refund Policy was last updated 01.08.2024.</p>
            <h2>Your Order Cancellation Rights</h2>
            <p>You are entitled to cancel Your Order within 14 days without giving any reason for doing so.</p>
            <p>The deadline for cancelling an Order is 14 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
            <p>In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>
            <ul>
                <li>By visiting this page on our website: <Link to="/contact-us">Contact Us</Link></li>
                <li>By sending us an email: <Link to="mailto:support@euphoria.in">support@euphoria.in</Link></li>
            </ul>
            <p>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
            <h2>Conditions for Returns</h2>
            <p>In order for the Goods to be eligible for a return, please make sure that:</p>
            <ul>
                <li>The Goods were purchased in the last 14 days</li>
                <li>The Goods are in the original packaging</li>
            </ul>
            <p>The following Goods cannot be returned:</p>
            <ul>
                <li>The supply of Goods made to Your specifications or clearly personalized.</li>
                <li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
                <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
            </ul>
            <h2>Returning Goods</h2>
            <p>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address:</p>
            <p>Eklingpura Chouraha, Ahmedabad Main Road (NH-8 Near Mahadev Hotel) Udaipur, India - 313002</p>
            <p>We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>
        </div>
    )
}

export default ReturnRefund;