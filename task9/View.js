/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class View {
  constructor(postModel) {
    this._model = postModel;
    document.getElementById('btn-userName').innerText = this._model.showUser();
    if (!this._model.validateUser()) {
      document.getElementById('footerUserSigned').style.display = 'none';
    }
  }

  _createPost(post) {
    let newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.id = String('post-').concat(post.id);
    if (!post.photoLink) {
      newPost.innerHTML = `<div class="textAndButtons">
          <div class="name-date">
              <div id="name">${post.author}</div>
              <div id="date">${post.createdAt.getDate()}.${post.createdAt.getMonth()}.${post.createdAt.getFullYear()} ${post.createdAt.getHours()}:${post.createdAt.getMinutes() > 9 ? post.createdAt.getMinutes() : '0'.concat(post.createdAt.getMinutes())}</div>
          </div> 
          <div class="text">
            ${post.description}
          </div>
          <div class="buttons">
              <button class="btn-p">
                  <i class="fas fa-hashtag"></i>
              </button>
              <button class="btn-p" id="userSetting">
                  <i class="fas fa-ellipsis-v"></i>
              </button>
              <button class="btn-p">
                  <i class="far fa-heart"></i>
              </button>
          </div>
        </div>`;
    } else {
      newPost.innerHTML = `<div class="textAndButtonsImage">
          <div class="name-date">
              <div id="name">${post.author}</div>
              <div id="date">${post.createdAt.getDate()}.${post.createdAt.getMonth()}.${post.createdAt.getFullYear()} ${post.createdAt.getHours()}:${post.createdAt.getMinutes() > 9 ? post.createdAt.getMinutes() : '0'.concat(post.createdAt.getMinutes())}</div>
          </div> 
          <div class="text">
            ${post.description}
          </div>
          <div class="buttons">
              <button class="btn-p">
                  <i class="fas fa-hashtag"></i>
              </button>
              <button class="btn-p" id="userSetting">
                  <i class="fas fa-ellipsis-v"></i>
              </button>
              <button class="btn-p">
                  <i class="far fa-heart"></i>
              </button>
          </div>
        </div>
        <div class="photo">
          <img class="post-photo" src=${post.photoLink}>
        </div>`;
    }
    newPost.querySelector('#userSetting').style.display = 'none';
    if (this._model.validateUser()) {
      if (post.author === this._model.showUser()) {
        newPost.querySelector('#userSetting').style.display = 'block';
      }
    }
    return newPost;
  }

  showPosts(skip = 0, top = 10, filterConfig = null) {
    let posts = this._model.getPage(skip, top, filterConfig);
    let mainArea = document.getElementById('mainArea');
    posts.forEach((post) => mainArea.appendChild(this._createPost(post)));
  }

  addPost(post) {
    if (PostModel.validatePost(post)) {
      let mainArea = document.getElementById('mainArea');
      let newPost = this.createPost(post);
      if (newPost !== undefined) {
        mainArea.appendChild(newPost);
        return true;
      }
      return false;
    }
    return false;
  }

  deletePost(id) {
    let postToDelete = document.getElementById(`post-${id}`);
    if (postToDelete) {
      if (this._model.validateUser() && this._model.showUser() === postToDelete.querySelector('#name').innerText) {
        document.querySelector('#mainArea').removeChild(postToDelete);
        return true;
      }
    }
    return false;
  }

  createPost(post) {
    if (this._model.validateUser() && this._model.showUser() === post.author) {
      let newPost = document.createElement('div');
      newPost.className = 'post';
      newPost.id = String('post-').concat(post.id);
      if (!post.photoLink) {
        newPost.innerHTML = `<div class="textAndButtons">
            <div class="name-date">
                <div id="name">${post.author}</div>
                <div id="date">${post.createdAt.getDate()}.${post.createdAt.getMonth()}.${post.createdAt.getFullYear()} ${post.createdAt.getHours()}:${post.createdAt.getMinutes() > 9 ? post.createdAt.getMinutes() : '0'.concat(post.createdAt.getMinutes())}</div>
            </div> 
            <div class="text">
              ${post.description}
            </div>
            <div class="buttons">
                <button class="btn-p">
                    <i class="fas fa-hashtag"></i>
                </button>
                <button class="btn-p" id="userSetting">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <button class="btn-p">
                    <i class="far fa-heart"></i>
                </button>
            </div>
          </div>`;
      } else {
        newPost.innerHTML = `<div class="textAndButtonsImage">
            <div class="name-date">
                <div id="name">${post.author}</div>
                <div id="date">${post.createdAt.getDate()}.${post.createdAt.getMonth()}.${post.createdAt.getFullYear()} ${post.createdAt.getHours()}:${post.createdAt.getMinutes() > 9 ? post.createdAt.getMinutes() : '0'.concat(post.createdAt.getMinutes())}</div>
            </div> 
            <div class="text">
              ${post.description}
            </div>
            <div class="buttons">
                <button class="btn-p">
                    <i class="fas fa-hashtag"></i>
                </button>
                <button class="btn-p" id="userSetting">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <button class="btn-p">
                    <i class="far fa-heart"></i>
                </button>
            </div>
          </div>
          <div class="photo">
            <img class="post-photo" src=${post.photoLink}>
          </div>`;
      }
      return newPost;
    }
    return undefined;
  }

  logOut() {
    if (this._model.logOut()) {
      View._setRights(1);
      return true;
    }
    return false;
  }

  static _setRights(name = 1) {
    if (name !== 1) {
      let postsContainer = document.getElementsByClassName('post');
      let postsArray = Array.from(postsContainer);

      postsArray.forEach((post) => {
        if (post.querySelector('#name').innerText === name) {
          post.querySelector('#userSetting').style.display = 'block';
        }
      });
      document.getElementById('footerUserSigned').style.display = 'block';
      document.getElementById('btn-userName').innerText = name;
    } else {
      let postsContainer = document.getElementsByClassName('post');
      let postsArray = Array.from(postsContainer);

      postsArray.forEach((post) => {
        post.querySelector('#userSetting').style.display = 'none';
      });
      document.getElementById('footerUserSigned').style.display = 'none';
      document.getElementById('btn-userName').innerText = 'Log In';
    }
  }

  static removeAll() {
    let temp = document.querySelectorAll('.post');
    let main = document.querySelector('#mainArea');
    temp.forEach((post) => main.removeChild(post));
    return true;
  }

  editPost(post) {
    if (PostModel.validatePost(post)) {
      let postToEdit = document.querySelector(`#post-${post.id}`);
      if (postToEdit) {
        if (this._model.validateUser() && this._model.showUser() === postToEdit.querySelector('#name').innerText) {
          if (post.description) {
            postToEdit.querySelector('.text').innerText = post.description;
          }
          if (post.photoLink) {
            if (postToEdit.querySelector('.photo')) {
              postToEdit.querySelector('.post-photo').setAttribute('src', post.photoLink);
            } else {
              let tempDiv = document.createElement('div');
              tempDiv.className = 'photo';
              tempDiv.innerHTML = `<img class="post-photo" src=${post.photoLink}></img>`;
            }
          }
          return true;
        }
      }
    }
    return false;
  }

  logIn(name) {
    if (!this._model.validateUser()) {
      if (this._model.setUser(name)) {
        View._setRights(name);
        return true;
      }
    }
    return false;
  }
}
