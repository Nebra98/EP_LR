import React, { useEffect, useState } from "react";

const NoveSadnice = () => {
  const [naziv, setNaziv] = useState("");
  //   const [price, setPrice] = useState("");
  const [slika, setSlika] = useState("");
  const [tip, setTip] = useState("");
  const [opis, setOpis] = useState("");
  //   const [discount, setDiscount] = useState("");

  let [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/sadnica", {
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
  const clickHandler1 = () => {
    console.log(data);
    console.log(JSON.stringify(data.Sadnice[0].naziv));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { naziv, slika, tip, opis };
    console.log(data);
    fetch("http://localhost:5000/sadnica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: "cors",
    });
    window.alert("You have added a new product called " + naziv);
    // window.location.reload();
  };
  const clickHandler = (sadnica) => {
    console.log(JSON.stringify(sadnica));
    if (window.confirm("Are you sure you want to remove " + sadnica.naziv)) {
      fetch("http://localhost:5000/sadnica", {
        method: "DELETE",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "DELETE",
        }),
        body: JSON.stringify(sadnica),
        mode: "cors",
      });

      window.alert("You have removed " + sadnica.naziv);
      // window.location.reload();
    }
  };

  return (
    <div>
      <header className="block row center color">
        <div>
          <h1>Dodavanje sadnica</h1>
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
          <label htmlFor="tip">Tip</label>
          <input
            type="text"
            id="tip"
            placeholder="Unesite tip"
            required
            onChange={(e) => setTip(e.target.value)}
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
          <h1>Brisanje Sadnica</h1>
        </div>
        <button className="primary" type="button" onClick={clickHandler1}>
          click
        </button>
        {data !== undefined
          ? data.Sadnice.map((sadnica) => (
              <div key={sadnica.id}>
                <button
                  type="button"
                  className="promo"
                  onClick={() => clickHandler(sadnica)}
                >
                  {sadnica.naziv}
                </button>
              </div>
            ))
          : null}
      </form>
    </div>
  );
};

export default NoveSadnice;
