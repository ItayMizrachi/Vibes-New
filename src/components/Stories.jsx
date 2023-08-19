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
    <div className="flex rounded-2xl p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 scrollbar-thin ">
     {/* {session && (
      <Story img={session.user.image}
      username={session.user.username}/>
     )} */}
      
      {suggestions.map((profile) => (
        <Story key={profile.userId} img={profile.avatar} username={profile.username} />
      ))}
    </div>
  );
};

export default Stories;
