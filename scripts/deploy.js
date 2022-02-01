async function main(){
    const MyNFT=await ethers.getContractFactory("MyNFT");

    const myNFT=await MyNFT.deploy();
    console.log("contract deployed to address :",myNFT.address)
}

main()
.then(()=>process.exit(0))
.catch((err)=>{
    console.log(err)
    process.exit(1);
})

// deployedContract address
// 0x79C7B28981cE38256fDA74D22eC046CC9D771A58

