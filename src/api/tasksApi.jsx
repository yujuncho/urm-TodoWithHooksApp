// Updated the API_URL before playing/demoing
const API_URL = "";

const REQUEST_TYPES = {
  POST: "POST",
  GET: "GET"
};

const sendRequest = async requestConfig => {
  const response = await fetch(API_URL, {
    method: requestConfig.method,
    body: JSON.stringify(requestConfig.data) || null,
    headers: requestConfig.headers || {}
  });

  if (!response.ok) {
    throw new Error(response.status + ": " + response.message);
  }

  return response.json();
};

export const postTask = async (taskText, callback) => {
  const data = await sendRequest({
    method: REQUEST_TYPES.POST,
    data: { text: taskText },
    headers: {
      "Content-Type": "application/json"
    }
  });

  const generatedId = data.name; // firebase-specific => "name" contains generated id
  const createdTask = { id: generatedId, text: taskText };

  callback(createdTask);
};

export const getTasks = async callback => {
  const data = await sendRequest({
    method: REQUEST_TYPES.GET
  });

  const loadedTasks = [];

  for (const taskKey in data) {
    loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  }

  callback(loadedTasks);
};
