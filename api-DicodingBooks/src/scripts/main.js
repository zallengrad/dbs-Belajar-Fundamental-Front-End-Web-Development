function main() {
  const baseUrl = 'https://books-api.dicoding.dev';

  const getBook = () => {
    // instance
    const xhr = new XMLHttpRequest();


    // callback when error comes
    xhr.onload = function(){
      const responJson = JSON.parse(this.responseText);

      if (responJson.error)  {
        showResponseMessage(responJson.message);
      } else {
        renderAllBooks(responJson.books)
      }
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    // Membuat GET request dan menetapkan target URL
    xhr.open('GET', `${baseUrl}/list`);
 
    // Mengirimkan request
    xhr.send();




  };




  const insertBook = (book) => {  
    // membuat instance
    const xhr = new XMLHttpRequest();

    // menetapkan callback 
    xhr.onload = function() {
      const responJson = JSON.parse(this.responseText);
      showResponseMessage(responJson.message);
      getBook();
    }

    xhr.onerror = function() {
      showResponseMessage();
    }

    // membuat post request target url 
    xhr.open('POST', `${baseUrl}/add`);

    // menetapkan properti content type dan x auth pada header request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    // mengirimkan request dan menyiapkan json.stringify
    xhr.send(JSON.stringify(book));
  };

  const updateBook = (book) => {
    // membuat instance
    const xhr = new XMLHttpRequest();

    // callback
    xhr.onload = function(){
      const responJson = JSON.parse(this.responseText);
      showResponseMessage(responJson.message);
      getBook();
    };

    xhr.onerror = function() {
      showResponseMessage();
    };

    xhr.open('PUT', `${baseUrl}/edit/${book.id}`);

    // menetapkan properti
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    //mengirimkan request
    xhr.send(JSON.stringify(book));

  };

  const removeBook = (bookId) => {
    // membuat instance
    const xhr = new XMLHttpRequest();

    // menetapkan callback
    const responJson = JSON.parse(this.responseText);
    showResponseMessage(responJson.message);
    getBook();
    
    xhr.onerror = function () {
      showResponseMessage();
    };
        // Membuat DELETE request dan menetapkan target URL
        xhr.open('DELETE', `${baseUrl}/delete/${bookId}`);
 
        // Menetapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader('X-Auth-Token', '12345');
     
        // Mengirimkan request
        xhr.send();
  
  
  
  };



  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;