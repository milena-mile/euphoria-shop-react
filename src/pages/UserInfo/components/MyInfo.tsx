const MyInfo = (props: {email: string}) => {

    return (
        <>
            <h1 className="b-user_title">My Info</h1>
            <div className="b-user_info">
                <div className="b-user_info-item"><strong>My email:</strong> {props.email}</div>
            </div>
        </>
    )
}

export default MyInfo;