/* eslint-disable no-console */
import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";

const START_SERVER = () => {
  const app = express();

  //enable req.body json data
  app.use(express.json());

  app.use("/v1", APIs_V1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello ${env.AUTHOR}, server is running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

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
