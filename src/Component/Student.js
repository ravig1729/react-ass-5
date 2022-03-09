import React from 'react'
import AddStudent from './AddStudent'


const Student = () => {
  return (
    <div>
      <div className="card-body">
        <h1 style={{ textAlign: 'center', fontSize: '50px', color: 'white' }}>
          Student Details
        </h1>
        <AddStudent />
      </div>
    </div>
  )
}

export default Student