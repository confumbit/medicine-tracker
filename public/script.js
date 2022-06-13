const container = document.querySelector(".blocks-container");

fetch("/medicines")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    order = "";
    data.forEach((medicine) => {
      let block = document.createElement("div");
      block.classList.add("block");
      block.innerText = medicine.name;

      if (medicine.quantity <= medicine.min) {
        block.style.backgroundImage =
          "radial-gradient(rgb(231, 213, 207), rgb(167, 122, 111))";
        let arr = medicine.name.split(/(\s+)/);
        arr.forEach((i) => {
          if (i == " ") {
            order += "%20";
          } else {
            order += i;
          }
        });
        order += "%0A";
      }

      let quan = document.createElement("span");
      quan.classList.add("quan");
      quan.innerText = medicine.quantity;

      block.appendChild(quan);
      container.appendChild(block);

      console.log(order);
      let wa = document.querySelector(".walink");
      wa.href = "https://wa.me/919440089794?text=" + order;
    });
  });
