const container = document.querySelector(".blocks-container");

fetch("/medicines")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((medicine) => {
      let block = document.createElement("div");
      block.classList.add("block");
      block.innerText = medicine.name;

      let quan = document.createElement("span");
      quan.classList.add("quan");
      quan.innerText = medicine.quantity;

      block.appendChild(quan);
      container.appendChild(block);
    });
  });
