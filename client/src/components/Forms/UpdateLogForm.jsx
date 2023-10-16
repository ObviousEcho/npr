import { useLoaderData, Form } from "react-router-dom";

const UpdateLogForm = () => {
  const data = useLoaderData();
  console.log(data);
  const {
    voyageId,
    logId,
    logDate,
    time,
    latitude,
    longitude,
    heading,
    notes,
  } = data.data[0];

  return (
    <>
      <h1>Update Log Form</h1>
      <Form></Form>
    </>
  );
};

export default UpdateLogForm;
