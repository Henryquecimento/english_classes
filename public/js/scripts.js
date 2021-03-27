const currentPage = location.pathname;
let menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

/* Pagination */

// [1,..., 13, 14, 15, 16, 17, ..., 20];

function paginate(selectedPage, totalPage) {
  let pages = [],
    oldPage;

  for (let currentPage = 1; currentPage <= totalPage; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPage;
    const afterSelectedPage = currentPage <= selectedPage + 2;
    const beforeSelectedPage = currentPage >= selectedPage - 2;

    if (firstAndLastPage || (beforeSelectedPage && afterSelectedPage)) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(currentPage - 1);
      }

      pages.push(currentPage);

      oldPage = currentPage;
    }
  }

  return pages;
}

const pagination = document.querySelector(".pagination");
const filter = pagination.dataset.filter;
const page = Number(pagination.dataset.page);
const total = Number(pagination.dataset.total);
/* 
const page = +pagination.dataset.page;
const total = +pagination.dataset.total; 
*/
const pages = paginate(page, total);

let elements = "";

for (let page of pages) {
  if (String(page).includes("...")) {
    elements += `<span>${page}</span>`;
  } else {
    /* To prevent that when I refresh the pege, the filter from getting lost */
    if (filter) {
      elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
    } else {
      elements += `<a href="?page=${page}">${page}</a>`;
    }
  }
}

pagination.innerHTML = elements;
