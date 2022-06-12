import React, { useEffect, useState } from "react";

const NoveUsluge = () => {
  const [naziv, setNaziv] = useState("");
  const [cijena, setCijena] = useState("");
  const [slika, setSlika] = useState("");
  const [opis, setOpis] = useState("");

  let [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/usluga", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "null",
      },
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => setData(json));
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { naziv, slika, opis, cijena };

    fetch("http://localhost:5000/usluga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    window.alert("Dodali ste novu uslugu koja se zove " + naziv);
    window.location.reload();
  };
  const clickHandler = (usluga) => {
    if (window.confirm("Jeste li sigurni da želite ukloniti " + usluga.naziv)) {
      fetch("http://localhost:5000/usluga", {
        method: "DELETE",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "DELETE",
        }),
        body: JSON.stringify(usluga),
        mode: "cors",
      });

      window.alert("Uklonili ste " + usluga.naziv);
      window.location.reload();
    }
  };

  return (
    <div>
      <header className="block row center color">
        <div>
          <h1>Dodavanje Usluga</h1>
        </div>
      </header>
      <form className="form" onSubmit={submitHandler}>
        <div></div>
        <div>
          <label htmlFor="naziv">Naziv</label>
          <input
            type="text"
            id="naziv"
            placeholder="Unesite naziv"
            required
            onChange={(e) => setNaziv(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="slika">Slika</label>
          <input
            type="text"
            id="slika"
            placeholder="Unesite URL slike"
            required
            onChange={(e) => setSlika(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cijena">Cijena</label>
          <input
            type="number"
            id="cijena"
            placeholder="Unesite cijenu"
            required
            onChange={(e) => setCijena(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="opis">Opis</label>
          <input
            type="text"
            id="opis"
            placeholder="Unesite opis"
            onChange={(e) => setOpis(e.target.value)}
          />
        </div>

        <button className="primary" type="submit">
          ADD
        </button>

        <div>
          <h1>Brisanje Usluga</h1>
        </div>
        {data !== undefined
          ? data.Usluge.map((usluga) => (
              <div key={usluga.id}>
                <button
                  type="button"
                  className="promo"
                  onClick={() => clickHandler(usluga)}
                >
                  {usluga.naziv}
                </button>
              </div>
            ))
          : null}
      </form>
    </div>
  );
};

export default NoveUsluge;
