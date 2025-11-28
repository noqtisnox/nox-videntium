import React, { useState, useMemo } from 'react';
import StudentCard from '@components/StudentCard';
import { type SubmissionStatus, type Student, type FilterStatus } from '../../types/types';

const DUMMY_STUDENTS: Student[] = [
 { id: 's1', name: 'Alice Johnson', status: 'submitted' as SubmissionStatus },
 { id: 's2', name: 'Bob Smith', status: 'none' as SubmissionStatus },
 { id: 's3', name: 'Charlie Brown', status: 'late' as SubmissionStatus },
 { id: 's4', name: 'Diana Prince', status: 'graded' as SubmissionStatus },
 { id: 's5', name: 'Ethan Hunt', status: 'submitted' as SubmissionStatus },
 { id: 's6', name: 'Fiona Glenanne', status: 'none' as SubmissionStatus },
];

type Props = {
 groupId: string;
 assignmentId: string;
}

import './StudentList.css';

const StudentList: React.FC<Props> = ({ groupId, assignmentId }) => {
 console.log(`Received: (Group: ${groupId} | Assignment: ${assignmentId})`);

 const [searchTerm, setSearchTerm] = useState('');
 const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
 const [students] = useState<Student[]>(DUMMY_STUDENTS); 
 
 const filteredStudents = useMemo(() => {
  let results = students;
  
  if (filterStatus !== 'all') {
   results = results.filter(student => student.status === filterStatus);
  }
  
  if (searchTerm) {
   const lowerCaseSearch = searchTerm.toLowerCase();
   results = results.filter(student => 
    student.name.toLowerCase().includes(lowerCaseSearch)
   );
  }
  
  return results;
 }, [students, searchTerm, filterStatus]);
 
 const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setFilterStatus(event.target.value as FilterStatus); 
 };
 
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
      value={searchTerm} onChange={handleSearchChange}
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
    
    {filteredStudents.length === 0 && (
     <p className="no-results-message">No students found matching "{searchTerm}".</p>
    )}
    
   </div>
  </div>
 );
}

export default StudentList;