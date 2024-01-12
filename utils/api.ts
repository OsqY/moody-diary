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

