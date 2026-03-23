import React from "react";
import SpiceLevel from "../components/SpiceLevel";

const MenuCard = ({ item }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col">
      <img src={item.image} alt={item.name} className="rounded-md mb-2" />
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-muted-foreground">{item.desc}</p>
      <p className="font-bold mt-2">{item.price}</p>
      <SpiceLevel level={item.spiceLevel} />
    </div>
  );
};

export default MenuCard;