import React from "react";

const About = () => {
  return (
    <div>
      <div className="container px-4 py-12 mx-auto">
        <div className="flex justify-center">
          <div className="p-6 bg-white border rounded-lg shadow-lg lg:w-8/12 ">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold ">Welcome to Vibes!</h2>
              <p className="text-lg ">
                Vibes is a social media platform where you can share your
                favorite moments, memories, and experiences with your family,
                friends, and the world.
              </p>
            </div>
            <div className="mt-4 card">
              <div className="card-body">
                <h5 className="text-xl font-bold ">Share Your Posts</h5>
                <p>
                  Capture and upload photos, write captions, and share your
                  stories with the Vibes community.
                </p>
              </div>
            </div>
            <div className="mt-4 card">
              <div className="card-body">
                <h5 className="text-xl font-bold ">Connect with Others</h5>
                <p>
                  Follow your friends, family, and other interesting users to
                  stay connected and up-to-date with their latest posts and
                  updates.
                </p>
              </div>
            </div>
            <div className="mt-4 card">
              <div className="card-body">
                <h5 className="text-xl font-bold ">Discover New Experiences</h5>
                <p>
                  Explore a wide range of photos and stories from users all
                  around the world, and get inspired by their unique
                  perspectives and adventures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About