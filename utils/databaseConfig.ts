import mongoose from 'mongoose';
import 'dotenv/config';
import Product from '../models/Product';
import Users from '../models/Users';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connection: any = {};

async function connect() {
  if (connection.isConnected) {
    console.log('Connection already esablished');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Connection previously connected');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(`${process.env.MONGODB_URI}`);

  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const deleteAllUser = async () => {
  try {
    await Users.deleteMany();
    console.log('All user deleted');
  } catch (err) {
    console.log(err);
  }
};

const deleteAllProduct = async () => {
  try {
    await Product.deleteMany();
    console.log('All product deleted');
  } catch (err) {
    console.log(err);
  }
};

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function convertDocToObj(doc: any) {
//   doc._id = new mongoose.Types.ObjectId(doc._id);
//   doc.createdAt = doc.createdAt.toString();
//   doc.updatedAt = doc.toString();
//   return doc;
// }

const db = { connect, disconnect, deleteAllUser, deleteAllProduct };
export default db;
