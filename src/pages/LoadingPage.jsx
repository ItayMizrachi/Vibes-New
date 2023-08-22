import React from 'react'
import loading from "/loadingGif.gif"

const LoadingPage = () => {
    return (
        <>
            <div className="wrapperLoading">
                <img className="loader" src={loading} />
            </div>
        </>
    )
}

export default LoadingPage