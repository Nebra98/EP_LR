import React, { useEffect, useState } from "react";

const NoveUsluge = () => {
  const [naziv, setNaziv] = useState("");
  //   const [price, setPrice] = useState("");
  const [slika, setSlika] = useState("");
  const [opis, setOpis] = useState("");
  //   const [discount, setDiscount] = useState("");

  let [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/usluga", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "null",
        // Authorization: "Basic " + btoa(username + ":" + password),
      },
      mode: "cors",
    })
      .then((response) => {
        // if (!response.ok) {
        //   Logging.error(`Did not get an ok. got: ${response.statusText}`);
        // }
        return response.json();
      })
      .then((json) => setData(json)); //setData here
    //  .catch((error) => {
    //  Logging.error(`Error getting ad data: ${error.message}`);
    //  }
    //  )
    //   .then(
    //     (json) => console.log(json)
    // localStorage.setItem("token", JSON.stringify(json.token))
  }, []);
  //   const clickHandler1 = () => {
  //     console.log(data);
  //   };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { naziv, slika, opis };

    fetch("http://localhost:5000/usluga", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: "cors",
    });
    window.alert("Dodali ste novu uslugu koja je zove " + naziv);
    window.location.reload();
  };
  const clickHandler = (usluga) => {
    if (window.confirm("Jeste li sigurni da želite ukloniti " + usluga.naziv)) {
      fetch("http://localhost:5000/usluga", {
        method: "DELETE",
        body: usluga,
        mode: "cors",
      });

      //   dispatch(deleteProduct(id));
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
        {/* <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter a price"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div> */}

        <div>
          <label htmlFor="opis">Opis</label>
          <input
            type="text"
            id="opis"
            placeholder="Unesite opis"
            onChange={(e) => setOpis(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="name">Discount</label>
          <input
            type="number"
            id="discount"
            placeholder="Enter a discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div> */}

        <button className="primary" type="submit">
          ADD
        </button>

        <div>
          <h1>Brisanje Usluga</h1>
        </div>
        {/* <button className="primary" type="button" onClick={clickHandler1}>
          click
        </button> */}
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
