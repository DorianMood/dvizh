import createRouter from "router5";
import loggerPlugin from "router5-plugin-logger";
import browserPlugin from "router5-plugin-browser";
import { reduxPlugin } from "redux-router5";
import routes from "./routes";
import store from "./store/reducers";

export default function configureRouter() {
  const router = createRouter(routes, {
    defaultRoute: "me",
  });

  router.usePlugin(loggerPlugin);
  router.usePlugin(
    browserPlugin({
      useHash: true,
    })
  );

  return router;
}
