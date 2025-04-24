import { useDispatch } from "react-redux";
import { logEvent } from "../store/eventsSlice";

export function useLogs() {
  const dispatch = useDispatch();
  const log = (type: string, payload?: any) => {
    dispatch(
      logEvent({
        type,
        payload,
        timestamp: new Date().toISOString(),
      })
    );
  };

  return { log };
}
