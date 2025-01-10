import React, { useState } from "react";
import axios from "axios";
import "./TagCloud.css"; // For styling

function TagCloud({ selectedTags, toggleTag }) {
  const allTags = [
    // Support & Care
    "CareCrusader",
    "SupportSuperstar",
    "HelpingHandHero",
    "CompassionKing",
    "HeartOfGold",
    "SoulSaver",
    "GuardianAngel",
    "RockSolid",
    // Hardwork and Dedication
    "EffortExtraordinaire",
    "GritGuru",
    "HustleHero",
    "CommitmentLegend",
    "WorkHorse",
    "PerseverancePro",
    "GoalGetter",
    "TenacityChampion",
    // Problem-Solving & Strategy
    "SolutionSage",
    "TacticianExtraordinaire",
    "LogicGenius",
    "StrategyArchitect",
    "FixItPro",
    "CrisisTamer",
    // Humour & Fun
    "MemeKing",
    "PunMaster",
    "JokeMachine",
    "LaughGenerator",
    "FunVibesOnly",
    "MoodBooster",
    "GiggleGenius",
    "WitWizard",
    // Leadership & Motivation
    "InspirationEngine",
    "TeamHero",
    "LeadershipWizard",
    "MotivationNinja",
    "CaptainCool",
    "ChangeMaker",
    "GoalCrusher",
    "FearlessLeader",
    // Creativity & Innovation
    "IdeaMachine",
    "DesignMaverick",
    "InnoGenius",
    "PixelPerfectionist",
    "ArtVanguard",
    "CreativityUnlocked",
    "VisionCrafter",
    "DreamWeaver",
    // Social & Emotional
    "SocialGlue",
    "EmpathyChampion",
    "PeopleMagnet",
    "VibeCurator",
    "ConnectorExtraordinaire",
    "KindnessCatalyst",
    "HugDealer",
    "OptimismArchitect",
    // Tech & Skills
    "CodeNinja",
    "DebugMaster",
    "TechWhiz",
    "UXWarrior",
    "DataGuru",
    "AppSorcerer",
    "DevOpsDynamo",
    "CloudConqueror",
  ];

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
