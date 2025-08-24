import { useQuery, useMutation, useApolloClient } from '@apollo/client/react';
import { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from '../graphql/queries';
import { useSessionId } from './useSessionId';

interface Comment {
  id: number;
  session_id: string;
  character_id: number;
  text: string;
  author_name?: string;
  created_at: string;
  updated_at: string;
}

interface CommentsData {
  comments: Comment[];
}

interface AddCommentData {
  addComment: Comment;
}

interface DeleteCommentData {
  deleteComment: {
    success: boolean;
  };
}

export const useComments = (characterId: number) => {
  const { sessionId } = useSessionId();
  const client = useApolloClient();

  const { data: commentsData, loading: commentsLoading, error: commentsError } = useQuery<CommentsData>(GET_COMMENTS, {
    variables: { character_id: Number(characterId) },
    fetchPolicy: 'network-only',
  });

  const [addCommentMutation, { loading: addLoading }] = useMutation<AddCommentData>(ADD_COMMENT, {
    onCompleted: () => {
      client.refetchQueries({
        include: [GET_COMMENTS],
      });
    },
    onError: (error: Error) => {
      console.error('Error adding comment:', error);
    },
  });

  const [deleteCommentMutation, { loading: deleteLoading }] = useMutation<DeleteCommentData>(DELETE_COMMENT, {
    onCompleted: () => {
      client.refetchQueries({
        include: [GET_COMMENTS],
      });
    },
    onError: (error: Error) => {
      console.error('Error deleting comment:', error);
    },
  });

  const addComment = async (text: string, authorName?: string) => {
    if (!sessionId || !text.trim()) return;

    try {
      await addCommentMutation({
        variables: {
          session_id: sessionId,
          character_id: Number(characterId),
          text: text.trim(),
          author_name: authorName?.trim() || undefined,
        },
      });
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!sessionId) return;

    try {
      await deleteCommentMutation({
        variables: {
          id: Number(commentId),
          session_id: sessionId,
        },
      });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return {
    comments: commentsData?.comments || [],
    addComment,
    deleteComment,
    loading: commentsLoading || addLoading || deleteLoading,
    error: commentsError,
  };
};
