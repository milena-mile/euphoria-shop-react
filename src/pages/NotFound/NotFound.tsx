import { Link } from "react-router-dom";
import "./notFound.scss";

const NotFound = () => {

    return (
        <div className="b-notfound">
            <div className="b-notfound_img">
                <img src="./images/not-found.jpg" alt="not found" />
            </div>
            <h1>Oops! Page not found</h1>
            <span>The page you are looking for might have been removed or temporarily unavailable.</span>
            <Link className="b-notfound_button" to="/">Back to HomePage</Link>
        </div>
    )
}

export default NotFound;