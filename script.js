let searchRepos, filter, li, reposList, i, a, txtValue;
let loader = document.getElementById("loader");
let form = document.getElementById("form");

function showLoader() {
  loader.classList.add("show");
}

function hideLoader() {
  loader.classList.remove("show");
}

function searchFunc() {
  searchRepos = document.getElementById("searchRepos");
  filter = searchRepos.value.toLowerCase();
  reposList = document.getElementById("reposList");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = document.getElementById("username");
  const userUrl = `https://api.github.com/users/${username.value}`;
  // URLSearchParams.append();
  let params = new URLSearchParams(document.location.search);
  username = params.get("username");
  showLoader();
  let original = document.getElementById("userDetails").innerHTML;
  fetch(userUrl, {
    method: "GET",
    headers: {
      Authorization: "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", //access token for using github api with specific scopes
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
        document.getElementById("twitterLink").innerHTML =
          data.twitter_username;
        document.getElementById("profileImage").src = data.avatar_url;
        fetch(`${userUrl}/repos?page=1&per_page=10`, {
          method: "GET",
          headers: {
            Authorization: "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", //access token for using github api with specific scopes
          },
        }).then(async (resp) => {
          for (var pair of resp.headers.entries()) {
            if (pair[0] === "link") {
              // this.setState({
              //   total: pair[1],
              // });
            }
          }
          return resp.json().then((val) => {
            Object.keys(val).forEach((key) => {
              let details2 = "",
                details3 = "";

              const details1 = `<div id="name" class="fs-4 fw-bold">${val[key].name}</div>`;

              if (val[key].description !== null) {
                details2 = `<div id="desc" class="mt-3">
                  ${val[key].description}
                </div>`;
              } else {
                details2 = `<div id="desc" class="mt-3"></div>`;
              }

              Object.keys(val[key].topics).forEach((key1) => {
                details3 = `<div id="topics" class="d-flex flex-row me-1 mt-2"><span class="badge text-bg-primary">${val[key].topics[key1]}</span></div>`;

                // document
                //   .getElementById("topics")
                //   .insertAdjacentHTML("beforeend", details3);
              });

              const details = `<div class="col-5 border border-2 p-3 my-3 border-dark d-flex flex-column">${details1} ${details2} ${details3}</div>`;

              document
                .getElementById("reposList")
                .insertAdjacentHTML("beforeend", details);
            });
          });
        });
        document.getElementById("reposList").innerHTML = "";
      });
    } else {
      const errorHandler = `<h3 class="position-absolute top-50 start-50 translate-middle">Your search did not match any users</h3>`;
      document.getElementById("userDetails").style.display = "block";
      document.getElementById("userDetails").innerHTML = errorHandler;
    }
  });
  document.getElementById("userDetails").innerHTML = original;
});
