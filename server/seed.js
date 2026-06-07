const db = require("./database/db");

const products = [
  {
    title: "Eco Living Starter Kit",
    category: "Lifestyle",
    description: "A collection of eco-friendly products.",
    price: 4500,
    availability: "In Stock",
    image: "eco-kit.jpg",
  },
  {
    title: "Balcony Herb Kit",
    category: "Food",
    description: "Grow fresh herbs at home using organic seeds and compostable materials.",
    price: 8800, 
    availability: "In Stock",
    image: "balcony.jpg",
  },
  {
    title: "Reusable Kitchen Set",
    category: "Lifestyle",
    description: "Reusable kitchen essentials to reduce single-use plastic waste.",
    price: 3200,
    availability: "In Stock",
    image: "kitchen.jpg",
  },
];

const workshops = [
  {
    title: "Urban Gardening Workshop",
    category: "Education",
    description: "Learn sustainable urban gardening techniques.",
    price: 2500,
    availability: "Available",
    image: "gardening.jpg",
  },
  {
    title: "Composting Basics Workshop",
    category: "Education",
    description: "A beginner-friendly workshop on composting at home.",
    price: 1800,
    availability: "Available",
    image: "composting-workshop.jpg",
  },
];

const events = [
  {
    title: "Community Composting Event",
    category: "Food",
    description: "Join our community composting initiative.",
    price: 0,
    availability: "Open Registration",
    image: "compost.jpg",
  },
  {
    title: "Zero Waste Market Day",
    category: "Lifestyle",
    description: "A community event featuring sustainable brands and zero-waste ideas.",
    price: 500,
    availability: "Open Registration",
    image: "market.jpg",
  },
];

function insertItems(table, items) {
  items.forEach((item) => {
    db.get(
      `SELECT * FROM ${table} WHERE title = ?`,
      [item.title],
      (err, existingItem) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (existingItem) {
          console.log(`${item.title} already exists in ${table}`);
          return;
        }

        db.run(
          `
          INSERT INTO ${table}
          (title, category, description, price, availability, image)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [
            item.title,
            item.category,
            item.description,
            item.price,
            item.availability,
            item.image,
          ],
          (insertErr) => {
            if (insertErr) {
              console.error(insertErr.message);
            } else {
              console.log(`${item.title} added to ${table}`);
            }
          }
        );
      }
    );
  });
}

insertItems("products", products);
insertItems("workshops", workshops);
insertItems("events", events);

console.log("Database seeding complete.");