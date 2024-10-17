import "./loading.scss";

const Loading = () => {
    return (
        <div className="b-loading">
            <img src="/public/images/loading.svg" alt="loading"/>
            <div className="b-loading-road"><span></span><span></span></div>
            <span className="b-loading-text">Loading...</span>
        </div>
    )
}

export default Loading;