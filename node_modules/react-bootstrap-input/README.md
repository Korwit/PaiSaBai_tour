# react-bootstrap-input

This package provides a simple yet powerful input component with the following features:

- pattern-based validation
- form-group validation
- data-binding
- input-masks and formatting

[GitHub code](https://github.com/CarloSaccone/react-bootstrap-input)

[Working demo](https://carlosaccone.github.io/react-bootstrap-input/)

## basics

1. Install and include:

```
npm install react-bootstrap-input

import { SimpleInput } from 'react-bootstrap-input';
```

2. Create a host component representing your form (a filter form in this example), then place in the render function a few input fields:

HINT: predefined patterns are available for numbers and currency:

type="number|currency|percent|percent1"
currency="\$"

```
<SimpleInput
    formObj={filter}
    name="email"
    placeholder="Your email"
    onChange={filterChange}
    required
    validated
    pattern={'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'}
    errorMessage="Please provide a valid email address"
/>
```

3. Provide the data-variable representing your form and the change function:

```
const [filter, setfilter] = useState({});
const filterChange = updatedItem => {
    setfilter(updatedItem);
};
```

4. add the required styles (jss version will be published soon!)

```
<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossOrigin="anonymous"
/>
<link
    rel="stylesheet"
    href="https://carlosaccone.github.io/react-bootstrap-input/main.css"
    crossOrigin="anonymous"
/>

```

5. use validation (optional)

each validated field sends updates (onSet/onChange) in order to tell if the provided value is valid or not, adding the
errormessage (you can use it to notify users).
In order to get these updates you must provide the onValidationChange function and combine it with a useReducer in order to get
validation updates in an easy way

```
import { SimpleInput, validationReducer } from 'react-bootstrap-input';

const [validation, setvalidation] = useReducer(validationReducer, {});

const validationChange = field => {
    setvalidation(field);
};
```

```

 <SimpleInput
    formObj={form}
    name="name"
    placeholder="Your name"
    onChange={filterChange}
    onValidationChange={validationChange}
    required
    validated
/>

```

Enjoy!
