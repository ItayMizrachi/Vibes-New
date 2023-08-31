import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Story from "./Story";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex rounded-2xl p-6 mt-8 space-x-2 dark:border-none dark:bg-slate-800 overflow-x-scroll border border-gray-200 scrollbar-thin ">
      {/* {session && (
      <Story img={session.user.image}
      username={session.user.username}/>
     )} */}
      <div
        className="rounded-full h-14 w-14 p-[1.5px]
        border-red-500 border-2 object-contain cursor-pointer hover:scale-110
         transition transfrom duration-200 ease-out flex flex-col items-center"
      >
        <p className="text-sm mt-[6px] font-semibold">coming</p>
        <p className="text-sm font-semibold">soon!</p>
      </div>

      {suggestions.map((profile) => (
        <Story
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
