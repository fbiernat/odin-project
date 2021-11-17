function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleIsRead = function () {
  this.isRead = !this.isRead;
  return this.isRead;
};

Book.prototype.setCoverImageURL = function (url) {
  this.coverImageURL = url;
};

const book1 = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  448,
  true
);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 284, true);

const book3 = new Book(
  "Harry Potter i Kamień Filozoficzny",
  "J.K. Rowling",
  328,
  true
);
book3.setCoverImageURL(
  "https://ecsmedia.pl/c/harry-potter-i-kamien-filozoficzny-tom-1-b-iext81316007.jpg"
);

let library = [book1, book2, book3];

function addBookToLibrary(book) {
  library.push(book);
}

function deleteBookFromLibrary(index) {
 library.splice(index, 1);
}

function createBookCardElement(book, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", index);
  if (book.isRead) {
    card.classList.toggle('read');
  }

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const heading = document.createElement("h2");
  heading.classList.add("card-title");
  heading.textContent = book.title;
  cardInfo.appendChild(heading);

  const author = document.createElement("p");
  author.textContent = book.author;
  cardInfo.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = book.pages;
  cardInfo.appendChild(pages);

  card.appendChild(cardInfo);

  const cardControls = document.createElement("div");
  cardControls.classList.add("card-controls");

  const toggleReadButton = document.createElement("button");
  toggleReadButton.classList.toggle("btn");
  if (book.isRead) {
    toggleReadButton.classList.toggle("btn-muted");
  }
  toggleReadButton.textContent = book.isRead ? "Not Read" : "Read";
  toggleReadButton.addEventListener("click", handleClickToggleRead);
  toggleReadButton.setAttribute('data-index', index);
  cardControls.appendChild(toggleReadButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", handleClickDeleteBook);
  deleteButton.setAttribute('data-index', index);
  cardControls.appendChild(deleteButton);

  card.appendChild(cardControls);

  return card;
}

function handleClickToggleRead(e) {
  console.log("Toggle read index " + e.target.dataset.index);
  const index = e.target.dataset.index;

  let isRead = library[index].toggleIsRead();

  const card = document.querySelector(`.card[data-index="${index}"]`);
  card.classList.toggle('read');

  const toggleButton = document.querySelector(`.btn[data-index="${index}"]`);
  toggleButton.classList.toggle('btn-muted');
  toggleButton.textContent = isRead ? 'Not Read' : 'Read';
}

function handleClickDeleteBook(e) {
  console.log("Delete book");

  const index = e.target.dataset.index;
  deleteBookFromLibrary(index);
  updateCards();
}

function updateCards() {
  const cardsContainer = document.querySelector(".cards");

  cardsContainer.textContent = "";
  for (let i = 0; i < library.length; i++) {
    cardsContainer.appendChild(createBookCardElement(library[i], i));
  }
}

updateCards();
