const MONGODB_URI =
  "mongodb+srv://phamthainguyen0703:iOZJe5mEDWHrq8A4@cluster0-phamthainguyen.wjtv4nh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-PhamThaiNguyen";
const DATABASE_NAME = "trello-phamthainguyen-mern-stack";

import { MongoClient, ServerApiVersion } from "mongodb";

// khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null
let trelloDatabaseInstance = null;

// khởi tạo 1 đối tượng mongoClientInstance để connect mongoDb
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect db
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first!");
  return trelloDatabaseInstance;
};

// đóng kết nối tới database
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
