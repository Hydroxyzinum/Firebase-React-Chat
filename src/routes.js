import { Chat } from "./Components/Chat";
import { Login } from "./Components/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./util/links";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
];
