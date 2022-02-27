import { useState, useCallback } from 'react'

// !! form 의 키값과 input의 name값 동일하게 맞춰야함

function useInputs<T>(initialForm: T): [T, (e: unknown) => void, () => void] {
  const [form, setForm] = useState(initialForm)

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((form) => ({ ...form, [name]: value }))
  }, [])

  const reset = useCallback(() => setForm(initialForm), [initialForm])
  return [form, onChange, reset]
}

export default useInputs
