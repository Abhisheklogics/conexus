import React from 'react';
import { useLocation } from 'react-router-dom';
import TeacherRoom from '../TeacherRoom';
import StudentRoom from '../StudentRoom';

export default function Room() {
  const { state } = useLocation();
  if (!state) return <p className="text-white">No room data</p>;

  return state.role === 'teacher'
    ? <TeacherRoom {...state} />
    : <StudentRoom {...state} />;
}
