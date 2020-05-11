;(function() {

    const func = {};

    let _posts = posts;

    func.validatePost = (post) => {

        if (!post ||
            !post.author || typeof(post.author) != "string" ||
            !post.createdAt || typeof(post.createdAt) != "object" ||
            !post.id || typeof(post.id) != "string" ||
            (!post.description && !post.photo))
            return false;
        return true;
    }

    function _filterPosts(posts, filterConfig) {

        if (filterConfig) {

            if (filterConfig["hashTags"])
            posts = posts.filter(post => filterConfig.hashTags.some(tag => post.hashTags.includes(tag)));       //at least 1 hashtag
            if (filterConfig["author"])
            posts = posts.filter(post => post.author === filterConfig.author);
            if(filterConfig["createdAt"])
            posts = posts.filter(post => post.createdAt === filterConfig.createdAt);
        }
        return posts;
    }

    func.getPosts = (skip = 0, top = 10, filterConfig = null) => {

        let tempPosts = _posts.sort((first, second) => first.createdAt < second.createdAt);
        
        return _filterPosts(tempPosts, filterConfig).slice(skip, skip + top);
    }

    func.getPost = (Id) => {

        return _posts.find(post => post.id == Id);
    }

    func.addPost = (post) => {

        newId = 0;
        _posts.forEach(item => newId = Math.max(parseInt(item.id, 10), newId));

        post.id = String(newId + 1);
        post.createdAt = new Date();

        if (!post.hashTags)
            post.hashTags = [];
        
        if (!post.likes)
            post.likes = [];
        
        if (func.validatePost(post)) {

            _posts.push(post);
            return true;
        }
        return false;
    }

    func.editPost = (id, post) => {

        let tempPost = _posts.find(post => post.id === id);
        if (!tempPost)
            return false;

        let keys = Object.keys(post);
        keys.forEach(key => {
            if(key != "id" && key != "author" && key != "createdAt")
                tempPost[key] = post[key];
        });

        if (func.validatePost(tempPost)) {

            _posts[_posts.findIndex(post => post["id"] === id)] = tempPost;
            return true;
        }
        return false;
    }

    func.removePost = (id) => {

        let index = _posts.findIndex(item => item.id === id);
        if (index === -1)
            return false;
        else 
            _posts.splice(index, 1);
        return true;
    }
    //module.exports = func;
    window.func = func;
})();