import {Address} from "@elrondnetwork/erdjs";
import BigNumber from "bignumber.js";
import {TokenPayment} from "@elrondnetwork/erdjs/out";

declare var $: any;

$(async function () {
    $("#Bech32AddressToHexBtn").click(async function () {
        let address = $("#Bech32AddressToHexInput").val();
        if (address.length != 62) {
            outputError("Bech32AddressToHexOutput", "invalid length")
            return
        }

        let account = Address.fromBech32(address)
        output("Bech32AddressToHexOutput", account.hex())
    });

    $("#HexToBech32AddressBtn").click(async function () {
        let address = $("#HexToBech32AddressInput").val();
        if (address.length != 64) {
            outputError("HexToBech32AddressOutput", "invalid length")
            return
        }

        let account = Address.fromHex(address)
        output("HexToBech32AddressOutput", account.bech32())
    });


    $("#DecimalToHexBtn").click(async function () {
        let intValue = $("#DecimalToHexInput").val();

        let bn = new BigNumber(intValue, 10);
        let bnStr = bn.toString(16);
        if(bnStr.length % 2 != 0) {
            bnStr = "0" + bnStr;
        }
        output("DecimalToHexOutput", bnStr)
    });

    $("#HexToDecimalBtn").click(async function () {
        let hexValue = $("#HexToDecimalInput").val();

        let bn = new BigNumber(hexValue, 16);

        output("HexToDecimalOutput", bn.toString(10))
    });

    $("#DecimalToBase64Btn").click(async function () {
        let decimalValue = $("#DecimalToBase64Input").val();
        let buff = Buffer.from(decimalValue, 'ascii');

        output("DecimalToBase64Output", buff.toString("base64"))
    });

    $("#Base64ToDecimalBtn").click(async function () {
        let base64Value = $("#Base64ToDecimalInput").val();
        let buff = Buffer.from(base64Value, 'base64');

        output("Base64ToDecimalOutput", buff.toString("ascii"))
    });

    $("#AmountToDenominatedBtn").click(async function () {
        let input = $("#AmountToDenominatedInput").val();
        let balance = TokenPayment.egldFromAmount(input)

        output("AmountToDenominatedOutput", balance.toString())
    });

    $("#DenominatedToAmountBtn").click(async function () {
        let input = $("#DenominatedToAmountInput").val();
        let balance = TokenPayment.egldFromBigInteger(input)

        output("DenominatedToAmountOutput", balance.toPrettyString())
    });

    $("#StringToHexBtn").click(async function () {
        let input = $("#StringToHexInput").val();
        output("StringToHexOutput", Buffer.from(input, 'ascii').toString('hex'))
    });

    $("#HexToStringBtn").click(async function () {
        let input = $("#HexToStringInput").val();
        output("HexToStringOutput", Buffer.from(input, 'hex').toString('utf8'))
    });

    $("#StringToBase64Btn").click(async function () {
        let input = $("#StringToBase64Input").val();
        output("StringToBase64Output", Buffer.from(input, 'ascii').toString('base64'))
    });

    $("#Base64ToStringBtn").click(async function () {
        let input = $("#Base64ToStringInput").val();
        output("Base64ToStringOutput", Buffer.from(input, 'base64').toString('ascii'))
    });

    $("#HexToBase64Btn").click(async function () {
        let hexValue = $("#HexToBase64Input").val();
        let buff = Buffer.from(hexValue, 'hex');

        output("HexToBase64Output", buff.toString("base64"))
    });

    $("#Base64ToHexBtn").click(async function () {
        let base64Value = $("#Base64ToHexInput").val();
        let buff = Buffer.from(base64Value, 'base64');

        output("Base64ToHexOutput", buff.toString("hex"))
    });
});

function output(container: any, output: any) {
    let content = `
<div class="card mt-1">
 <div class="card-header">Result</div>
  <div class="card-body">
    ${output}
  </div>
</div>
`
    $(`#${container}`).html(content);
}

function outputError(container: any, message: string) {
    let content = `
<div class="card mt-1">
 <div class="card-header">Error</div>
  <div class="card-body">
    <samp>${message}</samp>
  </div>
</div>
`
    $(`#${container}`).html(content);
}
