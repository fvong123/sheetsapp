"use client";

import CourseTemplate from '../../components/CourseTemplate';
import { useState, useEffect } from 'react';


export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  async function getCourses() {
    try {
        const response = await fetch("/api/load-courses");
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`,
          );
        }
  
        const data = await response.json();
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.error("Fetch courses error:", error);
        setError(
          error.message ||
            "Failed to fetch saved spreadsheets. Please try again.",
        );
      }
    }

    useEffect(() => {
        getCourses();
    }, []);

  return (
    <>
      {courses.map((course) => (
        <CourseTemplate key={course.id} details={course} />
      ))}
    </>
  );
}