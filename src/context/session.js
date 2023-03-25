import { createContext } from "react";

const SessionContext = createContext({
  session: { connected: false },
  setSession: () => {},
});

export default SessionContext;
