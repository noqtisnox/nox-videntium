import StudentList from '@components/StudentList';
import StudentInfo from '@components/StudentInfo';
import GradingForm from '@components/GradingForm';
import AssignmentViewer from '@components/AssignmentViewer';

import { type SubmissionStatus, type StudentDetails } from './types/types';

import testPDF from '@assets/pdf/test-pdf.pdf';

import './App.css';

const DUMMY_STUDENT_DETAILS: StudentDetails = {
    id: 'a123',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    submissionStatus: 'late' as SubmissionStatus,
    lastUpdated: '2025-11-26 10:45 AM',
    currentGrade: 'N/A',
};

function App() {
  const selectedStudent = DUMMY_STUDENT_DETAILS;
  
  return (
    <div className='app-background'> 
      <div className='app-dashboard-wrapper'> 
        <div className='dashboard__sidebar--left'> 
          <div className='sidebar__header'>
              <h1 className='header-title'>Class Roster</h1>
          </div>
          <StudentList groupId={'1'} assignmentId={'1'} />
        </div>

        <div className='dashboard__main-content'>
          {!selectedStudent ? (
            <div className='no-selection-message'>
              <p className='no-selection-text'>Select a student from the list to begin grading.</p>
            </div>
          ) : (
            <div className='grading-panels-container'>
              <div className='panel-viewer'> 
                <AssignmentViewer assignmentUrl={testPDF} />
              </div>
              <div className='panel-sidebar--right'>
                  <section className='sidebar-section'>
                      <StudentInfo data={selectedStudent} /> 
                  </section>
                  <section className='sidebar-section'>
                      <GradingForm />
                  </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;