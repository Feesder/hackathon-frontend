"use client";

import axios from "axios";
import { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Form,
  FormCheckbox,
  FormField,
  FormGroup,
  FormInput,
  Grid,
  Message,
} from "semantic-ui-react";
import { InputFile } from "semantic-ui-react-input-file";
import { Context } from "../layout";

export default function create() {
  const { store } = useContext(Context);

  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState<Blob>(new Blob());

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  
  const handleCreate = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('cost', cost);
    formData.append('status', "search");
    formData.append('userId', store.user.id)
    formData.append('picture', picture);

    axios.post('https://hackathon-backend-nine.vercel.app/api/tenders', formData)
      .then((response) => {
        setFail(false)
        setSuccess(true)
        setTimeout(() => {
          window.location.href="/tenders"
        }, 2000)
      })
      .catch(err => {
        setFail(true)
      })
  }

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "100%" }}>
        <Container>
          <h2>Создать тендер</h2>
          <Form unstackable>
            <FormInput label="Название" placeholder="Название" onChange={(e) => {
              setTitle(e.target.value)
            }} />
            <FormInput label="Организатор" placeholder="Организатор" onChange={(e) => {
              setAuthor(e.target.value)
            }} />
            <FormInput label="Описание" placeholder="Описание" onChange={(e) => {
              setDescription(e.target.value)
            }} />
            <FormInput label="Цена" placeholder="Цена" onChange={(e) => {
              setCost(e.target.value)
            }} />
            <InputFile
              input={{
                id: "input-control-id",
                onChange: (e) => {
                  setPicture(e.target.files[0])
                }
              }}
            />
            {!picture.size ? '' : <Message
              header='Файл добавлен'
            />}
            {!success ? '' : <Message
              header='Успешно'
              positive
            />}
            {!fail ? '' : <Message
              header='Произошла ошибка при заполнении данных'
              negative
            />}
            <Button
              style={{ display: "block", marginTop: "1rem" }}
              type="submit"
              onClick={handleCreate}
            >
              Создать
            </Button>
          </Form>
        </Container>
      </Grid.Column>
    </Grid>
  );
}
