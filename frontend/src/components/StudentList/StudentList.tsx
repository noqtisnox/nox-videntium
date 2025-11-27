import React, { useState, useMemo } from 'react';
import StudentCard from '@components/StudentCard';

type SubmissionStatus = 'none' | 'submitted' | 'late' | 'graded';
type FilterStatus = SubmissionStatus | 'all';

// TODO: move to types.ts later
type Student = {
    id: string;
    name: string;
    status: SubmissionStatus;
};

type Props = {
  groupId: string;
  assignmentId: string;
}

const DUMMY_STUDENTS: Student[] = [
  { id: 's1', name: 'Alice Johnson', status: 'submitted' as SubmissionStatus },
  { id: 's2', name: 'Bob Smith', status: 'none' as SubmissionStatus },
  { id: 's3', name: 'Charlie Brown', status: 'late' as SubmissionStatus },
  { id: 's4', name: 'Diana Prince', status: 'graded' as SubmissionStatus },
  { id: 's5', name: 'Ethan Hunt', status: 'submitted' as SubmissionStatus },
  { id: 's6', name: 'Fiona Glenanne', status: 'none' as SubmissionStatus },
];

const StudentList: React.FC<Props> = ({ groupId, assignmentId }) => {
  console.log(`Received: (Group: ${groupId} | Assignment: ${assignmentId})`);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [students, setStudents] = useState<Student[]>(DUMMY_STUDENTS);
  
  const filterStudents = useMemo(() => {
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
    <div className='bg-white p-6 inline-block rounded-3xl'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 p-4 bg-gray-50 rounded-lg shadow-inner'>
        
        <div className='grow mr-4 mb-4 md:mb-0'>
          <input 
            type="text" 
            placeholder="Search students by name..." 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={searchTerm} onChange={handleSearchChange}
          />
        </div>

        <div className='flex space-x-4 items-center'>
          <select
            className="p-2 border border-gray-300 rounded-lg"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="all">Filter: All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="none">Missing</option>
            <option value="late">Late</option>
          </select>

          <select className="p-2 border border-gray-300 rounded-lg">
            <option value="10">Show 10</option>
            <option value="20">Show 20</option>
            <option value="50">Show 50</option>
          </select>
          
        </div>
      </div>

      <div className='flex flex-col justify-start gap-6'>
        
        {filterStudents.map((student) => (
          <StudentCard 
            key={student.id}
            id={student.id}
            name={student.name}
            submissionStatus={student.status} 
          />
        ))}
        
        {filterStudents.length === 0 && (
          <p className="text-3xl text-center text-gray-500 italic mt-8">No students found matching "{searchTerm}".</p>
        )}
        
      </div>
    </div>
  );
}

export default StudentList;