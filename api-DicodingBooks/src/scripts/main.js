// FETCH API

function main() {
  const baseUrl = 'https://books-api.dicoding.dev';

  const getBook = () => {
    fetch(`${baseUrl}/list`)
      .then((response) => {
        return response.json();
      })
      .then((responJson) => {

        if (responJson.error)  {
          showResponseMessage(responJson.message);
        } else {
          renderAllBooks(responJson.books)
        }
      }) 
      .catch((error) => {
        showResponseMessage(error);
      });


      // versi async await

      // const getBook = async () => {
      //   try {
      //     const response = await fetch(`${baseUrl}/list`);
      //     const responseJson = await response.json();
          
      //     if (responseJson.error) {
      //       showResponseMessage(responseJson.message);
      //     } else {
      //       renderAllBooks(responseJson.books);
      //     }
      //   } catch (error) {
      //     showResponseMessage(error);
      //   }
      // };
  };




  const insertBook = (book) => {  
    fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(book),
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getBook();
    })
    .catch((error) => {
      showResponseMessage(error);
    });

    // versi async await

    // const insertBook = async (book) => {
    //   try {
    //     const options = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Auth-Token': '12345',
    //       },
    //       body: JSON.stringify(book),
    //     };
     
    //     const response = await fetch(`${baseUrl}/add`, options);
    //     const responseJson = await response.json();
    //     showResponseMessage(responseJson.message);
    //     getBook();
    //   } catch (error) {
    //     showResponseMessage(error);
    //   }
    // };

    
    
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
    fetch(`${baseUrl}/edit/${book.id}`, {
      method : 'PUT',
      headers : {
        'Content-Type': 'application/json',
        'X-Auth-Token' : '12345',
      },
      body : JSON.stringify(book),
    })
    .then((response) =>{
      return response.json();
    })
    .then((responJson) => {
      showResponseMessage(responJson.message);
      getBook();
    })
    .catch((error) => {
      showResponseMessage(error);
    });

    // versi async await

    // const updateBook = async (book) => {
    //   try {
    //     const options = {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Auth-Token': '12345',
    //       },
    //       body: JSON.stringify(book),
    //     };
    //     const response = await fetch(`${baseUrl}/edit/${book.id}`, options);
    //     const responseJson = await response.json();
    //     showResponseMessage(responseJson.message);
    //     getBook();



  };

  const removeBook = (bookId) => {

    fetch(`${baseUrl}/delete/${bookId}`, {
      method : 'DELETE',
      headers : {
        'X-Auth-Token': '12345'
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((responJson) => {
      showResponseMessage(responJson.message);
      getBook();
    })
    .catch((error) => {
      showResponseMessage(error);
    });

    // versi async await
    
    // const removeBook = (bookId) => {
    //   fetch(`${baseUrl}/delete/${bookId}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'X-Auth-Token': '12345',
    //     },
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((responseJson) => {
    //       showResponseMessage(responseJson.message);
    //       getBook();
    //     })
  }
  
  
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