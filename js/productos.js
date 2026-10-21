/* Catálogo de productos — edita aquí nombres, descripciones y precios (COP).
   Para agregar un producto: copia un bloque, cambia el id y guarda la foto en /assets. */
window.WHATSAPP = [
  { numero: '573213802050', etiqueta: 'WhatsApp 321 380 2050' },
  { numero: '573147376012', etiqueta: 'WhatsApp 314 737 6012' }
];

window.CATEGORIAS = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'tortas', nombre: 'Tortas' },
  { id: 'cupcakes', nombre: 'Cupcakes' },
  { id: 'postres', nombre: 'Postres' },
  { id: 'galletas', nombre: 'Galletas y más' }
];

window.PRODUCTOS = [
  {
    id: 'torta-red-velvet', cat: 'tortas', nombre: 'Torta red velvet',
    desc: 'Bizcocho rojo aterciopelado con crema de queso, goteo de crema y frutos rojos.',
    img: 'assets/red-velvet.jpg', alt: 'Torta red velvet con crema y frutos rojos',
    pres: [
      { n: 'Porción', d: '1 porción individual', p: 11000 },
      { n: 'Torta pequeña', d: '8 porciones aprox.', p: 75000 },
      { n: 'Torta mediana', d: '12 porciones aprox.', p: 105000 }
    ]
  },
  {
    id: 'torta-zanahoria', cat: 'tortas', nombre: 'Torta de zanahoria',
    desc: 'Bizcocho húmedo de zanahoria y especias, con crema de queso y nueces pecanas.',
    img: 'assets/carrot-cake.jpg', alt: 'Torta de zanahoria con crema y nueces',
    pres: [
      { n: 'Porción', d: '1 porción individual', p: 10000 },
      { n: 'Torta pequeña', d: '8 porciones aprox.', p: 68000 },
      { n: 'Torta mediana', d: '12 porciones aprox.', p: 95000 }
    ]
  },
  {
    id: 'torta-chocolate-frutos', cat: 'tortas', nombre: 'Torta de chocolate y frutos rojos',
    desc: 'Crema de mantequilla, goteo de chocolate y una corona de frutos rojos y flores.',
    img: 'assets/torta-chocolate.jpg', alt: 'Torta con goteo de chocolate y frutos rojos',
    pres: [
      { n: 'Porción', d: '1 porción individual', p: 12000 },
      { n: 'Torta pequeña', d: '8 porciones aprox.', p: 85000 },
      { n: 'Torta mediana', d: '12 porciones aprox.', p: 120000 }
    ]
  },
  {
    id: 'cheesecake-arandanos', cat: 'tortas', nombre: 'Cheesecake de arándanos',
    desc: 'Base de galleta, relleno frío y cremoso, cubierto con salsa de arándanos.',
    img: 'assets/cheesecake-arandanos.jpg', alt: 'Cheesecake con salsa de arándanos',
    pres: [
      { n: 'Porción', d: '1 porción individual', p: 12000 },
      { n: 'Torta pequeña', d: '8 porciones aprox.', p: 85000 },
      { n: 'Torta mediana', d: '12 porciones aprox.', p: 120000 }
    ]
  },
  {
    id: 'cupcakes-red-velvet', cat: 'cupcakes', nombre: 'Cupcakes red velvet',
    desc: 'Bizcocho suave con frosting de crema, decorado con frutos rojos.',
    img: 'assets/cupcakes-red-velvet.jpg', alt: 'Cupcakes red velvet con frosting de crema',
    pres: [
      { n: 'Unidad', d: '1 cupcake', p: 6000 },
      { n: 'Caja x6', d: '6 cupcakes', p: 33000 },
      { n: 'Caja x12', d: '12 cupcakes', p: 62000 }
    ]
  },
  {
    id: 'brownies-frutos-rojos', cat: 'postres', nombre: 'Brownies con frutos rojos',
    desc: 'Chocolate intenso, crema batida y fruta fresca.',
    img: 'assets/brownies-frutos-rojos.jpg', alt: 'Brownies con crema y frutos rojos',
    pres: [
      { n: 'Unidad', d: '1 brownie', p: 8500 },
      { n: 'Caja x4', d: '4 brownies', p: 30000 },
      { n: 'Caja x8', d: '8 brownies', p: 58000 }
    ]
  },
  {
    id: 'postre-chocolate', cat: 'postres', nombre: 'Postre de chocolate en vaso',
    desc: 'Capas de mousse y crema de chocolate con frutos rojos y virutas.',
    img: 'assets/postre-chocolate.jpg', alt: 'Postre de chocolate con frutos rojos',
    pres: [
      { n: 'Unidad', d: '1 vaso', p: 12000 },
      { n: 'Pack x4', d: '4 vasos', p: 44000 }
    ]
  },
  {
    id: 'parfait-yogurt', cat: 'postres', nombre: 'Parfait de yogur',
    desc: 'Yogur cremoso, granola crocante, fruta fresca y miel.',
    img: 'assets/parfait-yogurt.jpg', alt: 'Vasito de yogur con granola y frutas',
    pres: [
      { n: 'Unidad', d: '1 vaso', p: 10000 },
      { n: 'Pack x4', d: '4 vasos', p: 36000 }
    ]
  },
  {
    id: 'galletas-avena', cat: 'galletas', nombre: 'Galletas de avena',
    desc: 'Avena, chips de chocolate, almendras y frutos rojos.',
    img: 'assets/galletas-avena.jpg', alt: 'Galletas de avena con chips de chocolate',
    pres: [
      { n: 'Unidad', d: '1 galleta', p: 4500 },
      { n: 'Caja x6', d: '6 galletas', p: 24000 },
      { n: 'Caja x12', d: '12 galletas', p: 45000 }
    ]
  },
  {
    id: 'cake-pops', cat: 'galletas', nombre: 'Cake pops',
    desc: 'Bizcocho de chocolate cubierto de chocolate con confeti de colores.',
    img: 'assets/cake-pops.jpg', alt: 'Cake pops de chocolate con confeti',
    pres: [
      { n: 'Unidad', d: '1 cake pop', p: 5000 },
      { n: 'Caja x6', d: '6 cake pops', p: 27000 },
      { n: 'Caja x12', d: '12 cake pops', p: 52000 }
    ]
  },
  {
    id: 'macarons', cat: 'galletas', nombre: 'Macarons',
    desc: 'Merengue de almendra con relleno cremoso, en tonos vino y marfil.',
    img: 'assets/macarons.jpg', alt: 'Macarons vino y marfil sobre mármol',
    pres: [
      { n: 'Unidad', d: '1 macaron', p: 5000 },
      { n: 'Caja x6', d: '6 macarons', p: 28000 },
      { n: 'Caja x12', d: '12 macarons', p: 54000 }
    ]
  }
];
