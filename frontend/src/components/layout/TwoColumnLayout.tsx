import React from 'react';
import { Character } from '../../types/character';
import { CharacterDetailPanel } from '../features/CharacterDetailPanel';

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  selectedCharacter?: Character | null;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ 
  children, 
  selectedCharacter 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Column - Character List */}
        <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          {children}
        </div>
        
        {/* Right Column - Character Details */}
        <div className="w-2/3 bg-gray-50 p-8 overflow-y-auto">
          {selectedCharacter ? (
            <CharacterDetailPanel character={selectedCharacter} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">👆</div>
                <h3 className="text-xl font-semibold mb-2">Select a character</h3>
                <p>Choose a character from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};