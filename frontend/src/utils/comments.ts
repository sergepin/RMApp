export interface Comment {
    id: string;
    characterId: number;
    text: string;
    createdAt: Date;
  }
  
  export const commentsStorage = {
    getComments: (characterId: number): Comment[] => {
      try {
        const comments = JSON.parse(localStorage.getItem(`comments_${characterId}`) || '[]');
        return comments.map((comment: any) => ({
          ...comment,
          createdAt: new Date(comment.createdAt)
        }));
      } catch {
        return [];
      }
    },
  
    addComment: (characterId: number, text: string): Comment => {
      const comment: Comment = {
        id: Date.now().toString(),
        characterId,
        text,
        createdAt: new Date()
      };
  
      const comments = commentsStorage.getComments(characterId);
      comments.push(comment);
      localStorage.setItem(`comments_${characterId}`, JSON.stringify(comments));
  
      return comment;
    },
  
    deleteComment: (characterId: number, commentId: string): void => {
      const comments = commentsStorage.getComments(characterId);
      const filteredComments = comments.filter(comment => comment.id !== commentId);
      localStorage.setItem(`comments_${characterId}`, JSON.stringify(filteredComments));
    }
  };