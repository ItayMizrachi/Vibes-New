import React from "react";
import Posts from "../components/Posts";
import Recommanded from "../components/Recommanded";
import SideProfile from "../components/SideProfile";
import Stories from "../components/Stories";
import { TOKEN_KEY } from "../services/apiService";

const Home = () => {
  return (
    <main
      className={`grid grid-cols-1 mx-auto md:grid-cols-2 
    md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl `}
    >
      <section className="col-span-2">
        {localStorage[TOKEN_KEY] && <Stories />}
        <Posts />
      </section>

      {localStorage[TOKEN_KEY] && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            <SideProfile />
            <Recommanded />
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
