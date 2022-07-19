import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fullCup, emptyCup, reset } from "../store/cupReducer";
import {
  setPercent,
  decrementPercent,
  resetPercent,
} from "../store/percentReducer";

const Home = () => {
  const cup = useSelector((state) => state.cup);
  const capacity = useSelector((state) => state.capacity.value);
  const dispatch = useDispatch();

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
        {cup.map((item) => {
          return (
            <div
              onClick={
                item.isFull
                  ? (e) => {
                      dispatch(emptyCup(e.target.id));
                      dispatch(decrementPercent(e.target.id));
                    }
                  : (e) => {
                      dispatch(fullCup(e.target.id));
                      dispatch(setPercent(e.target.id));
                    }
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
      <button
        className="reset"
        onClick={() => {
          dispatch(reset());
          dispatch(resetPercent());
        }}
      >
        重置
      </button>
    </div>
  );
};

export default Home;
