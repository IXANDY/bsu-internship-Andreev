// eslint-disable-next-line no-undef
const tweets = new PostModel(posts);
console.log(tweets.getPage());
console.log(tweets.edit('1', {
  description: 'Edited lel',
}));
console.log(tweets.getPage());
console.log(tweets.add({
  id: '100',
  description: 'hello',
  createdAt: new Date(),
  author: 'Kek Belkov',
  hashTags: [
    'kek', 'mek',
  ],
}));
console.log(tweets.getPage(1));
console.log(tweets.getPage(2, 10, {
  author: 'Kek Belkov',
}));

console.log(tweets.remove('1'));
console.log(tweets.getPage(0, 20));
console.log(tweets.edit('2', {
  author: 'Ya',
}));
console.log(tweets.getPage(0, 10, {
  hashTags: [
    'mek', 'bek',
  ],
}));
