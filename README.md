# ParkFlex


- Our project aims to develop a comprehensive online marketplace for parking spots, addressing the common urban challenge of finding convenient and affordable parking. It seeks to bridge the gap between parking spot owners who have underutilized space and drivers facing difficulties in locating parking, especially in densely populated areas. By leveraging technology, the platform aspires to optimize parking space usage, reduce urban congestion, and offer a convenient solution for both spot owners and seekers.

# Deployed Link: https://park-flex.netlify.app

# Repo Link: https://git.cs.dal.ca/ketulp/csci-5709-grp-09

# Backend URL: [<https://park-flex-api.onrender.com/api>](https://park-flex-api.onrender.com/api)


### Group Information
- Members:  

    * Aditya Maheshbhai Purohit (B00952865) aditya.purohit@dal.ca
	* Ketul Patel (B00960940) kt390621@dal.ca 	 
    * Mann Patel (B00951709) mn906219@dal.ca
    * Shubham Vijaykumar Patel (B00960942) shubham.v.patel@dal.ca
    * Jay Navinbhai Rana (B00932024) jy834177@dal.ca	
    * Neel Piyushkumar Patel (B00923803) nl914739@dal.ca

### Technologies Used
- Technologies Used:
    * Frontend: React, Tailwind CSS
    * Backend: Express, Node.js
    * Database: MongoDB
    * Deployment: Netlify for frontend deployment, Render for backend deployment 

### Features and their Tasks (9/12 Features completed  = 75% of project completed)
- Features:

    1.	Authentication - Jay Navinbhai Rana 
        * Sign Up
        * Log In
        * Forget Password
        * Logout
        * Profile Management
    2.	Explore Listings - Ketul Patel
        * ⁠List all parking spots available
        * ⁠Filter parking spots based on parking type, user location and radius
        * View individual parking spot in details 
        * Get estimate about user expected parking spot booking
        * Availability check to reduce conflicting booking

    3.	Manage Listing - Shubham Vijaykumar Patel
        * Create Listing
        * Edit Listing
        * View Listing
        * Delete Listing
    4.	Rating and Reviews - Aditya Maheshbhai Purohit
        * View all reviews and ratings of a listing.
        * Add a new review and rating of a listing.
    5.	Wallet Management - Mann Patel
        * Add Money to Wallet.
        * Withdraw Money from Wallet.  
        * Add Transaction Entries for Adding Money, Withdraw Money, Booking, and Earnings.
        * Filtering Transaction Based on its types.
    6.	Booking Management - Neel Piyushkumar Patel
        * Make a Parking Spot Reservation
        * View an Existing Booking
        * Modify an Existing Booking
        * Cancel a Booking
    7. Notifications - All Members 
        * View/Filter Notifications
        * Add Notification (Backend Task)
    8. Wishlist - All Members 
        * Create Wishlist 
        * Remove Wishlist
        * View all Wishlist
    9. Help Centre - All Members 
        * Register Customer Query


## Getting Started

  

### Prerequisites

  The first step is to clone the Group project repo in your machine using the below command. Run the below command at the destination in cmd where you want to clone the repository.
```
git clone https://git.cs.dal.ca/ketulp/csci-5709-grp-09.git
```

To have a local copy of this up and running on your local machine, you will first need to install the following software / libraries / plug-ins

  

```

npm (Comes with node.js installation)

Frontend Dependencies:
"dependencies": {

"@emotion/react": "^11.11.4",

"@emotion/styled": "^11.11.5",

"@heroicons/react": "^2.1.3",

"@mui/material": "^5.15.14",

"@stripe/react-stripe-js": "^2.6.2",

"@stripe/stripe-js": "^3.1.0",

"animate.css": "^4.1.1",

"axios": "^1.6.7",

"bootstrap": "^5.3.2",

"buffer": "^6.0.3",

"dayjs": "^1.11.10",

"leaflet": "^1.9.4",

"react": "^18.2.0",

"react-bootstrap": "^2.10.0",

"react-bootstrap-icons": "^1.11.3",

"react-calendar": "^4.8.0",

"react-dom": "^18.2.0",

"react-icons": "^5.0.1",

"react-leaflet": "^4.2.1",

"react-loader-spinner": "^6.1.6",

"react-router-dom": "^6.3.0",

"react-scripts": "5.0.1",

"react-star-ratings": "^2.3.0",

"react-toastify": "^10.0.4",

"sweetalert2": "^11.10.6",

"typescript": "^4.9.5",

"web-vitals": "^2.1.4",

"zustand": "^4.5.2"

}

Backend Dependencies:

"dependencies": {

"bcrypt": "^5.1.1",

"cors": "^2.8.5",

"dotenv": "^16.4.5",

"express": "^4.18.3",

"jsonwebtoken": "^9.0.2",

"mongoose": "^8.2.2",

"multer": "^1.4.5-lts.1",

"nodemailer": "^6.9.13",

"stripe": "^14.23.0"

}

```

  

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

  

### Installing

  

#### Install Node.js (to use npm)

  

1. Goto https://nodejs.org/en/download and download the LTS installer as per your OS.

2. Run the installer.

3. Accept License Agreement

4. Choose Installation path.

5. Keep the default installation settings and click next.

6. Skip the optional installation window and click next and click install.

7. To check the installation, run the below commands.

  

```
node -v
```

Sample output: v20.11.0

```
npm -v
```

Sample output: 10.2.4

  
#### Install concurrently for easy installtion and startup

```
npm install -g concurrently
```

#### Install all libraries (Frontend + Backend)

Goto top level folder of the project ("/"). Run the below command.
This will install dependencies of both React and Node.js apps.

```
cd .\csci-5709-grp-09\
npm install
```

Sample output: added 1565 packages, changed 69 packages, and audited 1635 packages in 2m
Done in 3m 34.4s
### **How to run application:**


#### Start Frontend and Backend

Goto top level folder of the project ("/"). Run the below command.
This will start both React and Node.js apps.

```
npm start
```
 

## Deployment

  
**Frontend:**

Link the GitHub/GitLab repository with [Netlify](https://app.netlify.com/).

Then, use the below site configurations:

* Base directory: `/frontend/`

* Build command: `npm run build`

* Publish directory: `/frontend/build`

  
**Backend:**

Link the GitHub/GitLab repository with [OnRender](https://app.netlify.com/).

Then, use the below site configurations:
* Base directory: `/api/`

* Build command: `npm install && npm run build`

* Start Command: `node index.js`





### **Environment Variables:**

This project requires the following environment variables to be set:

```
- JWT_SECRET = <PASTE JWT TOKEN>
- GMAIL_EMAIL = <PASTE EMAIL ADDRESS>
- GMAIL_PASSWORD = <PASTE GMAIL PASSWORD>
- STRIPE_SECRET_KEY = <PASTE STRIPE SECRET KEY>
- MONGODB_USERNAME = <MONGO ATLAS USERNAME>
- MONGODB_PASSWORD = <MONGO ATLAS PASSWORD>
- MONGODB_HOSTNAME = <MONGO HOST NAME>
- MONGODB_DBNAME = <MONGO DATABASE NAME>

```

### Folder Structure and Justification 

Frontend was implemented using the Create-react-app which gives a basic folder structure and then we developed over that folder structure

* Assets - This folder has all the files which are requierd for the frontend such as images 
used in the website. Keeping all this in a common folder helps in easy classifcation of assets and also makes it easier to find.

* Components - This folder contains the react components developed which are going to be reused by other members in the group. Keeping reusable components in a common folder helps in easy sharing of components between members.

* utils - This folder has the utlility components such as axios and Protected Routes which helps all the other features in providing a common ultility.

* Indiviudal Feature Folders - This structure was decided by the team so that each member can easily keep their things in the folder of the feature they are developing, this helps in faster debugging and keeps logically related things together. 

Backend Folder Structure Justification 

* The index.ts is the main end point of the application. Package.json is the file which has information for all
the modules required for the project. Node_modules folder contains the files and folders
regarding installed files and dependencies that are used in this project. All the installation
files for dependencies are stored in node modules. Routes folder contains all the routes and
endpoints required for the server. Controller folder contains the business logic and
validations for the input data. Models contain all the schemas of the database, like which
kind of input will be received from client-side and server-side validations. Middleware folder contains reusable middleware function such as authenticateToken which will be used by other controllers.


### 3rd Party APIs/Services Used

```
Services and Justification 

• Maps – We have used open-source maps provided using Leaflet-JS for our application. Maps
are integral part of our application as they provide ability to select location of parking spot
which helps users find parking spot location in real-time. Also Maps allow to filter down
parking spots near to the user location.

• Payment Gateway: Stripe was chosen for its ease of integration and robust security features.
It provides a seamless payment experience for users; Using Stripe as a Payment
Gateway ensures safety for the users and make card payment processing smooth.
```


### Code References 

```
- Stripe React Elements:
- Demo BoilerPlate Code:

// MyStoreCheckout.js import React from 'react'; import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component { render() { return ( ); } } // CardSection.js import React from 'react'; import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component { render() { return ( Card details <CardElement style={{base: {fontSize: '18px'}}} /> ); } }

export default CardSection;

export default MyStoreCheckout;

**  Used in AccountCard.tsx Modified like this:
    Lines 253-272

<div>
 <CardNumberElement
     options={{
       style: { base: { fontSize: "16px" } },
       showIcon: true,
     }}
   />
 </div>
</div>
<div>
 <h2 className='text-lg font-semibold'>Expiry Date</h2>
 <div className='border border-gray-300 p-2 rounded-md mb-4'>
   <CardExpiryElement
     options={{ style: { base: { fontSize: "16px" } } }}
   />
 </div>
</div>
<div>
 <h2 className='text-lg font-semibold'>CVV</h2>
 <div className='border border-gray-300 p-2 rounded-md mb-2'>
   <CardCvcElement
     options={{ style: { base: { fontSize: "16px" } } }}
   />
 </div>
```
### frontend\src\ratings-and-reviews\ReviewCard.tsx

  

*Lines 25 - 66*

```
    <div className="block max-w-4xl m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 ">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 me-4 rounded-full object-cover ring-2"
          src={
            review.user.profilePic
              ? require(`../assets/images/${review.user.profilePic}`)
              : require(`../assets/images/default-user-pic.png`)
          }
          alt=""
        />
        <div className="font-medium">
          <p>
            {`${review.user.firstName} ${review.user.lastName} `}
            <span className="block text-sm text-gray-500">
              Booked this spot for {review.durationInDays || 0} days
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <StarRatings
          rating={review.rating}
          starRatedColor="rgb(250, 175, 0)"
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="2px"
        />
      </div>
      <footer className="mb-5 text-sm text-gray-500">
        <p>
          Reviewed on{" "}
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </footer>
      <p className="mb-2 text-gray-500 ">{review.description}</p>
    </div>

```

  

The code above was created by adapting the code in [Flowbite - Rating Comment](https://flowbite.com/docs/components/rating/#rating-comment) as shown below:

  

```
<article>

<div class="flex items-center mb-4">

<img class="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="">

<div class="font-medium dark:text-white">

<p>Jese Leos <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>

</div>

</div>

<div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">

<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">

<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>

</svg>

<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">

<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>

</svg>

<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">

<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>

</svg>

<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">

<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>

</svg>

<svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">

<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>

</svg>

<h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>

</div>

<footer class="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3, 2017</time></p></footer>

<p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>

<p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>

<a href="#" class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>

<aside>

<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>

<div class="flex items-center mt-3">

<a href="#" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>

<a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>

</div>

</aside>

</article>

```
  
<!---How--->
-  The code in [Flowbite - Rating Comment](https://flowbite.com/docs/components/rating/#rating-comment) was implemented by properly reading the original source and understanding the html tags and tailwind css classes being used. Then I have modified the code as per the requirements of my assignment task.

  
<!---Why--->
-  [Flowbite - Rating Comment](https://flowbite.com/docs/components/rating/#rating-comment)'s Code was used because it provided various options to implement the same feature and thus gave me ideas for my task. Also, it was a good starting point for me to experiement and try my own ideas on it. It helped me to understand some best practicies being followed in the industry which I could learn and create my feature with better efficiency.

  
<!---How--->
-  [Flowbite - Rating Comment](https://flowbite.com/docs/components/rating/#rating-comment)'s Code was modified by converting html to jsx so that I can use it in React. I also added new secions, changed the alignment, colours, texts, paddings and margins to design as per my assignment needs.

### frontend\src\ratings-and-reviews\AddReviewModal.tsx

*Lines 46 - 75*

```
        axios
      .post(
        `/listings/${listingId}/review`,
        {
          rating: rating,
          description: review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setIsModalOpen(false);
        onReviewAdded(); // Re-render reviews to show new review.
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.error ||
            error.response?.data ||
            "Something went wrong."
        );
      })
      .finally(() => {
        // Reset loading state
        setIsLoading(false);
      });

```

The code above was created by adapting the code in [Axios Readme - Performing a POST request](https://github.com/axios/axios?tab=readme-ov-file#example) as shown below: 

```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
<!---How--->
-  The code in [Axios Readme - Performing a POST request](https://github.com/axios/axios?tab=readme-ov-file#example) was implemented by properly reading the original source and understanding the logic. Then I have modified the code as per the requirements of my assignment task.

<!---Why--->
- [Axios Readme - Performing a POST request](https://github.com/axios/axios?tab=readme-ov-file#example)'s Code was used because it provided an ideal way to use the axios library for sending requests to a REST API.

<!---How--->
-  [Axios Readme - Performing a POST request](https://github.com/axios/axios?tab=readme-ov-file#example)'s Code was modified by changing the request url, request data, success handling part with toast, error handling part with toast and setting loader.

### frontend\src\ratings-and-reviews\ReviewsPage.tsx

*Lines 31 - 40*

```
    axios
      .get(`/listings/${listingId}/reviews`)
      .then((response) => {
        setReviewsData(response.data);
        setLoading({ isLoading: false, success: true });
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Something went wrong.");
        setLoading({ isLoading: false, success: false });
      });

```

The code above was created by adapting the code in [Axios Readme - Example - GET](https://github.com/axios/axios?tab=readme-ov-file#example) as shown below: 

```
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```
<!---How--->
-  The code in [Axios Readme - Example - GET](https://github.com/axios/axios?tab=readme-ov-file#example) was implemented by properly reading the original source and understanding the logic. Then I have modified the code as per the requirements of my assignment task.

<!---Why--->
-  [Axios Readme - Example - GET](https://github.com/axios/axios?tab=readme-ov-file#example)'s Code was used because it provided an ideal way to use the axios library for sending requests to a REST API.

<!---How--->
-  [Axios Readme - Example - GET](https://github.com/axios/axios?tab=readme-ov-file#example)'s Code was modified by changing the request url, removing query params, success handling part with setting reviews and 'loading' state and error handling part with setting the toast error and 'loading' state. I also removed the finally part, as it was not needed in my case.

# References 
[1]	“Node.Js — download,” Nodejs.org. [Online]. Available: https://nodejs.org/en/download. [Accessed: 08-Apr-2024].

[2]	  “React,” React.dev. [Online]. Available: https://react.dev/. [Accessed: 08-Apr-2024].

[3]	“Netlify app,” Netlify.com. [Online]. Available: https://app.netlify.com/. [Accessed: 08-Apr-2024].

[4]	“Getting started,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/docs/getting-started.[Accessed: 08-Apr-2024].

[5]	“Create react app,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/. [Accessed: 08-Apr-2024].

[6]	“Npm: React-router-dom,” npm. [Online]. Available: https://www.npmjs.com/package/react-router-dom. [Accessed: 08-Apr-2024].

[7]	“Npm: React-toastify,” npm. [Online]. Available: https://www.npmjs.com/package/react-toastify. [Accessed: 08-Apr-2024].

[8]	“Rapidly build modern websites without ever leaving your HTML,” Tailwindcss.com. [Online]. Available: https://tailwindcss.com. [Accessed: 08-Apr-2024].

[9]	“Npm: React-icons,” npm. [Online]. Available: https://www.npmjs.com/package/react-icons. [Accessed: 08-Apr-2024].

[10]	“Npm: Typescript,” npm. [Online]. Available: https://www.npmjs.com/package/typescript.[Accessed: 08-Apr-2024].

[11]	“Express - Node.js web application framework,” Expressjs.com. [Online]. Available: https://expressjs.com. [Accessed: 08-Apr-2024].

[12]	“Npm: React-stripe-elements,” npm. [Online]. Available: https://www.npmjs.com/package/react-stripe-elements. [Accessed: 08-Apr-2024].

[13]	“MongoDB: The developer data platform,” MongoDB. [Online]. Available: https://www.mongodb.com. [Accessed: 08-Apr-2024].

[14] “Mongoose,” Mongoosejs.com. [Online]. Available: https://mongoosejs.com. [Accessed: 08-Apr-2024].
