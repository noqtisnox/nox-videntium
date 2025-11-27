import React from 'react';
import type { SubmissionStatus, StudentDetails } from '@types/types';
import placeholderImg from '@assets/img/rem-pfp.jpg'; 
import './StudentInfo.css'; 

type Props = {
 data: StudentDetails;
}

const StudentInfo: React.FC<Props> = ({ data }) => {
 const { 
  name, 
  email, 
  submissionStatus, 
  lastUpdated, 
  currentGrade 
 } = data;
 
 const statusClass = `status-badge is-${submissionStatus}`;

 return (
  <div className='student-info-card'>
   <div className='student-info__header'>
    <img 
     className='pfp-image' 
     src={data.pfpUrl || placeholderImg} 
     alt={`${name}'s Profile`}
    />
    <div className='header-details'>
     <h1 className='student-name'>{name}</h1>
     <p className='student-email'>{email}</p>
    </div>
   </div>

   <div className='details-grid'>    
    <div className='detail-item'>
     <p className='detail-label'>Submission Status</p>
     <span className={statusClass}>
      {submissionStatus.charAt(0).toUpperCase() + submissionStatus.slice(1)}
     </span>
    </div>

    <div className='detail-item'>
     <p className='detail-label'>Last Updated</p>
     <p className='detail-value'>{lastUpdated}</p>
    </div>

    <div className='detail-item'>
     <p className='detail-label'>Current Grade</p>
     <p className='detail-grade'>{currentGrade}</p>
    </div>
    
    <div className='detail-item'>
     <p className='detail-label'>Assignment ID</p>
     <p className='detail-value'>{data.id}</p>
    </div>

   </div>
  </div>
 );
}

export default StudentInfo;