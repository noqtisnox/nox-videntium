import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import StudentCard from '@components/StudentCard';
import { type SubmissionStatus, type Student, type FilterStatus } from '../../types/types';

// The backend API root is typically http://localhost:8000 when run with uvicorn.
const API_BASE_URL = "http://localhost:8000/api/v1";

// NOTE: We keep a temporary status assignment since the backend user model does not 
// currently include submission status. In a real app, this would be fetched 
// from a separate assignment/submission endpoint.
const getStudentStatus = (name: string): SubmissionStatus => {
  // Simple logic to match dummy data/pre-selected student, for consistency.
  if (name.includes('Charlie')) return 'late';
  if (name.includes('Alice')) return 'submitted';
  if (name.includes('Ethan')) return 'graded';
  return 'none';
}

type Props = {
 groupId: string;
 assignmentId: string;
}

import './StudentList.css';


// Define the shape of the user object coming from the FastAPI backend
type BackendUser = {
  id: number;
  first_name: string;
  last_name: string;
  patronim: string;
  email: string;
  role: string;
}


const StudentList: React.FC<Props> = ({ groupId, assignmentId }) => {
  console.log(`Received: (Group: ${groupId} | Assignment: ${assignmentId})`);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  // Initialize students as an empty array
  const [students, setStudents] = useState<Student[]>([]); 
  
  // 1. Fetch data on component mount and when the search term changes
  useEffect(() => {
    // Only fetch students (role = 'student')
    const fetchStudents = async () => {
      try {
        // Use the backend's /search-all endpoint, passing the searchTerm as the 'query' param
        const url = `${API_BASE_URL}/users/search-all?query=${searchTerm}`;
        const response = await axios.get<BackendUser[]>(url);

        // Map the generic user data from the backend to the frontend's Student type
        const studentData: Student[] = response.data
          .filter(user => user.role === 'student') // Filter for students only
          .map(user => ({
            // Convert ID to string for consistency with the frontend type
            id: user.id.toString(), 
            // Combine names for display/local filtering
            name: `${user.first_name} ${user.last_name}`,
            // NOTE: Status is hardcoded/guessed as it's not provided by this endpoint
            status: getStudentStatus(`${user.first_name} ${user.last_name}`),
          }));
        
        setStudents(studentData);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        // You might set an error state here to show a message to the user
      }
    };

    // A small debounce (e.g., 300ms) could be added here for performance
    fetchStudents();
  }, [searchTerm]); // Rerun when the search term changes
 
  // 2. Keep local filtering for submission status
  const filteredStudents = useMemo(() => {
    let results = students;
    
    // NOTE: Search filtering is handled by the API call, so we only need to 
    // perform local filtering based on submission status here.
    if (filterStatus !== 'all') {
      results = results.filter(student => student.status === filterStatus);
    }
    
    return results;
  }, [students, filterStatus]);
 
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as FilterStatus); 
  };
 
  // 3. Update search change handler to simply set the state, triggering the useEffect
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }
 
  return (
    <div className='student-list__container'>   
     <div className='control-panel'>    
      <div className='search-wrapper'>
       <input 
        type="text" 
        placeholder="Search students by name..." 
        className="input-field"
        value={searchTerm} 
        onChange={handleSearchChange}
       />
      </div>

      <div className='filter-controls'>
       <select
        className="select-field"
        value={filterStatus}
        onChange={handleStatusChange}
       >
        <option value="all">Filter: All</option>
        <option value="submitted">Submitted</option>
        <option value="none">Missing</option>
        <option value="late">Late</option>
        {/* Added graded filter back, as it's in the frontend types/logic */}
        <option value="graded">Graded</option> 
       </select>

       <select className="select-field">
        <option value="10">Show 10</option>
        <option value="20">Show 20</option>
        <option value="50">Show 50</option>
       </select>
       
      </div>
     </div>

     <div className='student-card-list'>
      
      {filteredStudents.map((student) => (
       <StudentCard 
        key={student.id}
        id={student.id}
        name={student.name}
        submissionStatus={student.status} 
       />
      ))}
      
      {/* Updated message to reflect API fetching */}
      {students.length === 0 && searchTerm === '' && (
          <p className="no-results-message">Loading students...</p>
      )}

      {filteredStudents.length === 0 && students.length > 0 && (
       <p className="no-results-message">No students matching "{searchTerm}" or selected status.</p>
      )}

     </div>
    </div>
  );
}

export default StudentList;