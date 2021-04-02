import {Address, Balance} from "@elrondnetwork/erdjs";

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
        let hexValue = $("#DecimalToHexInput").val();
        let intValue = parseInt(hexValue, 10)

        if (intValue.toString(10) != hexValue) {
            outputError("DecimalToHexOutput", "invalid numeric value")
        }

        let valueToDisplay = intValue.toString(16);
        if (valueToDisplay.length % 2 != 0) {
            valueToDisplay = "0" + valueToDisplay;
        }
        output("DecimalToHexOutput", valueToDisplay)
    });

    $("#HexToDecimalBtn").click(async function () {
        let hexValue = $("#HexToDecimalInput").val();
        let intValue = parseInt(hexValue, 16)

        if (intValue.toString(16) != hexValue) {
            outputError("HexToDecimalOutput", "invalid hex value")
        }

        output("HexToDecimalOutput", intValue)
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
        let balance = Balance.eGLD(input)

        output("AmountToDenominatedOutput", balance.toString())
    });

    $("#DenominatedToAmountBtn").click(async function () {
        let input = $("#DenominatedToAmountInput").val();
        let balance = Balance.fromString(input)

        output("DenominatedToAmountOutput", balance.toCurrencyString())
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
