// options gets passed into fetch
// tells the fetch what we want to do for that endpoint (CRUD) 
const fetchData = async (url, options = {}) => {
  try {
    // 1 send the request, get the HTTP response
    const response = await fetch(url, options);

    // 2. Check to see if the 
    // Throw an error if the response was not 2xx - let the catch statement handle it
    if (!response.ok) throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)

    const contentType = response.headers.get('content-type');
    if (contentType === null || !contentType.includes('application/json')) {
      // If the contentType of the response is not JSON, read the stream as plain text
      const textData = await response.text();
      return textData;
    }

    // 3. Read the ReadableStream
    const jsonData = await response.json();
    return jsonData;
  }
  catch (error) {
    // if there was an error, log it and return a tuple: [data, error]
    console.error(error.message);
    return null;
  }
}

const baseUrl = 'https://test-server-pgma.onrender.com'
// const baseUrl = 'http://localhost:3000'
const password = 'bananabread';

const getPosts = () => {
  fetchData(`${baseUrl}/api/posts`).then(posts => {
    console.log(posts || 'error getting posts');
  });
}

const getPostsByUserName = async (username) => {
  const posts = await fetchData(`${baseUrl}/api/posts/${username}`);
  console.log(posts || 'error getting posts');
}

const getPostById = async (id) => {
  const posts = await fetchData(`${baseUrl}/api/posts/${id}`);
  console.log(posts || 'error getting posts');
}

const createPost = async (username, content, img_url) => {
  const newPost = {
    username,
    content,
    img_url
  }

  const options = {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json"
    }
  }
  const returnedPost = await fetchData(`${baseUrl}/api/posts?password=bananabread`, options);
  console.log(returnedPost || 'error creating post');
}

const deletePostById = (id) => {
  const options = {
    method: 'DELETE'
  }
  fetchData(`${baseUrl}/api/posts/${id}?password=bananabread`, options)
}

const main = async () => {
  console.log('start')
  // createPost('Ben', 'Hello Hanat!')
  // deletePostById(22);
  // getPosts();
  // getPostsByUserName('Ben');
  console.log('done')
}

main();