const socket = io();

// Manejador para agregar un nuevo producto al feed
socket.on('newProduct', (newProduct) => {
    const container = document.getElementById('productFeed');

    const divContainer = document.createElement('div');
    divContainer.classList.add('product');

    const title = document.createElement('h4');
    title.innerText = newProduct.title;

    const thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', newProduct.thumbnail);
    thumbnail.setAttribute('alt', newProduct.thumbnail);

    const divInfo = document.createElement('div');
    divInfo.classList.add('product__info');

    const description = document.createElement('p');
    description.innerText = newProduct.description;

    const price = document.createElement('p');
    price.innerText = `Precio: ${newProduct.price}`;

    const stock = document.createElement('p');
    stock.innerText = `Stock: ${newProduct.stock}`;

    const code = document.createElement('p');
    code.innerText = `Código: ${newProduct.code}`;

    divInfo.append(description, price, stock, code);
    divContainer.append(title, thumbnail, divInfo);
    container.append(divContainer);
});

// Manejador para actualizar el feed de productos
socket.on('updateFeed', (products) => {
    const container = document.getElementById('productFeed');
    container.innerHTML = '';

    products.forEach((product) => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('product');

        const title = document.createElement('h4');
        title.innerText = product.title;

        const thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', product.thumbnail);
        thumbnail.setAttribute('alt', product.thumbnail);

        const divInfo = document.createElement('div');
        divInfo.classList.add('product__info');

        const description = document.createElement('p');
        description.innerText = product.description;

        const price = document.createElement('p');
        price.innerText = `Precio: ${product.price}`;

        const stock = document.createElement('p');
        stock.innerText = `Stock: ${product.stock}`;

        const code = document.createElement('p');
        code.innerText = `Código: ${product.code}`;

        divInfo.append(description, price, stock, code);
        divContainer.append(title, thumbnail, divInfo);
        container.append(divContainer);
    });
});

// Manejador para eliminar un producto
const deleteButton = document.getElementById('deleteProduct');
deleteButton.addEventListener('click', async () => {
    try {
        const productCode = document.getElementById('productCodeToDelete').value;
        const response = await fetch(`/api/realTimeProducts/${productCode}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.href = '/api/realTimeProducts';
        } else {
            console.error('Error al eliminar el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
});
