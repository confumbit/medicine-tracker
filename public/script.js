const container = document.querySelector(".blocks-container");

fetch("/medicines")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((medicine) => {
      let block = document.createElement("div");
      block.classList.add("block");
      block.innerText = medicine.name;

      container.appendChild(block);
    });
  });
