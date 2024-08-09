const { networks } = require("../../networks");

task("deploy-crosschain", "Deploys the DropifyCrosschain contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying DropifyCrosschain contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const dropifyCrosschainContractFactory = await ethers.getContractFactory(
      "DropifyCrosschain"
    );

    const args = [
      networks[network.name].chainId,
      "84532",
      "0xbf1aE23f8dEEf35F4266dBB29bd030a439B6216c",
      "10344971235874465080",
      "0xC7297019FCDA5774c22180cd7E1801fed7EC10A9",
      "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
    ];
    const dropifyCrosschainContract =
      await dropifyCrosschainContractFactory.deploy(args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        dropifyCrosschainContract.deployTransaction.hash
      } to be confirmed...`
    );

    await dropifyCrosschainContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed DropifyCrosschain contract to:",
      dropifyCrosschainContract.address
    );

    if (network.name === "localFunctionsTestnet") {
      return;
    }

    const verifyContract = taskArgs.verify;
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: dropifyCrosschainContract.address,
          constructorArguments: [args],
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(
      `\n DropifyCrosschain contract deployed to ${dropifyCrosschainContract.address} on ${network.name}`
    );
  });
