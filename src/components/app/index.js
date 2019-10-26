import React, { useState, useEffect } from "react";

function App() {
  const formDefaultvalues = {
    name: "",
    email: ""
  };
  const [formValues, setFormValues] = useState(formDefaultvalues);
  const { name, email } = formValues;
  useEffect(() => {
    console.log({ name, email });
  }, [name, email]);

  const handleChange = e => {
    const target = e.target;
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={name}
          onChange={handleChange}
          style={{ height: 30, width: 300, fontSize: 17, margin: 10 }}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
          style={{ height: 30, width: 300, fontSize: 17, margin: 10 }}
        />
      </div>
    </div>
  );
}
export default App;
