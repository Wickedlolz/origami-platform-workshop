const postService = {
    load: function (id, limit) {
        return fetch(`http://localhost:5000/api/origami${id ? `/${id}` : ''}${limit ? `?limig=${limit}` : ''}`).then(res => res.json());
    }
};

export default postService;