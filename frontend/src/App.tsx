import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';
import './index.css';

// Интерфейс для типизации данных проекта
interface Project {
  id: number;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения данных с бэкенда
  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>('http://localhost:8000/projects/');
      setProjects(response.data);
    } catch (err) {
      setError('Не удалось загрузить проекты.');
    } finally {
      setLoading(false);
    }
  };

  // Эффект, который запускает загрузку данных при монтировании компонента
  useEffect(() => {
    fetchProjects();
  }, []); // Пустой массив зависимостей означает, что эффект запустится только один раз.

  if (loading) {
    return <div className="text-center mt-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10">Моё Портфолио</h1>
      {/* Теперь просто передаем список проектов в ProjectList */}
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;