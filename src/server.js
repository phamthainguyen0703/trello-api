/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";
import { corsOptions } from "~/config/cors";

const START_SERVER = () => {
  const app = express();

  //xử lí CORS
  app.use(cors(corsOptions));

  //enable req.body json data
  app.use(express.json());

  //use APIs v1
  app.use("/v1", APIs_V1);

  //middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "prod") {
    // Production (render.com)
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Hello ${env.AUTHOR},Production: server is running at Port:${env.PORT}/`
      );
    });
  } else {
    // Local Dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Hello ${env.AUTHOR},Local Dev: server is running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
      );
    });
  }

  // thực hiện các tác vụ clean up trước khi dừng server

  exitHook(() => {
    CLOSE_DB();
    console.log("Exiting with signal");
  });
};

// immediately-invoked / anonymous async functions (IIFE)
(async () => {
  try {
    await CONNECT_DB();
    console.log("Connected to MongoDB Cloud Atlas!!");
    START_SERVER();
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
})();

// CONNECT_DB()
//   .then(console.log("Connected to MongoDB Cloud Atlas!!"))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     console.log(err);
//     process.exit(0);
//   });
