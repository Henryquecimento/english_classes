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

  /*   console.log(pages); */
}
