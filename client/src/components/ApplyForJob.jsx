// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Typography } from '@mui/material';

// const ApplyForJob = ({ jobId }) => {
//   const [applicantEmail, setApplicantEmail] = useState('');

//   const handleApply = (e) => {
//     e.preventDefault();
//     const applicationData = { jobId, applicantEmail };

//     axios.post('http://localhost:3000/jobs/apply', applicationData)
//       .then(response => {
//         console.log('Application submitted:', response.data);
//       })
//       .catch(error => {
//         console.error('Error applying for job:', error.response ? error.response.data : error.message);
//       });
//   };

//   return (
//     <div>
//       <Typography variant="h4">Apply for Job ID: {jobId}</Typography>
//       <form onSubmit={handleApply}>
//         <TextField
//           label="Your Email"
//           value={applicantEmail}
//           onChange={(e) => setApplicantEmail(e.target.value)}
//           required
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Apply
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default ApplyForJob;