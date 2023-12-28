const express = require('express')
const app = express()
const init = require('./init/app')
const Listing = require('./models/listening')
const path = require('path')
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs");  // express require internally
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

app.get("/listing/new", async (req, res) => {
    // const allListing = await Listing.find({});
    res.render('list/new')
})
app.get("/listing", async (req, res) => {
    const allListing = await Listing.find({});
    res.render('list/index', { allListing })
})

app.get("/listing/:id", (req, res) => {
    const { id } = req.params;
    Listing.findOne({ _id: id }).then(result => {
        res.render('list/show', { result })
    }).catch(err => {
        console.log(err);
    })
})

app.post('/listing', (req, res) => {
    let { title, description,price, location, country } = req.body

    let newdata = new Listing({
        title: title,
        description: description,
        price:price,
        image_name:"hello",
        image_url:"hello.png",
        location: location,
        country: country
    })

    newdata.save().then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
    res.redirect('/listing')
})


app.listen(PORT, () => {
    console.log('Server listening at ', PORT);
})