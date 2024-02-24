const express = require("express");
const mongoose = require('mongoose');
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require("dotenv").config();
const Weather = require('./models/Weather');
const UserRoute = require('./routes/userRoutes')

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())


app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
// database connection
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});



app.get('*', checkUser);
app.get("/", (req, res) => res.render("home"));

app.get("/weather", requireAuth, (req, res) => {
    let locDate = { temp: "Temp", disc: "Discription", location: "Location", humidity: "Humidity ", feel: "Feel ", speed: "Speed" };
    res.render("index", { locDate: locDate,});
});


app.post("/weather", requireAuth, async (req, res) => {
    try {
        const location = await req.body.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        const locDate = new Weather({});
        locDate.temp = Math.floor(data.main.temp);
        locDate.disc = data.weather[0].description;
        locDate.feel = data.main.feels_like;
        locDate.humidity = data.main.humidity;
        locDate.speed = data.wind.speed;
        locDate.location = location;
        await locDate.save();
        console.log(locDate);

        res.render("index", { locDate: locDate,});
    } catch (err) {
        console.log(err);
        res.status(400).render("404");
    }
});

// Endpoint to fetch search history
app.get('/search-history', async (req, res) => {
    try {
        const locations = await Weather.find().distinct('location').sort({ createdAt: -1 });
        const searchHistory = locations.slice(0, 5);
        console.log(searchHistory);
        res.json(searchHistory.filter(location => location)); // Filter out null values
    } catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.use(authRoutes);
app.use('/user',UserRoute)

app.listen(3000, () => {
    console.log("Server is running....");
});