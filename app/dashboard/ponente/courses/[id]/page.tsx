import Link from "next/link";
type Props = {
  params: {
    id: string;
  };
};
export default function CourseDetail({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h1>Curso {id}</h1>

      <Link href={`/dashboard/instructor/courses/${id}/students`}>
        Ver alumnos
      </Link>

      <br />

      <Link href={`/dashboard/instructor/courses/${id}/edit`}>
        Editar curso
      </Link>
    </div>
  );
}