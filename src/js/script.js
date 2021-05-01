{
    'use strict';
    const select = {
        templateOf: {
            bookTemplate: '#template-book',
        },

        containerOf: {
            bookList: '.books-list',
            filters: '.filters',

        },
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
    };

    class BooksList {
        constructor() {
            const thisBook = this;

            thisBook.initData();
            thisBook.getElements();
            thisBook.renderInBook();
            thisBook.initActions();
        }

        initData() {
            const thisBook = this;
            thisBook.data = dataSource.books;

            thisBook.favoriteBooks = [];
            thisBook.filters = [];

        }

        getElements() {
            const thisBook = this;
            thisBook.booksContainer = document.querySelector(select.containerOf.bookList);
            thisBook.booksFiltered = document.querySelector(select.containerOf.filters);
        }

        renderInBook() {
            const thisBook = this;

            for (let book of thisBook.data) {
                const generatedHTML = templates.bookTemplate({
                    id: book.id,
                    name: book.name,
                    price: book.price,
                    rating: book.rating,
                    image: book.image,
                    details: book.details,
                    ratingBgc: thisBook.determineRatingBgc(book.rating),
                    ratingWidth: book.rating * 10
                });

                const elem = utils.createDOMFromHTML(generatedHTML);
                thisBook.booksContainer.appendChild(elem);
            }

        }


        initActions() {
            const thisBook = this;

            thisBook.booksContainer.addEventListener('click', function (event) {
                event.preventDefault();
                const image = event.target.offsetParent;
                const idBook = image.getAttribute('data-id');
                if (!thisBook.favoriteBooks.includes(idBook)) {
                    image.classList.add('favorite');
                    thisBook.favoriteBooks.push(idBook);
                } else {
                    image.classList.remove('favortie');
                    thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(idBook), 1);
                }
            });

            thisBook.booksFiltered.addEventListener('change', function (event) {
                event.preventDefault();
                const clickedElem = event.target;
                if (clickedElem.type === 'checkbox' && clickedElem.tagName === 'INPUT' && clickedElem.name === 'filter') {
                    if (clickedElem.checked) thisBook.filters.push(clickedElem.value);
                    else thisBook.filters.splice(thisBook.filters.indexOf(clickedElem.value), 1);
                }
                thisBook.filterBooks();
            });
        }
        filterBooks() {
            const thisBook = this;

            for (let book of thisBook.data) {
                let shouldBeHidden = false;

                for (const filter of thisBook.filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }

                const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
                if (shouldBeHidden) {
                    bookCover.classList.add('hidden');
                } else {
                    bookCover.classList.remove('hidden');
                }
            }
        }
        determineRatingBgc(rating) {
            let background = '';
            if (rating < 6) {
                background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
                background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
                background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if (rating > 9) {
                background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
            }

            return background;
        }
    }

    new BooksList();
}
