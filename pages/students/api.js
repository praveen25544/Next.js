export default function handler(req, res) {
  const students = [
    { id: 1, name: 'Aman', course: 'Math' },
    { id: 2, name: 'Priya', course: 'Physics' },
    { id: 3, name: 'Ravi', course: 'Chemistry' },
  ];

  res.status(200).json({
    message: 'Students API route',
    students,
  });
}
