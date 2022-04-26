const fragment = document.createDocumentFragment();
const cardProductos = document.querySelector(`#card-productos`);

let stockBase = 10;
const templateCard = document.querySelector(`#template-card`).content;


const productos = [
    {
        nombre: "am1",
        precio: 500,
        marca: "ford",
        stock: stockBase,
        id: 1
    },
    {
        nombre: "am2",
        precio: 1000,
        marca: "chevrolet",
        stock: stockBase,
        id: 2
    }
]


    const mostrarProductos = () => {
        productos.map(producto => {
            templateCard.querySelector(`.card-title`).textContent = templateCard.querySelector(`.card-title`).textContent + producto.nombre;
            const clone = templateCard.cloneNode(true);
            fragment.append(clone);
        });

        cardProductos.append(fragment);
    }

    window.localStorage.setItem('productos', JSON.stringify(productos))

    mostrarProductos()












