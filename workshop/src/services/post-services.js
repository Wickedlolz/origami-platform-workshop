const postService = {
    load: function (id, limit) {
        return fetch(`http://localhost:5000/api/origami${id ? `/${id}` : ''}${limit ? `?limig=${limit}` : ''}`).then(res => res.json());
    },
    create: function(data) {
        return fetch(`http://localhost:5000/api/origami`, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(res => res.json());
    }
};

export default postService;