import { useMachine } from "@xstate/react";
import Head from "next/head";
import { KeyboardEvent, MouseEvent, PointerEvent, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { IFrame } from "../components/IFrame";
import { shapeMachine } from "../machines/shapeMachine";

const Home = () => {
  const [state, send] = useMachine(shapeMachine);
  const currentSelectedShape = state.context.appState.currentSelectedShape;

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const id = e.currentTarget.id;
      const point = [e.clientX, e.clientY];
      send({ type: "POINTER_DOWN", data: { id, point } });
    },
    [send]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const point = [e.clientX, e.clientY];
      send({ type: "POINTER_MOVE" });
      send({ type: "DRAG", point });
    },
    [send]
  );

  const onPointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      send("POINTER_UP");
    },
    [send]
  );

  const onDoubleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const point = [event.clientX, event.clientY];
      send({ type: "ON_DB_CLICK_CANVAS", point });
    },
    [send]
  );

  const onDeleteShape = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Backspace") {
        send({ type: "ON_DELETE_SHAPE" });
      }
    },
    [send]
  );

  // const onFocusCanvas = useCallback((event: MouseEvent<HTMLDivElement>) => {
  //   event.stopPropagation();
  //   setAppState({ currentSelectedShape: null });
  // }, []);

  const allShapes = Object.values(state.context.shapes);

  return (
    <div
      className="w-screen h-screen bg-white relative overflow-hidden"
      onDoubleClick={onDoubleClick}
      onKeyDown={onDeleteShape}
      tabIndex={1}
    >
      <Head>
        <title>Browser in browser</title>
      </Head>
      {allShapes.length
        ? allShapes.map((shape) => (
            <IFrame
              point={shape.point}
              size={shape.size}
              key={shape.id}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerMove={onPointerMove}
              id={shape.id}
              className={twMerge(
                currentSelectedShape === shape.id && "border-4 border-[#484CA0]"
              )}
            />
          ))
        : null}
    </div>
  );
};
export default Home;
