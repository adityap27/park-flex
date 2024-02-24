# CSCI 5709 Grp-09 (Project Proposal Web Application)

* *Date Created*: 15 Feb 2024
* *Last Modification Date*: 24 Feb 2024
* *Assignment URL*: https://park-flex.netlify.app/
* *Git URL*: https://git.cs.dal.ca/ketulp/csci-5709-grp-09


## Built With

- [Node JS](https://nodejs.org/en) - Javascript Runtime used for development
- [Npm](https://docs.npmjs.com//) - Dependency Management Tool
- [VS Code](https://code.visualstudio.com/) - Development code management tool
- [React](https://legacy.reactjs.org/docs/getting-started.html/) - Frontend Development Framework
- [Create React App](https://create-react-app.dev/docs/getting-started/) - Tool used to create react application
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - Utility based CSS framework which makes writing CSS effortless for developers
- [Axios](https://github.com/axios/axios) - Promise based HTTP client which helps developers make API calls easily.


## Sources used

1. [LandingPage.tsx](/src/landing-page/LandingPage.tsx)

*Lines 7 - 56*
```
<div className="text-center flex flex-col xl:px-24 xxl:px-40 py-12 px-4 lg:px-16 md:px-8">
  <div>
    <h2 className="text-black text-xl font-bold lg:text-3xl">
      Looking for a perfect place to park?
    </h2>
  </div>
  <div className="sm:flex items-center">
    <div className="w-full mt-8 sm:w-1/2 sm:pr-12">
      <img src={ParkingSpotImage} alt="parking spot" className="mx-auto" />
    </div>
    <div className="mt-8 sm:w-1/2 sm:text-left">
      <h4 className="text-xl font-bold text-black">Stop Looking</h4>
      <p className="text-base text-black mt-2">
        ParkFlex provides unique and effective experience in booking parking
        spots around various cities. Users with excess space can list their
        parking spot to earn extra money.
      </p>

      <ul className="text-left mt-8">
        <li>
          <div className="flex items-start">
            <div className="w-6 h-6 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
              </svg>
            </div>
            <div>
              <p className="text-black">List, Search, and Book Parking Spots</p>
            </div>
          </div>
        </li>
        <li className="mt-3">
          <div className="flex items-start">
            <div className="w-6 h-6 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
              </svg>
            </div>
            <div>
              <p className="text-black">Rent for short or long term</p>
            </div>
          </div>
        </li>
        <li className="mt-3">
          <div className="flex items-start">
            <div className="w-6 h-6 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
              </svg>
            </div>
            <div>
              <p className="text-black">
                Get paid for your listed parking spot
              </p>
            </div>
          </div>
        </li>
      </ul>
      <Link
        className="mt-8 bg-buttonPrimary px-6 py-4 rounded block hover:bg-blue-700 text-white font-bold sm:inline-block text-center"
        to="/home"
      >
        Browse Spots
      </Link>
    </div>
  </div>
</div>
```
The code above was created by adapting the code in [Tailwind CSS Landing Page](https://codepen.io/onesce/pen/QWwaVMx) as shown below: 

```
<section class="bg-blue-500 flex flex-col py-12 px-4 text-center lg:px-16 md:px-8 xl:px-24 xxl:px-40">
  <div>
    <h2 class="text-xl font-bold text-white lg:text-3xl ">Looking for the perfect rate for your home?</h2>
  </div>
  <div class="sm:flex items-center">
    <div class="w-full mt-8 sm:w-1/2 sm:pr-12">
      <img src="images/rates.png" alt="" class="mx-auto">
    </div>
    <div class="mt-8 sm:w-1/2 sm:text-left">
      <h4 class="text-xl font-bold text-white">Stop Looking</h4>
      <p class="text-base text-white mt-2">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus magna.</p>
      <ul class="text-left mt-8">
        <li>
          <div class="flex items-start">
            <div class="w-6 h-6 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,24A12,12,0,0,1,3.515,3.515,12,12,0,0,1,20.486,20.486,11.922,11.922,0,0,1,12,24ZM12,1A11,11,0,1,0,23,12,11.014,11.014,0,0,0,12,1ZM9.646,16.506a.8.8,0,0,1-.514-.26L5.9,13.016l1.027-1.027,2.723,2.722,7.2-7.252L17.868,8.5l-7.714,7.754A.8.8,0,0,1,9.646,16.506Z" fill="#fff" />
              </svg>
            </div>
            <div>
              <p class="text-white">Integer posuere erat a ante venenatis dapibus</p>
            </div>
          </div>
        </li>
        <li class="mt-3">
          <div class="flex items-start">
            <div class="w-6 h-6 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,24A12,12,0,0,1,3.515,3.515,12,12,0,0,1,20.486,20.486,11.922,11.922,0,0,1,12,24ZM12,1A11,11,0,1,0,23,12,11.014,11.014,0,0,0,12,1ZM9.646,16.506a.8.8,0,0,1-.514-.26L5.9,13.016l1.027-1.027,2.723,2.722,7.2-7.252L17.868,8.5l-7.714,7.754A.8.8,0,0,1,9.646,16.506Z" fill="#fff" />
              </svg>
            </div>
            <div>
              <p class="text-white">Integer posuere erat a ante venenatis dapibus</p>
            </div>
          </div>
        </li>
      </ul>
      <a href="#" class="bg-white px-6 py-4 text-blue-500 rounded block sm:inline-block mt-8 text-center font-bold">Find the Fair Rate</a>
    </div>
  </div>
</section>
```

*Lines 57 - 63*
```
<div className="text-center xl:px-24 xxl:px-40 bg-gray-100 lg:px-16 flex flex-col py-16 px-4 md:px-8">
  <div className="sm:max-w-2xl w-full sm:mx-auto mt-16">
    <p className="text-gray-900 font-bold lg:text-xl text-md">
      “ParkFlex saves me a lot of time as I can book parking spot from the
      comfort of my home. Thank you very much for this amazing platform!”
    </p>
    <p className="mt-4 text-blue-500 font-bold">Carla Jones</p>
    <p className="text-gray-600">User of ParkFlex</p>
  </div>
</div>
```
The code above was created by adapting the code in [Tailwind CSS Landing Page](https://codepen.io/onesce/pen/QWwaVMx) as shown below: 
```
<section class="text-center bg-white px-4 py-12 lg:px-16 md:px-8 xl:px-24 xxl:px-40">
  <div>
    <h2 class="text-xl font-bold text-gray-900 lg:text-3xl ">Need Help?</h2>
    <p class="w-full lg:w-1/2 mx-auto text-base text-gray-600 mt-6">Contact our Customer Support that is always ready to help you with any possible questions, problems or information.</p>
    <a href="#" class="block text-xl text-blue-500 mt-4">support@fairrate.com</a>
  </div>
</section>
```

- The code in [Tailwind CSS Landing Page](https://codepen.io/onesce/pen/QWwaVMx) was implemented by carefully examining the original source and comprehending the logic and functionality of it. I then modified the code to make it meet the specifications for our project.
- [Tailwind CSS Landing Page](https://codepen.io/onesce/pen/QWwaVMx)'s Code was used because my goal was to acquire knowledge about various patterns of design that would be applicable to the task. I thought that using well-written code from other sources would speed up development and enable me to get the functionality and efficiency I wanted.
- [Tailwind CSS Landing Page](https://codepen.io/onesce/pen/QWwaVMx)'s Code was modified by making significant code modifications to it in accordance with the requirements of the component, such as modifying variable names and integrating it with other components. Additionally, the content was changed to meet the module's requirements.


2. [LandingPage.tsx](/src/landing-page/LandingPage.tsx) - Image use from given source

- The image of Parking Spot on Landing Page was taken from [Hignell Companies Blog](https://blog.hignellrentals.com/apartment-etiquette-what-to-do-when-someone-takes-your-parking-spot)


3. [Header.tsx](/src/components/Header.tsx)

Line: 7-29

```
    <header className='sticky w-full top-0 z-50 bg-header shadow-xl border-b-1 border-borderColor'>
      <Navbar expand='md' className='py-2 px-4'>
        <Navbar.Brand
          href='/'
          className='flex-row flex items-center text-textSecondary'
        >
          <FaCar className='mr-2 text-3xl text-textSecondary' />
          <p className='text-textSecondary'>ParkFlex</p>
        </Navbar.Brand>
        <Navbar.Toggle className='bg-white' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <div className='!text-textSecondary nav-link cursor-pointer'>
              Login
            </div>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <div className='!text-textSecondary nav-link cursor-pointer'>
              Register
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
```

The above code is implemented by studying the code about navigation bar from react bootstrap [React bootstrap navigation bar](https://react-bootstrap.netlify.app/docs/components/navbar/)

Below is example code which we referred:

```
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Brand link</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Brand text</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;

```


4. [App.tsx](src/App.tsx)

line 38

```
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <div className='flex-grow'>
            <Routes>
              <Route path='/faq' Component={FAQPage}></Route>
              <Route path='/contact-us' Component={ContactUs}></Route>
              <Route path='/' Component={LandingPage}></Route>
              <Route path='/home' Component={Home}></Route>
              <Route
                path='*'
                Component={() => (
                  <div className='w-full h-screen flex flex-row items-center justify-center'>
                    <h1>Page not found</h1>
                  </div>
                )}
              ></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer position='top-right' />
    </>

```


The above code is implemented by studying [React Toastify](https://www.npmjs.com/package/react-toastify) library.

Below is sample code:

```
  import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function App(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }

```

5. [tailwind.config.js](tailwind.config.js)


```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Raleway"', "sans-serif"],
    },
    extend: {
      colors: {
        backgroundColor: "#f8fafc",
        buttonPrimary: "#0d0c4d",
        buttonDanger: "#b02a2a",
        footer: "#0d0c4d",
        header: "#0d0c4d",
        borderColor: "#9ca3af",
        textPrimary: "#0d0c4d",
        textSecondary: "#ffffff",
      },
    },
  },
  plugins: [],
  important: true,
};


```

 we used following given configurations from 
 
 - [Tailwind CSS](https://tailwindcss.com/docs/guides/create-react-app), to install and setup tailwind css for this project.
 - [Tailwind CSS Theme](https://tailwindcss.com/docs/theme), to setup theme for application

6. [axios.ts](src/utils/network-manager/axios.ts)

line 9

```
import axios from "axios";

axios.defaults.baseURL = "https://express-t4.onrender.com/api";

export const postRequest = <T>(endpoint: string, data: any) => {
  return axios.post<T>(endpoint, data);
};

export const getRequest = <T>(endpoint: string) => {
  return axios.get<T>(endpoint);
};

```

Below is a sample code from [Axios](https://github.com/axios/axios?tab=readme-ov-file#example) official github page , I used to learn about axios.

```
import axios from 'axios';
//const axios = require('axios'); // legacy way

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

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

```


## Getting Started

To run this React app locally:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open http://localhost:3000 to view the app

## Deployment

We mirrored project code from Gitlab to Github, and setup a Netlify to deploy from Github. With every commit on main branch Netlify automatically deploys the application. We configured build settings on Netlify to name our application and provide build command.

- [Netlify](https://www.netlify.com/) - platform on which application deployed
- [Github](https://github.com/) - platform where source code resides


## Authors

- [Aditya Purohit](aditya.purohit@dal.ca)
- [Ketul Patel](kt390621@dal.ca)
- [Mann Patel](mn906219@dal.ca)
- [Shubham Patel](shubham.v.patel@dal.ca)
- [Jay Rana](jy834177@dal.ca)
- [Neel Patel](nl914739@dal.ca)

## Acknowledgments


* Above example Code snippets provided us with insights and ideas, which helped us in understanding how can we develop a functionality.