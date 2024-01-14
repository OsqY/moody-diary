const createUrl = (path) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  }))
  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    return { error: res.status }
  }
}

export const deleteEntry = async (id) => {
  const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
    method: 'DELETE'
  }))
  if (res.ok) {
    const status = await res.json()
    return status
  }
}

export const createNewEntry = async () => {
  const res = await fetch(new Request(createUrl('/api/journal'), {
    method: 'POST',
  })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    return { error: res.status }
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(new Request(createUrl('/api/question'), {
    method: 'POST',
    body: JSON.stringify({ question })
  }))

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const createNewTask = async () => {
  const res = await fetch(new Request(createUrl('/api/tasks'), {
    method: 'POST',
  }))
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updateTask = async (id, task) => {
  const res = await fetch(new Request(createUrl(`/api/tasks/${id}`)), {
    method: 'PATCH',
    body: JSON.stringify(task)
  })
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const deleteTask = async (id) => {
  const res = await fetch(new Request(createUrl(`/api/tasks/${id}`), {
    method: 'DELETE',
  }))

  if (res.ok) {
    const status = await res.json()
    return status.status
  }
}
