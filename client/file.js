async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const id = document.getElementById('id').value;

    const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            title,
            author
        })
    });

    if (response.status === 201) {
        document.getElementById('message').textContent = 'Book added successfully!';
        loadBooks();
    } else {
        document.getElementById('message').textContent = 'Error occurred while adding the book.';
    }
}