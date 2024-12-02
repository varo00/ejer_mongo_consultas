// Problema 1: inserción
// crear coleccion series
db.createCollection('series')
// Inserta los siguientes documentos en la colección videojuegos
db.createCollection('videojuegos')
db.videojuegos.insertMany([{

    title: "The Legend of Zelda: Breath of the Wild",

    genre: ["Action", "Adventure"],

    platform: ["Nintendo Switch", "Wii U"],

    releaseYear: 2017,

    rating: 9.4

},
{

    title: "The Witcher 3: Wild Hunt",

    genre: ["Action", "RPG"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2015,

    rating: 9.2

},
{

    title: "Minecraft",

    genre: ["Survival", "Adventure"],

    platform: ["PC", "PlayStation", "Xbox", "Mobile"],

    releaseYear: 2011,

    rating: 8.7

},
{

    title: "Fortnite",

    genre: ["Battle Royale"],

    platform: ["PC", "PlayStation", "Xbox", "Mobile"],

    releaseYear: 2017,

    rating: 8.0

},
{

    title: "Dark Souls III",

    genre: ["Action", "RPG"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2016,

    rating: 8.9

},
{

    title: "Red Dead Redemption 2",

    genre: ["Action", "Adventure"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2018,

    rating: 9.8

},
{

    title: "Super Mario Odyssey",

    genre: ["Platform"],

    platform: ["Nintendo Switch"],

    releaseYear: 2017,

    rating: 8.9

},
{

    title: "Overwatch",

    genre: ["FPS", "Action"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2016,

    rating: 8.5

},
{

    title: "Grand Theft Auto V",

    genre: ["Action", "Adventure"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2013,

    rating: 9.5

},
{

    title: "Dota 2",

    genre: ["MOBA"],

    platform: ["PC"],

    releaseYear: 2013,

    rating: 8.4

},
{

    title: "League of Legends",

    genre: ["MOBA"],

    platform: ["PC"],

    releaseYear: 2009,

    rating: 8.7

},
{

    title: "Call of Duty: Modern Warfare",

    genre: ["FPS"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2019,

    rating: 8.2

},
{

    title: "Animal Crossing: New Horizons",

    genre: ["Simulation"],

    platform: ["Nintendo Switch"],

    releaseYear: 2020,

    rating: 8.5

},
{

    title: "Halo 3",

    genre: ["FPS"],

    platform: ["Xbox 360"],

    releaseYear: 2007,

    rating: 9.2

},
{

    title: "Elden Ring",

    genre: ["Action", "RPG"],

    platform: ["PlayStation", "Xbox", "PC"],

    releaseYear: 2022,

    rating: 9.5

}
])

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 2: búsqueda
// 1.Encuentra todos los videojuegos cuyo género incluya "Action".
db.videojuegos.find({ "genre": "Action" })
// 2.Encuentra el videojuego con el título "Fortnite" y actualiza su calificación a 8.5.
db.videojuegos.updateOne({ "title": { $eq: "Fortnite" } }, { $set: { "rating": 8.5 } })
// 3.Encuentra todos los videojuegos con una calificación mayor a 9.0 y ordénalos de forma descendente según su año de lanzamiento
db.videojuegos.find({ "rating": { $gt: 9.0 } }).sort({ "releaseYear": -1 })
// 4.Encuentra todos los videojuegos que tengan una calificación mayor a 8.7 y que pertenezcan al género "Adventure".
db.videojuegos.find({ $and: [{ "rating": { $gt: 8.7 } }, { "genre": "Adventure" }] })
// 5.Encuentra el videojuego con el título más largo en la colección
// 6.Encuentra todos los videojuegos lanzados en o después de 2017
db.videojuegos.find({ "releaseYear": { $gte: 2017 } })
// 7.Encuentra dos videojuegos cuyo título comience con la letra "T"
db.videjuegos.find({ title: /^T/ })
// 8.Encuentra todos los videojuegos lanzados después de 2015 y con una calificación mayor o igual a 8.5.
db.videojuegos.find({ $and: [{ releaseYear: { $gt: 2015 } }, { rating: { $gte: 8.5 } }] })
// 9.Encuentra todos los videojuegos cuyo género incluya "RPG" y que tengan plataforma "PC".
db.videojuegos.find({ $and: [{ genre: "RPG" }, { platform: "PC" }] })
// 10.Encuentra el videojuego con el menor número de plataformas
db.videojuegos.find({ platform: { $size: 1 } }).sort({ platform: 1 })
// 11.Encuentra todos los videojuegos cuyo género incluya "FPS" y se lanzaron después de 2010.
db.videojuegos.find({ $and: [{ genre: "FPS" }, { releaseYear: { $gt: 2010 } }] })
// 12.Encuentra y actualiza el título "The Witcher 3: Wild Hunt" para agregar un nuevo género "Fantasy".
db.videojuegos.updateOne({ title: "The Witcher 3: Wild Hunt" }, { $addToSet: { genre: "Fantasy" } })
// 13.Encuentra videojuegos que estén disponibles en más de una plataforma y tengan una calificación de 9.0 o superior.
db.videojuegos.find(
    {
        $and: [
            { $expr: { $gt: [{ $size: "$platform" }, 1] } },
            { rating: { $gte: 9 } }
        ]
    }
)
// 14. Encuentra todos los videojuegos que incluyan en su título la palabra "New".
db.videjuegos.find({ title: /New/ })
// 15.Encuentra el videojuego con el rating más bajo y actualiza su calificación añadiendo 0.5 puntos
db.videojuegos.updateOne({}, { $inc: { rating: 0.5 } }, { sort: { rating: 1 } })

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 3: actualización
// 1.Actualiza el número de plataformas del videojuego "Minecraft" agregando "Nintendo Switch".
db.videojuegos.updateOne({ title: "Minecraft" }, { $addToSet: { platform: "Nintendo Switch" } })
// 2.Actualiza el rating del videojuego "Red Dead Redemption 2" a 9.9.
db.videojuegos.updateOne({ title: "Red Dead Redemption 2" }, { $set: { rating: 9.9 } })
// 3.Agrega el género "Strategy" al videojuego "Dota 2".
db.videojuegos.updateOne({ title: "Dota 2" }, { $push: { genre: "Strategy" } })
// 4.Incrementa en 1 la cantidad de plataformas del videojuego "The Witcher 3: Wild Hunt" añadiendo "Nintendo Switch".
db.videojuegos.updateOne({ title: "The Witcher 3: Wild Hunt" }, { $addToSet: { platform: "Nintendo Switch" } })
// 5.Actualiza "Minecraft" para incluir una sinopsis descriptiva del juego.
db.videojuegos.updateOne({ title: "Minecraft" }, { $set: { sinopsis: "Videojuego de construcción, aventura y supervivencia que se desarrolla en un mundo infinito generado de manera procedural, compuesto por bloques tridimensionales" } })
// 6.Cambia el título de "League of Legends" a "LoL" y su año de lanzamiento a 2010.
db.videojuegos.updateOne({ title: "League of Legends" }, { $set: { title: "LOL", releaseYear: 2010 } })
// 7.Añade la plataforma "Nintendo Switch" a "League of Legends".
db.videojuegos.updateOne({ title: "LOL" }, { $addToSet: { platform: "Nintendo Switch" } })
// 8.Incrementa en 1 el rating de todos los videojuegos que tienen un rating inferior a 8.0.
db.videojuegos.updateMany({ rating: { $lt: 8 } }, { $inc: { rating: 1 } })

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 4: eliminación
// 1.Elimina el documento del videojuego con el título "Fortnite" de la colección.
db.videojuegos.deleteOne({ title: "Fortnite" })
// 2.Elimina el campo de calificación del videojuego "Dark Souls III".
db.videojuegos.updateOne({ title: "Dark Souls III" }, { $unset: { rating: 1 } })
// 3.Elimina todos los videojuegos que tengan un rating inferior a 8.0.
db.videojuegos.deleteMany({ rating: { $lt: 8.0 } })
// 4.Elimina todos los videojuegos que tengan menos de 3 plataformas.
db.videojuegos.deleteMany({
    $expr: { $lt: [{ $size: "$platform" }, 3] }
})
// 5.Elimina todos los videojuegos que sean del género "MOBA".
db.videojuegos.deleteMany({ genre: "MOBA" })
// 6.Elimina el campo de género de todos los videojuegos que tengan un rating inferior a 8.0.
db.videojuegos.updateMany({ rating: { $lt: 8.0 } }, { $unset: { genre: 1 } })
// 7.Elimina todos los videojuegos lanzados antes de 2010.
db.videojuegos.deleteMany({ releaseYear: { $lt: 2010 } })
// 8.Elimina el videojuego con el menor número de plataformas

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 5: indexación
// 1.Crea un índice de texto en el campo "title".
db.videojuegos.createIndex({ title: 1 })
// 2.Crea un índice compuesto en los campos "genre" y "rating".
db.videojuegos.createIndex({ genre: 1, rating: 1 })
// 3.Crea un índice descendente en el campo "title" y ascendente en el campo "releaseYear"
db.videojuegos.createIndex({ title: -1, releaseYear: 1 })
// 4.Crea un índice de texto en el campo "platform".
db.videojuegos.createIndex({ platform: "text" })

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 6: relaciones
// 1.Encuentra todos los usuarios.
db.users.find()
// 2.Encuentra todas las publicaciones.
db.posts.find()
// 3.Encuentra todas las publicaciones escritas por "SuperCoder123".
db.posts.aggregate([{$match: {username: "SuperCoder123"}}])
// 4.Encuentra todas las publicaciones escritas por "TechGuru99".
db.posts.aggregate([{$match: {username: "TechGuru99"}}])
// 5.Encuentra todos los comentarios.
db.comments.find()
// 6.Encuentra todos los comentarios escritos por "SuperCoder123".
db.comments.aggregate([{$match: {username: "SuperCoder123"}}])
// 7.Encuentra todos los comentarios escritos por "TechGuru99".
db.comments.aggregate([{$match: {username: "TechGuru99"}}])
// 8.Encuentra todos los comentarios pertenecientes a la publicación “Shares coding tutorials"