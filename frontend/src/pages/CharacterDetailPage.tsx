import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

export const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Character Details
        </h1>
        <p className="text-gray-600">
          Character ID: {id}
        </p>
        {/* CharacterDetail component will go here */}
      </div>
    </Layout>
  );
};
