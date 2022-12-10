import Head from "next/head";
import { PointerEvent, useRef, useState } from "react";
import { IFrame } from "../components/IFrame";
import { add, sub } from "../libs/utils";
import { Shape } from "../types";

const Home = () => {
  const [shapes, setShapes] = useState<Record<string, Shape>>({
    a: {
      id: "a",
      size: [800, 600],
      point: [200, 200],
    },
  });

  const rDragging = useRef<{
    shape: Shape;
    origin: number[];
  } | null>(null);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);

    const id = e.currentTarget.id;
    const point = [e.clientX, e.clientY];

    rDragging.current = {
      shape: { ...shapes[id] },
      origin: point,
    };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const dragging = rDragging.current;

    if (!dragging) return;

    const shape = shapes[dragging.shape.id];
    const point = [e.clientX, e.clientY];
    const delta = sub(point, dragging.origin);

    setShapes({
      ...shapes,
      [shape.id]: {
        ...shape,
        point: add(dragging.shape.point, delta),
      },
    });
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    rDragging.current = null;
  };

  return (
    <div className="w-screen h-screen bg-white relative" tabIndex={1}>
      <Head>
        <title>Browser in browser</title>
      </Head>
      {Object.values(shapes).map((shape) => (
        <IFrame
          point={shape.point}
          size={shape.size}
          key={shape.id}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          id={shape.id}
        />
      ))}
    </div>
  );
};
export default Home;
