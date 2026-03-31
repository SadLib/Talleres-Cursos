import Link from "next/link";

export default function CursosList() {
  const courses = [
    { id: 1, title: "React Básico" },
    { id: 2, title: "Node Avanzado" }
  ];

  return (
    <div>
      <Link href="/dashboard/instructor/courses/create">
        <button className="mb-4">Crear curso</button>
      </Link>

      {courses.map(course => (
        <div key={course.id} className="border p-4 mb-2">
          <h2>{course.title}</h2>

          <Link href={`/dashboard/instructor/courses/${course.id}`}>
            Ver detalles
          </Link>
        </div>
      ))}
    </div>
  );
}