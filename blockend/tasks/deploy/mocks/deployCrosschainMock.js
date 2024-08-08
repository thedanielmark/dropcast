const { networks } = require("../../../networks");

task("deploy-crosschain-mock", "Deploys the DropifyCrosschainMock contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying DropifyCrosschainMock contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const args = [
      "84532",
      "0xB08aDb11A45284b96155F63009758014b1eb698C",
      "10344971235874465080",
    ];

    const dropifyCrosschainMockContractFactory =
      await ethers.getContractFactory("DropifyCrosschainMock");
    const dropifyCrosschainMockContract =
      await dropifyCrosschainMockContractFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        dropifyCrosschainMockContract.deployTransaction.hash
      } to be confirmed...`
    );

    await dropifyCrosschainMockContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed DropifyCrosschainMock contract to:",
      dropifyCrosschainMockContract.address
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
          address: dropifyCrosschainMockContract.address,
          constructorArguments: args,
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
      `\n DropifyCrosschainMock contract deployed to ${dropifyCrosschainMockContract.address} on ${network.name}`
    );
  });
