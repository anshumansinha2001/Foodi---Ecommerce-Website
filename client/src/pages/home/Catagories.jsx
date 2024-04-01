import React from "react";

const Catagories = () => {
  const catagoryItems = [
    {
      id: 0,
      title: "Main Dish",
      desc: "(86 dishes)",
      image: "/images/home/category/img1.png",
    },
    {
      id: 1,
      title: "Break Fast",
      desc: "(12 break fasts)",
      image: "/images/home/category/img2.png",
    },
    {
      id: 2,
      title: "Dessert",
      desc: "(48 desserts)",
      image: "/images/home/category/img3.png",
    },
    {
      id: 3,
      title: "Browse All",
      desc: "(255 items)",
      image: "/images/home/category/img4.png",
    },
  ];

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customers Favoraties</p>
        <h2 className="title">Popular Categories</h2>
      </div>

      {/* Categories Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {catagoryItems.map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded-xl bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
          >
            <div className="flex justify-center items-center w-full mx-auto">
              <img
                src={item.image}
                alt="img"
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-2">
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catagories;
