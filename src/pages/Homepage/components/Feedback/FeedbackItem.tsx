import { Feedback } from "./types";

const FeedbackItem = (props: {name: string, info: Feedback}) => {
    const handleRating = (rating: number, i: number) => {
        if (i < Math.floor(rating)) return "fill";
        if (rating % 1 != 0 && rating - 0.5 == i) return "half";
        return "empty";
    }   


    return (
        <>
            <div className="b-feedback_photo">
                <img src={`images/feedback/${props.info.photo}`} alt={props.name} />
            </div>
            <div className="b-feedback_raing">
                {[...Array(5).keys()].map((i) => (
                    <span className="b-feedback_star" key={i}>
                        <img src={`images/star-${handleRating(props.info.stars, i)}.svg`} />
                    </span>
                ))}
            </div>
            <span className="b-feedback_name">{props.name}</span>
            <p className="b-feedback_message">{props.info.message}</p>
        </>
    )
}

export default FeedbackItem;