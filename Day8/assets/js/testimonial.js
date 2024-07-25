// class Testimonial {
//   #quote = "";
//   #image = "";

//   constructor(satu, dua) {
//     this.#quote = satu;
//     this.#image = dua;
//   }

//   get satu() {
//     return this.#quote;
//   }
//   get dua() {
//     return this.#image;
//   }

//   get tiga() {
//     throw new Error("Harus ada nama !!");
//   }

//   get testimonialYgy() {
//     return `<div class="container-grid-testi" id="container-grid-testi">
//             <img src="${this.satu}">
//             <p class="quote">${this.dua}</p>
//             <p class="user">- ${this.tiga}</p>
//             </div>
//             `;
//   }
// }

// class TestimonialTiga extends Testimonial {
//   #user = "";

//   constructor(satu, dua, tiga) {
//     super(satu, dua);
//     this.#user = tiga;
//   }

//   get tiga() {
//     return "user :" + this.#user;
//   }
// }

// class TestimonialEmpat extends Testimonial {
//   #company = "";

//   constructor(satu, dua, empat) {
//     super(satu, dua);
//     this.#company = empat;
//   }

//   get tiga() {
//     return "Company :" + this.#company;
//   }
// }

// const testi1 = new TestimonialTiga(
//   "https://images.unsplash.com/photo-1721496724058-93ae25b0d7be?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "Wahh boleh juga nihhh",
//   "Doi 1"
// );

// const testi2 = new TestimonialTiga(
//   "https://images.unsplash.com/photo-1680971579115-90ae7cdfb8b8?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "Duhhh mas nya hot nihh",
//   "Doi 2"
// );

// const testi3 = new TestimonialEmpat(
//   "https://images.unsplash.com/photo-1680970523018-03a4c6390183?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "Masnya lucu nihhh",
//   "Doi 3"
// );

// let testimonialArray = [testi1, testi2, testi3];

// let testimonialYgy = "";

// for (let i = 0; i < testimonialArray.length; i++) {
//   testimonialYgy += testimonialArray[i].testimonialYgy;
// }
// document.getElementById("container-grid").innerHTML = testimonialYgy;

const testimonialArray = [
  {
    user: "Doi 2",
    quote: "Duhhh mas nya hot nihh",
    image:
      "https://images.unsplash.com/photo-1680971579115-90ae7cdfb8b8?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Rating: 5,
  },
  {
    user: "Doi 3",
    quote: "Masnya lucu nihhh",
    image:
      "https://images.unsplash.com/photo-1680970523018-03a4c6390183?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Rating: 4,
  },
  {
    user: "Doi 1",
    quote: "Hmmm boleh juga nihhh",
    image:
      "https://images.unsplash.com/photo-1721496724058-93ae25b0d7be?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Rating: 3,
  },
  {
    user: "Doi 4",
    quote: "Sok asik.",
    image:
      "https://images.unsplash.com/photo-1680970419492-e1013281c23e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Rating: 2,
  },
  {
    user: "Doi 5",
    quote: "Gk banget deh",
    image:
      "https://images.unsplash.com/photo-1680970102575-7a1749383dc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Rating: 1,
  },
];

function allTestimonial() {
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
}

allTestimonial();

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
