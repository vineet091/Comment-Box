window.onload = function () {
  var commentform = document.forms['commentForm']
  var commentObj = new CommentClass();
  commentObj.addInputBoxEventListener(document.getElementById('main-comment'), 'comments');

}

function CommentClass () {
  var _self = this;
  this.addInputBoxEventListener = function (elem, target, hideClass) {
    elem.addEventListener('keypress', function (evt) {
      evt = evt || window.event;
      if (evt.keyCode === 13) {
        _self.addComment(evt.target.value, target)
        evt.target.value = '';
        if (hideClass) {
          this.className = hideClass
        }
      }
      evt.stopPropagation();
      return false;
    }, false)
  }

  this.addComment = function (comment, target) {
    createCommentStructure(target, 'XYZ ABC', comment, 0, new Date().getTime())
  }

  var createCommentStructure = function (target, header, content, upvote, date) {
    var outerDiv = document.createElement('div');
    outerDiv.className = 'comment-section';
    var imgSpan = document.createElement('span');
    imgSpan.className = 'user-icon';
    var commentDetails = document.createElement('div');
    commentDetails.className = 'comment-details';

    var commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    commentHeader.innerText = header;

    var commentBody = document.createElement('div');
    commentBody.className = 'comment-body';
    commentBody.innerText = content;

    var commentFeature = document.createElement('div');
    commentFeature.className = 'comment-feature';

    var upvoteCount = document.createElement('span');
    upvoteCount.innerText = '0';
    var upvoteBtn = document.createElement('button');
    upvoteBtn.innerText = 'Upvote';
    upvoteBtn.className = 'upvote-btn'

    var downVoteBtn = document.createElement('button');
    downVoteBtn.innerText = 'Downvote';
    downVoteBtn.className = 'downvote-btn';

    upvoteBtn.addEventListener('click', function () {
      var upvote = parseInt(commentFeature.getAttribute('data-vote') || 0);
      commentFeature.setAttribute('data-vote', ++upvote);
      upvoteCount.innerText = upvote;
    }, false);

    downVoteBtn.addEventListener('click', function () {
      var upvote = parseInt(commentFeature.getAttribute('data-vote') || 0);
      commentFeature.setAttribute('data-vote', upvote === 0 ? 0 : --upvote);
      upvoteCount.innerText = upvote;
    }, false);

    var replyBtn = document.createElement('a');
    replyBtn.href = '#';
    replyBtn.className = 'reply-btn';
    replyBtn.innerText = 'Reply';

    var inputElement = document.createElement('input');
    inputElement.placeholder = 'Add comment';
    inputElement.className = 'comment-box reply-comment hide';
    inputElement.setAttribute('autocomplete', 'off');

    commentFeature.appendChild(upvoteCount);
    commentFeature.appendChild(upvoteBtn);
    commentFeature.appendChild(document.createTextNode(' | '));
    commentFeature.appendChild(downVoteBtn);
    commentFeature.appendChild(replyBtn);
    commentFeature.appendChild(inputElement);

    replyBtn.addEventListener('click', function (e) {
      var regex = /show/g;
      if (regex.test(inputElement.className)) {
        inputElement.className = 'comment-box reply-comment hide';
      } else {
        inputElement.className = 'comment-box reply-comment show';
        inputElement.focus()
      }
    }, false);

    var newComment = document.createElement('div');
    newComment.className = 'new-comment';

    commentDetails.appendChild(commentHeader);
    commentDetails.appendChild(commentBody);
    commentDetails.appendChild(commentFeature);
    commentDetails.appendChild(newComment);

    outerDiv.appendChild(imgSpan);
    outerDiv.appendChild(commentDetails);

    _self.addInputBoxEventListener(inputElement, newComment, 'comment-box reply-comment hide')

    if (typeof target === 'string') {
      document.getElementById(target).appendChild(outerDiv);
    } else {
      target.appendChild(outerDiv)
    }
  }

}
