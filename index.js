document.addEventListener("DOMContentLoaded", function () {
  const belumSelesaiDibacaList = document.getElementById(
    "belum-selesai-dibaca"
  );
  const selesaiDibacaList = document.getElementById("selesai-dibaca");
  const form = document.getElementById("form-buku");

  // Fungsi untuk membuat ID unik menggunakan timestamp
  function generateUniqueId() {
    return +new Date();
  }

  // Fungsi untuk membuat elemen buku baru
  function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.dataset.id = book.id;
    bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>ID: ${book.id}</p> <!-- Menampilkan ID -->
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <button class="delete-btn">Delete</button>
            <button class="move-btn">${
              book.isComplete ? "Move to Unfinished" : "Move to Finished"
            }</button>
        `;
    const deleteButton = bookElement.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
    });
    const moveButton = bookElement.querySelector(".move-btn");
    moveButton.addEventListener("click", function () {
      if (book.isComplete === false) {
        moveBookToUnfinished(book.id);
        console.log(book.isComplete);
      } else {
        moveBookToFinished(book.id);
        console.log(book.isComplete);
      }
    });
    return bookElement;
  }

  // Fungsi untuk menambahkan buku ke dalam rak yang sesuai
  function addBookToShelf(book) {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      selesaiDibacaList.appendChild(bookElement);
    } else {
      belumSelesaiDibacaList.appendChild(bookElement);
    }

    const deleteButton = bookElement.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
      bookElement.remove();
      saveBooksToLocalStorage();
    });

    const moveButtonBeda = bookElement.querySelector(".move-btn");
    moveButtonBeda.addEventListener("click", function () {
      if (book.isComplete === true) {
        bookElement.remove();
        book.isComplete = false;
        addBookToShelf(book);
      } else if (book.isComplete === false) {
        bookElement.remove();
        book.isComplete = true;
        addBookToShelf(book);
      } else {
        console.error("Invalid value for 'isComplete':", book.isComplete);
      }
      saveBooksToLocalStorage();
    });
  }

  // Fungsi untuk menyimpan data buku ke localStorage
  function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  function getBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  function updateMoveButton(bookElement, isComplete) {
    const moveButton = bookElement.querySelector(".move-btn");
    moveButton.textContent = isComplete
      ? "Move to Unfinished"
      : "Move to Finished";
  }

  let books = getBooksFromLocalStorage();
  console.log("Books:", books);

  if (!Array.isArray(books)) {
    books = [];
  }

  books.forEach(function (book) {
    addBookToShelf(book);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = document.getElementById("isComplete").checked;
    const id = generateUniqueId();
    const newBook = {
      id: id,
      title: title,
      author: author,
      year: parseInt(year),
      isComplete: isComplete,
    };
    addBookToShelf(newBook);
    books.push(newBook);
    saveBooksToLocalStorage();
    form.reset();
  });

  function moveBookToFinished(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      const book = books[bookIndex];
      const bookElement = document.querySelector(`.book[data-id="${bookId}"]`);
      if (!book.isComplete) {
        selesaiDibacaList.appendChild(bookElement);
        book.isComplete = true;
        updateMoveButton(bookElement, true);
        saveBooksToLocalStorage();
      }
    }
  }

  function moveBookToUnfinished(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      const book = books[bookIndex];
      const bookElement = document.querySelector(`.book[data-id="${bookId}"]`);
      if (book.isComplete) {
        belumSelesaiDibacaList.appendChild(bookElement);
        book.isComplete = false;
        updateMoveButton(bookElement, false);
        saveBooksToLocalStorage();
      }
    }
  }

  // Fungsi untuk menghapus buku dari rak
  function deleteBook(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      const bookElement = document.querySelector(`.book[data-id="${bookId}"]`);
      bookElement.remove();
      saveBooksToLocalStorage();
    }
  }

  //   const starterBooksContainer = document.getElementById("starter-books");

  const starterBooksJSON = [
    {
      id: 3619427508299,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      isComplete: false,
    },
    {
      id: 6482193761547,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      isComplete: false,
    },
    {
      id: 5021847062910,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      isComplete: false,
    },
    {
      id: 7173659824613,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      isComplete: false,
    },
    {
      id: 1234567890123,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      isComplete: false,
    },
    {
      id: 9876543210987,
      title: "Moby-Dick",
      author: "Herman Melville",
      year: 1851,
      isComplete: false,
    },
    {
      id: 2468013579246,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      year: 1997,
      isComplete: false,
    },
    {
      id: 1357924680135,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      isComplete: false,
    },
    {
      id: 3141592653589,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      year: 1847,
      isComplete: false,
    },
    {
      id: 2718281828459,
      title: "Frankenstein",
      author: "Mary Shelley",
      year: 1818,
      isComplete: false,
    },
  ];

  function createStarterBookElement(book) {
    console.log("Creating book element for:", book.title);
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>ID: ${book.id}</p>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <button class="move-btn starter">Moving books to the reading list</button>
        `;

    const moveButtonStarter = bookElement.querySelector(".starter");
    moveButtonStarter.addEventListener("click", function () {
      if (book.isComplete === true) {
        addBookToShelf(book);
        books.push(book);
        saveBooksToLocalStorage();
      } else if (book.isComplete === false) {
        addBookToShelf(book);
        books.push(book);
        saveBooksToLocalStorage();
      } else {
        console.error("Invalid value for 'isComplete':", book.isComplete);
      }

      bookElement.remove();
    });
    return bookElement;
  }

  function addStarterBooks() {
    console.log("Adding starter books");
    const starterBooksContainer = document.getElementById("starter-books");

    if (!starterBooksContainer) {
      console.error("Starter books container not found");
      return;
    }

    if (!starterBooksJSON || starterBooksJSON.length === 0) {
      console.warn("No starter books data available");
      return;
    }

    starterBooksJSON.forEach(function (book) {
      const bookElement = createStarterBookElement(book);
      starterBooksContainer.appendChild(bookElement);
    });

    console.log("Starter books added successfully");
  }

  addStarterBooks();
});
