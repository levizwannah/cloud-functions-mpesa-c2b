const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Mpesa = require("mpesa-node");

admin.initializeApp();
const url = "https://cloud-functions-link";
// config object
const config = {
    key: "consumer key",
    secret: "consumer secret",
    passkey: "till passkey",
    shortcode: "short code",
    till: "till"
}

const mpesaClient = new Mpesa({
    consumerKey: config.key,
    consumerSecret: config.secret,
    enviroment: "production",
    shortCode: config.shortcode,
    lipaNaMpesaShortCode: config.till,
    lipaNaMpesaShortPass: config.passkey,
    //... and others as necessary.
    //... check the documentation for mpesa-node library
});

// hit this url to register your urls
exports.registerUrl = functions.https.onRequest((req, res) => {
    mpesaClient.c2bRegister(`${url}/c2bValidate`, `${url}/c2bSuccess`)
})

// do your confirmation logic in here
exports.c2bSuccess = functions.https.onRequest((req, res) => {

    // this is not really necessary, but let's just respond
    res.json({
        ResultCode: 0,
        ResultDesc: "Accepted"
    });

    // do confirmation logic here
    const type = req.TransactionType;
    const transactionId = req.TransID;
    const time = req.TransTime;
    const amount = req.TransAmount;
    const shortCode = req.BusinessShortCode;
    const ref = req.BillRefNumber;
    const invoiceNum = req.InvoiceNumber;
    const balance = req.OrgAccountBalance;
    const otherTransId = req.ThirdPartyTransID;
    const phone = req.MSISDN;
    const firstName = req.FirstName;
    const middleName = req.MiddleName;
    const lastName = req.LastName;

    // do some work here

});

// do your validation logic in here
exports.c2bValidate = functions.https.onRequest((req, res) => {
  
    const type = req.TransactionType;
    const transactionId = req.TransID;
    const time = req.TransTime;
    const amount = req.TransAmount;
    const shortCode = req.BusinessShortCode;
    const ref = req.BillRefNumber;
    const invoiceNum = req.InvoiceNumber;
    const balance = req.OrgAccountBalance;
    const otherTransId = req.ThirdPartyTransID;
    const phone = req.MSISDN;
    const firstName = req.FirstName;
    const middleName = req.MiddleName;
    const lastName = req.LastName;

    let accepted = true;

    // do something here to manipulate the `accepted` variable.
    // code...
    
    // do validation logic here

    if(!accepted){
        return res.json({
            ResultCode: "C2B00016", // look at daraja for the various codes
            ResultDesc: "Rejected"
        });
    }

    return res.json({
        ResultCode: 0,
        ResultDesc: "Accepted"
    });
});



