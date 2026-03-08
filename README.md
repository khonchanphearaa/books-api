# fake-book-api V2

## How to running project local with Docker && Prisma studio with database PostgreSQL

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