let carrito = {};
const cardProductos = document.querySelector(`#card-productos`);
const templateCard = document.getElementById(`template-card`).content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const itemCarrito = document.getElementById('item-carrito');
const footer = document.getElementById('footer');
let stockBase = 10;


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async () => {
    try {
        const res = await fetch('catalogo.json');
        const data = await res.json();
        pintarCards(data)
    } catch (error) {
        console.log(error);
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('.card-title').textContent = producto.nombre;
        templateCard.querySelector('.card-precio').textContent = producto.precio;
        templateCard.querySelector('.card-marca').textContent = producto.marca;
        templateCard.querySelector(`.catImg`).setAttribute('src', producto.img);
        templateCard.querySelector(`.btn-comprar`).dataset.id = producto.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cardProductos.appendChild(fragment);
}
       
items.addEventListener('click', e => addCarrito(e))

itemCarrito.addEventListener('click', e => btnAccion(e))

const addCarrito = (e) => {
    e.target.classList.contains('btn-comprar') && setCarrito(e.target.parentElement) // operador AND
    e.stopPropagation();
}

const setCarrito = objeto => {
    const producto = {
        nombre: objeto.querySelector('.card-title').textContent,
        precio: objeto.querySelector(`.card-precio`).textContent,
        marca: objeto.querySelector(`.card-marca`).textContent,
        id: objeto.querySelector('.btn-comprar').dataset.id,
        cantidad: 1,
    }
    carrito.hasOwnProperty(producto.id) && (producto.cantidad += carrito[producto.id].cantidad) //operador AND y ++
    
    carrito[producto.id] = {...producto} //spread
    pintarCarrito();
}

const pintarCarrito = () => {
    itemCarrito.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-suma').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-resta').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    itemCarrito.appendChild(fragment);
    pintarFooter();
}

const pintarFooter = () => {
    footer.innerHTML = '';
    if(Object.keys(carrito).lenght === 0){
        footer.innerHTML = 
        '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'
        return;
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {};
        pintarCarrito();
    })
}

const btnAccion = e => {
    if(e.target.classList.contains('btn-suma')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = {...producto};
        pintarCarrito();
    }

    if(e.target.classList.contains('btn-resta')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito();
    }
    
    e.stopPropagation();
}

//  !Testeo de botones  //

const suma = document.getElementsByClassName('btn-suma');

console.log(suma);