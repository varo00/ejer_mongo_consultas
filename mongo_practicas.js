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
db.videojuegos.aggregate([
    {
        $project: {
            title: 1,
            titleLength: { $strLenCP: "$title" }
        }
    },
    {
        $sort: { titleLength: -1 }
    },
    {
        $limit: 1
    }
])
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
db.posts.aggregate([{ $match: { username: "SuperCoder123" } }])
// 4.Encuentra todas las publicaciones escritas por "TechGuru99".
db.posts.aggregate([{ $match: { username: "TechGuru99" } }])
// 5.Encuentra todos los comentarios.
db.comments.find()
// 6.Encuentra todos los comentarios escritos por "SuperCoder123".
db.comments.aggregate([{ $match: { username: "SuperCoder123" } }])
// 7.Encuentra todos los comentarios escritos por "TechGuru99".
db.comments.aggregate([{ $match: { username: "TechGuru99" } }])
// 8.Encuentra todos los comentarios pertenecientes a la publicación “Shares coding tutorials"
db.comments.aggregate([
    { $lookup: { from: "posts", localField: "post", foreignField: "_id", as: "post_info" } },
    { $unwind: "$post_info" },
    { $match: { "post_info.title": "Shares coding tutorials" } }
])

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 7: Consultas avanzadas
// 1.Encuentra todos los videojuegos cuyo título contiene la palabra 'Legend'.
// Encuentra los videojuegos cuyo título termine con la letra 'e'.
// Ordena los videojuegos encontrados por el año de lanzamiento en orden descendente.
db.videojuegos.find({
    $or: [
        { title: /Legend/ }, // que contenga la palabra Legend
        { title: /e$/ } // que termine en e
    ]
}).sort({ releaseYear: -1 })
// 2.Encuentra todos los videojuegos con más de dos géneros.
// Filtra los videojuegos que tengan más de tres plataformas.
// Encuentra el videojuego con más géneros en su lista.
db.videojuegos.aggregate([
    { $unwind: "$genre" },
    { $group: { _id: "$title", genres: { $addToSet: "$genre" } } },
    { $match: { $expr: { $gt: [{ $size: "$genres" }, 2] } } }
])
// 3.Encuentra videojuegos cuya plataforma incluye 'PlayStation' y 'PC'.
// Encuentra videojuegos que tengan exactamente estas dos plataformas.
// Ordena los resultados por calificación en orden descendente.
db.videojuegos.aggregate([
    { $match: { platform: { $all: ["PlayStation", "PC"] } } },
    { $unwind: "$platform" },
    { $group: { _id: "$_id", platforms: { $addToSet: "$platform" }, rating: { $first: "$rating" } } },
    { $match: { $expr: { $eq: [{ $size: "$platforms" }, 2] } } },
    { $sort: { rating: -1 } }
])
// 4.Encuentra videojuegos lanzados después de 2015 que sean de género 'Action' o 'RPG'.
// Encuentra cuántos videojuegos cumplen esta condición.
db.videojuegos.find({
    $and: [
        { releaseYear: { $gt: 2015 } },
        { genre: { $in: ["Action", "RPG"] } }
    ]
}).count()
// Calcula el promedio de calificaciones para estos videojuegos.
db.videojuegos.aggregate([
    { $match: { $and: [{ releaseYear: { $gt: 2015 } }, { genre: { $in: ["Action", "RPG"] } }] } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } }
])

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 8: Operaciones de agrupación y agregación
// 1.Encuentra el promedio de calificaciones y el total de videojuegos por género.
db.videojuegos.aggregate([
    { $unwind: "$genre" },
    { $group: { _id: "$genre", totalVideojuegos: { $sum: 1 }, promedioCalificaciones: { $avg: "$rating" } } },
    { $project: { _id: 0, genero: "$_id", totalVideojuegos: 1, promedioCalificaciones: { $round: ["$promedioCalificaciones", 2] } } }
])
// 2.Calcula también el año más reciente de lanzamiento por género.
db.videojuegos.aggregate([
    { $unwind: "$genre" },
    { $group: { _id: "$genre", latestReleaseYear: { $max: "$releaseYear" } } },
    { $project: { _id: 0, genre: "$_id", latestReleaseYear: 1 } }
])
// 3.Encuentra los géneros con un promedio de calificación superior a 9.0.
db.videojuegos.aggregate([
    { $unwind: "$genre" },
    { $group: { _id: "$genre", avgRating: { $avg: "$rating" } } },
    { $match: { avgRating: { $gt: 9 } } },
    { $project: { _id: 0, genre: "$_id", avgRating: { $round: ["$avgRating", 2] } } }
])
// 4.Supón que cada videojuego se vende 1,000 veces. Calcula el ingreso total por plataforma.
db.videojuegos.aggregate([
    { $unwind: "$platform" },
    { $group: { _id: "$platform", totalIngresos: { $sum: { $multiply: ["$rating", 1000] } } } },
    { $sort: { totalIngresos: -1 } }
])
// 5.Encuentra la plataforma que genera los mayores ingresos.
db.videojuegos.aggregate([
    { $unwind: "$platform" },
    { $group: { _id: "$platform", totalIngresos: { $sum: { $multiply: ["$rating", 1000] } } } },
    { $sort: { totalIngresos: -1 } },
    { $limit: 1 }
])
// 6.Calcula también el promedio de ingresos por plataforma.
db.videojuegos.aggregate([
    { $unwind: "$platform" },
    { $group: { _id: "$platform", avgIngresos: { $avg: { $multiply: ["$rating", 1000] } } } },
    { $sort: { avgIngresos: -1 } }
])
// 7.Combina las colecciones `videojuegos` y `users` para encontrar los nombres de usuarios que compraron juegos de género 'RPG'.
db.videojuegos.aggregate([
    { $match: { genre: "RPG" } },
    { $lookup: { from: "users", localField: "username", foreignField: "username", as: "user_info" } },
    { $unwind: "$user_info" },
    { $project: { _id: 0, username: "$user_info.username" } }
])
// 8.Encuentra también los usuarios que compraron videojuegos con calificación mayor a 9.0.
db.videojuegos.aggregate([
    { $match: { rating: { $gt: 9 } } },
    { $lookup: { from: "users", localField: "username", foreignField: "username", as: "user_info" } },
    { $unwind: "$user_info" },
    { $project: { _id: 0, username: "$user_info.username" } }
])
// 9.Genera un listado de usuarios con los títulos de los videojuegos que han comprado.
db.videojuegos.aggregate([
    { $lookup: { from: "users", localField: "username", foreignField: "username", as: "user_info" } },
    { $unwind: "$user_info" },
    { $project: { _id: 0, username: "$user_info.username", title: "$title" } }
])

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 9: Uso de índices
// 1.Crea un índice compuesto en `title` (texto) y `releaseYear` (descendente).
db.videojuegos.createIndex({ title: "text", releaseYear: -1 })
// 2.Realiza una consulta que utilice este índice y analiza su rendimiento con `explain()`.
db.videojuegos.find(
    { $text: { $search: "League" }, releaseYear: { $gt: 2010 } }
).explain("executionStats")
// 3.Verifica si este índice mejora las consultas que filtran por ambos campos.
db.videojuegos.find(
    { $text: { $search: "League" }, releaseYear: { $gt: 2010 } }
).explain("executionStats")
// 4.Usa el método `explain()` para analizar el uso del índice en una consulta que filtre videojuegos por palabras clave en el título.
db.videojuegos.find({ $text: { $search: "Legend Zelda" } }).explain()
// 5.Prueba la consulta con y sin el índice.
db.videojuegos.find({ title: "The Legend of Zelda: Breath of the Wild" }).explain()
db.videojuegos.dropIndex("title_text_releaseYear_-1")
db.videojuegos.find(
    { $text: { $search: "League" }, releaseYear: { $gt: 2010 } }
).explain("executionStats")
// 6.Compara el tiempo de ejecución y el número de documentos examinados.
// 7.Crea un índice parcial para incluir solo los videojuegos con calificación mayor a 9.0.
db.videojuegos.createIndex({ rating: 1 }, { partialFilterExpression: { rating: { $gt: 9 } } })
// 8.Realiza una consulta que filtre videojuegos con calificación mayor a 9.0 y analiza su rendimiento.
db.videojuegos.find({ rating: { $gt: 9 } }).explain("executionStats")
// 9.Encuentra los videojuegos con el índice parcial que pertenezcan al género 'Adventure'.
db.videojuegos.find({ genre: "Adventure", rating: { $gt: 9 } }).explain("executionStats")

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 10: Relaciones complejas
// 1.Inserta una nueva compra para un usuario existente.
// 2.Encuentra todos los usuarios que han realizado compras.
// 3.Actualiza el historial de compras de un usuario para incluir un nuevo videojuego.
// 4.Inserta más comentarios relacionados con los posts de los usuarios.
// 5.Encuentra todos los comentarios realizados por un usuario específico.
// 6.Cuenta el número total de comentarios por usuario.
// 7.Encuentra todas las publicaciones con sus respectivos comentarios.
// 8.Encuentra las publicaciones con más de dos comentarios.
// 9.Ordena las publicaciones por el número de comentarios de forma descendente.

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 11: Persistencia
// 1.Persiste los resultados de videojuegos agrupados por género en una nueva colección llamada `genre_analysis`.
// 2.Añade también el campo de género con el número de plataformas promedio por género.
// 3.Encuentra los géneros que tienen más de cinco videojuegos y persiste solo esos resultados.
// 4.Exporta la colección `users` en formato JSON.
// 5.Exporta también la colección `series` en formato JSON.
// 6.Genera un archivo JSON con los videojuegos que tienen calificación superior a 9.0.

//----------------------------------------------------------------------------------------------------------------------------------------------

// Problema 12: Ejecución de scripts
// 1.Documenta todas las consultas realizadas en un archivo `mongo_practica.js` para ejecutarlas directamente desde la shell.
// 2.Divide las consultas en secciones según el problema que resuelven.
// 3.Incluye comentarios en cada consulta explicando su propósito.
// 4.Crea una función en JavaScript que permita buscar videojuegos según condiciones específicas pasadas como parámetro.
// 5.Extiende la función para incluir un parámetro opcional que ordene los resultados.
// 6.Agrega un límite de resultados en la función para devolver solo los primeros `n` documentos encontrados.