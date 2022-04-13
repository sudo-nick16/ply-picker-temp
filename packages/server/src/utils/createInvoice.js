//Import the library into your project
import easyinvoice from "easyinvoice";
import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  S3_ACCESS_KEY_ID,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
} from "../constants.js";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  region: S3_REGION,
});

const getDate = () => {
  const d = new Date(Date.now()).toLocaleDateString();
  const date = d.split("/");
  let temp = date[1];
  date[1] = date[0];
  date[0] = temp;
  return date.join("-");
};

export const createInvoice = (order) => {
  const { address } = order;

  console.log(JSON.stringify(order, null, 2), "order inside createInvoice");
  // console.log(address);

  const products = order.order_items.map((item) => {
    return {
      quantity: item.quantity,
      description: item.name,
      "tax-rate": 0,
      price: item.price,
    };
  });

  var data = {
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      logo: "https://i.ibb.co/v1ZPKpn/pp.png",
      background: "https://i.ibb.co/ZJkF0J5/pp-bg.png",
    },
    sender: {
      company: "PlyPicker",
      address: "Pune",
      zip: "",
      city: "Maharashtra",
      country: "India",
    },
    client: {
      company: address.name,
      address: address.address,
      zip: address.pincode,
      city: address.city,
      country: address.country,
    },
    information: {
      number: order._id,
      date: getDate(),
    },
    products: products,
    "bottom-notice": "Thanks for ordering!",
    settings: {
      currency: "INR",
    },
  };

  easyinvoice.createInvoice(data, async function (result) {
      const uploadParams = {
        Bucket: "plypicker",
        Key: `invoices/${order._id}_invoice.pdf`,
        Body: Buffer.from(result.pdf, "base64"),
        ACL: "public-read",
      };
      try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    // await fs.writeFileSync(`${order._id}_invoice.pdf`, result.pdf, "base64");
  });
};
