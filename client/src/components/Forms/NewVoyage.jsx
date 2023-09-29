import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./NewVoyage.module.css";
import Button from "../UI/Button";

const NewVoyage = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className={classes.heading}>Add a new voyage!</h1>
      <div className={classes.divForm}>
        <Form method="post" action="/voyages" className={classes.form}>
          <label className={classes.label}>Voyage Name</label>
          <br />
          <input
            className={classes.input}
            name="voyagename"
            type="text"
            placeholder="Croatia"
            required
          />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "...Submititting" : "Submit"}
            />
          </div>
        </Form>
        {data && data.message && <p>{data.message}</p>}
      </div>
      <hr />
    </>
  );
};

export default NewVoyage;
