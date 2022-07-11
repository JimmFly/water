import React, { useState } from "react";

const Cards = () => {
  const img = [
    {
      id: 1,
      word: "Explore The World",
      url: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      isActive: false,
    },
    {
      id: 2,
      word: "Wild Forest",
      url: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      isActive: false,
    },
    {
      id: 3,
      word: "Sunny Beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
      isActive: false,
    },
    {
      id: 4,
      word: "City on Winter",
      url: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
      isActive: false,
    },
    {
      id: 5,
      word: "Mountains - Clouds",
      url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      isActive: false,
    },
  ];
  const [cardList, setCardList] = useState(img);
  const handleList = (e) => {
    console.log(e);
    setCardList(() => {
      let newList = [...cardList];
      newList.forEach((item) => {
        item.isActive = false;
      });
      newList[e - 1].isActive = true;
      return newList;
    });
  };
  return (
    <div className="container">
      {cardList.map((item) => {
        return (
          <div
            key={item.id}
            id={item.id}
            className={item.isActive ? "panel active" : "panel"}
            style={{
              backgroundImage: `url(
            "${item.url}")`,
            }}
            onClick={(e) => handleList(e.target.id)}
          >
            <h3>{item.word}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
