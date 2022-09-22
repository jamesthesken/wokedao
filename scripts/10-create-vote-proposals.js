import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// This is our governance contract.
const vote = sdk.getVote("0xDC01DCC07F5e1146740F1d892324426c39020755");

// This is our ERC-20 contract.
const token = sdk.getToken("0x9DD9A5dcC9724b3c9df6f5025da1253F28793c04");

(async () => {
  try {
    // Create proposal to mint 420 new token to the treasury.
    const amount = 420;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token.getAddress(),
        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        // We're just minting new tokens to the treasury. So, set to 0.
        nativeTokenValue: 0,
        // We're doing a mint! And, we're minting to the vote, which is
        // acting as our treasury.
        // in this case, we need to use ethers.js to convert the amount
        // to the correct format. This is because the amount it requires is in wei.
        transactionData: token.encoder.encode(
          "mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]
        ),
      }
    ];

    await vote.propose(description, executions);

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }
})();