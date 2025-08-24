import React, { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { HiTrash } from 'react-icons/hi';

interface CommentsSectionProps {
  characterId: number;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ characterId }) => {
  const [newComment, setNewComment] = useState('');
  const { comments, addComment, deleteComment, loading } = useComments(characterId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(newComment.trim());
    setNewComment('');
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || loading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-800 mb-2">{comment.text}</p>
                  <p className="text-xs text-gray-500">{formatDate(new Date(comment.created_at))}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700 text-sm ml-2"
                  aria-label="Delete comment"
                >
                  <HiTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};