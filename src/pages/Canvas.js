import React, { useState, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  // 鼠标按下
  const handleDown = (e) => {
    setX(e.clientX);
    setY(e.clientY);
    setIsDrawing(!isDrawing);
  };
  // 鼠标移动
  const handleMove = (e, ctx) => {
    if (isDrawing) {
      drawLine(ctx, "black", 1, x, y, e.clientX, e.clientY);
      setX(e.clientX);
      setY(e.clientY);
    }
  };
  // 鼠标抬起
  const handleUp = (e, ctx) => {
    drawLine(ctx, "black", 1, x, y, e.clientX, e.clientY);
    setX(0);
    setY(0);
    setIsDrawing(!isDrawing);
  };
  // 清空白板
  const clear = (ctx) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };
  // 绘制
  function drawLine(context, strokeStyle, lineWidth, x0, y0, x1, y1) {
    context.beginPath();
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
  }

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          handleDown(e);
        }}
        onMouseMove={(e) => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          handleMove(e, ctx);
        }}
        onMouseUp={(e) => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          handleUp(e, ctx);
        }}
      ></canvas>
      <button
        onClick={(e) => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          clear(ctx);
        }}
      >
        CLEAR
      </button>
    </div>
  );
};
// const ctx = canvas.current.getContext("2d");
export default Canvas;
