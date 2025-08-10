let baseUrl = "https://api.github.com/users";
let username = document.getElementById("username");
let searchRepos, newJson, filter, reposList, i, txtValue, texts, list, repoNum;
let loader = document.getElementById("loader");
let emptyHandler = document.getElementById("error");
let form = document.getElementById("form");
let mainForm = document.getElementById("main");
let perPageCounters = document.getElementById("perPageCounters");
// let paginateContainer = document.getElementById("")
let currentPage = 1,
  perPage = 10;

if (typeof process === "undefined") {
  Object.defineProperty(this, "process", {
    value: {
      env: {},
    },
    writable: true,
  });
}

function parseLink(s) {
  const output = {};
  const regex = /<([^>]+)>; rel="([^"]+)"/g;

  let m;
  while ((m = regex.exec(s))) {
    const [_, v, k] = m;
    output[k] = v;
  }

  return output;
}

// function paginate(repoNum, items, perPage) {
//   if (newLink["prev"] === undefined) {
//     document.getElementById("prevPage").disabled = true;
//   }
//   const totalPages = Math.ceil(repoNum / perPage);
//   function showItems(page) {
//     currentPage = page;
//     repoLoad(username);
//   }
//   function setupPagination() {
//     const pagination = document.querySelector("#paginationCont");
//     if (newLink["next"] === undefined) {
//       document.getElementById("nextPage").disabled = true;
//     } else {
//       // pagination.innerHTML = "";
//       for (let i = 1; i <= totalPages; i++) {
//         const link = document.createElement("a");
//         link.href = newLink["next"];
//         console.log(link.href);
//         link.innerText = i;
//         if (i === currentPage) {
//           link.classList.add("active");
//         }
//         link.addEventListener("click", (event) => {
//           event.preventDefault();
//           currentPage = i;
//           showItems(currentPage);
//           const currentActive = pagination.querySelector(".active");
//           currentActive.classList.remove("active");
//           link.classList.add("active");
//         });
//         pagination.appendChild(link);
//       }
//     }
//   }
//   showItems(currentPage);
//   setupPagination();
// }

function repoLoad(usernames) {
  showLoader();
  fetch(`${baseUrl}/${usernames.value}`, {
    method: "GET",
    headers: {
      Authorization: process.env.ACCESS_TOKEN,
    },
  }).then(async (res) => {
    return res.json().then((value) => {
      repoNum = value.public_repos;
    });
  });

  fetch(
    `${baseUrl}/${usernames.value}/repos?page=${currentPage}&per_page=${perPage}`,
    {
      method: "GET",
      headers: {
        Authorization: process.env.ACCESS_TOKEN,
      },
    }
  ).then((resp) => {
    resp.json().then((val) => {
      newLink = parseLink(resp.headers.get("link"));
      hideLoader();
      // paginate(repoNum, val);

      Object.keys(val).forEach((key) => {
        let details2 = "",
          details3 = `<div id="topics" class="d-flex overflow-x-hidden flex-row mx-1 gap-2 mt-4"></div>`;

        const details1 = `<div id="name" class="fs-3 fw-bold">${val[key].name}</div>`;

        if (val[key].description !== null) {
          details2 = `<div id="desc" class="mt-4">
                  ${val[key].description}
                </div>`;
        } else {
          details2 = `<div id="desc" class="mt-4 fs-5"></div>`;
        }

        newJson = Object.values(val[key].topics);

        if (newJson.length !== 0) {
          let j = 0;
          while (j < 4) {
            details3 = `<div id="topic" class="align-items-center mt-4 fw-semibold text-white p-1 rounded-1">${
              newJson[Object.keys(newJson)[j]]
            }</div>`;
            document
              .getElementById("topics")
              .insertAdjacentHTML("beforeend", details3);
            j++;
          }
        }

        const details = `<div id="repoContainer" class="bg-light bg-gradient col-5 rounded-1 border border-2 p-3 my-4 border-dark d-flex flex-column">${details1} ${details2} ${details3}</div>`;

        document
          .getElementById("reposList")
          .insertAdjacentHTML("beforeend", details);
      });
    });
  });
  document.getElementById("reposList").innerHTML = "";
}

window.onload = function () {
  username.focus();
<<<<<<< HEAD
};

document.addEventListener("DOMContentLoaded", () => {
  searchFunc();
});
=======
  searchFunc();
};
>>>>>>> d4897e4cbf9047016a9a1a2f506cba9f1a9f02f7

function searchFunc() {
  searchRepos = document.getElementById("searchRepos").value.toLowerCase();
  reposList = document.getElementById("reposList");
  list = document.querySelectorAll("#repoContainer");
  filter = reposList.getElementsByTagName("div");
  for (i = 0; i < filter.length; i++) {
<<<<<<< HEAD
    texts = list[i].getElementsByTagName("div")[0].innerText;
=======
    txtValue = list[i].getElementsByTagName("div")[0];
    texts = txtValue.innerHTML || txtValue.textContent;
>>>>>>> d4897e4cbf9047016a9a1a2f506cba9f1a9f02f7
    if (texts.toLowerCase().indexOf(searchRepos) > -1) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

function showLoader() {
  loader.classList.add("show");
}

function hideLoader() {
  loader.classList.remove("show");
}

function perPageCounter() {
  perPage = perPageCounters.value;
  repoLoad(username);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (username.value.trim().length === 0) {
    emptyHandler.style.display = "block";
    emptyHandler.focus();
    emptyHandler.innerHTML = "Please enter a username.";
  } else {
    mainForm.style.animation = "move 4s ease-in-out 2";
    mainForm.style.transform = "translate(" + 0 + "px," + -750 + "px)";
    const userUrl = `${baseUrl}/${username.value}`;
    showLoader();
    fetch(userUrl, {
      method: "GET",
      headers: {
        Authorization: process.env.ACCESS_TOKEN,
      },
    }).then((res) => {
      if (res.status !== 404) {
        res.json().then((data) => {
          hideLoader();
          document.getElementById("main").style.height = "max-content";
          document.getElementById("userDetails").style.display = "block";
          document.getElementById("title").innerHTML = `${data.name} - Github`;
          document.getElementById("name").innerHTML = data.name;
          document.getElementById("bio").innerHTML = data.bio;
          document.getElementById("location").innerHTML = data.location;
          document.getElementById("profileLink").innerHTML = data.html_url;
          document.getElementById("profileLink").href = data.html_url;
          document.getElementById(
            "twitterLink"
          ).innerHTML = `https://twitter.com/${data.twitter_username}`;
          document.getElementById(
            "twitterLink"
          ).href = `https://twitter.com/${data.twitter_username}`;
          document.getElementById("profileImage").src = data.avatar_url;
          repoLoad(username);
        });
      } else {
        emptyHandler.style.display = "block";
        emptyHandler.innerHTML = "User Not Found";
      }
    });
  }
});
