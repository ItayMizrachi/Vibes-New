import React from 'react'

const LoadingPage = () => {
    return (
        <>
            <div className="wrapperLoading">
                {/* <img className="loader" src={loading} /> */}
                    <img
                      className="animate-spin"
                      src="/images/vibes-logo-responsive.png"
                      alt={`vibes logo`}
                    />
            </div>
        </>
    )
}

export default LoadingPage