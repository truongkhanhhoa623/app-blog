module.exports = function(id, users){
    let userPost = users.find((user) => user._id === id)
    return userPost
}