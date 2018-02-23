// @flow
import React from 'react';
import styles from './index.css';
import { Field } from 'redux-form';
import type { FieldProps } from 'redux-form';
import {
  Form,
  TextInput,
  EditorField,
  Button,
  ImageUploadField,
  legoForm
} from 'app/components/Form';
import { createValidator, required } from 'app/utils/validation';

type OwnProps = {
  handleSubmitCallback: Object => Promise<*>,
  group: Object
};

type Props = OwnProps & FieldProps;

const logoValidator = value => (value ? undefined : 'Bilde er påkrevd');

function GroupForm({
  handleSubmit,
  handleSubmitCallback,
  group,
  submitting,
  invalid
}: Props) {
  const isNew = !group;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Gruppenavn"
        placeholder="Strikk&Drikk"
        name="name"
        component={TextInput.Field}
        required
      />
      <Field
        label="Kort beskrivelse"
        placeholder="Vi drikker og strikker"
        name="description"
        component={TextInput.Field}
        required
      />
      <Field
        label="Kontakt e-post"
        placeholder="Primær e-post for kommunikasjon med gruppen"
        name="contactEmail"
        component={TextInput.Field}
      />
      <Field
        label="Beskrivelse"
        placeholder="Vil du strikke din egen lue? Eller har du allerede […]"
        name="text"
        component={EditorField.Field}
      />
      <Field
        name="logo"
        component={ImageUploadField}
        label="Gruppelogo"
        aspectRatio={1}
        img={group && group.logo}
        className={styles.logo}
        validate={isNew && [logoValidator]}
        required
      />
      <Button disabled={invalid || submitting} submit>
        {isNew ? 'Lag gruppe' : 'Lagre gruppe'}
      </Button>
    </Form>
  );
}

export default legoForm({
  form: 'groupForm',
  enableReinitialize: true,
  validate: createValidator({
    name: [required()],
    description: [required()]
  }),
  onSubmit: (data, dispatch, { handleSubmitCallback }: Props) =>
    handleSubmitCallback(data)
})(GroupForm);
