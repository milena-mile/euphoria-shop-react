import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="b-text">
            <h1>About Us</h1>
            <h2>Everyday fashion is our promise to you.</h2>
            <p>If there’s one thing we know about our customers––they’re busy living. They’re going to work. They’re raising kids. They’re hitting the gym. They’re studying for tests. They’re headed out on Friday night. They’re staying in with Sunday pancakes.</p>
            <p>Keeping you effortlessly stylish throughout the day lies at the core of what we do. At Clothing Shop Online, we’ve made it our mission to provide simple, affordable wardrobe staples to people who love to live. We’ve got the looks you want, from the brands you love, in the colors and sizes you need.</p>
            <p>Skip the lines at the mall; we’ve created an online shopping experience that fits your schedule just as well as it does your budget.</p>
            <p>Within minutes, you can stock up on the leading brands you love to wear every day. Imagine Gildan, Bella + Canvas, and Hanes, right at your fingertips. Our intuitive shopping experience was designed to help you quickly find your favs, while discovering new ones along the way.At Clothing Shop Online, we want you to be comfortable, confident, and carefree – in what you wear and how you shop. Let us dress your every day.</p>
            <Link to="/shop" className="button-link--dark">Shopping Now</Link>
        </div>
    )
}

export default AboutUs;