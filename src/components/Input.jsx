import { useState } from "react"

export default function Input({ name, type = "text", label, ...props }) {

  const [inputState, setInputState] = useState('');

  function changeHandler(event) {
    setInputState(event.target.value);
  }

  return (
    <div className="control">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        required
        {...props}
        value={inputState}
        onChange={changeHandler}
      />
    </div>
  )
}