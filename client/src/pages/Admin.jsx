import { useState } from "react";
import { createProduct, createEvent, createWorkshop } from "../services/api";

const initialFormState = {
  type: "Product",
  title: "",
  category: "",
  description: "",
  price: "",
  availability: "",
  image: "",
};

export default function Admin() {
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(
  localStorage.getItem("adminUnlocked") === "true"
);
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";

    if (formData.price === "" || Number(formData.price) < 0) {
      newErrors.price = "Price must be 0 or above.";
    }

    if (!formData.availability.trim()) {
      newErrors.availability = "Availability is required.";
    }

    setErrors(newErrors);
    setMessage("");

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: Number(formData.price),
      availability: formData.availability,
      image: formData.image,
    };

    let result;

    if (formData.type === "Product") {
      result = await createProduct(payload);
    } else if (formData.type === "Event") {
      result = await createEvent(payload);
    } else {
      result = await createWorkshop(payload);
    }

    if (result.error) {
      setMessage(result.error);
      return;
    }

    setMessage(`${formData.type} created successfully.`);
    setFormData(initialFormState);
    setErrors({});

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Urban Harvest Hub", {
        body: `${formData.type} created successfully.`,
        icon: "/icons/icon-192.png",
      });
    }
  }

  if (!isAdminUnlocked) {
  return (
    <section className="admin-page px-4 py-10">
      <div className="mx-auto flex min-h-[620px] w-full max-w-md flex-col items-center justify-center rounded-[2rem] bg-[#8fbe7f] px-5 py-10 text-center shadow-md">
        <div className="admin-header mb-8">
          <h1>Admin Login</h1>
          <p>Enter the admin password to manage platform content.</p>
        </div>

        <form
          className="w-full max-w-sm rounded-3xl bg-[#f7f7f1] p-6 shadow-md"
          onSubmit={(e) => {
            e.preventDefault();

            if (password === "admin123") {
              localStorage.setItem("adminUnlocked", "true");
              setIsAdminUnlocked(true);
              setPasswordError("");
            } else {
              setPasswordError("Incorrect password.");
            }
          }}
        >
          <label>
            <span>Password</span>
            <input
              type="password"
              className="soft-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </label>

          {passwordError && <p className="form-error">{passwordError}</p>}

          <button type="submit" className="form-button">
            Unlock Admin
          </button>
        </form>
      </div>
    </section>
  );
}

  return (
  <section className="admin-page px-2 py-10">
  <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mb-8 rounded-t-[2rem] bg-[#8fbe7f] px-5 py-10">
        <h1 className="text-3xl font-bold text-earth">
          Admin Content Manager
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-earth/80">
          Add sustainable products, workshops, and community events to the
          Urban Harvest Hub platform.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[2rem] bg-[#f7f7f1] p-6 shadow-md"
        aria-label="Admin content manager"
      >
        <label>
          <span>Content type</span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="soft-input"
          >
            <option value="Product">Product</option>
            <option value="Event">Event</option>
            <option value="Workshop">Workshop</option>
          </select>
        </label>

        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="soft-input soft-textarea"
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </label>

        <label>
          <span>Category</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="soft-input"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
          </select>
          {errors.category && <p className="form-error">{errors.category}</p>}
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="soft-input soft-textarea"
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </label>

        <label>
          <span>Price</span>
          <input
            type="number"
            name="price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="soft-input"
            aria-invalid={errors.price ? "true" : "false"}
          />
          {errors.price && <p className="form-error">{errors.price}</p>}
        </label>

        <label>
          <span>Availability</span>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="soft-input"
          >
            <option value="">Select availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Available">Available</option>
            <option value="Open Registration">Open Registration</option>
          </select>
          {errors.availability && (
            <p className="form-error">{errors.availability}</p>
          )}
        </label>

        <label>
          <span>Image filename</span>
          <input
            type="text"
            name="image"
            placeholder="example.jpg"
            value={formData.image}
            onChange={handleChange}
            className="soft-input soft-textarea"
          />
        </label>

        <button type="submit" className="form-button">
          Add Content
        </button>

        {message && (
          <div className="form-success" role="status">
            {message}
          </div>
        )}
            </form>
    </div>
  </section>
);
}