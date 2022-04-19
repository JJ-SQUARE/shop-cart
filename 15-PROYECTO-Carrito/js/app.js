
const shopCartHTML = document.querySelector('#carrito');
const coursesList  = document.querySelector('#lista-cursos');
const shopCartCont = document.querySelector('#lista-carrito tbody');
const clrShopCart  = document.querySelector('#vaciar-carrito');
const body = document.querySelector('body');


let shopCart = [];


const eventsApp = () => {
    // Añade curso
    body.addEventListener('click', addToCart);
    // Elimina curso
    shopCartHTML.addEventListener('click', removeCourse);
    // Vaciar carrito
    clrShopCart.addEventListener('click', () => {
        shopCart = [];
        clearCart(); // elimina todo el HTML.
    }) 
}

const addToCart = e => {
    e.preventDefault();
    const selectedCourse = e.target.parentElement.parentElement;
    if (e.target.classList.contains('agregar-carrito')) {
        
        readCourseInfo(selectedCourse);

    } // else if (e.target.classList.contains('borrar-curso')) {
    //     console.log(e);
    //     // removeCourse(selectedCourse);
    // }
}

const readCourseInfo = course => {
    // console.log(course);
    const courseInfo = {
        image: course.querySelector('img').src,
        name:  course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id:    course.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    // Checks if an element already exists in the shopCart

    const exists = shopCart.some(course => course.id === courseInfo.id);
    if (exists) {
        const courses = shopCart.map(course => {
            if (course.id === courseInfo.id) {
                course.amount++;
                return course;
            } else {
                return course;
            }
        });
        shopCart = [...courses]
    } else {
        // Add elements to Shop Cart
        // shopCart.push(courseInfo);
        shopCart = [...shopCart, courseInfo];
    }
    
    // console.log(shopCart);
    shopCartOnScreen();

}

const shopCartOnScreen = () => {
    // cleans HTML
    clearCart();

    shopCart.forEach(course => {

        // CHecks HTML and generates HTML
        const { image, name, price, amount, id } = course;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${image}">
            </td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `

        // add in Shop Cart HTML in tbody.
        shopCartCont.append(row);
    });
    console.log(shopCart);
}

const clearCart = () => {

    // forma lenta    
    // shopCartCont.innerHTML = '';

    while(shopCartCont.firstChild) {
        shopCartCont.removeChild(shopCartCont.firstChild);
    }

}

const removeCourse = (e) => {
    if (e.target.classList.contains('borrar-curso')) {
        const courseID = e.target.getAttribute('data-id');
        // Elimina del arreglo de shopCart por su data-id 
        shopCart = shopCart.filter(course => course.id !== courseID);
        console.log(shopCart);
        shopCartOnScreen(); // vuelve a iterar sobre el carrito y muestra su HTML.
    }
}

eventsApp();