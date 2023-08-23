import { useLazyLoading } from "mg-js";
import React from "react";

const Test = () => {
  const [Intersector, data, setData] = useLazyLoading(
    { initPage: 1, distance: "50px", targetPercent: 0.5, uuidKeeper: "items" },
    async (page) => {
      try {
        const resp = await fetch(
          "https://rickandmortyapi.com/api/character/" + page
        );
        const obj = await resp.json();
        setData([obj]);
      } catch (error) {
        alert(error);
      }
    }
  );

  return (
    <div>
      {data.map((item) => {
        return (
          <div>
            <img width={700} src={item.image} />
          </div>
        );
      })}
      <Intersector />
    </div>
  );
};

export default Test;
