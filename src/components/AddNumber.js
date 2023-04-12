import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { NumberContext } from "../context/NumberContext";

const formSchema = Yup.object().shape({
  number: Yup.number().required("number required"),
});

const AddNumber = () => {
  const {
    numbers,
    addNumberAction,
    deleteNumberAction,
    changeEditAction,
    editNumberAction,
  } = useContext(NumberContext);
  const [value, setValue] = useState(0);
  const [prevVal, setPrevVal] = useState(value);
  console.log(numbers.length);

  const handleDelete = (id) => {
    deleteNumberAction(id);
    if (numbers[numbers.length - 1].id === id) {
      setValue(prevVal);
      if (numbers.length > 2) {
        setPrevVal(numbers[numbers.length - 3].number);
      }
    }
  };
  return (
    <div>
      <div style={{ textAlign: "center", margin: "30px" }}>
        <h3>Add Number</h3>
        <Formik
          initialValues={{ number: "" }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            addNumberAction(value + values.number);
            setPrevVal(value);
            setValue(value + values.number);
          }}
        >
          <Form>
            <Field type="number" name="number" placeholder="Enter Number" />
            <ErrorMessage name="number" component="div" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      <div>
        <table style={{ width: "50%", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {numbers.map((num) => {
              return (
                <tr key={num.id}>
                  <td>{num.number}</td>
                  <td>
                    {num.isEdit ? (
                      <>
                        <Formik
                          initialValues={{ val: num.number }}
                          onSubmit={(values) => {
                            if (
                              numbers[numbers.length - 1].number === num.number
                            ) {
                              setValue(values.val);
                            }

                            editNumberAction({
                              id: num.id,
                              number: values.val,
                            });
                          }}
                        >
                          <Form>
                            <Field type="number" name="val" />
                            <button type="submit">Save</button>
                          </Form>
                        </Formik>
                      </>
                    ) : (
                      <>
                        <button onClick={() => changeEditAction(num.id)}>
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            window.confirm("Are you sure to delete")
                              ? handleDelete(num.id)
                              : undefined
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddNumber;
