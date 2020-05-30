import AbstractSmartComponent from "./abstract-smart-component.js";
import {COMMENTS_EMODJIES} from '../mock/comment.js';


const createEmojiListMarkup = (names) => {
  return names.map((name) => {
    return (
      `<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-${name}"
        value="${name}"
      >
      <label class="film-details__emoji-label" for="emoji-${name}">
        <img src="images/emoji/${name}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }).join(`\n`);
};
const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    const {text, author, emoji, date, id} = comment;
    return (
      `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete" id="comment-${id}">Delete</button>
                </p>
              </div>
            </li>`
    );
  }).join(`\n`);
};

const creatCommentsTemplate = (card, options = {}) => {
  const {comments} = card;
  const {newComment} = options;

  const currentEmoji = `${newComment.emoji}` ? `<img src="images/emoji/${newComment.emoji}.png" width="55" height="55" alt="emoji-${newComment.emoji}">` : ``;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">${comments.length === 1 ? `Comment` : `Comments`} <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
      ${createCommentsMarkup(comments)}
      </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
        ${currentEmoji}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment.text}</textarea>
      </label>

      <div class="film-details__emoji-list">
      ${createEmojiListMarkup(COMMENTS_EMODJIES)}
      </div>
    </div>
  </section>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._comments = card.comments;
    this._card = card;
    console.log(this._comments)
    this._newComment = {
      text: ``,
      emoji: ``,
      // author: ``,
      // date: null,
    };

    this._subscribeOnEvents();
    // this._deleteCommentsButtonClickHandler = null;

  }

  getTemplate() {
    return creatCommentsTemplate(this._card, {
      newComment: this._newComment
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  reset() {
    this._newComment = {
      text: ``,
      emoji: ``,
      // author: ``,
      // date: null,
    };

    this.rerender();
  }

  rerender() {
    super.rerender();
  }

    
  setDeleteButtonClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((deleteButton) => deleteButton.addEventListener(`click`, handler));
    this._deleteButtonClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        this._newComment.emoji = evt.target.value;
        this.rerender();
      });

    element.querySelector(`.film-details__comment-input`).addEventListener(`input`, (evt) => {
      this._newComment.text = evt.target.value;
    });
  }
}