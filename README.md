# fake-book-api V2

## How to running project local 
This setup with Docker && Prisma studio with database PostgreSQL
### Run docker 
```bash
docker-compose up 
```

### If docker is have change new code, Need to rebuild to docker-image
```bash
docker-compose up --build
```

### Prisma Studio 
When run is make sure stand in folder ``` book-api ``` the root
```bash
npx prisma studio
```


### *Notes 
For data json in folder ```src/data/books.ts``` this stop to used is move to database ```PostgreSQL with Pirsma ``` 


## npm install package
```bash
npm i @phearadevx1/book-api
```

### The baseUrl book-api
```bash
https://book-api-94c5.onrender.com
```

Endpoint API
| Endpoint           | Method                  | Description                             |
| -------------------| ------------------------| --------------------------------------- |
| `/api/books`       | POST/GET/PUT/DELETE     | CRUD books                              |
| `/api/category`    | GET/POST/PUT/DELETE     | CRUD category                           |


Usage package book-api

```bash
try {
     await import('@phearadevx1/book-api');
     
     const baseUrl = `https://book-api-94c5.onrender.com/api`;
     const loadTestData = async () =>{
        try {
            const res = await fetch(`${baseUrl}/books`);
            const categoriesRes = await fetch(`${baseUrl}/categories`);
            // console.log(res);
            const data = await res.json();
            const categoriesData = await categoriesRes.json();
            console.log('Books:', data.data);
            console.log('Category', categoriesData.data);
            
        } catch (error) {
            console.error('Failed to fetch books:', error);  
        }
    }
    setTimeout(loadTestData, 1000);
} catch (error) {
    console.error('Failed to start book-api server:', error);
}
```

Response
```bash
Books: [
  {
    id: 1,
    title: 'Design Patterns',
    price: 16.23,
    author: 'Erich Gamma et al.',
    cover: 'https://m.media-amazon.com/images/I/81IGFC6oFmL._AC_UF894,1000_QL80_.jpg',
    description: "The 'Gang of Four' classic that introduced the world to design patterns. Essential for object-oriented design mastery.",
    createdAt: '2026-03-14T13:23:28.891Z',
    categoryId: 1,
    category: { id: 1, name: 'Software Engineer' }
  }
]
Category [ { id: 1, name: 'Software Engineer', _count: { books: 1 } } ]
```