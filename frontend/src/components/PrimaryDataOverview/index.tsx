import { useState } from "react";
import React from "react";

const categories = {
  Initiative: {
    title: "Initiative",
    content:
      "Projects and initiatives that aim to improve the current scenario of women's representation in STEM are called Initiatives, and their types are:",
    list: [
      "Program: Set of projects that meet the program's objective;",
      "Project: Set of activities that have well-defined deadlines, resources and scope;",
      "Community: Space for debate, meetings with people interested in the subject;",
      "Conference;",
      "Training;",
    ],
  },
  Policy: {
    title: "Policy",
    content: "Policies are structured guidelines that govern actions in STEM.",
    list: [
      "Affirmative Actions;",
      "Governmental Incentives;",
      "Scholarship Programs;",
    ],
  },
  Factor: {
    title: "Factor",
    content:
      "Factors influence participation in STEM and can be social, economic, or educational.",
    list: [
      "Cultural Influences;",
      "Economic Barriers;",
      "Access to Education;",
    ],
  },
};

const PrimaryDataOverview = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categories>("Initiative");

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        About the categories
      </h2>
      <div className="flex">
        <div className="flex flex-col space-y-2 mr-4">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg border transition-colors duration-300 font-semibold ${
                selectedCategory === category
                  ? "bg-gray-700 text-white-A700"
                  : "bg-white border-gray-700 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() =>
                setSelectedCategory(category as keyof typeof categories)
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="border border-gray-400 rounded-lg p-4 w-[800px]">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            {categories[selectedCategory].title}
          </h3>
          <p className="mb-2">{categories[selectedCategory].content}</p>
          <ul className="list-disc list-inside">
            {categories[selectedCategory].list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDataOverview;
