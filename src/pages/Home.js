import React, { useState } from "react";

const Home = () => {
  const data = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    isFull: false,
  }));
  const [list, setList] = useState(data);

  // 点击小水杯加水
  const handleCup = (e) => {
    setList(() => {
      let newList = [...list];
      if (newList[e - 1].isFull === false) {
        for (let i = 0; i < e; i++) {
          newList[i].isFull = true;
        }
      } else if (newList[e - 1].isFull === true) {
        for (let i = 7; i > e - 1; i--) {
          newList[i].isFull = false;
        }
      } else {
      }

      return newList;
    });
  };
  // 点击按钮重置小水杯
  const reset = () => {
    setList(() => {
      let newList = data;
      return newList;
    });
  };
  return (
    <div className="water">
      <h1>提醒喝水器</h1>
      <h3>目标：2L</h3>
      <div className="cup">
        <div className="remained" id="remained">
          <span id="liters"></span>
          <small>剩余</small>
        </div>

        <div className="percentage" id="percentage"></div>
      </div>
      <p className="text">选择你喝了几杯水</p>
      <div className="cups">
        {list.map((item) => {
          return (
            <div
              onClick={(e) => handleCup(e.target.id)}
              className={item.isFull ? "cup cup-small full" : "cup cup-small"}
              id={item.id}
              key={item.id}
            >
              250 ml
            </div>
          );
        })}
      </div>
      <button className="reset" onClick={reset}>
        重置
      </button>
    </div>
  );
};

export default Home;
