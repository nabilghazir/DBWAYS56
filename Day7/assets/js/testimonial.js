class Testimonial {
  #quote = "";
  #image = "";

  constructor(satu, dua) {
    this.#quote = satu;
    this.#image = dua;
  }

  get satu() {
    return this.#quote;
  }
  get dua() {
    return this.#image;
  }

  get tiga() {
    throw new Error("Harus ada nama !!");
  }

  get testimonialYgy() {
    return `<div class="container-grid-testi" id="container-grid-testi">
            <img src="${this.satu}">
            <p class="quote">${this.dua}</p>
            <p class="user">- ${this.tiga}</p>
            </div>
            `;
  }
}

class TestimonialTiga extends Testimonial {
  #user = "";

  constructor(satu, dua, tiga) {
    super(satu, dua);
    this.#user = tiga;
  }

  get tiga() {
    return "user :" + this.#user;
  }
}

class TestimonialEmpat extends Testimonial {
  #company = "";

  constructor(satu, dua, empat) {
    super(satu, dua);
    this.#company = empat;
  }

  get tiga() {
    return "Company :" + this.#company;
  }
}

const testi1 = new TestimonialTiga(
  "https://images.unsplash.com/photo-1721496724058-93ae25b0d7be?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Wahh boleh juga nihhh",
  "Doi 1"
);

const testi2 = new TestimonialTiga(
  "https://images.unsplash.com/photo-1680971579115-90ae7cdfb8b8?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Duhhh mas nya hot nihh",
  "Doi 2"
);

const testi3 = new TestimonialEmpat(
  "https://images.unsplash.com/photo-1680970523018-03a4c6390183?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Masnya lucu nihhh",
  "Doi 3"
);

let testimonialArray = [testi1, testi2, testi3];

let testimonialYgy = "";

for (let i = 0; i < testimonialArray.length; i++) {
  testimonialYgy += testimonialArray[i].testimonialYgy;
}
document.getElementById("container-grid").innerHTML = testimonialYgy;
