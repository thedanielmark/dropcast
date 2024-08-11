const { networks } = require("../../networks");

task("deploy-test-erc20", "Deploys the TestERC20 contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying TestERC20 contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const testERC20ContractFactory = await ethers.getContractFactory(
      "TestERC20"
    );
    const testERC20Contract = await testERC20ContractFactory.deploy();

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        testERC20Contract.deployTransaction.hash
      } to be confirmed...`
    );

    await testERC20Contract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log("\nDeployed TestERC20 contract to:", testERC20Contract.address);

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
          address: testERC20Contract.address,
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
      `\n TestERC20 contract deployed to ${testERC20Contract.address} on ${network.name}`
    );
  });
