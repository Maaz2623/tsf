import React from "react";

const AchievementsContainer = () => {
  return (
    <div className="w-full h-fit px-4 md:p-10 flex flex-wrap gap-4">
      {/* Achievement Cards */}
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="w-[200px] bg-gray-500 h-[100px] rounded-md"
        />
      ))}
    </div>
  );
};

export default AchievementsContainer;
