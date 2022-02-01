require("dotenv").config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL)

const { PUBLIC_KEY, PRIVATE_KEY } = process.env;
const contract = require("../artifacts/contracts/my_NFT.sol/MyNFT.json")
// console.log(contract.abi)
const contract_ABI = contract.abi
const contractAddress = "0x79C7B28981cE38256fDA74D22eC046CC9D771A58";

const nftContract = new web3.eth.Contract(contract_ABI, contractAddress);


//create transcation
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 5000000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });

}

mintNFT("https://gateway.pinata.cloud/ipfs/QmU9v9Khr5dpZY6JvXk4MEwbZWg9hi88gj1hRmtkafZe1R");


// deployedContract address
// 0x79C7B28981cE38256fDA74D22eC046CC9D771A58

// transaction hash:
// 0x80ab482ad6720148d42e154cfa781d397fdb7860eb68949291252444bfaf1e14