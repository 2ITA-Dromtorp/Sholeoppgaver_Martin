import "../kvittering.css"

export default function Kvittering() {

    let bestillingsNummer = sessionStorage.getItem("bestillingsNummer");
    let pris = sessionStorage.getItem("pris");
    let data = sessionStorage.getItem("data");

    return (
        <div className="kvitteringDiv">
            <h1 className="kvitteringText">Bestillingsnummer: {bestillingsNummer}</h1>
            <h2>Sum: {pris} kr</h2>
            <h2>Bestilte produkter: {data}</h2>
        </div>
    );
}