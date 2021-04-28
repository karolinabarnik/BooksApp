{
    'use strict';
    const select = {
        templateOf: {
            bookTemplate: '#template-book',
        },

        containerOf: {
            bookList: '.books-list',

        },
    }

    render() {
        const thisBook = this;

        for (let book of thisBook.dataSource.books) {
            const generatedHTML = templates.bookTemplate({
                id: book.id,
                name: book.name,
                price: book.price,
                rating: book.rating,
                image: book.image,
                details: book.details,

            });
            thisBook.
        }

    }

}
