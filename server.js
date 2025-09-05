require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');


app.use(express.static(path.join(__dirname, 'public')));


// Data simulada (Noticias, Niveles)
const niveles = [
    { nombre: 'Comunidad Infantil', edades: '1,5 a 3 años', cupos: '12', guias: ['Guía A', 'Asistente A'] },
    { nombre: 'Casa de Niños', edades: '3 a 6 años', cupos: '24', guias: ['Guía B', 'Asistente B'] },
    { nombre: 'Taller 1', edades: '6 a 9 años', cupos: '24', guias: ['Guía C'] },
    { nombre: 'Taller 2', edades: '9 a 12 años', cupos: '24', guias: ['Guía D'] }
];


const noticias = [
    { titulo: 'Jornada de Puertas Abiertas', resumen: 'Ven a conocer nuestros ambientes preparados y a nuestro equipo.', fecha: 'Sep 2025', img: '/img/news-1.jpg', url: '#' },
    { titulo: 'Taller de Huerto', resumen: 'Niñas y niños sembraron lechugas y aprendieron sobre compostaje.', fecha: 'Ago 2025', img: '/img/news-2.jpg', url: '#' },
    { titulo: 'Celebración de la Lectura', resumen: 'Compartimos cuentos en comunidad con familias y guías.', fecha: 'Jul 2025', img: '/img/news-3.jpg', url: '#' }
];


app.get('/', (req, res) => {
    res.render('index', { niveles, noticias });
});


app.use((req, res) => res.status(404).redirect('/'));


app.listen(PORT, () => console.log(`Aneley v2 corriendo en http://localhost:${PORT}`));