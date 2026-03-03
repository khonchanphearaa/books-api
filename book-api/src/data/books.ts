import type { Book } from '../models/book.js';

export let books: Book[] = [
    {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "price": 25,
        "cover": "https://m.media-amazon.com/images/I/71nj3JM-igL.jpg",
        "description": "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. This book is a must-read for any developer."
    },
    {
        "id": 2,
        "title": "The Pragmatic Programmer",
        "author": "Andrew Hunt & David Thomas",
        "price": 35,
        "cover": "https://kbpsystem777.github.io/You-Dont-Know-JS/types&grammar/cover.jpg",
        "description": "One of the most significant books in software development. It examines the core of modern software development regardless of language or framework."
    },
    {
        "id": 3,
        "title": "Design Patterns",
        "author": "Erich Gamma et al.",
        "price": 40,
        "cover": "https://m.media-amazon.com/images/I/81IGFC6oFmL._AC_UF894,1000_QL80_.jpg",
        "description": "The 'Gang of Four' classic that introduced the world to design patterns. Essential for object-oriented design mastery."
    },
    {
        "id": 4,
        "title": "Refactoring",
        "author": "Martin Fowler",
        "price": 38,
        "cover": "https://m.media-amazon.com/images/I/71e6ndHEwqL._AC_UF894,1000_QL80_.jpg",
        "description": "The definitive guide to improving the design of existing code. It provides a toolkit for making your software better after it has been written."
    },
    {
        "id": 5,
        "title": "Code Complete",
        "author": "Steve McConnell",
        "price": 45,
        "cover": "https://m.media-amazon.com/images/I/61MYY5PRibL._AC_UF894,1000_QL80_.jpg",
        "description": "Widely considered one of the best practical guides to programming, McConnell’s book helps you write better code, faster."
    },
    {
        "id": 6,
        "title": "Cracking the Coding Interview",
        "author": "Gayle Laakmann McDowell",
        "price": 32,
        "cover": "https://m.media-amazon.com/images/I/61oRH4y27jL._AC_UF894,1000_QL80_.jpg",
        "description": "189 programming questions and solutions. The gold standard for anyone preparing for tech interviews at FAANG."
    },
    {
        "id": 7,
        "title": "Introduction to Algorithms",
        "author": "Thomas H. Cormen",
        "price": 60,
        "cover": "https://m.media-amazon.com/images/I/81vQhALQS8L._AC_UF894,1000_QL80_.jpg",
        "description": "Commonly known as CLRS, this is the most comprehensive textbook on algorithms used by universities worldwide."
    },
    {
        "id": 8,
        "title": "Eloquent JavaScript",
        "author": "Marijn Haverbeke",
        "price": 28,
        "cover": "https://m.media-amazon.com/images/I/81HqVRRwp3L._AC_UF894,1000_QL80_.jpg",
        "description": "A modern guide to programming. This book provides a deep dive into the JavaScript language and the browser environment."
    },
    {
        "id": 9,
        "title": "Grokking Algorithms",
        "author": "Aditya Bhargava",
        "price": 30,
        "cover": "https://images.manning.com/book/3/0b325da-eb26-4e50-8a2a-46042c647083/Bhargava-Algorithms_hires.png",
        "description": "A fully illustrated guide that teaches you how to apply common algorithms to the practical problems you face every day."
    },
    {
        "id": 10,
        "title": "Clean Architecture",
        "author": "Robert C. Martin",
        "price": 29,
        "cover": "https://m.media-amazon.com/images/I/71stxGw9JgL._AC_UF894,1000_QL80_.jpg",
        "description": "Learn the universal rules of software architecture and how to apply them to build maintainable and scalable systems."
    },
    {
        "id": 11,
        "title": "The Mythical Man-Month",
        "author": "Frederick Brooks",
        "price": 27,
        "cover": "https://images-na.ssl-images-amazon.com/images/I/817iWsLJR0L._AC_UL600_SR600,600_.jpg",
        "description": "The classic book on software engineering management. Essential for understanding why adding more people to a late project makes it later."
    },
    {
        "id": 12,
        "title": "You Don't Know JS: Scope & Closures",
        "author": "Kyle Simpson",
        "price": 22,
        "cover": "https://m.media-amazon.com/images/I/81zWsOMWE4L._AC_UF894,1000_QL80_.jpg",
        "description": "Part of the YDKJS series, this book explores the deeply misunderstood parts of JavaScript scope and closure mechanisms."
    },
    {
        "id": 13,
        "title": "Head First Design Patterns",
        "author": "Eric Freeman",
        "price": 42,
        "cover": "https://www.pdfiles.net/storage/91358586089519.jpg",
        "description": "A visually rich, brain-friendly approach to learning design patterns that will make your code more flexible and easier to maintain."
    },
    {
        "id": 14,
        "title": "Working Effectively with Legacy Code",
        "author": "Michael Feathers",
        "price": 44,
        "cover": "https://m.media-amazon.com/images/I/81iVQ1bi-FL.jpg",
        "description": "Learn how to tame large, untested legacy codebases and safely introduce changes without breaking existing functionality."
    },
    {
        "id": 15,
        "title": "The Phoenix Project",
        "author": "Gene Kim",
        "price": 18,
        "cover": "https://m.media-amazon.com/images/I/914-sUgELZL._SL1500_.jpg",
        "description": "A novel about IT, DevOps, and helping your business win. A great way to learn about modern infrastructure culture."
    },
    {
        "id": 16,
        "title": "Soft Skills: The life manual",
        "author": "John Sonmez",
        "price": 26,
        "cover": "https://archive.org/services/img/softskillssoftwa0000sonm/full/pct:200/0/default.jpg",
        "description": "Covers everything from career growth and productivity to marketing yourself and financial management for developers."
    },
    {
        "id": 17,
        "title": "Designing Data-Intensive Applications",
        "author": "Martin Kleppmann",
        "price": 48,
        "cover": "https://www.d-pdf.com/images/covers/2020/September/5f57dcf613ce3/9781449373320.jpg",
        "description": "The 'Big Data Bible'. A deep dive into how modern databases, distributed systems, and message queues actually work."
    },
    {
        "id": 18,
        "title": "Domain-Driven Design",
        "author": "Eric Evans",
        "price": 50,
        "cover": "https://m.media-amazon.com/images/I/819YH7N-4WL._UF1000,1000_QL80_.jpg",
        "description": "The book that defined DDD. Learn how to map complex business requirements into clear, maintainable software models."
    },
    {
        "id": 19,
        "title": "Algorithms to Live By",
        "author": "Brian Christian",
        "price": 16,
        "cover": "https://m.media-amazon.com/images/I/81EI+ELW9EL._AC_UF894,1000_QL80_.jpg",
        "description": "A fascinating exploration of how computer algorithms can be applied to our everyday lives and decision-making."
    },
    {
        "id": 20,
        "title": "Test Driven Development",
        "author": "Kent Beck",
        "price": 34,
        "cover": "https://m.media-amazon.com/images/I/91Ua6HIa43L._AC_UF894,1000_QL80_.jpg",
        "description": "The original guide to TDD by its creator. Learn how to write tests first to drive better design and higher code quality."
    }
];