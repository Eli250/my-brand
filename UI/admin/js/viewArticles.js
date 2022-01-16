function getPosts() {
  let post = localStorage.getItem('Posts');
  if (post === null || post.length === 0) {
    return [];
  }
  return JSON.parse(post);
}

function displayPosts() {
  let blogContainerDiv = document.querySelector('#blogContainer');

  let posts = getPosts();
  console.log(posts);

  posts.forEach((post) => {
    const blogBoxDiv = document.createElement('div');
    blogBoxDiv.className = 'blog-box';
    let blogImageDiv = document.createElement('div');
    blogImageDiv.className = 'blog-img';
    const blogImage = document.createElement('img');
    blogImage.src = post.image;
    blogImageDiv.appendChild(blogImage);
    blogBoxDiv.appendChild(blogImageDiv);
    blogContainerDiv.appendChild(blogBoxDiv);

    const blogtextDiv = document.createElement('div');
    blogtextDiv.className = 'blog-text';
    let blogSpan = document.createElement('span');
    let spantext = document.createTextNode(post.datePosted);
    blogSpan.appendChild(spantext);
    blogtextDiv.appendChild(blogSpan);

    blogContainerDiv.appendChild(blogtextDiv);

    const blogTitleDiv = document.createElement('div');
    blogTitleDiv.className = 'blog-title';
    let title = document.createTextNode(post.title);
    blogTitleDiv.appendChild(title);
    blogtextDiv.appendChild(blogTitleDiv);
    blogBoxDiv.appendChild(blogtextDiv);

    const blogPara = document.createElement('p');
    let content = document.createTextNode(post.description);
    blogPara.appendChild(content);
    blogtextDiv.appendChild(blogPara);
    blogBoxDiv.appendChild(blogtextDiv);

    const actionBtnDiv = document.createElement('div');
    actionBtnDiv.className = 'action-btn';
    let updateBtn = document.createElement('input');
    updateBtn.type = 'button';
    updateBtn.value = 'Update';
    updateBtn.className = 'btns';
    actionBtnDiv.appendChild(updateBtn);
    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    deleteBtn.className = 'btns';
    actionBtnDiv.appendChild(deleteBtn);
    blogtextDiv.appendChild(actionBtnDiv);
    blogBoxDiv.appendChild(blogtextDiv);
  });
}
displayPosts();
