
export const batchSend = async (batchTransferContract, performActions, assetaddress, id, _to) => {
    let newId = id.split(',').map((num)=>{
        return Number(num)
      })     
    try {
        await performActions(async (kit) => {
            const {defaultAccount} = kit;
            await batchTransferContract.methods.bulkTransfer(defaultAccount, assetaddress, _to, newId).send({from: defaultAccount});
        });
    } catch (e) {
        console.log({e});
    }
};


export const getEvent = async (batchTransferContract, performActions, _to ) => {
    const eventName = "TransferSuccessfull";
    console.log("event block")
    try {
        await performActions(async (kit) => {
            const {defaultAccount} = kit;

            const options = {
                fromBlock: 0,
                toBlock: 1000000, // can also pass "latest"
                order: "desc",
                // Configure event filters (filter on indexed event parameters)
                filters: {
                  from: defaultAccount,
                  to: _to
                }
              };
            const events = await batchTransferContract.events.getEvents(eventName, options).send({from: defaultAccount});
            console.log(events[0].eventName);
            console.log(events[0].data);
            return events[0].data;
        });
      
    } catch (e) {
        console.log({e});
    }
};


export const getCount = async (batchTransferContract) => {
    try {

        const value =  await batchTransferContract.methods.get().call();
        return value
    } catch (e) {
        console.log({e});
    }
};

