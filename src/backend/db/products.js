import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [

  {
    _id: uuid(),
    title: "The Martian",
    author: "Andy Weir",
    originalPrice: "2500",
    percentageOff: 20,
    categoryName: "Science-Fiction",
    description: "Follow the gripping story of astronaut Mark Watney, who is left stranded alone on Mars after his crew mistakenly believes him to be dead. With limited supplies and ingenuity as his only resources, Watney must find a way to survive on the hostile planet and signal for rescue.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-martian.jpeg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 3.8,
        totalRatings: 820
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 4
    
  },
  {
    _id: uuid(),
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    originalPrice: "1500",
    percentageOff: 10,
    categoryName: "Fiction",
    description: "Follow the enchanting journey of a young girl as she discovers a hidden garden, transforms lives, and learns the power of nature's magic.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-secret-garden-87.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 2.7,
        totalRatings: 380
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 5
    
  },
  {
    _id: uuid(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    originalPrice: "2000",
    percentageOff: 36,
    categoryName: "Fiction",
    description: "Set in the 1930s, this classic novel explores themes of racial injustice, morality, and the loss of innocence through the eyes of a young girl in a small Southern town.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/book-cover-To-Kill-a-Mockingbird-many-1961.webp",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 1,
        totalRatings: 450
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Hardcover",
    maxQuantityPurchase : 6
    
  },
  {
    _id: uuid(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    originalPrice: "1800",
    percentageOff: 25,
    categoryName: "Fiction",
    description: "Step into the glamorous world of the Jazz Age, where love, wealth, and tragedy converge in a story of illusion, disillusionment, and the pursuit of the American Dream.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-great-gatsby.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.5,
        totalRatings: 320
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 9
    
  },
  {
    _id: uuid(),
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    originalPrice: "2000",
    percentageOff: 45,
    categoryName: "Non-fiction",
    description: "Explore the history of our species, from the emergence of Homo sapiens to the present day, and gain insights into the forces that have shaped our society, culture, and beliefs.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/sapiens.png",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.3,
        totalRatings: 520
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 7
    
  },
  {
    _id: uuid(),
    title: "Becoming",
    author: "Michelle Obama",
    originalPrice: "2500",
    percentageOff: 42,
    categoryName: "Non-fiction",
    description: "Delve into the inspiring and deeply personal memoir of former First Lady Michelle Obama, as she shares her journey, experiences, and lessons learned in the public eye.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/becoming.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 3.9,
        totalRatings: 650
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Hardcover",
    maxQuantityPurchase : 3
    
  },
  {
    _id: uuid(),
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    originalPrice: "1800",
    percentageOff: 43,
    categoryName: "Non-fiction",
    description: "Dive into the world of cognitive psychology and behavioral economics as Nobel laureate Daniel Kahneman explores the two systems of thinking that shape our judgments and decisions.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/fast-and-slow.webp",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 2.9,
        totalRatings: 420
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 8
    
  },
  {
    _id: uuid(),
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    originalPrice: "1800",
    percentageOff: 28,
    categoryName: "Self-Help",
    description: "Discover powerful principles and habits that can transform your personal and professional life, helping you become more proactive, focused, and successful.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/7-peiple.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 3.5,
        totalRatings: 550
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 5
    
  },
  {
    _id: uuid(),
    title: "Carrying the Fire",
    author: "Michael Collins",
    originalPrice: "1800",
    percentageOff: 53,
    categoryName: "Science-Fiction",
    description: "Embark on an interstellar adventure as a crew of astronauts journeys to a distant planet in search of answers and encounters extraterrestrial beings with mysterious powers.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/carrying-the-fire.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 3.8,
        totalRatings: 620
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 3
    
  },
  {
    _id: uuid(),
    title: "The Time Machine",
    author: "H.G. Wells",
    originalPrice: "1500",
    percentageOff: 35,
    categoryName: "Science-Fiction",
    description: "Join the time-traveling adventure of a brilliant inventor as he journeys far into the future, witnessing the wonders and perils of a world shaped by the passage of time.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-time-machine.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.2,
        totalRatings: 720
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 5
    
  },
  {
    _id: uuid(),
    title: "Pride and Prejudice",
    author: "Jane Austen",
    originalPrice: "1600",
    percentageOff: 29,
    categoryName: "Fiction",
    description: "Experience the captivating world of 19th-century England as a spirited young woman navigates societal expectations, love, and the power of first impressions.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/price-and-prejudice.jpeg",
    inStock: true,
    trending: false,
    rating: [
      {
        star: 1.8,
        totalRatings: 280
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 4
    
  },
  {
    _id: uuid(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    originalPrice: "1900",
    percentageOff: 45,
    categoryName: "Fiction",
    description: "Embark on a philosophical and spiritual journey as a young Andalusian shepherd follows his dreams, learns life lessons, and seeks his personal legend.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-alchemist.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 2.3,
        totalRatings: 280
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 3
    
  },
  {
    _id: uuid(),
    title: "Educated",
    author: "Tara Westover",
    originalPrice: "2200",
    percentageOff: 15,
    categoryName: "Non-fiction",
    description: "Experience a remarkable memoir of a woman who grows up in a strict and abusive household in rural Idaho, yet manages to escape through education and self-discovery.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/educated.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 3.5,
        totalRatings: 390
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 7
    
  },
  {
    _id: uuid(),
    title: "The Power of Now",
    author: "Eckhart Tolle",
    originalPrice: "1600",
    percentageOff: 26,
    categoryName: "Non-fiction",
    description: "Discover the transformative power of living in the present moment and find inner peace and fulfillment through the teachings of spiritual teacher Eckhart Tolle.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/thepowerofnow.jpg",
    inStock: true,
    trending: false,
    rating: [
      {
        star: 4.1,
        totalRatings: 390
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 6
    
  },
  {
    _id: uuid(),
    title: "Atomic Habits",
    author: "James Clear",
    originalPrice: "2000",
    percentageOff: 25,
    categoryName: "Self-Help",
    description: "Learn practical strategies to build good habits, break bad ones, and make meaningful changes in your life through the power of small actions and incremental progress.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-atomic-habits.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.8,
        totalRatings: 670
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Hardcover",
    maxQuantityPurchase : 8
    
  },
  {
    _id: uuid(),
    title: "Daring Greatly",
    author: "Brené Brown",
    originalPrice: "2200",
    percentageOff: 56,
    categoryName: "Self-Help",
    description: "Embrace vulnerability, cultivate resilience, and develop the courage to live wholeheartedly by learning to overcome shame and fear of judgment.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/daring-greatly.webp",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.4,
        totalRatings: 420
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 5
    
  },
  {
    _id: uuid(),
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    originalPrice: "1900",
    percentageOff: 56,
    categoryName: "Self-Help",
    description: "Explore the power of mindset and learn how adopting a growth mindset can enhance your personal and professional development, resilience, and success.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/mindsetrr.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4,
        totalRatings: 370
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 5
    
  },
  {
    _id: uuid(),
    title: "The Calculating Stars",
    author: "Mary Robinette Kowal",
    originalPrice: "2000",
    percentageOff: 47,
    categoryName: "Science-Fiction",
    description: "Embark on an alternate history journey where a catastrophic event accelerates the space race and women become key players in the quest to colonize space, challenging societal norms and prejudices along the way.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/the-calculating-stars.jpeg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 0.9,
        totalRatings: 820
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 6
    
  },
  {
    _id: uuid(),
    title: "Hyperion",
    author: "Dan Simmons",
    originalPrice: "2500",
    percentageOff:85,
    categoryName: "Science-Fiction",
    description: "Embark on an epic journey through a far-future universe where seven pilgrims share their stories, intertwined with ancient mysteries, interstellar politics, and the enigmatic being known as the Shrike.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/hyperion.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.6,
        totalRatings: 710
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Paperback",
    maxQuantityPurchase : 4
    
  },
  {
    _id: uuid(),
    title: "Neuromancer",
    author: "William Gibson",
    originalPrice: "2200",
    percentageOff: 38,
    categoryName: "Science-Fiction",
    description: "Dive into a cyberpunk world where technology and virtual reality blend, as a washed-up computer hacker gets entangled in a dangerous conspiracy that spans the real and digital realms.",
    imageURL: "https://raw.githubusercontent.com/sobitp59/openbook-images/main/images/neuromancer.jpg",
    inStock: true,
    trending: true,
    rating: [
      {
        star: 4.5,
        totalRatings: 560
      }
    ],
    cashOnDelivery: true,
    language: "English",
    fastDelivery: true,
    binding: "Hardcover",
    maxQuantityPurchase : 6
    
  },
];


