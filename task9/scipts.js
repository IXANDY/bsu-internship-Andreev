var model = new PostModel(posts);
console.log(model);
var view = new View(model);
console.log(view);

function showPosts(skip = 0, top = 10, filterConfig = null) {
  console.log(view.showPosts(skip, top, filterConfig));
}
function addPost(post) {
  console.log(view.addPost(post));
}
function logIn(name) {
  console.log(view.logIn(name));
}
function logOut() {
  console.log(view.logOut());
}
function deletePost(id) {
  console.log(view.deletePost(id));
}
function deleteAll() {
  console.log(View.removeAll());
}
function editPost(post) {
  console.log(view.editPost(post));
}

function test() {
  showPosts();
  deletePost('1');
  logIn('Kek Belkov');
  editPost({
    id: '1',
    description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his. So neither related he am do believe. Nothing but you hundred had use regular. Fat sportsmen arranging preferred can. Busy paid like is oh. Dinner our ask talent her age hardly. Neglected collected an attention listening do abilities. ',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Kek Belkov',
    photoLink: 'https://memepedia.ru/wp-content/uploads/2020/03/cover1.jpg',
    hashTags: [
      'kek', 'bek', 'nek',
    ],
    likes: [
      'Ken', 'Meg',
    ],
  });
  logOut();
  editPost({
    id: '1',
    description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his. So neither related he am do believe. Nothing but you hundred had use regular. Fat sportsmen arranging preferred can. Busy paid like is oh. Dinner our ask talent her age hardly. Neglected collected an attention listening do abilities. ',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'Kek Belkov',
    photoLink: 'https://memepedia.ru/wp-content/uploads/2020/03/cover2.jpg',
    hashTags: [
      'kek', 'bek', 'nek',
    ],
    likes: [
      'Ken', 'Meg',
    ],
  });
}

test();
