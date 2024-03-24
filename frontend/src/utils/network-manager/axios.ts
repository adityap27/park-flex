import axios from "axios";

axios.defaults.baseURL = "";

export const getRequest = <T>(endPoint: string) => {
  // return axios.get<T>(endPoint);
  if (endPoint === "parking-spots") {
    return new Promise<T>((resolve, reject) => {
      let parkingSpotsResponse: T = JSON.parse(
        '{\r\n    "parkingSpots": [\r\n        {\r\n            "id": 1,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 100,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "John",\r\n                "lastName": "Green"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636351,\r\n                "longitude": -63.591851\r\n            },\r\n            "address": {\r\n                "addressLine1": "123 Main Street",\r\n                "addressLine2": "Suite 101",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K5",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 2,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 150,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Alice",\r\n                "lastName": "Smith"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637482,\r\n                "longitude": -63.588747\r\n            },\r\n            "address": {\r\n                "addressLine1": "456 Elm Street",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K6",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 3,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 200,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Michael",\r\n                "lastName": "Johnson"\r\n            },\r\n            "location": {\r\n                "latitude": 44.634698,\r\n                "longitude": -63.593469\r\n            },\r\n            "address": {\r\n                "addressLine1": "789 Maple Avenue",\r\n                "addressLine2": "Unit 201",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K7",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 4,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 120,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Emma",\r\n                "lastName": "Davis"\r\n            },\r\n            "location": {\r\n                "latitude": 44.638976,\r\n                "longitude": -63.584295\r\n            },\r\n            "address": {\r\n                "addressLine1": "987 Oak Street",\r\n                "addressLine2": "Suite 301",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K8",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 5,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 180,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Benjamin",\r\n                "lastName": "Lee"\r\n            },\r\n            "location": {\r\n                "latitude": 44.638251,\r\n                "longitude": -63.593862\r\n            },\r\n            "address": {\r\n                "addressLine1": "456 Pine Avenue",\r\n                "addressLine2": "Unit 102",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K9",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 6,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 110,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Sophie",\r\n                "lastName": "Turner"\r\n            },\r\n            "location": {\r\n                "latitude": 44.639519,\r\n                "longitude": -63.586643\r\n            },\r\n            "address": {\r\n                "addressLine1": "369 Cedar Lane",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K1",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 7,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 250,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Ethan",\r\n                "lastName": "Hernandez"\r\n            },\r\n            "location": {\r\n                "latitude": 44.635882,\r\n                "longitude": -63.589744\r\n            },\r\n            "address": {\r\n                "addressLine1": "753 Birch Street",\r\n                "addressLine2": "Suite 202",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K2",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 8,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 130,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Mia",\r\n                "lastName": "Flores"\r\n            },\r\n            "location": {\r\n                "latitude": 44.634521,\r\n                "longitude": -63.588107\r\n            },\r\n            "address": {\r\n                "addressLine1": "159 Maple Lane",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K3",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 9,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 220,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Jacob",\r\n                "lastName": "Gonzalez"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637843,\r\n                "longitude": -63.589136\r\n            },\r\n            "address": {\r\n                "addressLine1": "852 Walnut Street",\r\n                "addressLine2": "Unit 402",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K4",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 10,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 140,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Emily",\r\n                "lastName": "Perez"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636974,\r\n                "longitude": -63.591377\r\n            },\r\n            "address": {\r\n                "addressLine1": "258 Elm Avenue",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K0",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 11,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 210,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Logan",\r\n                "lastName": "Roberts"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637612,\r\n                "longitude": -63.58891\r\n            },\r\n            "address": {\r\n                "addressLine1": "963 Oak Lane",\r\n                "addressLine2": "Suite 501",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K1",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 12,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 135,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Charlotte",\r\n                "lastName": "Nguyen"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636199,\r\n                "longitude": -63.590973\r\n            },\r\n            "address": {\r\n                "addressLine1": "741 Cedar Avenue",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K2",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 13,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 240,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Alexander",\r\n                "lastName": "Thompson"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637977,\r\n                "longitude": -63.589234\r\n            },\r\n            "address": {\r\n                "addressLine1": "369 Pine Street",\r\n                "addressLine2": "Unit 301",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K3",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 14,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 125,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Madison",\r\n                "lastName": "King"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637216,\r\n                "longitude": -63.592803\r\n            },\r\n            "address": {\r\n                "addressLine1": "852 Maple Lane",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K4",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 15,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 260,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Liam",\r\n                "lastName": "Scott"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636481,\r\n                "longitude": -63.59015\r\n            },\r\n            "address": {\r\n                "addressLine1": "159 Birch Avenue",\r\n                "addressLine2": "Suite 601",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K5",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 16,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 145,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Chloe",\r\n                "lastName": "Hall"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636998,\r\n                "longitude": -63.588212\r\n            },\r\n            "address": {\r\n                "addressLine1": "963 Pine Lane",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K6",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 17,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 230,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Zoe",\r\n                "lastName": "Adams"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637427,\r\n                "longitude": -63.591513\r\n            },\r\n            "address": {\r\n                "addressLine1": "369 Elm Street",\r\n                "addressLine2": "Unit 701",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K7",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 18,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 155,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Elijah",\r\n                "lastName": "Nelson"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636805,\r\n                "longitude": -63.588767\r\n            },\r\n            "address": {\r\n                "addressLine1": "741 Cedar Lane",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K8",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 19,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 250,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Grace",\r\n                "lastName": "Baker"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637978,\r\n                "longitude": -63.591208\r\n            },\r\n            "address": {\r\n                "addressLine1": "852 Maple Avenue",\r\n                "addressLine2": "Suite 801",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K9",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 20,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 105,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Nathan",\r\n                "lastName": "Mitchell"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636272,\r\n                "longitude": -63.588379\r\n            },\r\n            "address": {\r\n                "addressLine1": "159 Elm Street",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K0",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 21,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 275,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Aiden",\r\n                "lastName": "Young"\r\n            },\r\n            "location": {\r\n                "latitude": 44.638197,\r\n                "longitude": -63.590637\r\n            },\r\n            "address": {\r\n                "addressLine1": "963 Pine Avenue",\r\n                "addressLine2": "Suite 901",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K1",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 22,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 195,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Hannah",\r\n                "lastName": "Cook"\r\n            },\r\n            "location": {\r\n                "latitude": 44.637513,\r\n                "longitude": -63.589512\r\n            },\r\n            "address": {\r\n                "addressLine1": "369 Oak Street",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K2",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 23,\r\n            "parkingType": "indoor",\r\n            "pricePerMonth": 295,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "Samantha",\r\n                "lastName": "Hill"\r\n            },\r\n            "location": {\r\n                "latitude": 44.636429,\r\n                "longitude": -63.588027\r\n            },\r\n            "address": {\r\n                "addressLine1": "741 Birch Avenue",\r\n                "addressLine2": "Suite 1001",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K3",\r\n                "country": "Canada"\r\n            }\r\n        },\r\n        {\r\n            "id": 24,\r\n            "parkingType": "outdoor",\r\n            "pricePerMonth": 175,\r\n            "imageUrl": "https://picsum.photos/200",\r\n            "owner": {\r\n                "firstName": "David",\r\n                "lastName": "Ward"\r\n            },\r\n            "location": {\r\n                "latitude": 44.638692,\r\n                "longitude": -63.588868\r\n            },\r\n            "address": {\r\n                "addressLine1": "159 Walnut Street",\r\n                "addressLine2": "",\r\n                "city": "Halifax",\r\n                "state": "Nova Scotia",\r\n                "postalCode": "B3H 3K4",\r\n                "country": "Canada"\r\n            }\r\n        }\r\n    ]\r\n}\r\n'
      );
      resolve(parkingSpotsResponse);
    });
  } else {
    return new Promise<T>((resolve, reject) => {
      let parkingSpotDetails: T = JSON.parse(
        '{\r\n  "id": 1,\r\n  "name": "test",\r\n  "parkingType": "indoor",\r\n  "pricePerMonth": "100",\r\n  "imageUrl": "https://picsum.photos/200",\r\n  "owner": {\r\n    "firstName": "John",\r\n    "lastName": "Green"\r\n  },\r\n  "location": {\r\n    "latitude": 44.636351,\r\n    "longitude": -63.591851\r\n  },\r\n  "rating": 4.5,\r\n  "reviews": 50,\r\n  "address": {\r\n    "addressLine1": "Dalhousie",\r\n    "addressLine2": "University",\r\n    "city": "Halifax",\r\n    "state": "Nova Scotia",\r\n    "postalCode": "B3H 3Z3",\r\n    "country": "Canada"\r\n  },\r\n  "bookings": [\r\n    {\r\n      "startDate": "02/01/2024",\r\n      "endDate": "03/01/2024"\r\n    }\r\n  ]\r\n}'
      );
      resolve(parkingSpotDetails);
    });
  }
};