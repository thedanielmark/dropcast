const { networks } = require("../../networks");

task("deploy-vault", "Deploys the DropifyVault contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying DropifyVault contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const dropifyVaultContractFactory = await ethers.getContractFactory(
      "DropifyVault"
    );
    const dropifyVaultContract = await dropifyVaultContractFactory.deploy();

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        dropifyVaultContract.deployTransaction.hash
      } to be confirmed...`
    );

    await dropifyVaultContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed DropifyVault contract to:",
      dropifyVaultContract.address
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
          address: dropifyVaultContract.address,
          constructorArguments: [],
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
      `\n DropifyVault contract deployed to ${dropifyVaultContract.address} on ${network.name}`
    );
  });
