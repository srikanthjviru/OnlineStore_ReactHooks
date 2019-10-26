import React, { useState, useEffect } from "react";

function App() {
  // form values
  const formDefaultvalues = {
    name: "",
    email: ""
  };
  const [formValues, setFormValues] = useState(formDefaultvalues);
  const { name, email } = formValues;

  // handling errors
  const formDefaultErrors = {
    email: [],
    name: []
  };
  const [formErrors, setFormErrors] = useState(formDefaultErrors);

  // useEffect observation
  useEffect(() => {
    console.log({ name, email });
  }, [name, email]);

  // handle change for the inputs
  const handleChange = (e, validators) => {
    const target = e.target;
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
    handleValidations(target, validators);
  };

  // validations
  function handleValidations(target, validators) {
    validators.forEach(validation => {
      const result = validation(target.value);
      const errors = formErrors[target.name];

      if (result.valid) {
        if (errors.includes(result.message)) {
          setFormErrors({
            ...formErrors,
            [target.name]: errors.filter(error => error !== result.message)
          });
        }
      } else {
        if (!errors.includes(result.message)) {
          setFormErrors({
            ...formErrors,
            [target.name]: [...errors, result.message]
          });
        }
      }
    });
  }
  // no blanks in the field
  function noBlanks(value) {
    return {
      valid: value.replace(/\s+/, "").length > 0,
      message: "cannot be blank"
    };
  }

  // validating email format
  function validEmail(email) {
    return {
      valid: email.split("@").length > 1,
      message: "must be a valid email"
    };
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={name}
          onChange={e => handleChange(e, [noBlanks])}
          style={{ height: 30, width: 300, fontSize: 17, margin: 10 }}
        />
        <div>
          {formErrors["name"][0] ? (
            <span
              style={{
                color: "red",
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {formErrors["name"][0].toUpperCase()}
            </span>
          ) : null}
        </div>
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => handleChange(e, [noBlanks, validEmail])}
          style={{ height: 30, width: 300, fontSize: 17, margin: 10 }}
        />
        <div>
          {formErrors["email"][0] ? (
            <span
              style={{
                color: "red",
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {formErrors["email"][0].toUpperCase()}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default App;
