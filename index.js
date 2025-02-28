const express = require("express");
const cors = require("cors")
const { userController, CategoryController } = require('./controller.js');
const multer = require('multer');
const path = require('path')


require("colors")

const PORT = 7000;
const app = express();

app.use(cors())
app.use(express.json())

//routes

//getUsers

app.get('/weddingwire/api/users', async (req, res) => {

    try {
        let response = await userController.getUsers();
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }

})

app.get('/weddingwire/api/users/:id', async (req, res) => {

    try {
        const id = req.params.id
        let response = await userController.getUser(id);
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }
})


//post user

app.post('/weddingwire/api/users', async(req, res)=>{

    try {
        const { name, email, password, role} = req.body
        let response = await userController.postUser({name, email, password, role});
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }
})

// delete user
app.delete('/weddingwire/api/users/:id', async (req, res)=>{

    try {
        const id = req.params.id
        let response = await userController.deleteUser(id);
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }
})

//pathBio

app.patch('/weddingwire/api/users/bio', async (req, res)=>{
    try {
        const {vendorId, newBio} = req.body
        let response = await userController.patchBio({vendorId, newBio});
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }
})

// post service
app.post('/weddingwire/api/services', async(req, res)=>{
    try {
        const {vendorId,  category, description, price_range, availability, locations, images } = req.body;
        let response = await userController.postService(vendorId, { category, description, price_range, availability, locations, images });
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }
})

// delete service
app.delete('/weddingwire/api/services', async(req, res)=>{
    try {

        const {vendorID,  category} = req.body;
      
        let response = await userController.deleteService({vendorID, category});
        res.status(200)
        res.json(response)

    } catch (err) {
        res.status(400);
        res.json(err)
    }
})

//post review
app.post('/weddingwire/api/review', async(req, res)=>{
  
    try{
      const { userId, vendorId, category, comment, rating } = req.body;
       let response = await userController.postReview({ userId, vendorId, category, comment, rating })
       res.status(200)
       res.json(response)
    }catch(err)
    {
        res.status(400);
        res.json(err)
    }
})
// edit review

app.patch('/weddingwire/api/review', async(req, res)=>{
    try{
        const { userId, vendorId, category, comment, rating } = req.body;
         let response = await userController.patchReview({ userId, vendorId, category, comment, rating })
         res.status(200)
         res.json(response)
      }catch(err)
      {
          res.status(400);
          res.json(err)
      }
})

//delete review
app.delete('/weddingwire/api/review', async(req, res)=>{
    try{
        const { userId, vendorId, category } = req.body;
         let response = await userController.deleteReview({ userId, vendorId, category })
         res.status(200)
         res.json(response)
      }catch(err)
      {
          res.status(400);
          res.json(err)
      }
})


// file upload
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'images/');
    },
    filename: (req, file, cb)=>
    {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({storage:storage})

app.use('/images', express.static('images'))

app.post('/upload', upload.single('avatar') , (req, res)=>{
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.file) {
        return res.send('Please select an image to upload');
      } else {
        res.send('File uploaded successfully');
      }
} )


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green.bold.underline)
})