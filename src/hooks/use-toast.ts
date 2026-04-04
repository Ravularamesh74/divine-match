import * as React from "react";

export type ToastVariant = "default" | "success" | "error" | "warning";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  open?: boolean;
};

type State = {
  toasts: Toast[];
};

let count = 0;
const genId = () => (++count).toString();

type Action =
  | { type: "ADD"; toast: Toast }
  | { type: "UPDATE"; toast: Partial<Toast> }
  | { type: "DISMISS"; id?: string }
  | { type: "REMOVE"; id?: string };

let memoryState: State = { toasts: [] };
const listeners: Array<(state: State) => void> = [];

// ✅ PURE REDUCER
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          action.id ? (t.id === action.id ? { ...t, open: false } : t) : { ...t, open: false }
        ),
      };

    case "REMOVE":
      return {
        ...state,
        toasts: action.id
          ? state.toasts.filter((t) => t.id !== action.id)
          : [],
      };
  }
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

// 🔥 AUTO REMOVE HANDLER (OUTSIDE REDUCER)
function scheduleRemove(id: string) {
  setTimeout(() => {
    dispatch({ type: "REMOVE", id });
  }, TOAST_REMOVE_DELAY);
}

// 🚀 MAIN TOAST FUNCTION
export function toast({
  title,
  description,
  variant = "default",
}: Omit<Toast, "id">) {
  const id = genId();

  dispatch({
    type: "ADD",
    toast: {
      id,
      title,
      description,
      variant,
      open: true,
    },
  });

  scheduleRemove(id);

  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS", id }),
  };
}

// 🎯 HOOK
export function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id?: string) => dispatch({ type: "DISMISS", id }),
  };
}