export const coursesData = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master modern web development with React, Node.js, and advanced concepts",
    level: "Beginner",
    duration: "45 hours",
    rating: 4.9,
    studentsEnrolled: 12500,
    instructor: "Alex Johnson",
    currentModule: "Frontend Fundamentals",
    modules: [
      {
        id: 1,
        title: "Frontend Fundamentals",
        description: "Learn HTML, CSS, and JavaScript basics",
        lessons: [
          {
            id: 1,
            title: "Introduction to HTML5",
            description: "Learn the structure and semantics of modern HTML5. Understand document structure, semantic elements, and best practices for accessible web development.",
            duration: "12:45",
            difficulty: "Beginner",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "2.1k",
            rating: 4.8,
            estimatedTime: "15 min",
            nextLesson: "CSS Styling Basics",
            keyPoints: [
              "Understanding HTML5 semantic elements",
              "Creating accessible web content",
              "Proper document structure and organization",
              "Modern HTML5 features and APIs"
            ]
          },
          {
            id: 2,
            title: "CSS Styling Basics",
            description: "Master CSS fundamentals including selectors, properties, and layout techniques for beautiful web designs.",
            duration: "18:30",
            difficulty: "Beginner",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            thumbnail: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.9k",
            rating: 4.7,
            estimatedTime: "20 min",
            nextLesson: "JavaScript Fundamentals",
            keyPoints: [
              "CSS selectors and specificity",
              "Box model and layout principles",
              "Responsive design with media queries",
              "Modern CSS features and best practices"
            ]
          },
          {
            id: 3,
            title: "JavaScript Fundamentals",
            description: "Dive deep into JavaScript programming language, from variables to advanced concepts like closures and async programming.",
            duration: "25:15",
            difficulty: "Intermediate",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            thumbnail: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.7k",
            rating: 4.9,
            estimatedTime: "30 min",
            nextLesson: "DOM Manipulation",
            keyPoints: [
              "Variables, data types, and operators",
              "Functions and scope concepts",
              "Objects and arrays manipulation",
              "Event handling and DOM interaction"
            ]
          }
        ]
      },
      {
        id: 2,
        title: "React Development",
        description: "Build dynamic user interfaces with React",
        lessons: [
          {

            
            id: 4,
            title: "React Components & JSX",
            description: "Learn the building blocks of React applications. Understand components, JSX syntax, and component composition patterns.",
            duration: "22:40",
            difficulty: "Intermediate",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            thumbnail: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.5k",
            rating: 4.8,
            estimatedTime: "25 min",
            nextLesson: "State Management",
            keyPoints: [
              "Understanding React components",
              "JSX syntax and best practices",
              "Props and component communication",
              "Component lifecycle and hooks"
            ]
          },
          {
            id: 5,
            title: "State Management with Hooks",
            description: "Master React hooks for state management. Learn useState, useEffect, and custom hooks for powerful React applications.",
            duration: "28:20",
            difficulty: "Intermediate",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            thumbnail: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.3k",
            rating: 4.9,
            estimatedTime: "32 min",
            nextLesson: "React Router",
            keyPoints: [
              "useState for local state management",
              "useEffect for side effects",
              "Custom hooks creation",
              "Context API for global state"
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Backend Development",
        description: "Server-side development with Node.js and Express",
        lessons: [
          {
            id: 6,
            title: "Node.js Fundamentals",
            description: "Introduction to server-side JavaScript with Node.js. Learn about modules, npm, and building your first server.",
            duration: "20:10",
            difficulty: "Intermediate",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.1k",
            rating: 4.7,
            estimatedTime: "22 min",
            nextLesson: "Express.js Framework",
            keyPoints: [
              "Node.js runtime environment",
              "NPM package management",
              "File system operations",
              "Creating HTTP servers"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    description: "Master advanced React patterns with TypeScript for scalable applications",
    level: "Advanced",
    duration: "32 hours",
    rating: 4.8,
    studentsEnrolled: 8900,
    instructor: "Sarah Wilson",
    currentModule: "Advanced React Patterns",
    modules: [
      {
        id: 4,
        title: "Advanced React Patterns",
        description: "Learn advanced React patterns and optimization techniques",
        lessons: [
          {
            id: 7,
            title: "Higher-Order Components",
            description: "Master HOCs for component composition and reusability. Learn when and how to use HOCs effectively in React applications.",
            duration: "24:35",
            difficulty: "Advanced",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            thumbnail: "https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "890",
            rating: 4.9,
            estimatedTime: "28 min",
            nextLesson: "Render Props Pattern",
            keyPoints: [
              "Understanding HOC patterns",
              "Component composition techniques",
              "Props manipulation and enhancement",
              "Common HOC use cases"
            ]
          },
          {
            id: 8,
            title: "Performance Optimization",
            description: "Optimize React applications for better performance. Learn about memoization, code splitting, and performance monitoring.",
            duration: "30:45",
            difficulty: "Advanced",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            thumbnail: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "756",
            rating: 4.8,
            estimatedTime: "35 min",
            nextLesson: "Testing Strategies",
            keyPoints: [
              "React.memo and useMemo",
              "Code splitting with lazy loading",
              "Virtual scrolling techniques",
              "Performance monitoring tools"
            ]
          }
        ]
      },
      {
        id: 5,
        title: "TypeScript Integration",
        description: "Integrate TypeScript with React for type-safe development",
        lessons: [
          {
            id: 9,
            title: "TypeScript with React",
            description: "Learn how to integrate TypeScript with React for better development experience and type safety.",
            duration: "26:20",
            difficulty: "Advanced",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            thumbnail: "https://images.pexels.com/photos/1181347/pexels-photo-1181347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "634",
            rating: 4.7,
            estimatedTime: "30 min",
            nextLesson: "Advanced Types",
            keyPoints: [
              "Setting up TypeScript with React",
              "Typing props and state",
              "Generic components",
              "TypeScript best practices"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Full Stack JavaScript",
    description: "Complete full-stack development with MERN stack",
    level: "Intermediate",
    duration: "60 hours",
    rating: 4.7,
    studentsEnrolled: 15200,
    instructor: "Mike Chen",
    currentModule: "Database Design",
    modules: [
      {
        id: 6,
        title: "Database Design",
        description: "Learn MongoDB and database design principles",
        lessons: [
          {
            id: 10,
            title: "MongoDB Fundamentals",
            description: "Introduction to NoSQL databases with MongoDB. Learn document-based storage and CRUD operations.",
            duration: "22:15",
            difficulty: "Intermediate",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            thumbnail: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.8k",
            rating: 4.6,
            estimatedTime: "25 min",
            nextLesson: "Mongoose ODM",
            keyPoints: [
              "NoSQL vs SQL databases",
              "MongoDB document structure",
              "CRUD operations",
              "Database design patterns"
            ]
          },
          {
            id: 11,
            title: "API Development",
            description: "Build RESTful APIs with Express.js and MongoDB. Learn about middleware, authentication, and API best practices.",
            duration: "35:40",
            difficulty: "Intermediate",
            type: "Video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            thumbnail: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            studentsCount: "1.6k",
            rating: 4.8,
            estimatedTime: "40 min",
            nextLesson: "Authentication & Security",
            keyPoints: [
              "RESTful API design principles",
              "Express.js middleware",
              "Error handling strategies",
              "API documentation with Swagger"
            ]
          }
        ]
      }
    ]
  }
]