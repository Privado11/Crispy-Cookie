class CommentSaveDto {
    constructor(comment) {
      this.comment = comment.comment;
      this.userId = comment.userId;
      this.recipeId = comment.recipeId; 
    }
  }
  
  module.exports = CommentSaveDto;
  