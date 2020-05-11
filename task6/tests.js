let check = window.func;
console.log(check.getPosts());

console.log(check.addPost({
        id: '11',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Kek Belkov'
}));
console.log(check.addPost({
        id: '100',
        description: 'hello',
        author: 'Kek Belkov',
        hashTags: [
                "kek", "mek"
        ]
}));
console.log(check.getPosts(10));

console.log(check.editPost("1", {
        description: "Edited lel"
}));
console.log(check.getPosts());

console.log(check.getPosts(2, 10 ,{
        author: "Kek Belkov"
}));

console.log(check.removePost("1"));
console.log(check.getPosts());
console.log(check.editPost("2", {
        author: "Ya"
}));

console.log(check.getPosts());
console.log(check.getPosts(0, 10 ,{
        hashTags: [
                "mek"
        ]
}));