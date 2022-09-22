import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xD66A32265Cf792B2323eCFda84429a3d0d9d7E49");

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