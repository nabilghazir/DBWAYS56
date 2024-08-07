function submitform(event) {
  event.preventDefault;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let desc = document.getElementById("desc").value;

  let dataform = {
    name,
    email,
    phone,
    subject,
    desc,
  };

  console.log("Data form :", dataform);

  if (name === "") {
    alert("Nama harus di isi !!!");
    return;
  } else if (email === "") {
    alert("Email harus di isi !!!");
    return;
  } else if (phone === "") {
    alert("Telephone harus di isi !!!");
    return;
  } else if (subject === "") {
    alert("Subject harus di pilih !!!");
    return;
  } else if (desc === "") {
    alert("Description harus di isi !!!");
    return;
  }

  let ownerEmail = "nabil.ghaziro27@gmail.com";

  let sendEmail = document.createElement("a");
  sendEmail.href = `mailto:${ownerEmail}?subject=${subject}&body=Halo nama saya ${name}. ${desc} kontak saya ${phone}`;

  sendEmail.click();
}
