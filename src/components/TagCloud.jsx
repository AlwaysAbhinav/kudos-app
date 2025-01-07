import React, { useState } from "react";
import axios from "axios";
import "./TagCloud.css"; // For styling

function TagCloud({ selectedTags, toggleTag }) {
  const allTags = [
    "React",
    "JavaScript",
    "Node.js",
    "CSS",
    "HTML",
    "MongoDB",
    "Firebase",
    "Python",
    "Machine Learning",
    "AI",
  ]; // Example tags

//   const [selectedTags, setSelectedTags] = useState([]);

//   const toggleTag = (tag) => {
//     if (selectedTags.includes(tag)) {
//       setSelectedTags(selectedTags.filter((t) => t !== tag)); // Remove tag
//     } else {
//       setSelectedTags([...selectedTags, tag]); // Add tag
//     }
//   };

//   const saveTags = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/save-tags", {
//         tags: selectedTags,
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error saving tags:", error);
//     }
//   };

return (
    <div>
        <h2>Select Tags</h2>
        <div className="tag-cloud">
            {allTags.map((tag, index) => (
                <span
                    key={index}
                    className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
                    onClick={() => toggleTag(tag)}
                >
                    {tag}
                </span>
            ))}
        </div>
    </div>
);
}

export default TagCloud;
