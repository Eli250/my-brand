const token = JSON.parse(localStorage.getItem('AccessToken'));

const getResources = async () => {
  const response = await fetch(
    'https://develi-api.herokuapp.com/api/v1/articles'
  );

  if (response.status !== 200) throw new Error('Cannot fetch data.');

  const data = await response.json();
  return data;
};
const deleteData = async (url = '') => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
let pieSpinner = document.querySelector('.lds-dual-ring');
async function displayPosts() {
  let blogContainerDiv = document.querySelector('#blogContainer');
  pieSpinner.style.display = 'inline-block';
  await getResources()
    .then((data) => {
      console.log(data);
      data.data.forEach((post) => {
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
        let spantext = document.createTextNode(post.created_on);
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
        let content = document.createTextNode(post.content);
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

        updateBtn.addEventListener('click', function (event) {
          const pId = event.target.value;
          location.assign(`create-post.html#${post._id}`);
        });

        deleteBtn.addEventListener('click', function (event) {
          if (window.confirm(`Are you sure to delete post?`)) {
            deleteData(
              `https://develi-api.herokuapp.com/api/v1/articles/${post._id}`
            ).then((data) => {
              if (data.message === 'Article Deleted Successfully')
                location.reload();
            });
          } else {
            alert('Delete Cancelled!');
          }
        });
      });
      pieSpinner.style.display = 'none';
    })
    .catch((err) => console.log('Rejected: ', err.message));
}
displayPosts();
