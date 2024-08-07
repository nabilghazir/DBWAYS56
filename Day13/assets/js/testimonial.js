const promise = new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "https://api.npoint.io/f4feaf723e9a1f4212bf", true);
  xhttp.onload = function () {
    if (xhttp.status === 200) {
      resolve(JSON.parse(xhttp.responseText));
    } else if (xhttp.status >= 400) {
      reject("Data Error!!!");
    }
  };
  xhttp.onerror = function () {
    reject("Network Error!!!");
  };
  xhttp.send();
});

let testimonialArray = [];

async function ambilArray() {
  try {
    const response = await promise;
    console.log(response);
    testimonialArray = response;
    console.log(testimonialArray);
    allTestimonial();
  } catch (err) {
    console.log(err);
  }
}

ambilArray();

async function allTestimonial() {
  let testimonial = "";

  testimonialArray.forEach((kotak) => {
    testimonial += `<div class="container-grid-testi" id="container-grid-testi">
          <img src="${kotak.image}">
          <p class="quote">${kotak.quote}</p>
          <p class="user">- ${kotak.user}</p>
           <p class="user">${kotak.Rating} <i class="fa-sharp fa-regular fa-star" style="color: #ff4500;"></i> </p>
           </div>
           `;
  });

  document.getElementById("container-grid").innerHTML = testimonial;

  console.log("masuk sini ga sih");
}

function testimonialFilter(rating) {
  let filterTestimonial = "";

  const filtered = testimonialArray.filter((kotak) => {
    return kotak.Rating === rating;
  });

  filtered.forEach((kotak) => {
    filterTestimonial += `<div class="container-grid-testi" id="container-grid-testi">
          <img src="${kotak.image}">
          <p class="quote">${kotak.quote}</p>
          <p class="user">- ${kotak.user}</p>
           <p class="user">${kotak.Rating} <i class="fa-sharp fa-regular fa-star" style="color: #ff4500;"></i> </p>
          </div>
          `;
  });
  document.getElementById("container-grid").innerHTML = filterTestimonial;
}

allTestimonial();
