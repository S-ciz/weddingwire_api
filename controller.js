
let { data, category_statistics } = require('./data.js')
let { getCurrentDateTime, genId } = require('./utility.js')

const initialImages = ["buffalo.webp", "elephant.jpeg", "leopard.jpeg", "lion.jpg", "orangutan.jpeg", "puppy.webp"]

function userDoesNotExists(email) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].email === email) {
            return false;
        }
    }
    return true;
}

class userController {
    //get users
    static getUsers() {
        return new Promise((resolve, _) => {
            resolve(data)
        })
    }

    //get user
    static getUser(id) {
        return new Promise((resolve, reject) => {
            const user = data.find((u) => u.id === id);
            if (user) {
                resolve(user)
            } else {
                reject({ "result": `User with id ${id} not found!!!` })
            }
        })
    }

    //post user

    static postUser({ name, email, password, role }) {
        let newUser = {
            id: genId(),
            name: name,
            email: email,
            profile_image: initialImages[Math.floor(Math.random() * initialImages.length)],
            password: password,// will be encrypted later
            role: role,// 0 for vendor, 1 for client - default is client
            created_at: getCurrentDateTime()   // in format "12/12/2025 12:30pm"
        }
        if (role == 1) // this is a vendor
        {
            newUser[subscription] = "regular"
            let addition = {
                vendor_details: {
                    bio: "Hello world, this is " + name,
                    services: []
                },
            }

            newUser = { ...newUser, addition }
        }

       

        return new Promise((resolve, reject) => {

            if (userDoesNotExists(email)) {
                data = [newUser, ...data]
                resolve(data)
            } else {
                reject({ "result": `User with email ${email} already exists` })
            }
        })


    }

    //delete user

    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            let user = data.find((u) => u.id === id)
            if (user) {
                data = data.filter((u) => u.id !== id)
                resolve(data)
            } else {
                reject({ "result": `User with id ${id} not found!` })
            }
        })
    }

    //post profile_picture

    static postProfilePicture() //file upload
    {

    }

    //edit bio
    static patchBio({vendorId, newBio}) {
        return new Promise((resolve, reject) => {

            let user = data.find((u) => u.id === vendorId);
            if (user) {
                user.vendor_details.bio = newBio;

                resolve(user);
            } else {
                reject({ "result": `Vendor with id ${vendorId} not found` })
            }
        })
    }

    //post service
    static postService(vendorId, { category, description, price_range, availability, locations, images }) {

        return new Promise((resolve, reject) => {
            let user = data.find((u) => u.id === vendorId);
  
            let categoryCount = user.vendor_details.services.filter(s => s.category === category).length //should be only one category at most
            if (user) {
                if (categoryCount === 1) {
                    reject({ "result": "Cannot create many services of the same category" })
                } else {

                    user.vendor_details.services.push({
                        category, description, price_range, availability, locations, images, average_rating: 0, // 0 by default 
                        reviews: []
                    })

                    resolve(user)
                }

            } else {
                reject({ "result": `User with vendorId ${vendorId} does not exist` })
            }
        })
    }

    //remove service
    static deleteService({vendorID, category}) {
        return new Promise((resolve, reject) => {
            let user = data.find(u => u.id === vendorID);
         

            if (user) {
                user.vendor_details.services = user.vendor_details.services.filter(s => s.category !== category);
                resolve(user)
            } else {
                reject({ "result": `User with id:${vendorID} does not exist` })
            }
        })
    }

    //update service_image

    //post review
    static postReview({ userId, vendorId, category, comment, rating }) {
        return new Promise((resolve, reject) => {

            let user = data.find(u => u.id === userId);
            let vendor = data.find(v => v.id === vendorId);

            if (user && vendor) {
                 let userAlreadyCommented =  vendor.vendor_details.services.find(s => s.category === category).reviews.find(r=> r.user_id == user.id)
                 if(userAlreadyCommented)
                 {
                    reject({"result": `User with id:${userId} already has a review on category ${category} for vendor:${vendorId}`})
                 }else 
                 {
                    vendor.vendor_details.services.find(s => s.category === category).reviews.push({ user_id: userId, comment: comment, rating: rating })
                    resolve(vendor)
                 }
               
            } else {
                reject({ "result": `Either user:${userId} or vendor:${vendorId} does not exist` })
            }
        })
    }

    //edit review
    static patchReview({ userId, vendorId, category, comment, rating }) {
        return new Promise((resolve, reject) => {

            let user = data.find(u => u.id === userId);
            let vendor = data.find(v => v.id === vendorId);

            if (user && vendor) {
                let userReviews = vendor.vendor_details.services.find(s=> s.category === category).reviews;
                let findUser = userReviews.find((r)=> r.user_id == user.id)
                findUser.comment = comment;
                findUser.rating = rating
                resolve(vendor)
            } else {
                reject({ "result": `Either user:${userId} or vendor:${vendorId} does not exist` })
            }
        })
    }
    //delete review
    static deleteReview({ userId, vendorId, category }) {
        return new Promise((resolve, reject) => {

            let user = data.find(u => u.id === userId);
            let vendor = data.find(v => v.id === vendorId);

            if (user && vendor) {
                vendor.vendor_details.services.find(s => s.category === category).reviews = vendor.vendor_details.services.find(s => s.category === category).reviews.filter(r => r.user_id !== userId)
                resolve(vendor)
            } else {
                reject({ "result": `Either user:${userId} or vendor:${vendorId} does not exist` })
            }
        })
    }

}

class CategoryController {

    static incrementCategory(cat) {
        return new Promise((resolve, reject) => {

            if (category_statistics[cat]) {
                category_statistics[cat] += 1;
                resolve(category_statistics)
            } else {
                reject({ "result": `Category ${cat} does not exist` })
            }
        })
    }
}

module.exports = { userController, CategoryController }