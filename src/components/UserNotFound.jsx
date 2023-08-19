import React from 'react'
import { Link } from 'react-router-dom'

const UserNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20">
            <h1 className="mb-2 text-3xl font-semibold text-center">
              User not found
            </h1>
            <Link to="/">
              <button className="sm:w-full p-3 bg-blue-500 rounded-lg lg:w-auto my-2 border py-4 px-8 text-center text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Take me home!
              </button>
            </Link>
          </div>
  )
}

export default UserNotFound