import { useEffect, useRef } from 'react';

type CanvasProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLCanvasElement>, 
    HTMLCanvasElement>
    & {draw: (context: CanvasRenderingContext2D) => void};
    ;


const Canvas: React.FC<CanvasProps> = ({ draw, ...props }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        } // look at current state

        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        } // check for existing canvas

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        } // create canvas

        draw(ctx);

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw background as required

        // ctx.fillStyle = '#000000';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.strokeStyle = '#000000';
        // ctx.strokeRect(0, 0, canvas.width, canvas.height);
        

        // update canvas
        // ctx.putImageData(canvas.width, canvas.height, 0, 0);
    }, [draw]);

    
    return <canvas width={props.width} height={props.height} ref={canvasRef}/>;

};

export default Canvas