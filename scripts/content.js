const pname = document.getElementsByClassName(
  "p-nickname vcard-username d-block"
)[0].innerHTML;

const userPayload = async () => {
  const url = `https://api.github.com/users/${pname}/events/public`;
  const newUrl = url.replace(/\s/g, "");
  const response = await fetch(newUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const myJson = await response.json();

  const authors = myJson.filter((data) =>
    data.payload.hasOwnProperty("commits")
  );

  let badge = document.createElement("li");
  if (authors.length === 0) {
    const url = `https://api.github.com/users/${pname}`;
    const newUrl = url.replace(/\s/g, "");
    const response = await fetch(newUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Use the same styling as the publish information in an article's header
    const text ='<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="email IDs:"/>';
    badge.innerHTML = text;
    badge.appendChild(document.createElement("br"));
    badge.classList.add("vcard-detail", "pt-1");
    let atag;
    atag = document.createElement("a");
    atag.id = `myLink`;
    atag.classList.add("Link--primary");
    atag.textContent = response.email;
    console.log(response);
    badge.appendChild(atag);
    badge.appendChild(document.createElement("br"));
  } else {
    const emails = authors.map(
      (author) => author.payload.commits[0].author.email
    );
    // Use the same styling as the publish information in an article's header
    const text =
      '<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="email IDs:"/>';
    badge.innerHTML = text;
    badge.appendChild(document.createElement("br"));
    badge.classList.add("vcard-detail", "pt-1");
    let atag;
    let arr = []
    emails.map((email, index) => {
      atag = document.createElement("a");
      atag.id = `myLink${index}`;
      atag.classList.add("Link--primary");
      if (!email.includes("@users.noreply.github.com") && !arr.includes(email)) {
        atag.textContent = `${email}`;
        arr.push(email);
      }
      badge.appendChild(atag);
      badge.appendChild(document.createElement("br"));
    });
  }

  const nameDiv = document.getElementsByClassName("vcard-details")[0];
  nameDiv.appendChild(badge);
};

userPayload();
