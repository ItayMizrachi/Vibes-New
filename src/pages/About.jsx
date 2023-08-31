import React from "react";

const About = () => {
  return (
    <div className=" min-h-screen">
      <div className="container px-4 py-12 mx-auto">
        <div className="flex justify-center">
          <div className="p-8  border dark:border-slate-700 rounded-lg shadow-xl lg:w-8/12 ">
            <div className="text-center mb-8">
              <h2 className="mb-6 text-4xl font-bold ">
                Welcome to Vibes!
              </h2>
              <p className="text-xl ">
                Vibes is a social media platform where you can share your
                favorite moments, memories, and experiences with your family,
                friends, and the world.
              </p>
            </div>

            <div className="flex justify-around items-center dark:border-slate-700 border-t border-b py-8 space-x-4">
              {[
                {
                  name: "Itay Mizrachi",
                  github: "https://github.com/ItayMizrachi",
                  linkedin: "https://www.linkedin.com/in/itay-mizrachi/",
                  img: "https://res.cloudinary.com/djjrdahz0/image/upload/v1693178463/isl8lodswu4psts5emgd.jpg",
                },
                {
                  name: "Omri Alter",
                  github: "https://github.com/OmriAlter",
                  linkedin: "https://www.linkedin.com/in/omri-alter-b0178922b/",
                  img: "https://media.licdn.com/dms/image/D4D03AQHGvC6mcSXmAg/profile-displayphoto-shrink_800_800/0/1683106891022?e=1698883200&v=beta&t=AJCc1Th_O-q0yxOGoK8gfgJg2XChvz_PlKXw73FASg4",
                },
              ].map((profile) => (
                <div className="text-center" key={profile.name}>
                  <div className="w-24 h-24 mx-auto">
                    <img
                      src={profile.img}
                      alt={profile.name}
                      className="rounded-full object-cover w-full h-full mb-4 mx-auto border p-[2px] hover:border-gray-400 duration-200"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold">{profile.name}</h3>
                  <div className="mt-4 space-x-4">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:underline"
                    >
                      GitHub
                    </a>{" "}
                    <span> | </span>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-lg ">
                We've utilized the power of tools and technologies such as
                Node.js, React, MongoDB, TailwindCSS, WebSockets, OpenAI API,
                Cloudinary, and more to bring you "Vibes". Our platform offers
                features like a chatbot, image generator, live chat for users,
                and so much more.
              </p>
            </div>

            {[
              {
                title: "Share Your Posts",
                description:
                  "Capture and upload photos, write captions, and share your stories with the Vibes community.",
              },
              {
                title: "Connect with Others",
                description:
                  "Follow your friends, family, and other interesting users to stay connected and up-to-date with their latest posts and updates.",
              },
              {
                title: "Discover New Experiences",
                description:
                  "Explore a wide range of photos and stories from users all around the world, and get inspired by their unique perspectives and adventures.",
              },
            ].map((card) => (
              <div
                className="mt-6 p-4 bg-gray-100 dark:bg-slate-800  rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
                key={card.title}
              >
                <h5 className="text-2xl font-bold mb-4">{card.title}</h5>
                <p className="text-lg text-gray-600 dark:text-gray-300">{card.description}</p>
              </div>
            ))}

            <div className="text-center mt-8">
              <h3 className="text-3xl font-bold mb-4">Exclusive Features</h3>
              <p className="text-lg text-gray-600 dark:text-gray-100 mb-4">
                In addition to our social features, we've equipped Vibes with
                unique tools, powered by OpenAI, to enhance your
                experience:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="bg-gray-100 dark:bg-slate-800  p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold mb-4">Chatbot</h4>
                  <p>
                    Our advanced chatbot is available round the clock to assist
                    you, answer your queries, and provide a seamless experience.
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-slate-800  p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold mb-4">
                    Image Generator
                  </h4>
                  <p>
                    Ever imagined a picture but couldn't find it? Our image
                    generator can create any image from your imagination.
                    Describe it, and we'll bring it to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
