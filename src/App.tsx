import './App.css';
import Canvas from './Components/canvas';

function App() {
  const drawArt = (context: CanvasRenderingContext2D) => {
    // ctx.fillStyle = '#000000';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.strokeStyle = '#000000';
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();
    // ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // ctx.lineTo(canvas.width / 2, canvas.height / 2);
    // ctx.stroke();
    // ctx.closePath();
    // ctx.restore();
  };
  return (
    <Canvas draw={drawArt} width={window.innerWidth} height={window.innerHeight} />
  );
}

export default App;
