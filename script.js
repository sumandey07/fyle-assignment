let username = document.getElementById("username");
let searchRepos, newJson, filter, reposList, i, txtValue, texts, list, newLink;
let loader = document.getElementById("loader");
let form = document.getElementById("form");
let errorHandler = document.getElementById("errorHandler");
let perPageCounters = document.getElementById("perPageCounters");
let currentPage = 1,
  perPage = 10;

function repoLoad(usernames) {
  showLoader();
  fetch(
    `https://api.github.com/users/${usernames.value}/repos?page=1&per_page=${perPage}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "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", //access token for using github api with specific scopes
      },
    }
  ).then((resp) => {
    newLink = parseLink(resp.headers.get("link"));
    resp.json().then((val) => {
      Object.keys(val).forEach((key) => {
        let details2 = "",
          details3 = `<div id="topics" class="d-flex overflow-x-hidden flex-row mx-1 gap-2 mt-4"></div>`;

        const details1 = `<div id="name" class="fs-3 fw-bold">${val[key].name}</div>`;

        // paginate(val, perPage);

        if (val[key].description !== null) {
          details2 = `<div id="desc" class="mt-4">
                  ${val[key].description}
                </div>`;
        } else {
          details2 = `<div id="desc" class="mt-4 fs-5"></div>`;
        }
        newJson = JSON.stringify(val[key].topics);
        newJson = JSON.parse(newJson);

        // if (newJson.length === 0) {
        //   details3 = `<div id="topic" class="align-items-center fw-semibold text-white p-1 rounded-1"></div>`;
        //   document
        //     .getElementById("topics")
        //     .insertAdjacentText("beforeend", details3);
        // } else {
        //   details3 = `<div id="topic" class="align-items-center fw-semibold text-white p-1 rounded-1">${newJson}</div>`;
        //   document
        //     .getElementById("topics")
        //     .insertAdjacentHTML("beforeend", details3);
        // }

        const details = `<div id="repoContainer" class="bg-light bg-gradient col-5 rounded-1 border border-2 p-3 my-4 border-dark d-flex flex-column">${details1} ${details2} ${details3}</div>`;

        document
          .getElementById("reposList")
          .insertAdjacentHTML("beforeend", details);
      });
    });
  });
  document.getElementById("reposList").innerHTML = "";
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

window.onload = function () {
  username.focus();
  searchFunc();
};

function showLoader() {
  loader.classList.add("show");
}

function hideLoader() {
  loader.classList.remove("show");
}

function showError() {
  hideLoader();
  errorHandler.classList.add("show");
}

function hideError() {
  errorHandler.classList.remove("show");
}

function perPageCounter() {
  perPage = perPageCounters.value;
  repoLoad(username);
}

function paginate(items, itemsPerPage, paginationContainer) {
  // const totalPages = Math.ceil(items.length / itemsPerPage);
  // function showItems(page) {
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const pageItems = items.slice(startIndex, endIndex);
  //   const itemsContainer = document.querySelector("#items");
  //   itemsContainer.innerHTML = "";
  //   pageItems.forEach((item) => {
  //     const li = document.createElement("li");
  //     li.innerText = item;
  //     itemsContainer.appendChild(li);
  //   });
  // }
  // function setupPagination() {
  //   const pagination = document.querySelector(paginationContainer);
  //   pagination.innerHTML = "";
  //   for (let i = 1; i <= totalPages; i++) {
  //     const link = document.createElement("a");
  //     link.href = "#";
  //     link.innerText = i;
  //     if (i === currentPage) {
  //       link.classList.add("active");
  //     }
  //     link.addEventListener("click", (event) => {
  //       event.preventDefault();
  //       currentPage = i;
  //       showItems(currentPage);
  //       const currentActive = pagination.querySelector(".active");
  //       currentActive.classList.remove("active");
  //       link.classList.add("active");
  //     });
  //     pagination.appendChild(link);
  //   }
  // }
  // showItems(currentPage);
  // setupPagination();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userUrl = `https://api.github.com/users/${username.value}`;
  showLoader();
  fetch(userUrl, {
    method: "GET",
    headers: {
      Authorization:
        "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", //access token for using github api with specific scopes
    },
  }).then((res) => {
    if (res.status !== 404) {
      hideError();
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
      document.getElementById("title").innerHTML = "User Not Found - Github";
      document.getElementById("mainContainer").style.display = "none";
      showError();
    }
  });
});

function searchFunc() {
  searchRepos = document.getElementById("searchRepos").value.toLowerCase();
  reposList = document.getElementById("reposList");
  list = document.querySelectorAll("#repoContainer");
  filter = reposList.getElementsByTagName("div");
  for (i = 0; i < filter.length; i++) {
    txtValue = list[i].getElementsByTagName("div");
    texts = txtValue.innerHTML || txtValue.textContent;
    if (texts.toLowerCase().indexOf(searchRepos) > -1) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}
