// const testimonialArray = [
//   {
//     user: "Doi 2",
//     quote: "Duhhh mas nya hot nihh",
//     image:
//       "https://images.unsplash.com/photo-1680971579115-90ae7cdfb8b8?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     Rating: 5,
//   },
//   {
//     user: "Doi 3",
//     quote: "Masnya lucu nihhh",
//     image:
//       "https://images.unsplash.com/photo-1680970523018-03a4c6390183?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     Rating: 4,
//   },
//   {
//     user: "Doi 1",
//     quote: "Hmmm boleh juga nihhh",
//     image:
//       "https://images.unsplash.com/photo-1721496724058-93ae25b0d7be?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     Rating: 3,
//   },
//   {
//     user: "Doi 4",
//     quote: "Sok asik.",
//     image:
//       "https://images.unsplash.com/photo-1680970419492-e1013281c23e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     Rating: 2,
//   },
//   {
//     user: "Doi 5",
//     quote: "Gk banget deh",
//     image:
//       "https://images.unsplash.com/photo-1680970102575-7a1749383dc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     Rating: 1,
//   },
// ];
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
