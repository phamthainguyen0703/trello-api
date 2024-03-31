import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

// khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null
let trelloDatabaseInstance = null;

// khởi tạo 1 đối tượng mongoClientInstance để connect mongoDb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect db
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
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
