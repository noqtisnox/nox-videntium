import React, { useState } from "react";
import "./GradingForm.css";

const GradingForm: React.FC = () => {
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Grade Submitted:", grade);
    console.log("Comment Submitted:", comment);
  };

  return (
    <form onSubmit={handleSubmit} className="grading-form">
      {" "}
      <h2 className="form-title">Grade Submission</h2>
      <div className="form-group">
        <label htmlFor="grade" className="form-label">
          Grade:
        </label>
        <input
          id="grade"
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Enter the grade..."
          className="text-input grade-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment" className="form-label">
          Comment:
        </label>

        <div className="markdown-toolbar">
          <button type="button" className="toolbar-button is-bold">
            B
          </button>
          <button type="button" className="toolbar-button is-italic">
            I
          </button>
          <button type="button" className="toolbar-button is-link">
            🔗
          </button>
        </div>

        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment about the assignment (e.g., use **bold** or *italics*)..."
          rows={6}
          className="textarea-input"
        />
      </div>
      <button type="submit" className="submit-button">
        Submit Grade and Feedback
      </button>
    </form>
  );
};

export default GradingForm;
