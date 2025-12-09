import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

import StudentCard from "@components/StudentCard";
import {
  type SubmissionStatus,
  type FilterStatus,
  type StudentDetails,
} from "../../types/types";

const API_BASE_URL = "http://localhost:8000/api/v1";

// NOTE: We keep a temporary status assignment since the backend user model does not
// currently include submission status. In a real app, this would be fetched
// from a separate assignment/submission endpoint.
const getStudentStatus = (name: string): SubmissionStatus => {
  if (name.includes("Charlie")) return "late";
  if (name.includes("Alice")) return "submitted";
  if (name.includes("Ethan")) return "graded";
  return "none";
};

type Props = {
  groupId: string;
  assignmentId: string;
  onSelect?: (details: StudentDetails | null) => void;
};

import "./StudentList.css";

type BackendUser = {
  id: number;
  first_name: string;
  last_name: string;
  patronim: string;
  email: string;
  role: string;
};

type FrontendStudent = {
  id: string;
  name: string;
  status: SubmissionStatus;
  email: string;
};

const StudentList: React.FC<Props> = ({ groupId, assignmentId, onSelect }) => {
  console.log(`Received: (Group: ${groupId} | Assignment: ${assignmentId})`);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [students, setStudents] = useState<FrontendStudent[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const url = `${API_BASE_URL}/users/search-all?query=${searchTerm}`;
        const response = await axios.get<BackendUser[]>(url);

        const studentData: FrontendStudent[] = response.data
          .filter((user) => user.role === "student")
          .map((user) => ({
            id: user.id.toString(),
            name: `${user.first_name} ${user.last_name}`,
            status: getStudentStatus(`${user.first_name} ${user.last_name}`),
            email: user.email,
          }));

        setStudents(studentData);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [searchTerm]);

  const filteredStudents = useMemo(() => {
    let results = students;

    if (filterStatus !== "all") {
      results = results.filter((student) => student.status === filterStatus);
    }

    return results;
  }, [students, filterStatus]);

  const handleSelect = (student: FrontendStudent) => {
    const details: StudentDetails = {
      id: student.id,
      name: student.name,
      email: student.email,
      pfpUrl: undefined,
      submissionStatus: student.status,
      lastUpdated: "N/A",
      currentGrade: "N/A",
    };

    onSelect && onSelect(details);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as FilterStatus);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="student-list__container">
      <div className="control-panel">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search students by name..."
            className="input-field"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-controls">
          <select
            className="select-field"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="all">Filter: All</option>
            <option value="submitted">Submitted</option>
            <option value="none">Missing</option>
            <option value="late">Late</option>
            <option value="graded">Graded</option>
          </select>

          <select className="select-field">
            <option value="10">Show 10</option>
            <option value="20">Show 20</option>
            <option value="50">Show 50</option>
          </select>
        </div>
      </div>

      <div className="student-card-list">
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            submissionStatus={student.status}
            onSelect={() => handleSelect(student)}
          />
        ))}

        {students.length === 0 && searchTerm === "" && (
          <p className="no-results-message">Loading students...</p>
        )}

        {filteredStudents.length === 0 && students.length > 0 && (
          <p className="no-results-message">
            No students matching "{searchTerm}" or selected status.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
