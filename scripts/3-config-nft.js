import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xEB819ae407662Ef9377F0311A9Fc67e88f3EcD87");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Unkown",
        description: "this will grant you access to WokeDAO",
        image: readFileSync("scripts/assets/unknown.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();