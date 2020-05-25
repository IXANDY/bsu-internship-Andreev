/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class PostModel {
  constructor(posts = []) {
    this._posts = [];
    this._addAll(posts);
    this._user = 'Log In';
  }

  showUser() {
    return this._user;
  }

  validateUser() {
    return (this._user !== 'Log In' && typeof (this._user) === 'string');
  }

  static validatePost(post) {
    if (!post
        || !post.author || typeof (post.author) !== 'string'
        || !post.createdAt || typeof (post.createdAt) !== 'object'
        || !post.id || typeof (post.id) !== 'string'
        || (!post.description && !post.photo)) {
      return false;
    }
    return true;
  }

  static _filterPosts(posts, filterConfig) {
    let filteredPosts = posts;
    if (filterConfig) {
      if (filterConfig.hashTags) {
        filteredPosts = filteredPosts.filter((post) => filterConfig.hashTags
          .every((tag) => post.hashTags.indexOf(tag) >= 0));
      }
      if (filterConfig.author) {
        filteredPosts = filteredPosts.filter((post) => post.author === filterConfig.author);
      }
      if (filterConfig.createdAfter) {
        filteredPosts = filteredPosts.filter((post) => post.createdAt > filterConfig.createdAfter);
      }
      if (filterConfig.createdBefore) {
        filteredPosts = filteredPosts.filter((post) => post.createdAt < filterConfig.createdBefore);
      }
    }
    const constFilteredPosts = filteredPosts;
    return constFilteredPosts;
  }

  setUser(name) {
    if (name.length > 0 && name !== 'Log In' && typeof (name) === 'string') {
      this._user = name;
      return true;
    }
    return false;
  }

  logOut() {
    if (this.validateUser()) {
      this._user = 'Log In';
      return true;
    }
    return false;
  }

  getPage(skip = 0, top = 10, filterConfig = null) {
    const tempPosts = this._posts.sort((first, second) => first.createdAt < second.createdAt);
    return PostModel._filterPosts(tempPosts, filterConfig).slice(skip, skip + top);
  }

  get(id) {
    const post = this._posts.find((item) => item.id === id);
    return post;
  }

  edit(id, editConfig) {
    const tempPost = this._posts.find((post) => post.id === id);
    if (!tempPost) {
      return false;
    }
    let check = true;
    const keys = Object.keys(editConfig);
    keys.forEach((key) => {
      if (key !== 'id' && key !== 'author' && key !== 'likes' && key !== 'createdAt') {
        tempPost[key] = editConfig[key];
      } else {
        check = false;
      }
    });
    if (check && PostModel.validatePost(tempPost)) {
      this._posts[this._posts.findIndex((post) => post.id === id)] = tempPost;
      return true;
    }
    return false;
  }

  add(post) {
    const newPost = post;
    let newId = 0;
    if (this._posts.length > 0) {
      this._posts.forEach((item) => { newId = Math.max(parseInt(item.id, 10), newId); });
    }
    newId += 1;
    newPost.id = newId.toString();
    if (PostModel.validatePost(post)) {
      this._posts.push(post);
      return true;
    }
    return false;
  }

  remove(id) {
    const index = this._posts.findIndex((post) => post.id === id);
    if (index > -1) {
      this._posts.splice(index, 1);
      return true;
    }
    return false;
  }

  _addAll(posts) {
    const invalidePosts = posts.reduce((arrayPosts, post) => {
      if (!this.add(post)) {
        arrayPosts.push(post);
      }
      return arrayPosts;
    }, []);
    return invalidePosts;
  }
}
