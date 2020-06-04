import CommentsComponent from '../components/comments.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CommentController {
  constructor(container, commentsModel, onCommentsDataChange) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._commentsComponent = null;

    this._onCommentsDataChange = onCommentsDataChange;
  }

  render() {
    const container = this._container;
    const comments = this._commentsModel.getComments();

    this._commentsComponent = new CommentsComponent(comments);

    render(container, this._commentsComponent, RenderPosition.AFTERBEGIN);

  }

  
}
