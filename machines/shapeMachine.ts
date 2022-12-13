import { v4 } from "uuid";
import { assign, createMachine } from "xstate";
import { add, sub } from "../libs/utils";
import { AppState, Shape } from "../types";

type IContext = {
  shapes: Record<string, Shape>;
  appState: AppState;
  originPoint: number[];
};

export const shapeMachine = createMachine(
  {
    id: "Shape Machine",
    initial: "idle",
    states: {
      idle: {
        on: {
          POINTER_DOWN: {
            target: "pointing",
            actions: ["onPointerDown", "onSelectShape"],
          },
          ON_SELECT_SHAPE: {
            actions: "onSelectShape",
          },
          ON_DELETE_SHAPE: {
            cond: (ctx) => !!ctx.appState.currentSelectedShape,
            actions: "onDeleteShape",
          },
          ON_DB_CLICK_CANVAS: {
            actions: "onCreateShape",
          },
        },
      },
      pointing: {
        on: {
          POINTER_MOVE: {
            target: "dragging",
          },
          POINTER_UP: {
            target: "idle",
          },
        },
      },
      dragging: {
        on: {
          POINTER_UP: {
            target: "idle",
          },
          DRAG: {
            actions: "onPointerMove",
          },
        },
      },
    },
    schema: {
      context: {} as IContext,
      events: {} as
        | { type: "POINTER_DOWN"; data: { point: number[]; id: string } }
        | { type: "POINTER_MOVE" }
        | { type: "POINTER_UP" }
        | { type: "ON_SELECT_SHAPE" }
        | { type: "ON_DELETE_SHAPE" }
        | { type: "ON_DB_CLICK_CANVAS"; point: number[] }
        | { type: "DRAG"; point: number[] },
    },
    context: {
      shapes: {},
      appState: { currentSelectedShape: null },
      originPoint: [],
    } as IContext,
    tsTypes: {} as import("./shapeMachine.typegen").Typegen0,
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      onCreateShape: assign({
        shapes: (context, event) => {
          const newId = v4();
          const point = event.point;
          const newShape: Shape = {
            id: newId,
            point,
            size: [800, 600],
          };
          return {
            ...context.shapes,
            [newId]: newShape,
          };
        },
      }),
      onPointerDown: assign({
        appState: (ctx, event) => {
          const { id } = event.data;
          return {
            ...ctx.appState,
            currentSelectedShape: id,
          };
        },
        originPoint: (_, event) => {
          return event.data.point;
        },
      }),
      onPointerMove: assign({
        shapes: (ctx, event) => {
          const shape: Shape =
            ctx.shapes[ctx.appState.currentSelectedShape as string];
          const delta = sub(event.point, ctx.originPoint);
          return {
            ...ctx.shapes,
            [shape.id]: {
              ...shape,
              point: add(shape.point, delta),
            },
          };
        },
      }),
      onDeleteShape: assign({
        shapes: (ctx) => {
          const allShapes = ctx.shapes;
          delete allShapes?.[ctx.appState.currentSelectedShape as string];
          return allShapes;
        },
      }),
    },
  }
);
