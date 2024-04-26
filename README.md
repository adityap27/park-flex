# ParkFlex

Our project aims to develop a comprehensive online marketplace for parking spots, addressing the common urban challenge of finding convenient and affordable parking. It seeks to bridge the gap between parking spot owners who have underutilized space and drivers facing difficulties in locating parking, especially in densely populated areas. By leveraging technology, the platform aspires to optimize parking space usage, reduce urban congestion, and offer a convenient solution for both spot owners and seekers.

### Deployed Link: https://park-flex.netlify.app

### GitLab Repo Link: https://git.cs.dal.ca/ketulp/csci-5709-grp-09

### Backend URL: https://park-flex-api.onrender.com/api

### Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Deployment**: Netlify for frontend deployment, Render for backend deployment
- **Programming Language**: Typescript


### Group Information
- Members:  

    * Aditya Maheshbhai Purohit (B00952865) aditya.purohit@dal.ca
    * Ketul Patel (B00960940) kt390621@dal.ca 	 
    * Mann Patel (B00951709) mn906219@dal.ca
    * Shubham Vijaykumar Patel (B00960942) shubham.v.patel@dal.ca
    * Jay Navinbhai Rana (B00932024) jy834177@dal.ca	
    * Neel Piyushkumar Patel (B00923803) nl914739@dal.ca

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

  
#### Install concurrently for easy installation and startup

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

* Assets - This folder has all the files which are required for the frontend such as images 
used in the website. Keeping all this in a common folder helps in easy classification of assets and also makes it easier to find.

* Components - This folder contains the react components developed which are going to be reused by other members in the group. Keeping reusable components in a common folder helps in easy sharing of components between members.

* utils - This folder has the utility components such as axios and Protected Routes which helps all the other features in providing a common utility.

* Individual Feature Folders - This structure was decided by the team so that each member can easily keep their things in the folder of the feature they are developing, this helps in faster debugging and keeps logically related things together. 

Backend Folder Structure Justification 

* The index.ts is the main end point of the application. Package.json is the file which has information for all
the modules required for the project. Node_modules folder contains the files and folders
regarding installed files and dependencies that are used in this project. All the installation
files for dependencies are stored in node modules. Routes folder contains all the routes and
endpoints required for the server. The controller folder contains the business logic and
validations for the input data. Models contain all the schemas of the database, like which
kind of input will be received from client-side and server-side validations. The Middleware folder contains reusable middleware functions such as authenticateToken which will be used by other controllers.


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
