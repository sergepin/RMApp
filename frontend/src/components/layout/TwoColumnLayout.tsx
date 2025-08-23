import React from 'react';
import { Character } from '../../types/character';
import { CharacterDetailPanel } from '../features/CharacterDetailPanel';
import { HiArrowLeft } from 'react-icons/hi';

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  selectedCharacter?: Character | null;
  onBack?: () => void;
}



export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ 
  children, 
  selectedCharacter,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Vista Desktop */}
        <div className="hidden md:flex bg-white border-r border-gray-100 shadow-sm overflow-y-auto">
          {children}
        </div>

        <div className="hidden md:flex lg:grid w-2/3 bg-gray-50 p-10 overflow-y-auto">
          {selectedCharacter ? (
            <CharacterDetailPanel character={selectedCharacter} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500 max-w-md mx-auto">
                <img 
                  src="/rmapp.webp" 
                  alt="Select a character" 
                  className="w-72 h-72 mx-auto mb-6 opacity-80"
                />
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">
                  Select a character
                </h3>
                <p className="text-gray-400">
                  Choose a character from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Vista Mobile (una sola columna) */}
        <div className="flex md:hidden w-full">
          {!selectedCharacter ? (
            <div className="w-full bg-white overflow-y-auto">
              {children}
            </div>
          ) : (
            <div className="w-full bg-white overflow-y-auto p-5">
              {/* Botón volver */}
              <button 
                onClick={onBack}
                className="flex items-center text-primary-500 hover:text-primary-700 mb-5 font-medium"
              >
                <HiArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <CharacterDetailPanel character={selectedCharacter} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
