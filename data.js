let data = [ 
    {
       id: '1',
       name: "john",
       email: "john@example.com",
       profile_image: "/img/profile_1.png",
       password: "12344",// should be encrypted
       role: 0 ,// 0 for vendor, 1 for client - default is client
       created_at: "12/12/2025 12:30pm"
    }, 
    {
        id: '2',
        name: "Eddie murphy",
        email: "eddie@example.com",
        profile_image: "/img/profile_2.png",
        password: "12344",// should be encrypted
        role: 1,
        subscription: "regular", // regular by default, limited to to 3 image posts, pro account to be later discussed
        created_at: "12/12/2025 12:30pm",
        vendor_details: {
            bio: "I am a photographer with 12+ years experience in marketing and media personality",
            services: [ {category: "Photography",
                         description: "description about my photography offers",
                         price_range: [1000, 5000],
                        availability: ["Mon", "Wednesday", "Friday"], 
                        locations: ["Johannesburg", "Pretoria"], 
                        images: ["/images/photograph1.jpeg", "/images/photography2.jpg", "/images/photography3.png"],
                        average_rating: 0, // 0 by default 
                        reviews: [{user_id: 1, comment: "Give that man a belt!", rating: 3}]
                        }, 
                        {   category: "Venue",
                            price_range: [10000, 50000],
                            description: "description about my venue offer",
                            availability: ["Mon", "Wednesday", "Friday"], 
                            locations: ["Johannesburg", "Pretoria"], 
                            images: ["/images/location.jpeg", "/images/location.jpg", "/images/location.png"],
                            average_rating: 0, // 0 by default 
                            reviews: [{user_id: 1, comment: "Terrible locations man. Dodgy areas", rating: 0}]
                            }, 
                     ],
        }
     }
]

//keeps track of the most selected categories
let category_statistics = {
    "Photography": 0,
    "Decoration": 0,
    "Catering": 0,
    "Livestock": 0,
    "Venue": 0,
    "Equipment": 0,
    "Entertainment": 0,
    "Transportation": 0,
    "Bridal_attire":0,
    "Groom_attire":0,
    "Legal_advice": 0,
    "Wedding_planning":0
}

module.exports = {data, category_statistics}