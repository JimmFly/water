import React, { useState } from "react";

const Home = () => {
  const data = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    isFull: false,
  }));
  const [list, setList] = useState(data);
  const [capacity, setCapacity] = useState(0);

  // 点击小水杯加水
  const fullCup = (e) => {
    setList(() => {
      let newList = [...list];
      for (let i = 0; i < e; i++) {
        newList[i].isFull = true;
      }
      return newList;
    });
    setCapacity(e);
  };
  // 点击满杯倒水
  const emptyCup = (e) => {
    setList(() => {
      let newList = [...list];
      for (let i = 7; i > e - 2; i--) {
        newList[i].isFull = false;
      }
      return newList;
    });
    setCapacity(e - 1);
  };

  // 点击按钮重置小水杯
  const reset = () => {
    setList(() => {
      let newList = data;
      return newList;
    });
    setCapacity(0);
  };
  return (
    <div className="water">
      <h1>提醒喝水器</h1>
      <h3>目标：2L</h3>
      <div className="cup">
        {capacity === "8" ? null : (
          <div className="remained" id="remained">
            <span id="liters"></span>
            <small>剩余{(2 * (100 - capacity * 12.5)) / 100}L</small>
          </div>
        )}
        {capacity === 0 ? null : (
          <div
            className="percentage"
            id="percentage"
            style={{ height: `${capacity * 32.5}px ` }}
          >
            {capacity * 12.5}%
          </div>
        )}
      </div>
      <p className="text">选择你喝了几杯水</p>
      <div className="cups">
        {list.map((item) => {
          return (
            <div
              onClick={
                item.isFull
                  ? (e) => emptyCup(e.target.id)
                  : (e) => fullCup(e.target.id)
              }
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
